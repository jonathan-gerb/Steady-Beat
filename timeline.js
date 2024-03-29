/*! wavesurfer.js 1.0.57 (Thu, 25 Feb 2016 17:09:20 GMT)
 * https://github.com/katspaugh/wavesurfer.js
 * @license CC-BY-3.0 */
! function(a, b) { "function" == typeof define && define.amd ? define(["wavesurfer"], function(a) {
        return b(a) }) : "object" == typeof exports ? module.exports = b(require("wavesurfer.js")) : b(WaveSurfer) }(this, function(a) { "use strict";
    a.Timeline = { init: function(a) { this.params = a;
            var b = this.wavesurfer = a.wavesurfer;
            if (!this.wavesurfer) throw Error("No WaveSurfer intance provided");
            var c = this.drawer = this.wavesurfer.drawer;
            if (this.container = "string" == typeof a.container ? document.querySelector(a.container) : a.container, !this.container) throw Error("No container for WaveSurfer timeline");
            this.width = c.width, this.height = this.params.height || 20, this.notchPercentHeight = this.params.notchPercentHeight || 90, this.primaryColor = this.params.primaryColor || "#000", this.secondaryColor = this.params.secondaryColor || "#c0c0c0", this.primaryFontColor = this.params.primaryFontColor || "#000", this.secondaryFontColor = this.params.secondaryFontColor || "#000", this.fontFamily = this.params.fontFamily || "Arial", this.fontSize = this.params.fontSize || 10, this.timeInterval = this.params.timeInterval, this.primaryLabelInterval = this.params.primaryLabelInterval, this.secondaryLabelInterval = this.params.secondaryLabelInterval, this.formatTimeCallback = this.params.formatTimeCallback, this.createWrapper(), this.createCanvas(), this.render(), b.drawer.wrapper.onscroll = this.updateScroll.bind(this), b.on("redraw", this.render.bind(this)), b.on("destroy", this.destroy.bind(this)) }, destroy: function() { this.unAll(), this.wrapper && this.wrapper.parentNode && (this.wrapper.parentNode.removeChild(this.wrapper), this.wrapper = null) }, createWrapper: function() {
            var a = this.container.querySelector("timeline");
            a && this.container.removeChild(a);
            var b = this.wavesurfer.params;
            this.wrapper = this.container.appendChild(document.createElement("timeline")), this.drawer.style(this.wrapper, { display: "block", position: "relative", userSelect: "none", webkitUserSelect: "none", height: this.height + "px" }), (b.fillParent || b.scrollParent) && this.drawer.style(this.wrapper, { width: "100%", overflowX: "hidden", overflowY: "hidden" });
            var c = this;
            this.wrapper.addEventListener("click", function(a) { a.preventDefault();
                var b = "offsetX" in a ? a.offsetX : a.layerX;
                c.fireEvent("click", b / c.wrapper.scrollWidth || 0) }) }, createCanvas: function() {
            var a = this.canvas = this.wrapper.appendChild(document.createElement("canvas"));
            this.timeCc = a.getContext("2d"), this.wavesurfer.drawer.style(a, { position: "absolute", zIndex: 4 }) }, render: function() { this.updateCanvasStyle(), this.drawTimeCanvas() }, updateCanvasStyle: function() {
            var a = this.drawer.wrapper.scrollWidth;
            this.canvas.width = a * this.wavesurfer.params.pixelRatio, this.canvas.height = this.height * this.wavesurfer.params.pixelRatio, this.canvas.style.width = a + "px", this.canvas.style.height = this.height + "px" }, drawTimeCanvas: function() {
            var a = this.wavesurfer.backend,
                b = this.wavesurfer.params,
                c = a.getDuration(),
                d = this;
            if (b.fillParent && !b.scrollParent) var e = this.drawer.getWidth();
            else e = this.drawer.wrapper.scrollWidth * b.pixelRatio;
            var f = e / c;
            if (c > 0) {
                var g = 0,
                    h = 0,
                    i = parseInt(c, 10) + 1,
                    j = function(a) {
                        if ("function" == typeof d.formatTimeCallback) return d.formatTimeCallback(a);
                        if (a / 60 > 1) {
                            var b = parseInt(a / 60),
                                a = parseInt(a % 60);
                            return a = 10 > a ? "0" + a : a, "" + b + ":" + a }
                        return a };
                if (1 * f >= 25) var k = 1,
                    l = 10,
                    m = 5;
                else if (5 * f >= 25) var k = 5,
                    l = 6,
                    m = 2;
                else if (15 * f >= 25) var k = 15,
                    l = 4,
                    m = 2;
                else var k = 60,
                    l = 4,
                    m = 2;
                k = this.timeInterval || k, l = this.primaryLabelInterval || l, m = this.secondaryLabelInterval || m;
                for (var n = this.height - 4, o = this.height * (this.notchPercentHeight / 100) - 4, p = this.fontSize * b.pixelRatio, q = 0; i / k > q; q++) q % l == 0 ? (this.timeCc.fillStyle = this.primaryColor, this.timeCc.fillRect(g, 0, 1, n), this.timeCc.font = p + "px " + this.fontFamily, this.timeCc.fillStyle = this.primaryFontColor, this.timeCc.fillText(j(h), g + 5, n)) : q % m == 0 ? (this.timeCc.fillStyle = this.secondaryColor, this.timeCc.fillRect(g, 0, 1, n), this.timeCc.font = p + "px " + this.fontFamily, this.timeCc.fillStyle = this.secondaryFontColor, this.timeCc.fillText(j(h), g + 5, n)) : (this.timeCc.fillStyle = this.secondaryColor, this.timeCc.fillRect(g, 0, 1, o)), h += k, g += f * k } }, updateScroll: function() { this.wrapper.scrollLeft = this.drawer.wrapper.scrollLeft } }, a.util.extend(a.Timeline, a.Observer) }), ! function(a, b) { "function" == typeof define && define.amd ? define(["wavesurfer"], function(a) {
        return b(a) }) : "object" == typeof exports ? module.exports = b(require("wavesurfer.js")) : b(WaveSurfer) }(this, function(a) { "use strict";
    a.Timeline = { init: function(a) { this.params = a;
            var b = this.wavesurfer = a.wavesurfer;
            if (!this.wavesurfer) throw Error("No WaveSurfer intance provided");
            var c = this.drawer = this.wavesurfer.drawer;
            if (this.container = "string" == typeof a.container ? document.querySelector(a.container) : a.container, !this.container) throw Error("No container for WaveSurfer timeline");
            this.width = c.width, this.height = this.params.height || 20, this.notchPercentHeight = this.params.notchPercentHeight || 90, this.primaryColor = this.params.primaryColor || "#000", this.secondaryColor = this.params.secondaryColor || "#c0c0c0", this.primaryFontColor = this.params.primaryFontColor || "#000", this.secondaryFontColor = this.params.secondaryFontColor || "#000", this.fontFamily = this.params.fontFamily || "Arial", this.fontSize = this.params.fontSize || 10, this.timeInterval = this.params.timeInterval, this.primaryLabelInterval = this.params.primaryLabelInterval, this.secondaryLabelInterval = this.params.secondaryLabelInterval, this.formatTimeCallback = this.params.formatTimeCallback, this.createWrapper(), this.createCanvas(), this.render(), b.drawer.wrapper.onscroll = this.updateScroll.bind(this), b.on("redraw", this.render.bind(this)), b.on("destroy", this.destroy.bind(this)) }, destroy: function() { this.unAll(), this.wrapper && this.wrapper.parentNode && (this.wrapper.parentNode.removeChild(this.wrapper), this.wrapper = null) }, createWrapper: function() {
            var a = this.container.querySelector("timeline");
            a && this.container.removeChild(a);
            var b = this.wavesurfer.params;
            this.wrapper = this.container.appendChild(document.createElement("timeline")), this.drawer.style(this.wrapper, { display: "block", position: "relative", userSelect: "none", webkitUserSelect: "none", height: this.height + "px" }), (b.fillParent || b.scrollParent) && this.drawer.style(this.wrapper, { width: "100%", overflowX: "hidden", overflowY: "hidden" });
            var c = this;
            this.wrapper.addEventListener("click", function(a) { a.preventDefault();
                var b = "offsetX" in a ? a.offsetX : a.layerX;
                c.fireEvent("click", b / c.wrapper.scrollWidth || 0) }) }, createCanvas: function() {
            var a = this.canvas = this.wrapper.appendChild(document.createElement("canvas"));
            this.timeCc = a.getContext("2d"), this.wavesurfer.drawer.style(a, { position: "absolute", zIndex: 4 }) }, render: function() { this.updateCanvasStyle(), this.drawTimeCanvas() }, updateCanvasStyle: function() {
            var a = this.drawer.wrapper.scrollWidth;
            this.canvas.width = a * this.wavesurfer.params.pixelRatio, this.canvas.height = this.height * this.wavesurfer.params.pixelRatio, this.canvas.style.width = a + "px", this.canvas.style.height = this.height + "px" }, drawTimeCanvas: function() {
            var a = this.wavesurfer.backend,
                b = this.wavesurfer.params,
                c = a.getDuration(),
                d = this;
            if (b.fillParent && !b.scrollParent) var e = this.drawer.getWidth();
            else e = this.drawer.wrapper.scrollWidth * b.pixelRatio;
            var f = e / c;
            if (c > 0) {
                var g = 0,
                    h = 0,
                    i = parseInt(c, 10) + 1,
                    j = function(a) {
                        if ("function" == typeof d.formatTimeCallback) return d.formatTimeCallback(a);
                        if (a / 60 > 1) {
                            var b = parseInt(a / 60),
                                a = parseInt(a % 60);
                            return a = 10 > a ? "0" + a : a, "" + b + ":" + a }
                        return a };
                if (1 * f >= 25) var k = 1,
                    l = 10,
                    m = 5;
                else if (5 * f >= 25) var k = 5,
                    l = 6,
                    m = 2;
                else if (15 * f >= 25) var k = 15,
                    l = 4,
                    m = 2;
                else var k = 60,
                    l = 4,
                    m = 2;
                k = this.timeInterval || k, l = this.primaryLabelInterval || l, m = this.secondaryLabelInterval || m;
                for (var n = this.height - 4, o = this.height * (this.notchPercentHeight / 100) - 4, p = this.fontSize * b.pixelRatio, q = 0; i / k > q; q++) q % l == 0 ? (this.timeCc.fillStyle = this.primaryColor, this.timeCc.fillRect(g, 0, 1, n), this.timeCc.font = p + "px " + this.fontFamily, this.timeCc.fillStyle = this.primaryFontColor, this.timeCc.fillText(j(h), g + 5, n)) : q % m == 0 ? (this.timeCc.fillStyle = this.secondaryColor, this.timeCc.fillRect(g, 0, 1, n), this.timeCc.font = p + "px " + this.fontFamily, this.timeCc.fillStyle = this.secondaryFontColor, this.timeCc.fillText(j(h), g + 5, n)) : (this.timeCc.fillStyle = this.secondaryColor, this.timeCc.fillRect(g, 0, 1, o)), h += k, g += f * k } }, updateScroll: function() { this.wrapper.scrollLeft = this.drawer.wrapper.scrollLeft } }, a.util.extend(a.Timeline, a.Observer) });
