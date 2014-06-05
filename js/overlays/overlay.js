/*global window, document*/
"use strict";

window.define([], function () {
    var ret = {};
    ret.detector = {};
    ret.gui = {};


    ret.detector.clear = function () {
        ret.detector.ctx.clearRect(0, 0, ret.detector.overlay.width, ret.detector.overlay.height);
    };

    ret.detector.overlay = document.getElementById('overlay-detector');
    ret.detector.ctx = ret.detector.overlay.getContext('2d');
    ret.detector.img_data = ret.detector.ctx.createImageData(ret.detector.overlay.width, ret.detector.overlay.height);

    ret.gui.overlay = document.getElementById('overlay-gui');
    ret.gui.ctx = ret.gui.overlay.getContext('2d');
    // ret.gui.img_data = ret.gui.ctx.createImageData(ret.gui.overlay.width, ret.gui.overlay.height);
    ret.gui.img_data = ret.gui.ctx.createImageData(640, 480);

    // ret.detector.overlay = document.getElementById('canvas');
    // ret.detector.overlay.width = 640;
    // ret.detector.overlay.height = 480;
    // ret.detector.ctx = ret.gui.overlay.getContext('2d');
    // ret.detector.img_data = ret.gui.ctx.createImageData(ret.gui.overlay.width, ret.gui.overlay.height);

    return ret;
});