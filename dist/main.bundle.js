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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _k_means__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./k-means */ "./src/k-means.js");
/* harmony import */ var _k_means__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_k_means__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ "./src/util.js");



const NUM_OBS = 1000;
const MAX_X = 800;
const MAX_Y = 600;
const COLORS = [ 'blue', 'red', 'gold', 'indigo', 'magenta', 'yellow', 'silver', 'aqua' ]

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const formEl = document.querySelector('form');
const runBtn = document.querySelector('#run-btn');
const numCentroidsEl = document.querySelector('#num-centroids');
const numObservationsEl = document.querySelector('#num-observations');

const render = (ctx, centroids, clusters) => {
  for (let i = 0; i < clusters.length; i++) {
    const cluster = clusters[i];

    ctx.fillStyle = COLORS[i];

    for (const obs of cluster) {
      ctx.fillRect(obs.x, obs.y, 5, 5);
    }
  }

  ctx.fillStyle = 'green';
  
  for (const centroid of centroids) {
    ctx.fillRect(centroid.x, centroid.y, 10, 10);
  }
}

const updateFn = (gen) => {
  return () => {
    const { value, done } = gen.next();  

    if (!done) {
      const { centroids: updated, clusters } = value;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      render(ctx, updated, clusters);
      setTimeout(updateFn(gen), 200);
    } else {
      console.log('Done');
      runBtn.disabled = false;
    }
  };
};

formEl.onsubmit = function(event) {
  event.stopPropagation();

  runBtn.disabled = true;

  const observations = _util__WEBPACK_IMPORTED_MODULE_1__["default"].generateRandomObservations(Number(numObservationsEl.value), MAX_X, MAX_Y);
  const centroids = _util__WEBPACK_IMPORTED_MODULE_1__["default"].generateRandomCentroids(Number(numCentroidsEl.value), MAX_X, MAX_Y);
  const gen = _k_means__WEBPACK_IMPORTED_MODULE_0___default()(centroids, observations);

  render(ctx, centroids, [ observations ]);
  setTimeout(updateFn(gen), 200);

  return false;
}


/***/ }),

