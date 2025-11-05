## Chart

### Why zooing goes reverse and why we need clamp value?

```js
left = lerp(center, left, scale);
```

Suppose:

- `center = 0`
- `left = -10`

and we change `scale` to simulate zooming.

| scale           | left = lerp(0, -10, scale) | Where is it?               | Meaning              |
| --------------- | -------------------------- | -------------------------- | -------------------- |
| 0.0             | 0 + 0×(-10 − 0) = **0**    | At center                  | Everything collapsed |
| 0.5             | 0 + 0.5×(-10) = **-5**     | Closer to center           | Zooming **in**       |
| 1.0             | 0 + 1×(-10) = **-10**      | Original bound             | Normal view          |
| 2.0             | 0 + 2×(-10) = **-20**      | Further away               | Zooming **out**      |
| **3.0**         | 0 + 3×(-10) = **-30**      | Even further away          | More zoom out        |
| **<0 (say −1)** | 0 + (−1)×(-10) = **+10**   | Flipped to the other side! | Inverted axes 😱     |

### So what happens?

When `scale` is between **0 and 1**,
you move toward the center → Zoom in.

When `scale` is **greater than 1**,
you move away from the center → Zoom out.

When `scale` becomes **negative**,
you move past the center and flip sides — the entire graph turns **inside-out** (it mirrors).

That’s the “reverse” feeling you saw.

## There is a problem

When we zoom in the data, iots harder to zoom in than to zoom out which happens faster, and this happens because of how area and lengths are related something to do with square root and squaring, so will fix it with

```js
dataBounds.left = math.lerp(center[0], dataBounds.left, scale ** 2);
dataBounds.right = math.lerp(center[0], dataBounds.right, scale ** 2);
dataBounds.top = math.lerp(center[1], dataBounds.top, scale ** 2);
dataBounds.bottom = math.lerp(center[1], dataBounds.bottom, scale ** 2);
```

When you zoom, your code tells every point how far it should be from the center:

```js
newPoint = center + scale * (oldPoint - center);
```

So:

- `scale = 1` → no change (normal zoom)
- `scale < 1` → moves the point closer to the center (zoom in)
- `scale > 1` → moves the point farther from the center (zoom out)

So your screen’s visible width is proportional to `scale`.

If both width and height scale the same way, then:

Visible area ∝ scale^2

That means the area changes like a parabola y = x^2

| scale | width | height | area (width×height) | relative area         |
| ----- | ----- | ------ | ------------------- | --------------------- |
| 1     | 1     | 1      | 1                   | 1× (normal view)      |
| 0.5   | 0.5   | 0.5    | 0.25                | ¼ as much (zoomed in) |
| 0.1   | 0.1   | 0.1    | 0.01                | 1/100 area (tiny!)    |
| 2     | 2     | 2      | 4                   | 4× area (huge)        |
| 3     | 3     | 3      | 9                   | 9× area (even huger)  |

### What your eyes feel?

#### Case A: `scale < 1`

When you scroll to smaller values (zoom in):

- The width shrinks linearly,
- but the area shrinks quadratically.

That means you lose visible area very fast.
So with a tiny movement of the wheel, suddenly the screen is too zoomed in — that’s what “squashes too much” means.

It’s hard to “fine-tune” the zoom-in because it jumps from “a bit zoomed” to “super close” very quickly.

#### Case B: `scale > 1`

When you scroll to larger values (zoom out):

- The width grows linearly,
- but the area grows quadratically.

That means each small increase in scale makes the visible area explode — you suddenly see too much world.

So zoom-out feels very fast and easy, because the visible region grows rapidly.

### Why this feels unbalanced?

You can think of it like a volume knob that isn’t linear:

- The “zoom-out” half makes big jumps,
- The “zoom-in” half moves too little.

Your hand turns the wheel the same amount, but the result doesn’t feel equal — because area changes with the square of scale.

### Step 5: How scale \*\* 2 fixes it?

```js
dataBounds.left = lerp(centerX, dataBounds.left, scale ** 2);
```

| scale | scale² | relative area (~scale²² = scale⁴) |
| ----- | ------ | --------------------------------- |
| 0.5   | 0.25   | 0.25² = 0.06                      |
| 1     | 1      | 1                                 |
| 2     | 4      | 4² = 16                           |

- For small numbers (<1): squaring makes them even smaller → zoom-in gets stronger and feels more natural.

- For large numbers (>1): squaring makes them larger but the `lerp` proportion makes growth feel slower (balanced).
