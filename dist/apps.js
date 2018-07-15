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
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/apps.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./css/styles.css":
/*!************************!*\
  !*** ./css/styles.css ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// removed by extract-text-webpack-plugin\n\n//# sourceURL=webpack:///./css/styles.css?");

/***/ }),

/***/ "./js/apps.js":
/*!********************!*\
  !*** ./js/apps.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _main = __webpack_require__(/*! ./main.js */ \"./js/main.js\");\n\n__webpack_require__(/*! ../css/styles.css */ \"./css/styles.css\");\n\nvar _idb = __webpack_require__(/*! idb */ \"./node_modules/idb/lib/idb.js\");\n\nvar _idb2 = _interopRequireDefault(_idb);\n\nvar _dbhelper = __webpack_require__(/*! ./dbhelper.js */ \"./js/dbhelper.js\");\n\nvar _dbhelper2 = _interopRequireDefault(_dbhelper);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nwindow.updateRestaurants = _main.updateRestaurants;\n\n/**\n * Fetch neighborhoods and cuisines as soon as the page is loaded.\n */\ndocument.addEventListener('DOMContentLoaded', function (event) {\n    /* service worker */\n    // registerServiceWorker();\n    var dbPromise = _dbhelper2.default.createDB();\n    var json = _dbhelper2.default.fetchRestaurantJson(dbPromise);\n    console.log('restaurant json ' + json);\n    (0, _main.fetchNeighborhoods)();\n    (0, _main.fetchCuisines)();\n});\n\n/**\n * Initialize Google map, called from HTML.\n */\nwindow.initMap = function () {\n    var loc = {\n        lat: 40.722216,\n        lng: -73.987501\n    };\n\n    self.map = new google.maps.Map(document.getElementById('map'), {\n        zoom: 12,\n        center: loc,\n        scrollwheel: false\n    });\n    (0, _main.updateRestaurants)(self);\n};\n\n//# sourceURL=webpack:///./js/apps.js?");

/***/ }),

