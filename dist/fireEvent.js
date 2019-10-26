(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.FIREEVENT = factory());
}(this, function () { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  var Painter =
  /*#__PURE__*/
  function () {
    function Painter(metadata) {
      _classCallCheck(this, Painter);

      var elm = document.createElement('canvas');
      this.width = elm.width = metadata.width;
      this.height = elm.height = metadata.height;
      elm.style.width = '100%';
      elm.style.height = '100%'; // elm.style.background = 'rgba(0,0,0,0.2)';

      elm.style.position = 'fixed';
      elm.style.left = '0';
      elm.style.top = '0';
      elm.style.zIndex = '9999';
      document.body.append(elm);
      this.context = elm.getContext('2d');
      this.context.strokeStyle = 'red';
      this.context.lineWidth = 6;
      this.scene = [];
    }

    _createClass(Painter, [{
      key: "parseEvents",
      value: function parseEvents(events) {
        var _this = this;

        events.forEach(function (event) {
          var time = event.time;
          setTimeout(function () {
            _this.scene.push(event);

            _this.draw();

            setTimeout(function () {
              _this.scene.shift();

              _this.draw();
            }, 300);
          }, time);
        });
      }
    }, {
      key: "draw",
      value: function draw() {
        var _this2 = this;

        var context = this.context;
        context.clearRect(0, 0, this.width, this.height);
        this.scene.forEach(function (event) {
          _this2.drawClickEvent(event);
        });
      }
    }, {
      key: "drawClickEvent",
      value: function drawClickEvent(event) {
        var context = this.context;
        context.beginPath();
        context.arc(event.x, event.y, 10, 0, Math.PI * 2); // context.fill();

        context.stroke();
        context.closePath();
      }
    }]);

    return Painter;
  }();

  function getElementByXpath(path) {
    var contextNode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document.body;
    return document.evaluate(path, contextNode, null, XPathResult.ANY_TYPE, null).iterateNext();
  }

  var FireEvent =
  /*#__PURE__*/
  function () {
    function FireEvent() {
      _classCallCheck(this, FireEvent);
    }

    _createClass(FireEvent, [{
      key: "init",
      value: function init() {}
    }, {
      key: "loadEvents",
      value: function loadEvents(e) {
        var Paint = new Painter(e.metadata);
        Paint.parseEvents(e.events);
        this.fireEvents(e);
      }
    }, {
      key: "fireEvents",
      value: function fireEvents(e) {
        var _this = this;

        var typedEvent = {
          click: [],
          scroll: []
        };
        e.events.forEach(function (event) {
          switch (event.type) {
            case 'click':
              typedEvent.click.push(event);
              break;

            case 'scroll':
              typedEvent.scroll.push(event);
              break;
          }
        });
        typedEvent.click.forEach(function (event) {
          var time = event.time;
          setTimeout(function () {
            _this.fire(event);
          }, time);
        });
        typedEvent.scroll.forEach(function (event) {
          var startAt = event.from.time;
          var endAt = event.to.time;
          var totalTime = endAt - startAt;
          var dt = 20;
          setTimeout(function () {
            // todo change to requestAnimationFrame
            var startTime = +new Date();
            var timerId = setInterval(function () {
              var now = +new Date();

              if (now - startTime > totalTime) {
                clearInterval(timerId);
                return;
              }

              var dx = (event.to.x - event.from.x) / totalTime * (now - startTime);
              var dy = (event.to.y - event.from.y) / totalTime * (now - startTime);
              var sx = event.from.x + dx;
              var sy = event.from.y + dy;
              window.scrollTo(sx, sy);
            }, dt);
          }, startAt);
        });
      }
    }, {
      key: "fire",
      value: function fire(e) {
        switch (e.type) {
          case 'click':
            var elm = getElementByXpath(e.path);
            console.log(elm);
            var clickEvent = new Event('click');
            elm.dispatchEvent(clickEvent);
            break;
        }
      }
    }]);

    return FireEvent;
  }();

  var fireEvent = new FireEvent();

  return fireEvent;

}));
