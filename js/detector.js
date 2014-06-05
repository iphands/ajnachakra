/*global window, document, Worker*/
"use strict";

window.define(['overlay', 'shadow_canvas'], function (overlay,  shadow) {
    var ret = {},
        priv = {},
        skip = 1,
        fudge = 0.08,
        debug = true,
        v = document.getElementById('video'),
        ticks = 0,
        p = overlay.detector.ctx.createImageData(1, 1);

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
                shadow.video.load_data();
                priv.start_worker(v, skip, fudge, shadow, color_array);
            }());
        }
    };

    priv.start_worker = function (v, skip, fudge, shadow, color_array) {
        (function () {
            var worker = new Worker("js/worker.js");

            worker.onmessage = function (e) {
                ret.last_run_data = e.data;
                // console.log(e.data.image_data.data[0]);
                overlay.detector.ctx.putImageData(e.data.detector_data, 0, 0);
                // overlay.gui.ctx.putImageData(e.data.detector_data, 0, 0);
            };

            worker.postMessage({
                color_array: color_array,
                w: v.videoWidth,
                h: v.videoHeight,
                skip: skip,
                shadow_data: shadow.video.shadow_data,
                detector_data: shadow.detector.shadow_data,
                fudge: fudge
            });
        }());
    };

    return ret;
});