/***/ "./js/dbhelper.js":
/*!************************!*\
  !*** ./js/dbhelper.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**\r\n                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Common database helper functions.\r\n                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */\n\n\nvar _idb = __webpack_require__(/*! idb */ \"./node_modules/idb/lib/idb.js\");\n\nvar _idb2 = _interopRequireDefault(_idb);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar DBHelper = function () {\n  function DBHelper(db) {\n    _classCallCheck(this, DBHelper);\n\n    this.dbPromise = db;\n  }\n\n  /**\r\n   * Database URL.\r\n   * Change this to restaurants.json file location on your server.\r\n   */\n\n\n  _createClass(DBHelper, null, [{\n    key: 'fetchRestaurantJson',\n\n    /*\r\n     * fetch result from website\r\n     */\n    value: function fetchRestaurantJson(dbPromise) {\n      var restaurant_url = DBHelper.DATABASE_URL + '/restaurants';\n\n      fetch(restaurant_url).then(function (response) {\n        return response.json();\n      }).then(function (response) {\n        console.log(response);\n        dbPromise.then(function (db) {\n          var tx = db.transaction('reviews', 'readwrite');\n          response.map(function (data) {\n            tx.objectStore('reviews').put(data);\n          });\n          return tx.complete;\n        });\n      }).catch(function (response) {\n        var error = 'Request failed. Returned status of ' + response.status;\n        callback(error, null);\n      });\n    }\n    /*\r\n     * fetch result from website\r\n     */\n\n  }, {\n    key: 'fetchJson',\n    value: function fetchJson(callback) {\n      var restaurant_url = DBHelper.DATABASE_URL + '/restaurants';\n\n      fetch(restaurant_url).then(function (response) {\n        return response.json();\n      }).then(function (response) {\n        console.log(response);\n        // store\n        callback(null, response);\n      }).catch(function (response) {\n        var error = 'Request failed. Returned status of ' + response.status;\n        callback(error, null);\n      });\n    }\n\n    /**\r\n     * Fetch all restaurants.\r\n     * this is the main method to read and cache from indexDB\r\n     */\n\n  }, {\n    key: 'fetchRestaurants',\n    value: function fetchRestaurants(callback, index) {\n      console.log('read db');\n      if (!('indexedDB' in window)) {\n        console.log('This browser does not support IndexedDB');\n        return;\n      }\n      if (!navigator.serviceWorker) {\n        return Promise.resolve();\n      }\n      console.log('open db');\n      _idb2.default.open('restaurants', 1).then(function (db) {\n        var tx = db.transaction('reviews', 'readonly');\n        var store = tx.objectStore('reviews');\n        console.log('get from object store');\n        return index ? store.get(index) : store.getAll();\n      }).then(function () {\n        console.log('reading from indexeddb');\n        callback(null, response);\n      }).catch(function (error) {\n        console.log('fetch from server ' + error.message);\n        DBHelper.fetchJson(callback);\n      });\n    }\n\n    /**\r\n     * Fetch a restaurant by its ID.\r\n     */\n\n  }, {\n    key: 'fetchRestaurantById',\n    value: function fetchRestaurantById(id, callback) {\n      var identifier = 'id';\n      // fetch all restaurants with proper error handling.\n      DBHelper.fetchRestaurants(function (error, restaurants) {\n        if (error) {\n          callback(error, null);\n        } else {\n          var restaurant = restaurants.find(function (r) {\n            return r.id == id;\n          });\n          if (restaurant) {\n            // Got the restaurant\n            callback(null, restaurant);\n          } else {\n            // Restaurant does not exist in the database\n            callback('Restaurant does not exist', null);\n          }\n        }\n      }, identifier);\n    }\n\n    /**\r\n     * Fetch restaurants by a cuisine type with proper error handling.\r\n     */\n\n  }, {\n    key: 'fetchRestaurantByCuisine',\n    value: function fetchRestaurantByCuisine(cuisine, callback) {\n      var identifier = 'cuisine_type';\n      // Fetch all restaurants  with proper error handling\n      DBHelper.fetchRestaurants(function (error, restaurants) {\n        if (error) {\n          callback(error, null);\n        } else {\n          // Filter restaurants to have only given cuisine type\n          var results = restaurants.filter(function (r) {\n            return r.cuisine_type == cuisine;\n          });\n          callback(null, results);\n        }\n      }, identifier);\n    }\n\n    /**\r\n     * Fetch restaurants by a neighborhood with proper error handling.\r\n     */\n\n  }, {\n    key: 'fetchRestaurantByNeighborhood',\n    value: function fetchRestaurantByNeighborhood(neighborhood, callback) {\n      var identifier = 'neighborhood';\n      // Fetch all restaurants\n      DBHelper.fetchRestaurants(function (error, restaurants) {\n        if (error) {\n          callback(error, null);\n        } else {\n          // Filter restaurants to have only given neighborhood\n          var results = restaurants.filter(function (r) {\n            return r.neighborhood == neighborhood;\n          });\n          callback(null, results);\n        }\n      });\n    }\n\n    /**\r\n     * Fetch restaurants by a cuisine and a neighborhood with proper error handling.\r\n     */\n\n  }, {\n    key: 'fetchRestaurantByCuisineAndNeighborhood',\n    value: function fetchRestaurantByCuisineAndNeighborhood(cuisine, neighborhood, callback) {\n      // Fetch all restaurants\n      DBHelper.fetchRestaurants(function (error, restaurants) {\n        if (error) {\n          callback(error, null);\n        } else {\n          var results = restaurants;\n          if (cuisine != 'all') {\n            // filter by cuisine\n            results = results.filter(function (r) {\n              return r.cuisine_type == cuisine;\n            });\n          }\n          if (neighborhood != 'all') {\n            // filter by neighborhood\n            results = results.filter(function (r) {\n              return r.neighborhood == neighborhood;\n            });\n          }\n          callback(null, results);\n        }\n      });\n    }\n\n    /**\r\n     * Fetch all neighborhoods with proper error handling.\r\n     * read from IndexDB if exists else store it\r\n     */\n\n  }, {\n    key: 'fetchNeighborhoods',\n    value: function fetchNeighborhoods(callback) {\n      // Fetch all restaurants\n      DBHelper.fetchRestaurants(function (error, restaurants) {\n        if (error) {\n          callback(error, null);\n        } else {\n          // Get all neighborhoods from all restaurants\n          var neighborhoods = restaurants.map(function (v, i) {\n            return restaurants[i].neighborhood;\n          });\n          // Remove duplicates from neighborhoods\n          var uniqueNeighborhoods = neighborhoods.filter(function (v, i) {\n            return neighborhoods.indexOf(v) == i;\n          });\n          callback(null, uniqueNeighborhoods);\n        }\n      });\n    }\n\n    /**\r\n     * Fetch all cuisines with proper error handling.\r\n     * read from IndexDB if exists or else exist\r\n     */\n\n  }, {\n    key: 'fetchCuisines',\n    value: function fetchCuisines(callback) {\n      // Fetch all restaurants\n      DBHelper.fetchRestaurants(function (error, restaurants) {\n        if (error) {\n          callback(error, null);\n        } else {\n          // Get all cuisines from all restaurants\n          var cuisines = restaurants.map(function (v, i) {\n            return restaurants[i].cuisine_type;\n          });\n          // Remove duplicates from cuisines\n          var uniqueCuisines = cuisines.filter(function (v, i) {\n            return cuisines.indexOf(v) == i;\n          });\n          callback(null, uniqueCuisines);\n        }\n      });\n    }\n\n    /**\r\n     * Restaurant page URL.\r\n     */\n\n  }, {\n    key: 'urlForRestaurant',\n    value: function urlForRestaurant(restaurant) {\n      return './restaurant.html?id=' + restaurant.id;\n    }\n\n    /**\r\n     * Restaurant image URL.\r\n     */\n\n  }, {\n    key: 'imageUrlForRestaurant',\n    value: function imageUrlForRestaurant(restaurant) {\n      return restaurant.photograph ? '/img/' + restaurant.photograph + '.jpg' : '/img/p.jpg';\n    }\n\n    /**\r\n     * Map marker for a restaurant.\r\n     */\n\n  }, {\n    key: 'mapMarkerForRestaurant',\n    value: function mapMarkerForRestaurant(restaurant, map) {\n      var marker = new google.maps.Marker({\n        position: restaurant.latlng,\n        title: restaurant.name,\n        url: DBHelper.urlForRestaurant(restaurant),\n        map: map,\n        animation: google.maps.Animation.DROP\n      });\n      return marker;\n    }\n  }, {\n    key: 'createDB',\n    value: function createDB() {\n      if (!('indexedDB' in window)) {\n        console.log('This browser does not support IndexedDB');\n        return;\n      }\n      if (!navigator.serviceWorker) {\n        return Promise.resolve();\n      }\n      return _idb2.default.open('restaurants', 1, function (upgradeDB) {\n        console.log('making a new object store');\n        switch (upgradeDB.oldVersion) {\n          case 0:\n            if (!upgradeDB.objectStoreNames.contains('reviews')) {\n              var _store = upgradeDB.createObjectStore('reviews', {\n                keyPath: 'id',\n                autoIncrement: true\n              });\n            }\n          case 1:\n            var store = upgradeDB.transaction.objectStore('reviews');\n            store.createIndex('neighborhood', 'neighborhood');\n            store.createIndex('cuisine_type', 'cuisine_type');\n            store.createIndex('id', 'id');\n        }\n      });\n    }\n  }, {\n    key: 'readDB',\n    value: function readDB(index) {\n      console.log('read db');\n      if (!('indexedDB' in window)) {\n        console.log('This browser does not support IndexedDB');\n        return;\n      }\n      if (!navigator.serviceWorker) {\n        return Promise.resolve();\n      }\n      console.log('open db');\n      _idb2.default.open('restaurants', 1).then(function (db) {\n        var tx = db.transaction('reviews', 'readonly');\n        var store = tx.objectStore('reviews');\n        console.log('get from object store');\n        return index ? store.get(index) : store.getAll();\n      }).catch(function (error) {\n        console.log('error reading ' + error.message);\n      });\n    }\n  }, {\n    key: 'arrayBufferToBlob',\n    value: function arrayBufferToBlob(buffer, type) {\n      return new Blob([buffer], { type: type });\n    }\n  }, {\n    key: 'blobToArrayBuffer',\n    value: function blobToArrayBuffer(blob) {\n      return new Promise(function (resolve, reject) {\n        var reader = new FileReader();\n        reader.addEventListener('loadend', function (e) {\n          resolve(reader, result);\n        });\n        reader.addEventListener('error', reject);\n        reader.readAsArrayBuffer(blob);\n      });\n    }\n  }, {\n    key: 'DATABASE_URL',\n    get: function get() {\n      var port = 1337; // Change this to your server port\n      // return `http://localhost:${port}/data/restaurants.json`;\n      return 'http://localhost:' + port;\n    }\n  }]);\n\n  return DBHelper;\n}();\n\nexports.default = DBHelper;\n\n//# sourceURL=webpack:///./js/dbhelper.js?");

