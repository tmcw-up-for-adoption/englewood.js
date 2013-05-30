# englewood.js

It's like [englewood](https://github.com/newsapps/englewood) but in JavaScript
with Canvas.

```js
var data = englewood.getData(canvas);

englewood.fill(
    // from canvas (or data)
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

# Getting It

Quick & Dirty:

    wget https://raw.github.com/tmcw/englewood.js/gh-pages/index.js -O englewood.js

Node or [Browserify](http://browserify.org/):

    npm install --save englewood

# How

Right now the approach does a few tricks.

### the queue

The first is creating a queue of spots we can color. This means that when
you start making lots of dots, instead of searches becoming way longer when
it keeps guessing wrong, or having overlapping dots, it knows which spots
are left.

### from canvas / to canvas

The second is that the from and to canvases can be different. So from could
be hidden and to visible, or vice-versa.

### onto color

`onto` means that you can color a polygon and look for it. Here you'd want to
use the two-canvas trick.

### reusing data

`getImageData` is an expensive call, so you can also supply an `ImageData`
instance as the first argument to `fill` instead of Context and it will skip
re-requesting image data.
