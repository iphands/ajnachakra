/*global window, document*/
"use strict";

window.define(['detector', 'overlay'], function (detector, overlay) {
    var ret = {},
        size = 5,
        half = size / 2;

    ret.draw = function () {
        var x = detector.last_run_data.x_sum / detector.last_run_data.count,
            y = detector.last_run_data.y_sum / detector.last_run_data.count;

        overlay.detector.ctx.beginPath();
        overlay.detector.ctx.fillStyle = 'rgba(255,0,0,0.4)';

        overlay.detector.ctx.rect(0, y - half, overlay.detector.overlay.width, size);
        overlay.detector.ctx.rect(x - half, 0, size, overlay.detector.overlay.height);

        overlay.detector.ctx.fill();
    };

    return ret;
});