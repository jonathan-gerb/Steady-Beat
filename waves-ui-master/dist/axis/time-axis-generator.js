'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = timeAxisGenerator;

var _utilsFormat = require('../utils/format');

/**
 * A generator to create data for time axis.
 *
 * [example usage](./examples/layer-axis.html)
 *
 * @return {Function} - The configured function returning the data when called.
 */

function timeAxisGenerator() {
  // add factory to share API with bpmGenerator
  return function (timeContext) {
    var duration = timeContext.visibleDuration;
    var offset = timeContext.offset;
    var data = [];

    // const min = Math.min(-offset, 0);
    var min = -offset;
    // remove the timeline's offset to keep the layer centered
    var max = duration - offset;

    // define pixels for 1 second
    var pixelsPerSecond = timeContext.computedPixelsPerSecond;
    var minStep = 7;

    // define all display information according to the pixelsPerSecond ratio
    var step = undefined,
        type = undefined,
        toFixed = undefined,
        markerModulo = undefined,
        includeModulo = undefined;

    if (pixelsPerSecond * 4 > minStep) {
      step = 1; // the step to use to compute time
      toFixed = 0;
      markerModulo = 60; // a timestamp every 5 stepixelsPerSecond
      includeModulo = 5; // a tick every 5 stepixelsPerSecond
      type = '60sec';
    }

    if (pixelsPerSecond * 2 > minStep) {
      step = 1;
      toFixed = 0;
      markerModulo = 30;
      includeModulo = 1;
      type = '30sec';
    }

    if (pixelsPerSecond > minStep) {
      step = 1;
      toFixed = 0;
      markerModulo = 10;
      includeModulo = 1;
      type = 'sec';
    }

    if (pixelsPerSecond / 10 > minStep) {
      step = 1 / 10;
      toFixed = 1;
      markerModulo = 10;
      includeModulo = 1;
      type = 'ds';
    }

    if (pixelsPerSecond / 100 > minStep) {
      step = 1 / 100;
      toFixed = 2;
      markerModulo = 10;
      includeModulo = 1;
      type = 'cs';
    }

    if (pixelsPerSecond / 1000 > minStep) {
      step = 1 / 1000;
      toFixed = 3;
      markerModulo = 10;
      includeModulo = 1;
      type = 'ms';
    }

    for (var time = min; time < max; time += step) {
      var formattedTime = time.toFixed(toFixed);

      if (Math.round(formattedTime / step) % includeModulo !== 0) {
        continue;
      }

      // avoid floating point errors
      var focused = Math.round(formattedTime / step) % markerModulo === 0 ? true : false;

      var datum = { time: formattedTime, focused: focused };

      if (focused === true) {
        var date = new Date(1000 * formattedTime);
        var _min = (0, _utilsFormat.padLeft)(date.getMinutes(), 0, 2);
        var sec = (0, _utilsFormat.padLeft)(date.getSeconds(), 0, 2);
        var milli = (0, _utilsFormat.padLeft)(date.getMilliseconds(), 0, 3);
        var label = _min + ':' + sec + ':' + milli;

        datum.label = label;
      }

      data.push(datum);
    }

    return data;
  };
}

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9heGlzL3RpbWUtYXhpcy1nZW5lcmF0b3IuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7cUJBVXdCLGlCQUFpQjs7MkJBVmpCLGlCQUFpQjs7Ozs7Ozs7OztBQVUxQixTQUFTLGlCQUFpQixHQUFHOztBQUUxQyxTQUFPLFVBQVMsV0FBVyxFQUFFO0FBQzNCLFFBQU0sUUFBUSxHQUFHLFdBQVcsQ0FBQyxlQUFlLENBQUM7QUFDN0MsUUFBTSxNQUFNLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQztBQUNsQyxRQUFNLElBQUksR0FBRyxFQUFFLENBQUM7OztBQUdoQixRQUFNLEdBQUcsR0FBRyxDQUFFLE1BQU0sQ0FBQzs7QUFFckIsUUFBTSxHQUFHLEdBQUcsUUFBUSxHQUFHLE1BQU0sQ0FBQzs7O0FBRzlCLFFBQU0sZUFBZSxHQUFHLFdBQVcsQ0FBQyx1QkFBdUIsQ0FBQztBQUM1RCxRQUFNLE9BQU8sR0FBRyxDQUFDLENBQUM7OztBQUdsQixRQUFJLElBQUksWUFBQTtRQUFFLElBQUksWUFBQTtRQUFFLE9BQU8sWUFBQTtRQUFFLFlBQVksWUFBQTtRQUFFLGFBQWEsWUFBQSxDQUFDOztBQUVyRCxRQUFJLGVBQWUsR0FBRyxDQUFDLEdBQUcsT0FBTyxFQUFFO0FBQ2pDLFVBQUksR0FBRyxDQUFDLENBQUM7QUFDVCxhQUFPLEdBQUcsQ0FBQyxDQUFDO0FBQ1osa0JBQVksR0FBRyxFQUFFLENBQUM7QUFDbEIsbUJBQWEsR0FBRyxDQUFDLENBQUM7QUFDbEIsVUFBSSxHQUFHLE9BQU8sQ0FBQztLQUNoQjs7QUFFRCxRQUFJLGVBQWUsR0FBRyxDQUFDLEdBQUcsT0FBTyxFQUFFO0FBQ2pDLFVBQUksR0FBRyxDQUFDLENBQUM7QUFDVCxhQUFPLEdBQUcsQ0FBQyxDQUFDO0FBQ1osa0JBQVksR0FBRyxFQUFFLENBQUM7QUFDbEIsbUJBQWEsR0FBRyxDQUFDLENBQUM7QUFDbEIsVUFBSSxHQUFHLE9BQU8sQ0FBQztLQUNoQjs7QUFFRCxRQUFJLGVBQWUsR0FBRyxPQUFPLEVBQUU7QUFDN0IsVUFBSSxHQUFHLENBQUMsQ0FBQztBQUNULGFBQU8sR0FBRyxDQUFDLENBQUM7QUFDWixrQkFBWSxHQUFHLEVBQUUsQ0FBQztBQUNsQixtQkFBYSxHQUFHLENBQUMsQ0FBQztBQUNsQixVQUFJLEdBQUcsS0FBSyxDQUFDO0tBQ2Q7O0FBRUQsUUFBSSxlQUFlLEdBQUcsRUFBRSxHQUFHLE9BQU8sRUFBRTtBQUNsQyxVQUFJLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNkLGFBQU8sR0FBRyxDQUFDLENBQUM7QUFDWixrQkFBWSxHQUFHLEVBQUUsQ0FBQztBQUNsQixtQkFBYSxHQUFHLENBQUMsQ0FBQztBQUNsQixVQUFJLEdBQUcsSUFBSSxDQUFDO0tBQ2I7O0FBRUQsUUFBSSxlQUFlLEdBQUcsR0FBRyxHQUFHLE9BQU8sRUFBRTtBQUNuQyxVQUFJLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUNmLGFBQU8sR0FBRyxDQUFDLENBQUM7QUFDWixrQkFBWSxHQUFHLEVBQUUsQ0FBQztBQUNsQixtQkFBYSxHQUFHLENBQUMsQ0FBQztBQUNsQixVQUFJLEdBQUcsSUFBSSxDQUFDO0tBQ2I7O0FBRUQsUUFBSSxlQUFlLEdBQUcsSUFBSSxHQUFHLE9BQU8sRUFBRTtBQUNwQyxVQUFJLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQztBQUNoQixhQUFPLEdBQUcsQ0FBQyxDQUFDO0FBQ1osa0JBQVksR0FBRyxFQUFFLENBQUM7QUFDbEIsbUJBQWEsR0FBRyxDQUFDLENBQUM7QUFDbEIsVUFBSSxHQUFHLElBQUksQ0FBQztLQUNiOztBQUVELFNBQUssSUFBSSxJQUFJLEdBQUcsR0FBRyxFQUFFLElBQUksR0FBRyxHQUFHLEVBQUUsSUFBSSxJQUFJLElBQUksRUFBRTtBQUM3QyxVQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDOztBQUU1QyxVQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxHQUFHLGFBQWEsS0FBSyxDQUFDLEVBQUU7QUFDMUQsaUJBQVM7T0FDVjs7O0FBR0QsVUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLEdBQUcsWUFBWSxLQUFLLENBQUMsR0FBRyxJQUFJLEdBQUcsS0FBSyxDQUFDOztBQUVyRixVQUFNLEtBQUssR0FBRyxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsT0FBTyxFQUFQLE9BQU8sRUFBRSxDQUFDOztBQUUvQyxVQUFJLE9BQU8sS0FBSyxJQUFJLEVBQUU7QUFDcEIsWUFBTSxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxHQUFHLGFBQWEsQ0FBQyxDQUFDO0FBQzVDLFlBQU0sSUFBRyxHQUFHLDBCQUFRLElBQUksQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDN0MsWUFBTSxHQUFHLEdBQUcsMEJBQVEsSUFBSSxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUM3QyxZQUFNLEtBQUssR0FBRywwQkFBUSxJQUFJLENBQUMsZUFBZSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ3BELFlBQU0sS0FBSyxHQUFNLElBQUcsU0FBSSxHQUFHLFNBQUksS0FBSyxBQUFFLENBQUM7O0FBRXZDLGFBQUssQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO09BQ3JCOztBQUVELFVBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDbEI7O0FBRUQsV0FBTyxJQUFJLENBQUM7R0FDYixDQUFDO0NBQ0giLCJmaWxlIjoic3JjL2F4aXMvdGltZS1heGlzLWdlbmVyYXRvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHBhZExlZnQgfSBmcm9tICcuLi91dGlscy9mb3JtYXQnO1xuXG5cbi8qKlxuICogQSBnZW5lcmF0b3IgdG8gY3JlYXRlIGRhdGEgZm9yIHRpbWUgYXhpcy5cbiAqXG4gKiBbZXhhbXBsZSB1c2FnZV0oLi9leGFtcGxlcy9sYXllci1heGlzLmh0bWwpXG4gKlxuICogQHJldHVybiB7RnVuY3Rpb259IC0gVGhlIGNvbmZpZ3VyZWQgZnVuY3Rpb24gcmV0dXJuaW5nIHRoZSBkYXRhIHdoZW4gY2FsbGVkLlxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0aW1lQXhpc0dlbmVyYXRvcigpIHtcbiAgLy8gYWRkIGZhY3RvcnkgdG8gc2hhcmUgQVBJIHdpdGggYnBtR2VuZXJhdG9yXG4gIHJldHVybiBmdW5jdGlvbih0aW1lQ29udGV4dCkge1xuICAgIGNvbnN0IGR1cmF0aW9uID0gdGltZUNvbnRleHQudmlzaWJsZUR1cmF0aW9uO1xuICAgIGNvbnN0IG9mZnNldCA9IHRpbWVDb250ZXh0Lm9mZnNldDtcbiAgICBjb25zdCBkYXRhID0gW107XG5cbiAgICAvLyBjb25zdCBtaW4gPSBNYXRoLm1pbigtb2Zmc2V0LCAwKTtcbiAgICBjb25zdCBtaW4gPSAtIG9mZnNldDtcbiAgICAvLyByZW1vdmUgdGhlIHRpbWVsaW5lJ3Mgb2Zmc2V0IHRvIGtlZXAgdGhlIGxheWVyIGNlbnRlcmVkXG4gICAgY29uc3QgbWF4ID0gZHVyYXRpb24gLSBvZmZzZXQ7XG5cbiAgICAvLyBkZWZpbmUgcGl4ZWxzIGZvciAxIHNlY29uZFxuICAgIGNvbnN0IHBpeGVsc1BlclNlY29uZCA9IHRpbWVDb250ZXh0LmNvbXB1dGVkUGl4ZWxzUGVyU2Vjb25kO1xuICAgIGNvbnN0IG1pblN0ZXAgPSA3O1xuXG4gICAgLy8gZGVmaW5lIGFsbCBkaXNwbGF5IGluZm9ybWF0aW9uIGFjY29yZGluZyB0byB0aGUgcGl4ZWxzUGVyU2Vjb25kIHJhdGlvXG4gICAgbGV0IHN0ZXAsIHR5cGUsIHRvRml4ZWQsIG1hcmtlck1vZHVsbywgaW5jbHVkZU1vZHVsbztcblxuICAgIGlmIChwaXhlbHNQZXJTZWNvbmQgKiA0ID4gbWluU3RlcCkge1xuICAgICAgc3RlcCA9IDE7IC8vIHRoZSBzdGVwIHRvIHVzZSB0byBjb21wdXRlIHRpbWVcbiAgICAgIHRvRml4ZWQgPSAwO1xuICAgICAgbWFya2VyTW9kdWxvID0gNjA7IC8vIGEgdGltZXN0YW1wIGV2ZXJ5IDUgc3RlcGl4ZWxzUGVyU2Vjb25kXG4gICAgICBpbmNsdWRlTW9kdWxvID0gNTsgLy8gYSB0aWNrIGV2ZXJ5IDUgc3RlcGl4ZWxzUGVyU2Vjb25kXG4gICAgICB0eXBlID0gJzYwc2VjJztcbiAgICB9XG5cbiAgICBpZiAocGl4ZWxzUGVyU2Vjb25kICogMiA+IG1pblN0ZXApIHtcbiAgICAgIHN0ZXAgPSAxO1xuICAgICAgdG9GaXhlZCA9IDA7XG4gICAgICBtYXJrZXJNb2R1bG8gPSAzMDtcbiAgICAgIGluY2x1ZGVNb2R1bG8gPSAxO1xuICAgICAgdHlwZSA9ICczMHNlYyc7XG4gICAgfVxuXG4gICAgaWYgKHBpeGVsc1BlclNlY29uZCA+IG1pblN0ZXApIHtcbiAgICAgIHN0ZXAgPSAxO1xuICAgICAgdG9GaXhlZCA9IDA7XG4gICAgICBtYXJrZXJNb2R1bG8gPSAxMDtcbiAgICAgIGluY2x1ZGVNb2R1bG8gPSAxO1xuICAgICAgdHlwZSA9ICdzZWMnO1xuICAgIH1cblxuICAgIGlmIChwaXhlbHNQZXJTZWNvbmQgLyAxMCA+IG1pblN0ZXApIHtcbiAgICAgIHN0ZXAgPSAxIC8gMTA7XG4gICAgICB0b0ZpeGVkID0gMTtcbiAgICAgIG1hcmtlck1vZHVsbyA9IDEwO1xuICAgICAgaW5jbHVkZU1vZHVsbyA9IDE7XG4gICAgICB0eXBlID0gJ2RzJztcbiAgICB9XG5cbiAgICBpZiAocGl4ZWxzUGVyU2Vjb25kIC8gMTAwID4gbWluU3RlcCkge1xuICAgICAgc3RlcCA9IDEgLyAxMDA7XG4gICAgICB0b0ZpeGVkID0gMjtcbiAgICAgIG1hcmtlck1vZHVsbyA9IDEwO1xuICAgICAgaW5jbHVkZU1vZHVsbyA9IDE7XG4gICAgICB0eXBlID0gJ2NzJztcbiAgICB9XG5cbiAgICBpZiAocGl4ZWxzUGVyU2Vjb25kIC8gMTAwMCA+IG1pblN0ZXApIHtcbiAgICAgIHN0ZXAgPSAxIC8gMTAwMDtcbiAgICAgIHRvRml4ZWQgPSAzO1xuICAgICAgbWFya2VyTW9kdWxvID0gMTA7XG4gICAgICBpbmNsdWRlTW9kdWxvID0gMTtcbiAgICAgIHR5cGUgPSAnbXMnO1xuICAgIH1cblxuICAgIGZvciAobGV0IHRpbWUgPSBtaW47IHRpbWUgPCBtYXg7IHRpbWUgKz0gc3RlcCkge1xuICAgICAgY29uc3QgZm9ybWF0dGVkVGltZSA9IHRpbWUudG9GaXhlZCh0b0ZpeGVkKTtcblxuICAgICAgaWYgKE1hdGgucm91bmQoZm9ybWF0dGVkVGltZSAvIHN0ZXApICUgaW5jbHVkZU1vZHVsbyAhPT0gMCkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgLy8gYXZvaWQgZmxvYXRpbmcgcG9pbnQgZXJyb3JzXG4gICAgICBjb25zdCBmb2N1c2VkID0gTWF0aC5yb3VuZChmb3JtYXR0ZWRUaW1lIC8gc3RlcCkgJSBtYXJrZXJNb2R1bG8gPT09IDAgPyB0cnVlIDogZmFsc2U7XG5cbiAgICAgIGNvbnN0IGRhdHVtID0geyB0aW1lOiBmb3JtYXR0ZWRUaW1lLCBmb2N1c2VkIH07XG5cbiAgICAgIGlmIChmb2N1c2VkID09PSB0cnVlKSB7XG4gICAgICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSgxMDAwICogZm9ybWF0dGVkVGltZSk7XG4gICAgICAgIGNvbnN0IG1pbiA9IHBhZExlZnQoZGF0ZS5nZXRNaW51dGVzKCksIDAsIDIpO1xuICAgICAgICBjb25zdCBzZWMgPSBwYWRMZWZ0KGRhdGUuZ2V0U2Vjb25kcygpLCAwLCAyKTtcbiAgICAgICAgY29uc3QgbWlsbGkgPSBwYWRMZWZ0KGRhdGUuZ2V0TWlsbGlzZWNvbmRzKCksIDAsIDMpO1xuICAgICAgICBjb25zdCBsYWJlbCA9IGAke21pbn06JHtzZWN9OiR7bWlsbGl9YDtcblxuICAgICAgICBkYXR1bS5sYWJlbCA9IGxhYmVsO1xuICAgICAgfVxuXG4gICAgICBkYXRhLnB1c2goZGF0dW0pO1xuICAgIH1cblxuICAgIHJldHVybiBkYXRhO1xuICB9O1xufSJdfQ==