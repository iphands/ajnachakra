/*global document, postMessage, self*/
"use strict";

(function () {

    self.addEventListener('message', function(e) {
        var match,
            i,
            diff,
            count= 0,
            x_sum = 0,
            y_sum = 0,
            x = 0,
            y = 0,
            offset;

        for (x = 0; x < e.data.w; x = x + e.data.skip) {
            for (y = 0; y < e.data.h; y = y + e.data.skip) {
                match = true;
                // dont check alpha
                for (i = 0; i < 4; i = i + 1) {
                    diff = Math.abs(e.data.image_data.data[((y * (e.data.w * 4)) + (x * 4)) + i] - e.data.color_array[i]) / 255;
                    e.data.image_data.data[((y * (e.data.w * 4)) + (x * 4)) + i] = 5;
                    if (diff > e.data.fudge) {
                        match = false;
                        break;
                    }
                }
                if (match) {
                    // offset = ((y * (e.data.w * 4)) + (x * 4));
                    // e.data.image_data.data[offset] = 0;
                    // e.data.image_data.data[offset + 1] = 255;
                    // e.data.image_data.data[offset + 2] = 0;
                    // e.data.image_data.data[offset + 3] = 255;
                    count += 1;
                    x_sum += x;
                    y_sum += y;
                }
            }
        }

        self.postMessage({
            image_data: e.data.image_data,
            count: count,
            x_sum: x_sum,
            y_sum: y_sum
        });

        self.close();
    }, false);
}());