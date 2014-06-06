/*global window, document*/
"use strict";

window.define(['overlay', 'shadow_canvas'], function (overlay,  shadow) {
    var ret = {},
        priv = {},
        debug = true,
        v = document.getElementById('video'),
        ticks = 0,
        p = overlay.detector.ctx.createImageData(1, 1),
        settings;

    function Settings() {
        this.fudge = 0.06;
        this.skip = 3;
    }


    settings = new Settings();

    ret.settings = settings;

    p.data[0] = 0;
    p.data[1] = 255;
    p.data[2] = 0;
    p.data[3] = 255;

    priv.do_debug = function (func) {
        if (debug) {
            if (ticks % 10 === 0) {
                func();
            }
        }
    };

    // console.time('detector');
    ret.detect = function (color_array) {
        if (debug) {
            ticks = ticks + 1;
        }

        // priv.do_debug(function () { console.time('detect'); });

        if (color_array) {
            (function () {
                var x = 0,
                    y = 0,
                    match = true,
                    count = 0,
                    x_sum = 0,
                    y_sum = 0,
                    i,
                    diff;

                // priv.do_debug(function () { console.time('load'); });
                shadow.load_data();
                // priv.do_debug(function () { console.timeEnd('load'); });

                // var myWorker = new Worker("worker.js");
                // myWorker.onmessage = function (oEvent) {
                //     console.log("Called back by the worker!\n");
                // };

                // priv.do_debug(function () { console.time('loop'); });
                for (x = 0; x < v.videoWidth; x = x + settings.skip) {
                    for (y = 0; y < v.videoHeight; y = y + settings.skip) {
                        match = true;
                        // dont check alpha
                        for (i = 0; i < 4; i = i + 1) {
                            diff = Math.abs(shadow.get_pixel_color_fast(x, y, i) - color_array[i]) / 255;
                            if (diff > settings.fudge) {
                                match = false;
                                break;
                            }
                        }

                        if (match) {
                            overlay.detector.ctx.putImageData(p, x, y);
                            count += 1;
                            x_sum += x;
                            y_sum += y;
                        }
                    }
                }
                // priv.do_debug(function () { console.timeEnd('loop'); });

                ret.last_run_data = {
                    count: count,
                    x_sum: x_sum,
                    y_sum: y_sum
                };

                // priv.do_debug(function () { console.timeEnd('detect'); });
            }());
        }
    };

    return ret;
});
