/*global window, document*/
"use strict";
window.define([], function () {
    var ret = {},
        priv = {};

    ret.canvas = document.createElement('canvas');
    ret.width4 = ret.canvas.width * 4;
    ret.ctx = ret.canvas.getContext('2d');

    ret.load_data = function () {
        priv.data = ret.ctx.getImageData(0, 0, ret.canvas.width, ret.canvas.height);
    };

    ret.get_pixel_color_fast = function (x, y, i) {
        return priv.data.data[((y * (ret.canvas.w4)) + (x * 4)) + i];
    };

    ret.get_pixel_color = function (x, y) {
        return ret.ctx.getImageData(x, y, 1, 1).data;
    };

    return ret;
});