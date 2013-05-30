var englewood = {

    function getData(fromctx) {
        var w = fromctx.canvas.width,
            h = fromctx.canvas.height;

        return fromctx.getImageData(0, 0, w, h);
    }

    function fill(fromctx, toctx, n, options) {
        options = options || {};

        toctx = (fromctx === toctx) ? fromctx : toctx;

        var queue = [], w, h, data;

        if (fromctx instanceof ImageData) {
            w = fromctx.width;
            h = fromctx.height;
            data = fromctx.data;
        } else {
            w = fromctx.canvas.width;
            h = fromctx.canvas.height;
            data = fromctx.getImageData(0, 0, w, h).data;
        }

        for (var ix = 0, l = data.length; ix < l; ix += 4) {
            var r = data[ix + 0],
                g = data[ix + 1],
                b = data[ix + 2];
            if (!options.onto || (options.onto[0] == r &&
                options.onto[1] == g && options.onto[2] == b)) {
                queue.push(ix);
            }
        }

        toctx.fillStyle = options.fillStyle || '#f0f';
        toctx.globalAlpha = options.alpha || 1;

        if (n > queue.length && options.noOverlap) {
            throw new Error('not enough space for points');
        }

        for (var i = 0; i < n && queue.length; i++) {
            var place = Math.floor(Math.random() * queue.length),
                pos = queue.splice(place, 1),
                pos_w = ~~((pos % (w * 4)) / 4),
                pos_h = Math.floor(pos / (w * 4));
            toctx.rect(pos_w, pos_h, 1, 1);
        }

        toctx.fill();
        toctx.beginPath();
    }

    return {
        getData: getData,
        fill: fill
    };

};