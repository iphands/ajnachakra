/*global window, document*/
"use strict";

window.define(['overlay', 'shadow_canvas'], function (overlay, shadow) {
    var funcs = {},
        ret = {};

    funcs.setPixel = function (imageData, x, y, r, g, b) {
        var index = (x + y * imageData.width) * 4;
        imageData.data[index] = r;
        imageData.data[index + 1] = g;
        imageData.data[index + 2] = b;
        imageData.data[index + 3] = 255;
    };

    funcs.array_to_style = function (array) {
        ret.color_array = array;
        return 'rgba(' +
            array[0] + ',' +
            array[1] + ',' +
            array[2] + ',' +
            array[3] + ')';
    };

    overlay.gui.overlay.onclick = function (e) {
        var x = e.offsetX,
            y = e.offsetY,
            color_array = shadow.video.get_pixel_color(x, y);

        overlay.gui.ctx.rect(30, 30, 30, 30);
        overlay.gui.ctx.strokeStyle = 'rgb(255,255,255,255)';
        overlay.gui.ctx.fillStyle = funcs.array_to_style(color_array);
        overlay.gui.ctx.fill();
        overlay.gui.ctx.stroke();
    };

    return ret;
});