/***/ }),

/***/ "./js/main.js":
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.addMarkersToMap = exports.createRestaurantHTML = exports.fillRestaurantsHTML = exports.resetRestaurants = exports.updateRestaurants = exports.fillCuisinesHTML = exports.fetchCuisines = exports.fillNeighborhoodsHTML = exports.fetchNeighborhoods = undefined;\n\nvar _dbhelper = __webpack_require__(/*! ./dbhelper.js */ \"./js/dbhelper.js\");\n\nvar _dbhelper2 = _interopRequireDefault(_dbhelper);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar restaurants = void 0,\n    neighborhoods = void 0,\n    cuisines = void 0;\nvar map;\nvar markers = [];\n\n/**\r\n * Fetch all neighborhoods and set their HTML.\r\n */\nvar fetchNeighborhoods = exports.fetchNeighborhoods = function fetchNeighborhoods() {\n  _dbhelper2.default.fetchNeighborhoods(function (error, neighborhoods) {\n    if (error) {\n      // Got an error\n      console.error(error);\n    } else {\n\n      self.neighborhoods = neighborhoods;\n      fillNeighborhoodsHTML();\n    }\n  });\n};\n\n/**\r\n * Set neighborhoods HTML.\r\n */\nvar fillNeighborhoodsHTML = exports.fillNeighborhoodsHTML = function fillNeighborhoodsHTML() {\n  var neighborhoods = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : self.neighborhoods;\n\n  var select = document.getElementById('neighborhoods-select');\n  neighborhoods.forEach(function (neighborhood) {\n    var option = document.createElement('option');\n    // Add Aria attribute for screen reader\n    option.setAttribute('role', 'option');\n    option.setAttribute('id', 'nng-impl-' + neighborhood);\n    option.innerHTML = neighborhood;\n    option.value = neighborhood;\n    select.append(option);\n  });\n};\n\n/**\r\n * Fetch all cuisines and set their HTML.\r\n */\nvar fetchCuisines = exports.fetchCuisines = function fetchCuisines() {\n  _dbhelper2.default.fetchCuisines(function (error, cuisines) {\n    if (error) {\n      // Got an error!\n      console.error(error);\n    } else {\n      self.cuisines = cuisines;\n      fillCuisinesHTML();\n    }\n  });\n};\n\n/**\r\n * Set cuisines HTML.\r\n */\nvar fillCuisinesHTML = exports.fillCuisinesHTML = function fillCuisinesHTML() {\n  var cuisines = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : self.cuisines;\n\n  var select = document.getElementById('cuisines-select');\n\n  cuisines.forEach(function (cuisine) {\n    var option = document.createElement('option');\n    // Add Aria attribute for screen reader\n    option.setAttribute('role', 'option');\n    option.setAttribute('id', 'cc-impl-' + cuisine);\n    option.innerHTML = cuisine;\n    option.value = cuisine;\n    select.append(option);\n  });\n};\n\n/**\r\n * Update page and map for current restaurants.\r\n */\nvar updateRestaurants = exports.updateRestaurants = function updateRestaurants(gmap) {\n  map = gmap;\n  var cSelect = document.getElementById('cuisines-select');\n  var nSelect = document.getElementById('neighborhoods-select');\n\n  var cIndex = cSelect.selectedIndex;\n  var nIndex = nSelect.selectedIndex;\n\n  var cuisine = cSelect[cIndex].value;\n  var neighborhood = nSelect[nIndex].value;\n\n  // Reset all the class\n  var _iteratorNormalCompletion = true;\n  var _didIteratorError = false;\n  var _iteratorError = undefined;\n\n  try {\n    for (var _iterator = cSelect[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {\n      var cc = _step.value;\n\n      cc.setAttribute('class', '');\n    }\n  } catch (err) {\n    _didIteratorError = true;\n    _iteratorError = err;\n  } finally {\n    try {\n      if (!_iteratorNormalCompletion && _iterator.return) {\n        _iterator.return();\n      }\n    } finally {\n      if (_didIteratorError) {\n        throw _iteratorError;\n      }\n    }\n  }\n\n  var _iteratorNormalCompletion2 = true;\n  var _didIteratorError2 = false;\n  var _iteratorError2 = undefined;\n\n  try {\n    for (var _iterator2 = nSelect[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {\n      var cc = _step2.value;\n\n      cc.setAttribute('class', '');\n    }\n    // Update aria attribute for selected option\n  } catch (err) {\n    _didIteratorError2 = true;\n    _iteratorError2 = err;\n  } finally {\n    try {\n      if (!_iteratorNormalCompletion2 && _iterator2.return) {\n        _iterator2.return();\n      }\n    } finally {\n      if (_didIteratorError2) {\n        throw _iteratorError2;\n      }\n    }\n  }\n\n  if (cIndex > 0) {\n    // Get the selector\n    var cSelector = document.querySelector('#cuisines-select');\n    cSelector.setAttribute('aria-activedecendant', cSelect[cIndex].id);\n    cSelect[cIndex].setAttribute('class', 'focuesd');\n  }\n  if (nIndex > 0) {\n    // Get the selector\n    var nSelector = document.querySelector('#neighborhoods-select');\n    nSelector.setAttribute('aria-activedecendant', nSelect[nIndex].id);\n    nSelect[nIndex].setAttribute('class', 'focused');\n  }\n\n  _dbhelper2.default.fetchRestaurantByCuisineAndNeighborhood(cuisine, neighborhood, function (error, restaurants) {\n    if (error) {\n      // Got an error!\n      console.error(error);\n    } else {\n      resetRestaurants(restaurants);\n      fillRestaurantsHTML();\n    }\n  });\n};\n\n/**\r\n * Clear current restaurants, their HTML and remove their map markers.\r\n */\nvar resetRestaurants = exports.resetRestaurants = function resetRestaurants(restaurants) {\n  self = map;\n  // Remove all restaurants\n  self.restaurants = [];\n  var ul = document.getElementById('restaurants-list');\n  ul.innerHTML = '';\n\n  // Remove all map markers\n  if (self.markers) {\n    self.markers.forEach(function (m) {\n      return m.setMap(null);\n    });\n  }\n  self.markers = [];\n  self.restaurants = restaurants;\n};\n\n/**\r\n * Create all restaurants HTML and add them to the webpage.\r\n */\nvar fillRestaurantsHTML = exports.fillRestaurantsHTML = function fillRestaurantsHTML() {\n  var restaurants = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : self.restaurants;\n\n  var ul = document.getElementById('restaurants-list');\n  restaurants.forEach(function (restaurant) {\n    ul.append(createRestaurantHTML(restaurant));\n  });\n  addMarkersToMap();\n};\n\n/**\r\n * Create restaurant HTML.\r\n */\nvar createRestaurantHTML = exports.createRestaurantHTML = function createRestaurantHTML(restaurant) {\n  var li = document.createElement('li');\n  li.setAttribute('role', 'option');\n  li.setAttribute('tabIndex', '0');\n  li.setAttribute('class', 'restaurant-col');\n  li.setAttribute('id', 'rr-impl-' + restaurant.name);\n\n  var image_src = _dbhelper2.default.imageUrlForRestaurant(restaurant);\n  var responsive_image = document.createElement('a');\n  var full_image = image_src.substring(0, image_src.lastIndexOf('.')) + '-lg' + image_src.substring(image_src.lastIndexOf('.'));\n  responsive_image.setAttribute('href', full_image);\n  responsive_image.setAttribute('class', 'progressive replace');\n\n  var image = document.createElement('img');\n  image.className = 'restaurant-img';\n  image.src = image_src.substring(0, image_src.lastIndexOf('.')) + '-270' + image_src.substring(image_src.lastIndexOf('.'));\n  image.title = 'image of ' + restaurant.name;\n  image.setAttribute('alt', restaurant.name);\n  image.setAttribute('class', 'preview');\n\n  responsive_image.appendChild(image);\n\n  li.append(responsive_image);\n\n  var name = document.createElement('h1');\n  name.innerHTML = restaurant.name;\n  li.append(name);\n\n  var neighborhood = document.createElement('p');\n  neighborhood.innerHTML = restaurant.neighborhood;\n  li.append(neighborhood);\n\n  var address = document.createElement('p');\n  address.innerHTML = restaurant.address;\n  li.append(address);\n\n  var more = document.createElement('a');\n  more.setAttribute('role', 'link');\n  more.setAttribute('aria-label', restaurant.name);\n  more.setAttribute('class', 'review-detail');\n  /* more.setAttribute('aria-describedby', 'rr-impl-' + restaurant.name); */\n\n  more.innerHTML = 'View Details';\n  more.href = _dbhelper2.default.urlForRestaurant(restaurant);\n  li.append(more);\n\n  return li;\n};\n\n/**\r\n * Add markers for current restaurants to the map.\r\n */\nvar addMarkersToMap = exports.addMarkersToMap = function addMarkersToMap() {\n  var restaurants = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : map.restaurants;\n\n  self = map;\n  restaurants.forEach(function (restaurant) {\n    // Add marker to the map\n    var marker = _dbhelper2.default.mapMarkerForRestaurant(restaurant, self.map);\n    google.maps.event.addListener(marker, 'click', function () {\n      window.location.href = marker.url;\n    });\n    self.markers.push(marker);\n  });\n};\n\n//# sourceURL=webpack:///./js/main.js?");

