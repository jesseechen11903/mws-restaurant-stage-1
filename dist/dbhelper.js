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
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/dbhelper.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/dbhelper.js":
/*!************************!*\
  !*** ./js/dbhelper.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**\r\n                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Common database helper functions.\r\n                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */\n\n\nvar _idb = __webpack_require__(/*! idb */ \"./node_modules/idb/lib/idb.js\");\n\nvar _idb2 = _interopRequireDefault(_idb);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar DBHelper = function () {\n  function DBHelper(db) {\n    _classCallCheck(this, DBHelper);\n\n    this.dbPromise = db;\n  }\n\n  /**\r\n   * Database URL.\r\n   * Change this to restaurants.json file location on your server.\r\n   */\n\n\n  _createClass(DBHelper, null, [{\n    key: 'fetchRestaurantJson',\n\n    /*\r\n     * fetch result from website\r\n     */\n    value: function fetchRestaurantJson(dbPromise) {\n      var restaurant_url = DBHelper.DATABASE_URL + '/restaurants';\n\n      console.log('fetchRestaurantJson');\n      fetch(restaurant_url).then(function (response) {\n        return response.json();\n      }).then(function (response) {\n        console.log(response);\n        dbPromise = _idb2.default.open('restaurants');\n        dbPromise.then(function (db) {\n          console.log('read transaction reviews');\n          var tx = db.transaction('reviews', 'readwrite');\n          response.map(function (data) {\n            tx.objectStore('reviews').put(data);\n          });\n          return tx.complete;\n        }).catch(function (error) {\n          console.log('error ' + error);\n        });\n      }).catch(function (response) {\n        var error = 'Request failed. Returned status of ' + response.status;\n        callback(error, null);\n      });\n    }\n    /*\r\n     * fetch result from website\r\n     */\n\n  }, {\n    key: 'fetchJson',\n    value: function fetchJson(callback) {\n      var restaurant_url = DBHelper.DATABASE_URL + '/restaurants';\n\n      fetch(restaurant_url).then(function (response) {\n        return response.json();\n      }).then(function (response) {\n        // console.log(response);\n        // store\n        callback(null, response);\n      }).catch(function (response) {\n        var error = 'Request failed. Returned status of ' + response.status;\n        callback(error, null);\n      });\n    }\n\n    /**\r\n     * Fetch all restaurants.\r\n     * this is the main method to read and cache from indexDB\r\n     */\n\n  }, {\n    key: 'fetchRestaurants',\n    value: function fetchRestaurants(callback, index) {\n      console.log('read db');\n      if (!('indexedDB' in window)) {\n        console.log('This browser does not support IndexedDB');\n        return;\n      }\n      if (!navigator.serviceWorker) {\n        return Promise.resolve();\n      }\n      console.log('open db');\n      var dbpromise = _idb2.default.open('restaurants', 1);\n      dbpromise.then(function (db) {\n        var tx = db.transaction('reviews', 'readonly');\n        var store = tx.objectStore('reviews');\n        console.log('get from object store');\n        return index ? store.get(index) : store.getAll();\n      }).then(function () {\n        console.log('reading from indexeddb');\n        callback(null, response);\n      }).catch(function (error) {\n        console.log('fetch from server ' + error.message);\n        DBHelper.fetchJson(callback);\n      });\n    }\n\n    /**\r\n     * Fetch a restaurant by its ID.\r\n     */\n\n  }, {\n    key: 'fetchRestaurantById',\n    value: function fetchRestaurantById(id, callback) {\n      var identifier = 'id';\n      // fetch all restaurants with proper error handling.\n      DBHelper.fetchRestaurants(function (error, restaurants) {\n        if (error) {\n          callback(error, null);\n        } else {\n          var restaurant = restaurants.find(function (r) {\n            return r.id == id;\n          });\n          if (restaurant) {\n            // Got the restaurant\n            callback(null, restaurant);\n          } else {\n            // Restaurant does not exist in the database\n            callback('Restaurant does not exist', null);\n          }\n        }\n      }, identifier);\n    }\n\n    /**\r\n     * Fetch all restaurants.\r\n     * this is the main method to read and cache from indexDB\r\n     */\n\n  }, {\n    key: 'fetchAllReviewsByRestaurant',\n    value: function fetchAllReviewsByRestaurant(id) {\n      var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'All';\n      var dbPromise = arguments[2];\n      var callback = arguments[3];\n\n      var restaurant_url = DBHelper.DATABASE_URL;\n      if (type === 'All') {\n        restaurant_url = restaurant_url + ('/reviews/?restaurant_id=' + id);\n      } else if (type === 'I') {\n        restaurant_url = restaurant_url + ('/reviews/' + id);\n      }\n\n      fetch(restaurant_url).then(function (response) {\n        return response.json();\n      }).then(function (response) {\n\n        dbPromise.then(function (db) {\n          var tx = db.transaction('reviews-info', 'readwrite');\n          response.map(function (data) {\n            tx.objectStore('reviews-info').put(data);\n          });\n          return tx.complete;\n        }).catch(function (error) {\n          console.log('failed to store ' + error.message);\n        });\n        callback(null, response);\n      }).catch(function (error) {\n        console.log('fetch from server ' + error.message);\n        DBHelper.fetchReviews(id, type, callback);\n      });\n    }\n    /**\r\n     * Fetch a restaurant by its ID.\r\n     */\n\n  }, {\n    key: 'fetchReviews',\n    value: function fetchReviews(id) {\n      var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'All';\n      var callback = arguments[2];\n\n      // static fetchAllReviewsByRestaurant(id, type = 'All', callback) {\n      var restaurant_url = DBHelper.DATABASE_URL;\n      if (type === 'All') {\n        restaurant_url = restaurant_url + ('/reviews/?restaurant_id=' + id);\n      } else if (type === 'I') {\n        restaurant_url = restaurant_url + ('/reviews/' + id);\n      }\n\n      fetch(restaurant_url).then(function (response) {\n        return response.json();\n      }).then(function (response) {\n        console.log(response);\n\n        // store\n        var dbPromise = _idb2.default.open('restaurants_review');\n        dbPromise.then(function (db) {\n          var tx = db.transaction('reviews-info', 'readwrite');\n          // response.map(data => {\n          console.log('help emmemememememe');\n          tx.objectStore('reviews-info').put(response);\n          //})\n          return tx.complete;\n        }).catch(function (response) {\n          console.log('error here' + response);\n          // DOMEXception here\n        });\n        callback(null, response);\n      }).catch(function (response) {\n        var error = 'Request failed. Returned status of ' + response.status;\n\n        callback(error, null);\n      });\n    }\n\n    /* post the review data */\n\n  }, {\n    key: 'postReviewData',\n    value: function postReviewData(review, callback) {\n      var restaurant_url = DBHelper.DATABASE_URL + '/reviews/';\n\n      if (review && review.review_id && review.review_id !== '') {\n        restaurant_url = restaurant_url.concat('' + review.review_id);\n      }\n      var value = {};\n      value.name = review.name;\n      value.rating = parseInt(review.rating);\n      value.comments = review.comments;\n      value.restaurant_id = parseInt(review.restaurant_id);\n      // let data = new FormData();\n      // data.append('json', JSON.stringify(value));\n      var data = JSON.stringify(value);\n      console.log(JSON.stringify(value));\n\n      // store locally\n      var dbPromise = _idb2.default.open('restaurants_review');\n      // if (!review.review_id) {\n      dbPromise.then(function (db) {\n        var tx = db.transaction('reviews-info', 'readwrite');\n        console.log('store local');\n        tx.objectStore('reviews-info').put(value);\n        return tx.complete;\n      }).catch(function (response) {\n        console.log('error here' + response);\n        // DOMEXception here\n      });\n      // }\n      fetch(restaurant_url, {\n        headers: {\n          'Accept': 'application/json',\n          'Content-Type': 'application/json; charset=utf-8'\n        },\n        method: 'post',\n        redirect: 'follow',\n        referrer: 'no-referrer',\n        mode: 'no-cors',\n        cache: 'no-cache',\n        body: data\n      }).then(function (response) {\n        console.log('update ' + response);\n        return response.json();\n      }).then(function (response) {\n        console.log('data saved');\n      }).catch(function (response) {\n        var msg = 'Currently offline data will be save later';\n        // navigator.serviceWorker.controller.postMessage(`Client 1 says ${msg}`);\n        callback(null, review);\n      });\n    }\n\n    /**\r\n     * Fetch restaurants by a cuisine type with proper error handling.\r\n     */\n\n  }, {\n    key: 'fetchRestaurantByCuisine',\n    value: function fetchRestaurantByCuisine(cuisine, callback) {\n      var identifier = 'cuisine_type';\n      // Fetch all restaurants  with proper error handling\n      DBHelper.fetchRestaurants(function (error, restaurants) {\n        if (error) {\n          callback(error, null);\n        } else {\n          // Filter restaurants to have only given cuisine type\n          var results = restaurants.filter(function (r) {\n            return r.cuisine_type == cuisine;\n          });\n          callback(null, results);\n        }\n      }, identifier);\n    }\n\n    /**\r\n     * Fetch restaurants by a neighborhood with proper error handling.\r\n     */\n\n  }, {\n    key: 'fetchRestaurantByNeighborhood',\n    value: function fetchRestaurantByNeighborhood(neighborhood, callback) {\n      var identifier = 'neighborhood';\n      // Fetch all restaurants\n      DBHelper.fetchRestaurants(function (error, restaurants) {\n        if (error) {\n          callback(error, null);\n        } else {\n          // Filter restaurants to have only given neighborhood\n          var results = restaurants.filter(function (r) {\n            return r.neighborhood == neighborhood;\n          });\n          callback(null, results);\n        }\n      });\n    }\n\n    /**\r\n     * Fetch restaurants by a cuisine and a neighborhood with proper error handling.\r\n     */\n\n  }, {\n    key: 'fetchRestaurantByCuisineAndNeighborhood',\n    value: function fetchRestaurantByCuisineAndNeighborhood(cuisine, neighborhood, callback) {\n      // Fetch all restaurants\n      DBHelper.fetchRestaurants(function (error, restaurants) {\n        if (error) {\n          callback(error, null);\n        } else {\n          var results = restaurants;\n          if (cuisine != 'all') {\n            // filter by cuisine\n            results = results.filter(function (r) {\n              return r.cuisine_type == cuisine;\n            });\n          }\n          if (neighborhood != 'all') {\n            // filter by neighborhood\n            results = results.filter(function (r) {\n              return r.neighborhood == neighborhood;\n            });\n          }\n          callback(null, results);\n        }\n      });\n    }\n\n    /**\r\n     * Fetch all neighborhoods with proper error handling.\r\n     * read from IndexDB if exists else store it\r\n     */\n\n  }, {\n    key: 'fetchNeighborhoods',\n    value: function fetchNeighborhoods(callback) {\n      // Fetch all restaurants\n      DBHelper.fetchRestaurants(function (error, restaurants) {\n        if (error) {\n          callback(error, null);\n        } else {\n          // Get all neighborhoods from all restaurants\n          var neighborhoods = restaurants.map(function (v, i) {\n            return restaurants[i].neighborhood;\n          });\n          // Remove duplicates from neighborhoods\n          var uniqueNeighborhoods = neighborhoods.filter(function (v, i) {\n            return neighborhoods.indexOf(v) == i;\n          });\n          callback(null, uniqueNeighborhoods);\n        }\n      });\n    }\n\n    /**\r\n     * Fetch all cuisines with proper error handling.\r\n     * read from IndexDB if exists or else exist\r\n     */\n\n  }, {\n    key: 'fetchCuisines',\n    value: function fetchCuisines(callback) {\n      // Fetch all restaurants\n      DBHelper.fetchRestaurants(function (error, restaurants) {\n        if (error) {\n          callback(error, null);\n        } else {\n          // Get all cuisines from all restaurants\n          var cuisines = restaurants.map(function (v, i) {\n            return restaurants[i].cuisine_type;\n          });\n          // Remove duplicates from cuisines\n          var uniqueCuisines = cuisines.filter(function (v, i) {\n            return cuisines.indexOf(v) == i;\n          });\n          callback(null, uniqueCuisines);\n        }\n      });\n    }\n\n    /**\r\n     * Restaurant page URL.\r\n     */\n\n  }, {\n    key: 'urlForRestaurant',\n    value: function urlForRestaurant(restaurant) {\n      return './restaurant.html?id=' + restaurant.id;\n    }\n\n    /**\r\n     * Restaurant image URL.\r\n     */\n\n  }, {\n    key: 'imageUrlForRestaurant',\n    value: function imageUrlForRestaurant(restaurant) {\n      return restaurant.photograph ? '/img/' + restaurant.photograph + '.jpg' : '/img/p.jpg';\n    }\n\n    /**\r\n     * Map marker for a restaurant.\r\n     */\n\n  }, {\n    key: 'mapMarkerForRestaurant',\n    value: function mapMarkerForRestaurant(restaurant, map) {\n      var marker = new google.maps.Marker({\n        position: restaurant.latlng,\n        title: restaurant.name,\n        url: DBHelper.urlForRestaurant(restaurant),\n        map: map,\n        animation: google.maps.Animation.DROP\n      });\n      return marker;\n    }\n  }, {\n    key: 'createDB',\n    value: function createDB() {\n      if (!('indexedDB' in window)) {\n        console.log('This browser does not support IndexedDB');\n        return;\n      }\n      if (!navigator.serviceWorker) {\n        return Promise.resolve();\n      }\n      return _idb2.default.open('restaurants', 1, function (upgradeDB) {\n        console.log('making a new object store');\n        switch (upgradeDB.oldVersion) {\n          case 0:\n            if (!upgradeDB.objectStoreNames.contains('reviews')) {\n              var _store = upgradeDB.createObjectStore('reviews', {\n                keyPath: 'id',\n                autoIncrement: true\n              });\n              // let review = upgradeDB.createObjectStore('reviews-info', {\n              //   keyPath: ['id', 'restaurant_id'],\n              //   autoIncrement: true\n              // })\n            }\n          case 1:\n            var store = upgradeDB.transaction.objectStore('reviews');\n            store.createIndex('neighborhood', 'neighborhood');\n            store.createIndex('cuisine_type', 'cuisine_type');\n            store.createIndex('id', 'id');\n          // let review = upgradeDB.transaction.objectStore('reviews-info');\n          // store.createIndex('id, restaurant_id', ['id', 'restaurant_id']);\n        }\n      });\n    }\n  }, {\n    key: 'createReviewDB',\n    value: function createReviewDB() {\n      if (!('indexedDB' in window)) {\n        console.log('This browser does not support IndexedDB');\n        return;\n      }\n      if (!navigator.serviceWorker) {\n        return Promise.resolve();\n      }\n      return _idb2.default.open('restaurants_review', 1, function (upgradeDB) {\n        console.log('making a new object store');\n        switch (upgradeDB.oldVersion) {\n          case 0:\n            if (!upgradeDB.objectStoreNames.contains('reviews-info')) {\n              var _review = upgradeDB.createObjectStore('reviews-info', {\n                keyPath: 'id',\n                autoIncrement: true\n              });\n            }\n          case 1:\n            var review = upgradeDB.transaction.objectStore('reviews-info');\n            review.createIndex('id', 'id');\n        }\n      });\n    }\n  }, {\n    key: 'readDB',\n    value: function readDB(index) {\n      console.log('read db');\n      if (!('indexedDB' in window)) {\n        console.log('This browser does not support IndexedDB');\n        return;\n      }\n      if (!navigator.serviceWorker) {\n        return Promise.resolve();\n      }\n      console.log('open db');\n      _idb2.default.open('restaurants', 1).then(function (db) {\n        var tx = db.transaction('reviews', 'readonly');\n        var store = tx.objectStore('reviews');\n        console.log('get from object store');\n        return index ? store.get(index) : store.getAll();\n      }).catch(function (error) {\n        console.log('error reading ' + error.message);\n      });\n    }\n  }, {\n    key: 'arrayBufferToBlob',\n    value: function arrayBufferToBlob(buffer, type) {\n      return new Blob([buffer], { type: type });\n    }\n  }, {\n    key: 'blobToArrayBuffer',\n    value: function blobToArrayBuffer(blob) {\n      return new Promise(function (resolve, reject) {\n        var reader = new FileReader();\n        reader.addEventListener('loadend', function (e) {\n          resolve(reader, result);\n        });\n        reader.addEventListener('error', reject);\n        reader.readAsArrayBuffer(blob);\n      });\n    }\n  }, {\n    key: 'DATABASE_URL',\n    get: function get() {\n      var port = 1337; // Change this to your server port\n      // return `http://localhost:${port}/data/restaurants.json`;\n      return 'http://localhost:' + port;\n    }\n  }]);\n\n  return DBHelper;\n}();\n\nexports.default = DBHelper;\n\n//# sourceURL=webpack:///./js/dbhelper.js?");

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