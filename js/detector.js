/*global window, document*/
"use strict";

window.define(['overlay', 'shadow_canvas'], function (overlay,  shadow) {
    var ret = {},
        skip = 2,
        fudge = 0.06,
        debug = false,
        v = document.getElementById('video'),
        ticks = 0,
        p = overlay.ctx.createImageData(1, 1);

    p.data[0] = 0;
    p.data[1] = 255;
    p.data[2] = 0;
    p.data[3] = 255;

    ret.detect = function (color_array) {
        if (debug) {
            if (ticks % 10 === 0) {
                console.log(color_array);
            }
            ticks = ticks + 1;
        }

        if (color_array) {
            (function () {
                var x = 0, y = 0, i, diff, match = true;
                shadow.load_data();

                for (x = 0; x < v.videoWidth; x = x + skip) {
                    for (y = 0; y < v.videoHeight; y = y + skip) {
                        match = true;
                        // dont check alpha
                        for (i = 0; i < 4; i = i + 1) {
                            diff = Math.abs(shadow.get_pixel_color_fast(x, y, i) - color_array[i]) / 255;
                            if (diff > fudge) {
                                match = false;
                                break;
                            }
                        }

                        if (match) {
                            overlay.ctx.putImageData(p, x, y);
                            // count++;
                            // xSum += x;
                            // ySum += y;
                        }
                    }
                }
            }());
        }

    };

    return ret;
});