/***/ }),

/***/ "./node_modules/idb/lib/idb.js":
/*!*************************************!*\
  !*** ./node_modules/idb/lib/idb.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n(function() {\n  function toArray(arr) {\n    return Array.prototype.slice.call(arr);\n  }\n\n  function promisifyRequest(request) {\n    return new Promise(function(resolve, reject) {\n      request.onsuccess = function() {\n        resolve(request.result);\n      };\n\n      request.onerror = function() {\n        reject(request.error);\n      };\n    });\n  }\n\n  function promisifyRequestCall(obj, method, args) {\n    var request;\n    var p = new Promise(function(resolve, reject) {\n      request = obj[method].apply(obj, args);\n      promisifyRequest(request).then(resolve, reject);\n    });\n\n    p.request = request;\n    return p;\n  }\n\n  function promisifyCursorRequestCall(obj, method, args) {\n    var p = promisifyRequestCall(obj, method, args);\n    return p.then(function(value) {\n      if (!value) return;\n      return new Cursor(value, p.request);\n    });\n  }\n\n  function proxyProperties(ProxyClass, targetProp, properties) {\n    properties.forEach(function(prop) {\n      Object.defineProperty(ProxyClass.prototype, prop, {\n        get: function() {\n          return this[targetProp][prop];\n        },\n        set: function(val) {\n          this[targetProp][prop] = val;\n        }\n      });\n    });\n  }\n\n  function proxyRequestMethods(ProxyClass, targetProp, Constructor, properties) {\n    properties.forEach(function(prop) {\n      if (!(prop in Constructor.prototype)) return;\n      ProxyClass.prototype[prop] = function() {\n        return promisifyRequestCall(this[targetProp], prop, arguments);\n      };\n    });\n  }\n\n  function proxyMethods(ProxyClass, targetProp, Constructor, properties) {\n    properties.forEach(function(prop) {\n      if (!(prop in Constructor.prototype)) return;\n      ProxyClass.prototype[prop] = function() {\n        return this[targetProp][prop].apply(this[targetProp], arguments);\n      };\n    });\n  }\n\n  function proxyCursorRequestMethods(ProxyClass, targetProp, Constructor, properties) {\n    properties.forEach(function(prop) {\n      if (!(prop in Constructor.prototype)) return;\n      ProxyClass.prototype[prop] = function() {\n        return promisifyCursorRequestCall(this[targetProp], prop, arguments);\n      };\n    });\n  }\n\n  function Index(index) {\n    this._index = index;\n  }\n\n  proxyProperties(Index, '_index', [\n    'name',\n    'keyPath',\n    'multiEntry',\n    'unique'\n  ]);\n\n  proxyRequestMethods(Index, '_index', IDBIndex, [\n    'get',\n    'getKey',\n    'getAll',\n    'getAllKeys',\n    'count'\n  ]);\n\n  proxyCursorRequestMethods(Index, '_index', IDBIndex, [\n    'openCursor',\n    'openKeyCursor'\n  ]);\n\n  function Cursor(cursor, request) {\n    this._cursor = cursor;\n    this._request = request;\n  }\n\n  proxyProperties(Cursor, '_cursor', [\n    'direction',\n    'key',\n    'primaryKey',\n    'value'\n  ]);\n\n  proxyRequestMethods(Cursor, '_cursor', IDBCursor, [\n    'update',\n    'delete'\n  ]);\n\n  // proxy 'next' methods\n  ['advance', 'continue', 'continuePrimaryKey'].forEach(function(methodName) {\n    if (!(methodName in IDBCursor.prototype)) return;\n    Cursor.prototype[methodName] = function() {\n      var cursor = this;\n      var args = arguments;\n      return Promise.resolve().then(function() {\n        cursor._cursor[methodName].apply(cursor._cursor, args);\n        return promisifyRequest(cursor._request).then(function(value) {\n          if (!value) return;\n          return new Cursor(value, cursor._request);\n        });\n      });\n    };\n  });\n\n  function ObjectStore(store) {\n    this._store = store;\n  }\n\n  ObjectStore.prototype.createIndex = function() {\n    return new Index(this._store.createIndex.apply(this._store, arguments));\n  };\n\n  ObjectStore.prototype.index = function() {\n    return new Index(this._store.index.apply(this._store, arguments));\n  };\n\n  proxyProperties(ObjectStore, '_store', [\n    'name',\n    'keyPath',\n    'indexNames',\n    'autoIncrement'\n  ]);\n\n  proxyRequestMethods(ObjectStore, '_store', IDBObjectStore, [\n    'put',\n    'add',\n    'delete',\n    'clear',\n    'get',\n    'getAll',\n    'getKey',\n    'getAllKeys',\n    'count'\n  ]);\n\n  proxyCursorRequestMethods(ObjectStore, '_store', IDBObjectStore, [\n    'openCursor',\n    'openKeyCursor'\n  ]);\n\n  proxyMethods(ObjectStore, '_store', IDBObjectStore, [\n    'deleteIndex'\n  ]);\n\n  function Transaction(idbTransaction) {\n    this._tx = idbTransaction;\n    this.complete = new Promise(function(resolve, reject) {\n      idbTransaction.oncomplete = function() {\n        resolve();\n      };\n      idbTransaction.onerror = function() {\n        reject(idbTransaction.error);\n      };\n      idbTransaction.onabort = function() {\n        reject(idbTransaction.error);\n      };\n    });\n  }\n\n  Transaction.prototype.objectStore = function() {\n    return new ObjectStore(this._tx.objectStore.apply(this._tx, arguments));\n  };\n\n  proxyProperties(Transaction, '_tx', [\n    'objectStoreNames',\n    'mode'\n  ]);\n\n  proxyMethods(Transaction, '_tx', IDBTransaction, [\n    'abort'\n  ]);\n\n  function UpgradeDB(db, oldVersion, transaction) {\n    this._db = db;\n    this.oldVersion = oldVersion;\n    this.transaction = new Transaction(transaction);\n  }\n\n  UpgradeDB.prototype.createObjectStore = function() {\n    return new ObjectStore(this._db.createObjectStore.apply(this._db, arguments));\n  };\n\n  proxyProperties(UpgradeDB, '_db', [\n    'name',\n    'version',\n    'objectStoreNames'\n  ]);\n\n  proxyMethods(UpgradeDB, '_db', IDBDatabase, [\n    'deleteObjectStore',\n    'close'\n  ]);\n\n  function DB(db) {\n    this._db = db;\n  }\n\n  DB.prototype.transaction = function() {\n    return new Transaction(this._db.transaction.apply(this._db, arguments));\n  };\n\n  proxyProperties(DB, '_db', [\n    'name',\n    'version',\n    'objectStoreNames'\n  ]);\n\n  proxyMethods(DB, '_db', IDBDatabase, [\n    'close'\n  ]);\n\n  // Add cursor iterators\n  // TODO: remove this once browsers do the right thing with promises\n  ['openCursor', 'openKeyCursor'].forEach(function(funcName) {\n    [ObjectStore, Index].forEach(function(Constructor) {\n      // Don't create iterateKeyCursor if openKeyCursor doesn't exist.\n      if (!(funcName in Constructor.prototype)) return;\n\n      Constructor.prototype[funcName.replace('open', 'iterate')] = function() {\n        var args = toArray(arguments);\n        var callback = args[args.length - 1];\n        var nativeObject = this._store || this._index;\n        var request = nativeObject[funcName].apply(nativeObject, args.slice(0, -1));\n        request.onsuccess = function() {\n          callback(request.result);\n        };\n      };\n    });\n  });\n\n  // polyfill getAll\n  [Index, ObjectStore].forEach(function(Constructor) {\n    if (Constructor.prototype.getAll) return;\n    Constructor.prototype.getAll = function(query, count) {\n      var instance = this;\n      var items = [];\n\n      return new Promise(function(resolve) {\n        instance.iterateCursor(query, function(cursor) {\n          if (!cursor) {\n            resolve(items);\n            return;\n          }\n          items.push(cursor.value);\n\n          if (count !== undefined && items.length == count) {\n            resolve(items);\n            return;\n          }\n          cursor.continue();\n        });\n      });\n    };\n  });\n\n  var exp = {\n    open: function(name, version, upgradeCallback) {\n      var p = promisifyRequestCall(indexedDB, 'open', [name, version]);\n      var request = p.request;\n\n      request.onupgradeneeded = function(event) {\n        if (upgradeCallback) {\n          upgradeCallback(new UpgradeDB(request.result, event.oldVersion, request.transaction));\n        }\n      };\n\n      return p.then(function(db) {\n        return new DB(db);\n      });\n    },\n    delete: function(name) {\n      return promisifyRequestCall(indexedDB, 'deleteDatabase', [name]);\n    }\n  };\n\n  if (true) {\n    module.exports = exp;\n    module.exports.default = module.exports;\n  }\n  else {}\n}());\n\n\n//# sourceURL=webpack:///./node_modules/idb/lib/idb.js?");

/***/ })

/******/ });