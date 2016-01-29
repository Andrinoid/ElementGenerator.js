

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Element = function () {
    //Simple element generator. Mootools style
    //tries to find method for keys in options and run it

    function Element(type, options, parent) {
        _classCallCheck(this, Element);

        function isElement(obj) {
            return (obj[0] || obj).nodeType;
        }

        var args = arguments;
        if (isElement(args[1] || {}) || typeof args[1] === 'string') {
            options = {};
            parent = args[1];
        }

        this.element = null;
        if (type.indexOf('.') > -1) {
            var separated = type.split('.');
            var stype = separated[0];
            var clsName = separated[1];
            this.element = document.createElement(stype);
            this._setClass(this.element, clsName);
        } else {
            this.element = document.createElement(type);
        }
        this.options = options || {};

        for (var key in this.options) {
            if (!this.options.hasOwnProperty(key)) {
                continue;
            }
            var val = this.options[key];
            try {
                if (key === 'class') //fix for class name conflict
                    key = 'cls';
                this[key](val);
            } catch (err) {
                //pass
            }
        }

        if (parent) {
            this.inject(parent);
        }

        return this.element;
    }

    _createClass(Element, [{
        key: '_normalizeElement',
        value: function _normalizeElement(element) {
            function isElement(obj) {
                return (obj[0] || obj).nodeType;
            }

            if (isElement(element)) {
                return element;
            }
            if (typeof jQuery !== 'undefined') {
                if (element instanceof jQuery) return element[0];
            }
            if (typeof element === 'string') {
                return document.querySelector(element) || document.querySelector('#' + element) || document.querySelector('.' + element);
            }
        }
    }, {
        key: '_setClass',
        value: function _setClass(el, className) {
            //Method credit http://youmightnotneedjquery.com/
            if (el.classList) {
                el.classList.add(className);
            } else {
                el.className += ' ' + className;
            }
        }
    }, {
        key: 'cls',
        value: function cls(value) {
            var _this = this;

            //Name can be comma or space separated values e.q 'foo, bar'
            //Even if one class name is given we clean the string and end up with array
            var clsList = value.replace(/[|&;$%@"<>()+,]/g, "").split(' ');

            clsList.forEach(function (name) {
                _this._setClass(_this.element, name);
            });
        }
    }, {
        key: 'id',
        value: function id(value) {
            this.element.id = value;
        }
    }, {
        key: 'html',
        value: function html(str) {
            this.element.innerHTML = str;
        }
    }, {
        key: 'text',
        value: function text(str) {
            this.element.innerText = str;
        }
    }, {
        key: 'css',
        value: function css(obj) {
            for (var prop in obj) {
                if (!obj.hasOwnProperty(prop)) {
                    continue;
                }
                this.element.style[prop] = obj[prop];
            }
        }
    }, {
        key: 'inject',
        value: function inject(to) {
            var parent = this._normalizeElement(to);
            parent.appendChild(this.element);
        }
    }]);

    return Element;
}();
