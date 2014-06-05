/*global window, document*/
"use strict";
window.define([], function () {
    var ret = {},
        priv = {};

    ret.video = {};
    ret.video.canvas = document.createElement('canvas');
    ret.video.ctx = ret.video.canvas.getContext('2d');
    ret.video.load_data = function () {
        priv.data = ret.video.ctx.getImageData(0, 0, ret.video.canvas.width, ret.video.canvas.height);
        ret.video.shadow_data = priv.data;
    };
    ret.video.get_pixel_color_fast = function (x, y, i) {
        return priv.data.data[((y * (ret.video.canvas.width * 4)) + (x * 4)) + i];
    };
    ret.video.get_pixel_color = function (x, y) {
        return ret.video.ctx.getImageData(x, y, 1, 1).data;
    };

    ret.detector = {};
    ret.detector.canvas = document.createElement('canvas');
    ret.detector.ctx = ret.detector.canvas.getContext('2d');
    ret.detector.shadow_data = ret.detector.ctx.getImageData(0, 0, 640, 480);

    return ret;
});