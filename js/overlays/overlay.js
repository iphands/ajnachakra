/*global window, document*/
"use strict";

window.define([], function () {
    var ret = {};

    ret.clear = function () {
        ret.ctx.clearRect(0, 0, 640, 480);
    };

    ret.overlay = document.getElementById('overlay');
    ret.ctx = ret.overlay.getContext('2d');
    ret.img_data = ret.ctx.createImageData(640, 480);

    return ret;
});