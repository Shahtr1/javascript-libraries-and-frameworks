class Chart {
  constructor(container, samples, options) {
    this.samples = samples;

    this.axesLabels = options.axesLabels;
    this.styles = options.styles;

    this.canvas = document.createElement("canvas");
    this.canvas.width = options.size;
    this.canvas.height = options.size;
    this.canvas.style = "background-color:white";
    container.appendChild(this.canvas);

    this.context = this.canvas.getContext("2d");

    this.margin = options.size * 0.1;
    this.transparency = 0.5;

    this.pixelBounds = this.#getPixelBounds();
    this.dataBounds = this.#getDataBounds();
    this.defaultDataBounds = this.#getDataBounds();

    this.dataTrans = {
      offset: [0, 0],
      scale: 1,
    };

    this.dragInfo = {
      start: [0, 0],
      end: [0, 0],
      offset: [0, 0],
      dragging: false,
    };

    this.#draw();

    this.#addEventListeners();
  }

  #addEventListeners() {
    const { canvas, dataTrans, dragInfo } = this;
    canvas.onmousedown = (evt) => {
      const dataLoc = this.#getMouse(evt, true);
      dragInfo.start = dataLoc;
      dragInfo.dragging = true;
    };
    canvas.onmousemove = (evt) => {
      if (dragInfo.dragging) {
        const dataLoc = this.#getMouse(evt, true);
        dragInfo.end = dataLoc;
        dragInfo.offset = math.scale(
          math.subtract(dragInfo.start, dragInfo.end),
          dataTrans.scale
        );

        const newOffset = math.add(dataTrans.offset, dragInfo.offset);
        this.#updateDataBounds(newOffset, dataTrans.scale);
        this.#draw();
      }
    };
    canvas.onmouseup = () => {
      dataTrans.offset = math.add(dataTrans.offset, dragInfo.offset);
      dragInfo.dragging = false;
    };
    canvas.onwheel = (evt) => {
      const dir = Math.sign(evt.deltaY);
      const step = 0.02;
      dataTrans.scale += dir * step;

      // clamp between two values
      // Why:
      // Chech Readme.md for more info
      dataTrans.scale = Math.max(step, Math.min(2, dataTrans.scale));

      this.#updateDataBounds(dataTrans.offset, dataTrans.scale);

      this.#draw();
      evt.preventDefault();
    };
  }

  #updateDataBounds(offset, scale) {
    const { dataBounds, defaultDataBounds: def } = this;
    dataBounds.left = def.left + offset[0];
    dataBounds.right = def.right + offset[0];
    dataBounds.top = def.top + offset[1];
    dataBounds.bottom = def.bottom + offset[1];

    const center = [
      (dataBounds.left + dataBounds.right) / 2,
      (dataBounds.top + dataBounds.bottom) / 2,
    ];

    // More info on why we use ** 2, is on Readme.md
    dataBounds.left = math.lerp(center[0], dataBounds.left, scale ** 2);
    dataBounds.right = math.lerp(center[0], dataBounds.right, scale ** 2);
    dataBounds.top = math.lerp(center[1], dataBounds.top, scale ** 2);
    dataBounds.bottom = math.lerp(center[1], dataBounds.bottom, scale ** 2);
  }

  #getMouse = (evt, dataSpace = false) => {
    const rect = this.canvas.getBoundingClientRect();
    const pixelLoc = [evt.clientX - rect.left, evt.clientY - rect.top];
    if (dataSpace) {
      const dataLoc = math.remapPoint(
        this.pixelBounds,
        this.defaultDataBounds,
        pixelLoc
      );
      return dataLoc;
    }
    return pixelLoc;
  };

  /*
  For a 500×500 canvas:
    left = 50
    right = 450
    top = 50
    bottom = 450

    So any graph, point, or axis should be drawn within these pixel coordinates
    → from (50, 50) to (450, 450)
    and not on the edge of the canvas.

    Without the margin and pixelBounds, your plotted data might get clipped or look squished.
  */
  #getPixelBounds() {
    const { canvas, margin } = this;
    const bounds = {
      left: margin,
      right: canvas.width - margin,
      top: margin,
      bottom: canvas.height - margin,
    };

    return bounds;
  }

  #getDataBounds() {
    const { samples } = this;
    const x = samples.map((s) => s.point[0]);
    const y = samples.map((s) => s.point[1]);
    const minX = Math.min(...x);
    const maxX = Math.max(...x);
    const minY = Math.min(...y);
    const maxY = Math.max(...y);
    const bounds = {
      left: minX,
      right: maxX,
      top: maxY,
      bottom: minY,
    };
    return bounds;
  }

  #draw() {
    const { context, canvas } = this;
    context.clearRect(0, 0, canvas.width, canvas.height);

    this.#drawAxes();
    context.globalAlpha = this.transparency;
    this.#drawSamples();
    context.globalAlpha = 1;
  }

  #drawSamples() {
    const { context, samples, dataBounds, pixelBounds } = this;
    for (const sample of samples) {
      const { point } = sample;
      const pixelLoc = math.remapPoint(dataBounds, pixelBounds, point);
      graphics.drawPoint(context, pixelLoc);
    }
  }

  #drawAxes() {
    const { context: ctx, canvas, axesLabels, margin } = this;
    const { left, right, top, bottom } = this.pixelBounds;

    graphics.drawText(ctx, {
      text: axesLabels[0],
      loc: [canvas.width / 2, bottom + margin / 2],
      size: margin * 0.6,
    });

    ctx.save();
    ctx.translate(left - margin / 2, canvas.height / 2);
    ctx.rotate(-Math.PI / 2);
    graphics.drawText(ctx, {
      text: axesLabels[1],
      loc: [0, 0],
      size: margin * 0.6,
    });
    ctx.restore();

    ctx.beginPath();
    ctx.moveTo(left, top);
    ctx.lineTo(left, bottom);
    ctx.lineTo(right, bottom);
    ctx.setLineDash([5, 4]);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "lightgray";
    ctx.stroke();
    ctx.setLineDash([]);

    const dataMin = math.remapPoint(this.pixelBounds, this.dataBounds, [
      left,
      bottom,
    ]);
    graphics.drawText(ctx, {
      text: math.formatNumber(dataMin[0], 2),
      loc: [left, bottom],
      size: margin * 0.3,
      align: "left",
      vAlign: "top",
    });
    ctx.save();
    ctx.translate(left, bottom);
    ctx.rotate(-Math.PI / 2);
    graphics.drawText(ctx, {
      text: math.formatNumber(dataMin[1], 2),
      loc: [0, 0],
      size: margin * 0.3,
      align: "left",
      vAlign: "bottom",
    });
    ctx.restore();

    const dataMax = math.remapPoint(this.pixelBounds, this.dataBounds, [
      right,
      top,
    ]);
    graphics.drawText(ctx, {
      text: math.formatNumber(dataMax[0], 2),
      loc: [right, bottom],
      size: margin * 0.3,
      align: "left",
      vAlign: "top",
    });
    ctx.save();
    ctx.translate(left, top);
    ctx.rotate(-Math.PI / 2);
    graphics.drawText(ctx, {
      text: math.formatNumber(dataMax[1], 2),
      loc: [0, 0],
      size: margin * 0.3,
      align: "right",
      vAlign: "bottom",
    });
    ctx.restore();
  }
}
