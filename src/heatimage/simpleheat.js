/*
Copyright (c) 2015, Vladimir Agafonkin
All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are
permitted provided that the following conditions are met:

   1. Redistributions of source code must retain the above copyright notice, this list of
      conditions and the following disclaimer.

   2. Redistributions in binary form must reproduce the above copyright notice, this list
      of conditions and the following disclaimer in the documentation and/or other materials
      provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR
TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

'use strict';

if (typeof module !== 'undefined') module.exports = simpleheat;

function simpleheat(canvas, defaultGradientName) {
    if (!(this instanceof simpleheat)) return new simpleheat(canvas, defaultGradientName);

    this._canvas = canvas = typeof canvas === 'string' ? document.getElementById(canvas) : canvas;

    this._ctx = canvas.getContext('2d');
    this._width = canvas.width;
    this._height = canvas.height;

    this._max = 1;
    this._data = [];
    this._defaultGradientName = defaultGradientName;
}

simpleheat.prototype = {

    defaultRadius: 25,

    defaultGradientName: 'darkGreen',

    defaultGradients: {
        // Many of the palettes listed bellow were extracted from
        // https://docs.microsoft.com/en-us/bingmaps/v8-web-control/map-control-concepts/heat-map-module-examples/heat-map-color-gradients
        'Black Aqua White': {
            0: 'Black',
            0.5: 'Aqua',
            1: 'White'
        },
        'Blue Red': {
            0.0: 'blue',
            1: 'red'
        },
        'Dark Green': {
            0.1: '#ecf7ee',
            0.2: '#b9dec0',
            0.4: '#b9dec0',
            0.5: '#64a171',
            0.6: '#437e4f',
            0.7: '#275731',
            0.8: '#102c16',
            1.0: '#000000',
        },
        'Deep Sea': {
            0.0: 'rgb(0, 0, 0)',
            0.6: 'rgb(24, 53, 103)',
            0.75: 'rgb(46, 100, 158)',
            0.9: 'rgb(23, 173, 203)',
            1.0: 'rgb(0, 250, 250)'
        },
        'Color Spectrum': {
            0: 'Navy',
            0.25: 'Blue',
            0.5: 'Green',
            0.75: 'Yellow',
            1: 'Red'
        },
        'Incandescent': {
            0: 'Black',
            0.33: 'DarkRed',
            0.66: 'Yellow',
            1: 'White'
        },
        'Heated Metal': {
            0: 'Black',
            0.4: 'Purple',
            0.6: 'Red',
            0.8: 'Yellow',
            1: 'White'
        },
        'Sunrise': {
            0: 'Red',
            0.66: 'Yellow',
            1: 'White'
        },
        'Stepped Colors': {
            0: 'Navy',
            0.25: 'Navy',
            0.26: 'Green',
            0.5: 'Green',
            0.51: 'Yellow',
            0.75: 'Yellow',
            0.76: 'Red',
            1: 'Red'
        },
        'Visible Spectrum': {
            0.00: 'rgb(255,0,255)',
            0.25: 'rgb(0,0,255)',
            0.50: 'rgb(0,255,0)',
            0.75: 'rgb(255,255,0)',
            1.00: 'rgb(255,0,0)'
        }
    },

    data: function (data) {
        this._data = data;
        return this;
    },

    max: function (max) {
        this._max = max;
        return this;
    },

    add: function (point) {
        this._data.push(point);
        return this;
    },

    clear: function () {
        this._data = [];
        return this;
    },

    radius: function (r, blur) {
        blur = blur === undefined ? 15 : blur;

        // create a grayscale blurred circle image that we'll use for drawing points
        var circle = this._circle = this._createCanvas(),
            ctx = circle.getContext('2d'),
            r2 = this._r = r + blur;

        circle.width = circle.height = r2 * 2;

        ctx.shadowOffsetX = ctx.shadowOffsetY = r2 * 2;
        ctx.shadowBlur = blur;
        ctx.shadowColor = 'black';

        ctx.beginPath();
        ctx.arc(-r2, -r2, r, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();

        return this;
    },

    resize: function () {
        this._width = this._canvas.width;
        this._height = this._canvas.height;
    },

    gradient: function (grad) {
        // create a 256x1 gradient that we'll use to turn a grayscale heatmap into a colored one
        var canvas = this._createCanvas(),
            ctx = canvas.getContext('2d'),
            gradient = ctx.createLinearGradient(0, 0, 0, 256);

        canvas.width = 1;
        canvas.height = 256;

        for (var i in grad) {
            gradient.addColorStop(+i, grad[i]);
        }

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 1, 256);

        this._grad = ctx.getImageData(0, 0, 1, 256).data;

        return this;
    },

    draw: function (minOpacity) {
        if (!this._circle) this.radius(this.defaultRadius);
        if (!this._grad) this.gradient(this.defaultGradients[this._defaultGradientName]);

        var ctx = this._ctx;

        ctx.clearRect(0, 0, this._width, this._height);

        // draw a grayscale heatmap by putting a blurred circle at each data point
        for (var i = 0, len = this._data.length, p; i < len; i++) {
            p = this._data[i];
            ctx.globalAlpha = Math.max(p[2] / this._max, minOpacity === undefined ? 0.05 : minOpacity);
            ctx.drawImage(this._circle, p[0] - this._r, p[1] - this._r);
        }

        // colorize the heatmap, using opacity value of each pixel to get the right color from our gradient
        var colored = ctx.getImageData(0, 0, this._width, this._height);
        this._colorize(colored.data, this._grad);
        ctx.putImageData(colored, 0, 0);

        return this;
    },

    _colorize: function (pixels, gradient) {
        for (var i = 0, len = pixels.length, j; i < len; i += 4) {
            j = pixels[i + 3] * 4; // get gradient color from opacity value

            if (j) {
                pixels[i] = gradient[j];
                pixels[i + 1] = gradient[j + 1];
                pixels[i + 2] = gradient[j + 2];
            }
        }
    },

    _createCanvas: function () {
        if (typeof document !== 'undefined') {
            return document.createElement('canvas');
        } else {
            // create a new canvas instance in node.js
            // the canvas class needs to have a default constructor without any parameter
            return new this._canvas.constructor();
        }
    }
};
