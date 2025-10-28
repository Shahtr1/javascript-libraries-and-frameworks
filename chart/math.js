const math = {};

math.lerp = (a, b, t) => a + (b - a) * t;

math.formatNumber = (n, decimals = 0) => n.toFixed(decimals);

math.invLerp = (a, b, v) => (v - a) / (b - a);

math.remap = (oldA, oldB, newA, newB, v) =>
  math.lerp(newA, newB, math.invLerp(oldA, oldB, v));

math.remapPoint = (oldBounds, newBounds, point) => {
  return [
    math.remap(
      oldBounds.left,
      oldBounds.right,
      newBounds.left,
      newBounds.right,
      point[0]
    ),
    math.remap(
      oldBounds.top,
      oldBounds.bottom,
      newBounds.top,
      newBounds.bottom,
      point[1]
    ),
  ];
};
