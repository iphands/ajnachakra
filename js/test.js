/*global window, document, navigator, define*/

define([], function () {
    "use strict";

    var pub = {},
        c;

    pub.init_video = function () {
        var video = document.querySelector("#video");

        // compat
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;

        function handleVideo(stream) {
            video.src = window.URL.createObjectURL(stream);
        }

        function videoError(e) {
            // do something
            window.console.log('error in init: ' + e);
            throw e;
        }

        if (navigator.getUserMedia) {
            navigator.getUserMedia({video: true}, handleVideo, videoError);
        }
    };

    pub.init_canvas = function (canvas) {
        var v,
            overlay = document.getElementById('overlay-gui'),
            context,
            ret = {};

        ret.draw = function () {
            if (v.paused || v.ended) {
                return false;
            }
            context.drawImage(v, 0, 0);
            return true;
        };


        v = document.getElementById('video');
        context = canvas.getContext('2d');

        v.addEventListener('loadedmetadata', function () {
            canvas.width = v.videoWidth;
            canvas.height = v.videoHeight;

            overlay.width = v.videoWidth;
            overlay.height = v.videoHeight;

            document.getElementById('overlay-detector').width = v.videoWidth;
            document.getElementById('overlay-detector').height = v.videoHeight;
        });

        ret.draw();
        return ret;
    };



    window.require(['picker', 'shadow_canvas', 'detector', 'overlay'], function (picker, shadow, detector, overlay) {
        function do_frame() {
            if (picker.color_array) {
                overlay.detector.clear();
                detector.detect(picker.color_array);
            }
            c.draw();
            window.requestAnimationFrame(do_frame);
        }
        pub.init_video();
        c = pub.init_canvas(shadow.canvas);
        window.requestAnimationFrame(do_frame);
    });

});
