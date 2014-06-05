/*global require*/
"use strict";

require.config({
    paths: {
        start: 'test',
        shadow_canvas: 'shadow_canvas',
        detector: "detector",
        jquery: 'vendor/jquery/dist/jquery.min',
        domReady: 'vendor/domReady/domReady',
        picker: 'overlays/picker',
        overlay: 'overlays/overlay',
        cross_hairs: 'overlays/cross_hairs'
    }
});

require(['start'], function (start) {
    start.init();
});
