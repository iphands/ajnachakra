/*global window, document, Worker*/
"use strict";

window.define(['overlay', 'shadow_canvas'], function (overlay,  shadow) {
    var ret = {},
        priv = {},
        skip = 1,
        fudge = 0.04,
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
        var i = 0,
            threads = 1,
            chunk = (v.videoHeight) / threads;
        if (color_array) {
            shadow.video.load_data();
            for (i = 0; i < threads; i = i + 1) {
                // console.log("thread: " + (chunk * i) + ", " + ((chunk * i) + chunk));
                priv.start_worker((chunk * i), ((chunk * i) + chunk), v, skip, fudge, shadow, color_array);
            }
        }
    };

    priv.start_worker = function (start, stop, v, skip, fudge, shadow, color_array) {
        (function () {
            var worker = new Worker("js/worker.js");

            worker.onmessage = function (e) {
                ret.last_run_data = e.data;
                overlay.detector.ctx.putImageData(e.data.detector_data, 0, 0);
            };

            worker.postMessage({
                start: start,
                stop: stop,
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
