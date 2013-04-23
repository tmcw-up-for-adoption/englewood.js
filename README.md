# englewood.js

It's like [englewood](https://github.com/newsapps/englewood) but in Javascript
with Canvas.

```js
fill(
    // from canvas
    context,
    // to canvas
    c2,
    // number of dots
    20000, {
    // which color to look for
    onto: [255, 255, 255 - (+p.State)],
    // which color to fill
    fillStyle: '#fff'
});
```

what this means:

Right now the approach does two tricks.

The first is creating a queue of spots we can color. This means that when
you start making lots of dots, instead of searches becoming way longer when
it keeps guessing wrong, or having overlapping dots, it knows which spots
are left.

The second is that the from and to canvases can be different. So from could
be hidden and to visible, or vice-versa.

`onto` means that you can color a polygon and look for it. Here you'd want to
use the two-canvas trick.