/***/ "./src/k-means.js":
/*!************************!*\
  !*** ./src/k-means.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

const distance = (p1, p2) => Math.sqrt(Math.pow(p2.y - p1.y, 2) + Math.pow(p2.x - p1.x, 2));

const assign = (centroids, observations) => {
  const clusters = centroids.map(_ => []);

  for (const obs of observations) {
    let minindex = 0;
    let minval = Infinity;
  
    for (let i = 0; i < centroids.length; i++) {
      const curval = distance(obs, centroids[i]);
  
      if (curval < minval) {
        minval = curval;
        minindex = i;
      }
    }
    
    clusters[minindex].push(obs);
  }

  return clusters;
};

const update = (clusters) => {
  const updated = [];

  for (let i = 0; i < clusters.length; i++) {
    const cluster = clusters[i];
    let summX = 0;
    let summY = 0;
    const size = cluster.length;
  
    for (const obs of cluster) {
      summX += obs.x;
      summY += obs.y
    }
  
    updated[i] = { x: summX / size, y: summY / size };
  }

  return updated;
};

function* kMeans (centroids, observations, delta = .01) {
  let updated = centroids;
  let maxDelta = Infinity;

  do {
    const previous = updated;
    const clusters = assign(updated, observations);
    updated = update(clusters);
    maxDelta = Math.max(...updated.map((c, i) => distance(c, previous[i])));
    yield { centroids: updated, clusters };
  } while (maxDelta > delta)
}

module.exports = kMeans;

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const random = (min, max) => Math.floor(Math.random() * max) + min;

const generateRandomObservations = (num , maxX, maxY) => {
  const observations = [];

  for (let i = 0; i < num; i++) {
    const x = random(0, maxX);
    const y = random(0, maxY);
    observations.push({ x, y });
  }

  return observations;
};

const generateRandomCentroids = (num, maxX, maxY) => {
  const centroids = [];

  for (let i = 0; i < num; i++) {
    const x = random(0, maxX);
    const y = random(0, maxY);
    centroids.push({ x, y });
  }

  return centroids;
};

/* harmony default export */ __webpack_exports__["default"] = ({
  generateRandomCentroids,
  generateRandomObservations
});


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9rLW1lYW5zLmpzIiwid2VicGFjazovLy8uL3NyYy91dGlsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFBQTtBQUFBO0FBQUE7QUFBK0I7QUFDTDs7QUFFMUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaUJBQWlCLHFCQUFxQjtBQUN0Qzs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxjQUFjLGM7O0FBRXpCO0FBQ0EsYUFBYSwrQkFBK0I7QUFDNUM7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQSx1QkFBdUIsNkNBQUk7QUFDM0Isb0JBQW9CLDZDQUFJO0FBQ3hCLGNBQWMsK0NBQU07O0FBRXBCO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7O0FDOURBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLG1CQUFtQixzQkFBc0I7QUFDekM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxpQkFBaUIscUJBQXFCO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGtCQUFrQjtBQUNsQjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYLEdBQUc7QUFDSDs7QUFFQSx3Qjs7Ozs7Ozs7Ozs7O0FDekRBO0FBQUE7O0FBRUE7QUFDQTs7QUFFQSxpQkFBaUIsU0FBUztBQUMxQjtBQUNBO0FBQ0EsdUJBQXVCLE9BQU87QUFDOUI7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBLGlCQUFpQixTQUFTO0FBQzFCO0FBQ0E7QUFDQSxvQkFBb0IsT0FBTztBQUMzQjs7QUFFQTtBQUNBOztBQUVlO0FBQ2Y7QUFDQTtBQUNBLENBQUMsRUFBQyIsImZpbGUiOiJtYWluLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiaW1wb3J0IGtNZWFucyBmcm9tICcuL2stbWVhbnMnO1xuaW1wb3J0IHV0aWwgZnJvbSAnLi91dGlsJztcblxuY29uc3QgTlVNX09CUyA9IDEwMDA7XG5jb25zdCBNQVhfWCA9IDgwMDtcbmNvbnN0IE1BWF9ZID0gNjAwO1xuY29uc3QgQ09MT1JTID0gWyAnYmx1ZScsICdyZWQnLCAnZ29sZCcsICdpbmRpZ28nLCAnbWFnZW50YScsICd5ZWxsb3cnLCAnc2lsdmVyJywgJ2FxdWEnIF1cblxuY29uc3QgY2FudmFzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignY2FudmFzJyk7XG5jb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbmNvbnN0IGZvcm1FbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Zvcm0nKTtcbmNvbnN0IHJ1bkJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNydW4tYnRuJyk7XG5jb25zdCBudW1DZW50cm9pZHNFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNudW0tY2VudHJvaWRzJyk7XG5jb25zdCBudW1PYnNlcnZhdGlvbnNFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNudW0tb2JzZXJ2YXRpb25zJyk7XG5cbmNvbnN0IHJlbmRlciA9IChjdHgsIGNlbnRyb2lkcywgY2x1c3RlcnMpID0+IHtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBjbHVzdGVycy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGNsdXN0ZXIgPSBjbHVzdGVyc1tpXTtcblxuICAgIGN0eC5maWxsU3R5bGUgPSBDT0xPUlNbaV07XG5cbiAgICBmb3IgKGNvbnN0IG9icyBvZiBjbHVzdGVyKSB7XG4gICAgICBjdHguZmlsbFJlY3Qob2JzLngsIG9icy55LCA1LCA1KTtcbiAgICB9XG4gIH1cblxuICBjdHguZmlsbFN0eWxlID0gJ2dyZWVuJztcbiAgXG4gIGZvciAoY29uc3QgY2VudHJvaWQgb2YgY2VudHJvaWRzKSB7XG4gICAgY3R4LmZpbGxSZWN0KGNlbnRyb2lkLngsIGNlbnRyb2lkLnksIDEwLCAxMCk7XG4gIH1cbn1cblxuY29uc3QgdXBkYXRlRm4gPSAoZ2VuKSA9PiB7XG4gIHJldHVybiAoKSA9PiB7XG4gICAgY29uc3QgeyB2YWx1ZSwgZG9uZSB9ID0gZ2VuLm5leHQoKTsgIFxuXG4gICAgaWYgKCFkb25lKSB7XG4gICAgICBjb25zdCB7IGNlbnRyb2lkczogdXBkYXRlZCwgY2x1c3RlcnMgfSA9IHZhbHVlO1xuICAgICAgY3R4LmNsZWFyUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuICAgICAgcmVuZGVyKGN0eCwgdXBkYXRlZCwgY2x1c3RlcnMpO1xuICAgICAgc2V0VGltZW91dCh1cGRhdGVGbihnZW4pLCAyMDApO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZygnRG9uZScpO1xuICAgICAgcnVuQnRuLmRpc2FibGVkID0gZmFsc2U7XG4gICAgfVxuICB9O1xufTtcblxuZm9ybUVsLm9uc3VibWl0ID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgcnVuQnRuLmRpc2FibGVkID0gdHJ1ZTtcblxuICBjb25zdCBvYnNlcnZhdGlvbnMgPSB1dGlsLmdlbmVyYXRlUmFuZG9tT2JzZXJ2YXRpb25zKE51bWJlcihudW1PYnNlcnZhdGlvbnNFbC52YWx1ZSksIE1BWF9YLCBNQVhfWSk7XG4gIGNvbnN0IGNlbnRyb2lkcyA9IHV0aWwuZ2VuZXJhdGVSYW5kb21DZW50cm9pZHMoTnVtYmVyKG51bUNlbnRyb2lkc0VsLnZhbHVlKSwgTUFYX1gsIE1BWF9ZKTtcbiAgY29uc3QgZ2VuID0ga01lYW5zKGNlbnRyb2lkcywgb2JzZXJ2YXRpb25zKTtcblxuICByZW5kZXIoY3R4LCBjZW50cm9pZHMsIFsgb2JzZXJ2YXRpb25zIF0pO1xuICBzZXRUaW1lb3V0KHVwZGF0ZUZuKGdlbiksIDIwMCk7XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuIiwiY29uc3QgZGlzdGFuY2UgPSAocDEsIHAyKSA9PiBNYXRoLnNxcnQoTWF0aC5wb3cocDIueSAtIHAxLnksIDIpICsgTWF0aC5wb3cocDIueCAtIHAxLngsIDIpKTtcblxuY29uc3QgYXNzaWduID0gKGNlbnRyb2lkcywgb2JzZXJ2YXRpb25zKSA9PiB7XG4gIGNvbnN0IGNsdXN0ZXJzID0gY2VudHJvaWRzLm1hcChfID0+IFtdKTtcblxuICBmb3IgKGNvbnN0IG9icyBvZiBvYnNlcnZhdGlvbnMpIHtcbiAgICBsZXQgbWluaW5kZXggPSAwO1xuICAgIGxldCBtaW52YWwgPSBJbmZpbml0eTtcbiAgXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjZW50cm9pZHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGN1cnZhbCA9IGRpc3RhbmNlKG9icywgY2VudHJvaWRzW2ldKTtcbiAgXG4gICAgICBpZiAoY3VydmFsIDwgbWludmFsKSB7XG4gICAgICAgIG1pbnZhbCA9IGN1cnZhbDtcbiAgICAgICAgbWluaW5kZXggPSBpO1xuICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBjbHVzdGVyc1ttaW5pbmRleF0ucHVzaChvYnMpO1xuICB9XG5cbiAgcmV0dXJuIGNsdXN0ZXJzO1xufTtcblxuY29uc3QgdXBkYXRlID0gKGNsdXN0ZXJzKSA9PiB7XG4gIGNvbnN0IHVwZGF0ZWQgPSBbXTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGNsdXN0ZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgY2x1c3RlciA9IGNsdXN0ZXJzW2ldO1xuICAgIGxldCBzdW1tWCA9IDA7XG4gICAgbGV0IHN1bW1ZID0gMDtcbiAgICBjb25zdCBzaXplID0gY2x1c3Rlci5sZW5ndGg7XG4gIFxuICAgIGZvciAoY29uc3Qgb2JzIG9mIGNsdXN0ZXIpIHtcbiAgICAgIHN1bW1YICs9IG9icy54O1xuICAgICAgc3VtbVkgKz0gb2JzLnlcbiAgICB9XG4gIFxuICAgIHVwZGF0ZWRbaV0gPSB7IHg6IHN1bW1YIC8gc2l6ZSwgeTogc3VtbVkgLyBzaXplIH07XG4gIH1cblxuICByZXR1cm4gdXBkYXRlZDtcbn07XG5cbmZ1bmN0aW9uKiBrTWVhbnMgKGNlbnRyb2lkcywgb2JzZXJ2YXRpb25zLCBkZWx0YSA9IC4wMSkge1xuICBsZXQgdXBkYXRlZCA9IGNlbnRyb2lkcztcbiAgbGV0IG1heERlbHRhID0gSW5maW5pdHk7XG5cbiAgZG8ge1xuICAgIGNvbnN0IHByZXZpb3VzID0gdXBkYXRlZDtcbiAgICBjb25zdCBjbHVzdGVycyA9IGFzc2lnbih1cGRhdGVkLCBvYnNlcnZhdGlvbnMpO1xuICAgIHVwZGF0ZWQgPSB1cGRhdGUoY2x1c3RlcnMpO1xuICAgIG1heERlbHRhID0gTWF0aC5tYXgoLi4udXBkYXRlZC5tYXAoKGMsIGkpID0+IGRpc3RhbmNlKGMsIHByZXZpb3VzW2ldKSkpO1xuICAgIHlpZWxkIHsgY2VudHJvaWRzOiB1cGRhdGVkLCBjbHVzdGVycyB9O1xuICB9IHdoaWxlIChtYXhEZWx0YSA+IGRlbHRhKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGtNZWFuczsiLCJjb25zdCByYW5kb20gPSAobWluLCBtYXgpID0+IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG1heCkgKyBtaW47XG5cbmNvbnN0IGdlbmVyYXRlUmFuZG9tT2JzZXJ2YXRpb25zID0gKG51bSAsIG1heFgsIG1heFkpID0+IHtcbiAgY29uc3Qgb2JzZXJ2YXRpb25zID0gW107XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW07IGkrKykge1xuICAgIGNvbnN0IHggPSByYW5kb20oMCwgbWF4WCk7XG4gICAgY29uc3QgeSA9IHJhbmRvbSgwLCBtYXhZKTtcbiAgICBvYnNlcnZhdGlvbnMucHVzaCh7IHgsIHkgfSk7XG4gIH1cblxuICByZXR1cm4gb2JzZXJ2YXRpb25zO1xufTtcblxuY29uc3QgZ2VuZXJhdGVSYW5kb21DZW50cm9pZHMgPSAobnVtLCBtYXhYLCBtYXhZKSA9PiB7XG4gIGNvbnN0IGNlbnRyb2lkcyA9IFtdO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtOyBpKyspIHtcbiAgICBjb25zdCB4ID0gcmFuZG9tKDAsIG1heFgpO1xuICAgIGNvbnN0IHkgPSByYW5kb20oMCwgbWF4WSk7XG4gICAgY2VudHJvaWRzLnB1c2goeyB4LCB5IH0pO1xuICB9XG5cbiAgcmV0dXJuIGNlbnRyb2lkcztcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZ2VuZXJhdGVSYW5kb21DZW50cm9pZHMsXG4gIGdlbmVyYXRlUmFuZG9tT2JzZXJ2YXRpb25zXG59O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==