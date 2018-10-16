/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/canvas.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/canvas.js":
/*!***********************!*\
  !*** ./src/canvas.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _utils = __webpack_require__(/*! ./utils */ "./src/utils.js");

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');
var offset = { x: 0, y: 200 };
canvas.width = innerWidth;
canvas.height = innerHeight - offset.y;

var mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
};

var colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66'];
var selectedBlue = false;
var stdRadius = 20;
// Event Listeners
addEventListener('mousemove', function (event) {
    mouse.x = event.clientX;
    mouse.y = event.clientY - offset.y;
});

addEventListener('click', function () {
    dots.push(new Dot(mouse.x, mouse.y, stdRadius, selectedBlue ? colors[1] : colors[3]));
});

addEventListener('resize', function () {
    canvas.width = innerWidth;
    canvas.height = innerHeight - offset.y;
});

addEventListener('keydown', function (e) {
    console.log(e.keyCode);
    switch (e.keyCode) {
        case 65:
            // A
            selectedBlue = !selectedBlue;
            break;
        case 67:
            // C
            console.log("Calculando...");
            break;
        case 85:
            // U
            dots.splice(dots.length - 1, 1);
            break;
    }
});

// Perceptron
function Perceptron(input_size) {
    this.weights = function () {
        var zeroes = [];
        for (var i = 0; i < input_size; i++) {
            zeroes.push(Math.random() * 2 - 1);
        }
        return zeroes;
    }();
    this.bias = Math.random() * 2 - 1;
    console.dir(this);
}

Perceptron.prototype.heaviside = function (x) {
    return x >= 0 ? 1 : 0;
};

Perceptron.prototype.process = function (inputs) {
    // inputs: int[]
    var sum = this.bias;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = inputs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            input = _step.value;

            sum += input * this.weights[inputs.indexOf(input)];
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    return this.heaviside(sum);
};

Perceptron.prototype.adjust = function (inputs, delta, learningRate) {
    // inputs: int[], delta: int, learningRate: int
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = inputs[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            input = _step2.value;

            this.weights[inputs.indexOf(input)] += input * delta * learningRate;
        }
    } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
            }
        } finally {
            if (_didIteratorError2) {
                throw _iteratorError2;
            }
        }
    }

    this.bias += delta * learningRate;
};

var a = 0;
var b = 0;

function f(x) {
    // x: int
    return a * x + b;
}

function isAboveLine(point, f) {
    // point: [int,int], f: function(int) int
    var x = point[0];
    var y = point[1];
    return y > f(x) ? 1 : 0;
}

function train(p, iters, rate) {
    // p: Perceptron, iters: int, rate: intfloat
    for (var i = 0; i < iters; i++) {
        var point = [_utils2.default.randomIntFromRange(-100, 100), _utils2.default.randomIntFromRange(-100, 100)];

        var actual = p.process(point);
        var expected = isAboveLine(point, f);
        var delta = expected - actual;

        p.adjust(point, delta, rate);
    }
}

// Dots
function Dot(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
}

Dot.prototype.draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    //c.fillStyle = this.color
    c.fillStyle = this.y > _utils2.default.f(canvas.width, canvas.height, this.x) ? colors[1] : colors[3];
    c.fill();
    c.closePath();
};

Dot.prototype.update = function () {
    this.draw();
};

// Implementation
var dots = void 0;
function init() {
    dots = [];
    for (var i = 0; i < 100; i++) {
        dots.push(new Dot(_utils2.default.randomIntFromRange(0, canvas.width), _utils2.default.randomIntFromRange(0, canvas.height), _utils2.default.randomIntFromRange(20, 50), _utils2.default.randomColor(colors)));
    }
    new Perceptron(5);
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);

    dots.forEach(function (dot) {
        dot.update();
    });
    c.beginPath();
    c.arc(mouse.x, mouse.y, 10, Math.PI * 2, false);
    c.fillStyle = selectedBlue ? colors[1] : colors[3];
    c.fill();

    c.moveTo(0, 0);
    for (var i = 0; i < canvas.width; i++) {
        c.lineTo(i, _utils2.default.f(canvas.width, canvas.height, i));
    }
    c.stroke();
    c.closePath();
}

init();
animate();

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)];
}

function distance(x1, y1, x2, y2) {
    var xDist = x2 - x1;
    var yDist = y2 - y1;

    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

function f(width, height, x) {
    var realX = x * 100 / width; // Normaliza de px a % (width->100%)
    var realY = 100 - realX; // Este es el cálculo de la función
    var y = realY * height / 100; // Retorna a px para display
    return y;
}

module.exports = { randomIntFromRange: randomIntFromRange, randomColor: randomColor, distance: distance, f: f };

/***/ })

/******/ });
//# sourceMappingURL=canvas.bundle.js.map