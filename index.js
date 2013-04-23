function fill(fromctx, toctx, n, options) {
    options = options || {};

    var w = fromctx.canvas.width,
        h = fromctx.canvas.height;

    toctx = (fromctx === toctx) ? fromctx : toctx;

    toctx.fillStyle = options.fillStyle || '#f0f';
    toctx.globalAlpha = options.alpha || 1;

    var data = fromctx.getImageData(0, 0, w, h).data,
        queue = [];

    for (var ix = 0, l = data.length; ix < l; ix += 4) {
        var r = data[ix + 0],
            g = data[ix + 1],
            b = data[ix + 2];
        if (!options.onto || (options.onto[0] == r &&
            options.onto[1] == g && options.onto[2] == b)) {
            queue.push(ix);
        }
    }

    if (n > queue.length && options.noOverlap) {
        throw new Error('not enough space for points');
    }

    for (var i = 0; i < n && queue.length; i++) {
        var place = Math.floor(Math.random() * queue.length),
            pos = queue.splice(place, 1),
            pos_w = ~~((pos % (w * 4)) / 4),
            pos_h = Math.floor(pos / (w * 4));
        toctx.fillRect(pos_w, pos_h, 1, 1);
    }
}
