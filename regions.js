/*! wavesurfer.js 1.1.2 (Sun, 15 May 2016 09:37:59 GMT)
 * https://github.com/katspaugh/wavesurfer.js
 * @license CC-BY-3.0 */
! function(a, b) {
    "function" == typeof define && define.amd ? define(["wavesurfer"], function(a) {
        return b(a)
    }) : "object" == typeof exports ? module.exports = b(require("wavesurfer.js")) : b(WaveSurfer)
}(this, function(a) {
    "use strict";
    a.Regions = {
        init: function(a) { this.wavesurfer = a, this.wrapper = this.wavesurfer.drawer.wrapper, this.list = {} },
        add: function(b) {
            var c = Object.create(a.Region);
            return c.init(b, this.wavesurfer), this.list[c.id] = c, c.on("remove", function() { delete this.list[c.id] }.bind(this)), c
        },
        clear: function() { Object.keys(this.list).forEach(function(a) { this.list[a].remove() }, this) },
        enableDragSelection: function(a) {
            function b(a) { e = !0, "undefined" != typeof a.targetTouches && 1 === a.targetTouches.length && (a.clientX = a.targetTouches[0].clientX), f = h.wavesurfer.drawer.handleEvent(a), g = null }

            function c(a) { e = !1, g && (g.fireEvent("update-end", a), h.wavesurfer.fireEvent("region-update-end", g, a)), g = null }

            function d(b) {
                if (e) {
                    g || (g = h.add(a || {}));
                    var c = h.wavesurfer.getDuration();
                    "undefined" != typeof b.targetTouches && 1 === b.targetTouches.length && (b.clientX = b.targetTouches[0].clientX);
                    var d = h.wavesurfer.drawer.handleEvent(b);
                    g.update({ start: Math.min(d * c, f * c), end: Math.max(d * c, f * c) })
                }
            }
            var e, f, g, h = this;
            this.wrapper.addEventListener("mousedown", b), this.wrapper.addEventListener("touchstart", b), this.on("disable-drag-selection", function() { h.wrapper.removeEventListener("touchstart", b), h.wrapper.removeEventListener("mousedown", b) }), this.wrapper.addEventListener("mouseup", c), this.wrapper.addEventListener("touchend", c), this.on("disable-drag-selection", function() { h.wrapper.removeEventListener("touchend", c), h.wrapper.removeEventListener("mouseup", c) }), this.wrapper.addEventListener("mousemove", d), this.wrapper.addEventListener("touchmove", d), this.on("disable-drag-selection", function() { h.wrapper.removeEventListener("touchmove", d), h.wrapper.removeEventListener("mousemove", d) })
        },
        disableDragSelection: function() { this.fireEvent("disable-drag-selection") }
    }, a.util.extend(a.Regions, a.Observer), a.Region = {
        style: a.Drawer.style,
        init: function(b, c) { this.wavesurfer = c, this.wrapper = c.drawer.wrapper, this.id = null == b.id ? a.util.getId() : b.id, this.start = Number(b.start) || 0, this.end = null == b.end ? this.start + 4 / this.wrapper.scrollWidth * this.wavesurfer.getDuration() : Number(b.end), this.resize = void 0 === b.resize ? !0 : Boolean(b.resize), this.drag = void 0 === b.drag ? !0 : Boolean(b.drag), this.loop = Boolean(b.loop), this.color = b.color || "rgba(0, 0, 0, 0.1)", this.data = b.data || {}, this.attributes = b.attributes || {}, this.maxLength = b.maxLength, this.minLength = b.minLength, this.bindInOut(), this.render(), this.wavesurfer.on("zoom", this.updateRender.bind(this)), this.wavesurfer.fireEvent("region-created", this) },
        update: function(a) { null != a.start && (this.start = Number(a.start)), null != a.end && (this.end = Number(a.end)), null != a.loop && (this.loop = Boolean(a.loop)), null != a.color && (this.color = a.color), null != a.data && (this.data = a.data), null != a.resize && (this.resize = Boolean(a.resize)), null != a.drag && (this.drag = Boolean(a.drag)), null != a.maxLength && (this.maxLength = Number(a.maxLength)), null != a.minLength && (this.minLength = Number(a.minLength)), null != a.attributes && (this.attributes = a.attributes), this.updateRender(), this.fireEvent("update"), this.wavesurfer.fireEvent("region-updated", this) },
        remove: function() { this.element && (this.wrapper.removeChild(this.element), this.element = null, this.fireEvent("remove"), this.wavesurfer.un("zoom", this.updateRender.bind(this)), this.wavesurfer.fireEvent("region-removed", this)) },
        play: function() { this.wavesurfer.play(this.start, this.end), this.fireEvent("play"), this.wavesurfer.fireEvent("region-play", this) },
        playLoop: function() { this.play(), this.once("out", this.playLoop.bind(this)) },
        render: function() {
            var a = document.createElement("region");
            a.className = "wavesurfer-region", a.title = this.formatTime(this.start, this.end), a.setAttribute("data-id", this.id);
            for (var b in this.attributes) a.setAttribute("data-region-" + b, this.attributes[b]);
            this.wrapper.scrollWidth;
            if (this.style(a, { position: "absolute", zIndex: 2, height: "100%", top: "0px" }), this.resize) {
                var c = a.appendChild(document.createElement("handle")),
                    d = a.appendChild(document.createElement("handle"));
                c.className = "wavesurfer-handle wavesurfer-handle-start", d.className = "wavesurfer-handle wavesurfer-handle-end";
                var e = { cursor: "col-resize", position: "absolute", left: "0px", top: "0px", width: "1%", maxWidth: "4px", height: "100%" };
                this.style(c, e), this.style(d, e), this.style(d, { left: "100%" })
            }
            this.element = this.wrapper.appendChild(a), this.updateRender(), this.bindEvents(a)
        },
        formatTime: function(a, b) {
            return (a == b ? [a] : [a, b]).map(function(a) {
                return [Math.floor(a % 3600 / 60), ("00" + Math.floor(a % 60)).slice(-2)].join(":")
            }).join("-")
        },
        updateRender: function(a) {
            var b, c = this.wavesurfer.getDuration();
            if (b = a ? Math.round(this.wavesurfer.getDuration() * a) : this.wrapper.scrollWidth, this.start < 0 && (this.start = 0, this.end = this.end - this.start), this.end > c && (this.end = c, this.start = c - (this.end - this.start)), null != this.minLength && (this.end = Math.max(this.start + this.minLength, this.end)), null != this.maxLength && (this.end = Math.min(this.start + this.maxLength, this.end)), null != this.element) {
                this.style(this.element, { left: ~~(this.start / c * b) + "px", width: ~~((this.end - this.start) / c * b) + "px", backgroundColor: this.color, cursor: this.drag ? "move" : "default" });
                for (var d in this.attributes) this.element.setAttribute("data-region-" + d, this.attributes[d]);
                this.element.title = this.formatTime(this.start, this.end)
            }
        },
        bindInOut: function() {
            var a = this;
            a.firedIn = !1, a.firedOut = !1;
            var b = function(b) {!a.firedOut && a.firedIn && (a.start >= Math.round(100 * b) / 100 || a.end <= Math.round(100 * b) / 100) && (a.firedOut = !0, a.firedIn = !1, a.fireEvent("out"), a.wavesurfer.fireEvent("region-out", a)), !a.firedIn && a.start <= b && a.end > b && (a.firedIn = !0, a.firedOut = !1, a.fireEvent("in"), a.wavesurfer.fireEvent("region-in", a)) };
            this.wavesurfer.backend.on("audioprocess", b), this.on("remove", function() { a.wavesurfer.backend.un("audioprocess", b) }), this.on("out", function() { a.loop && a.wavesurfer.play(a.start) })
        },
        bindEvents: function() {
            var a = this;
            this.element.addEventListener("mouseenter", function(b) { a.fireEvent("mouseenter", b), a.wavesurfer.fireEvent("region-mouseenter", a, b) }), this.element.addEventListener("mouseleave", function(b) { a.fireEvent("mouseleave", b), a.wavesurfer.fireEvent("region-mouseleave", a, b) }), this.element.addEventListener("mousedown", function(b) { b.preventDefault(), a.fireEvent("mousedown", b), a.wavesurfer.fireEvent("region-click", a, b) }), this.element.addEventListener("dblclick", function(b) { b.stopPropagation(), b.preventDefault(), a.fireEvent("dblclick", b), a.wavesurfer.fireEvent("region-dblclick", a, b) }), (this.drag || this.resize) && function() {
                var b, c, d, e = a.wavesurfer.getDuration(),
                    f = function(f) { f.stopPropagation(), d = a.wavesurfer.drawer.handleEvent(f) * e, "handle" == f.target.tagName.toLowerCase() ? c = f.target.classList.contains("wavesurfer-handle-start") ? "start" : "end" : b = !0 },
                    g = function(d) {
                        (b || c) && (b = !1, c = !1, d.stopPropagation(), d.preventDefault(), a.fireEvent("update-end", d), a.wavesurfer.fireEvent("region-update-end", a, d))
                    },
                    h = function(f) {
                        if (b || c) {
                            var g = a.wavesurfer.drawer.handleEvent(f) * e,
                                h = g - d;
                            d = g, a.drag && b && a.onDrag(h), a.resize && c && a.onResize(h, c)
                        }
                    };
                a.element.addEventListener("mousedown", f), a.wrapper.addEventListener("mousemove", h), document.body.addEventListener("mouseup", g), a.on("remove", function() { document.body.removeEventListener("mouseup", g), a.wrapper.removeEventListener("mousemove", h) }), a.wavesurfer.on("destroy", function() { document.body.removeEventListener("mouseup", g) })
            }()
        },
        onDrag: function(a) { this.update({ start: this.start + a, end: this.end + a }) },
        onResize: function(a, b) { "start" == b ? this.update({ start: Math.min(this.start + a, this.end), end: Math.max(this.start + a, this.end) }) : this.update({ start: Math.min(this.end + a, this.start), end: Math.max(this.end + a, this.start) }) }
    }, a.util.extend(a.Region, a.Observer), a.initRegions = function() { this.regions || (this.regions = Object.create(a.Regions), this.regions.init(this)) }, a.addRegion = function(a) {
        return this.initRegions(), this.regions.add(a)
    }, a.clearRegions = function() { this.regions && this.regions.clear() }, a.enableDragSelection = function(a) { this.initRegions(), this.regions.enableDragSelection(a) }, a.disableDragSelection = function() { this.regions.disableDragSelection() }
});
