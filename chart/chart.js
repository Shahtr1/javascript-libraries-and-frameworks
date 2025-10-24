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

    this.#draw();
  }

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
}
