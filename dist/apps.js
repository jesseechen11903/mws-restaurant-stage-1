!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=6)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r,o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),i=n(1),a=(r=i)&&r.__esModule?r:{default:r};var s=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.dbPromise=t}return o(e,null,[{key:"fetchRestaurantJson",value:function(t){var n=e.DATABASE_URL+"/restaurants";console.log("fetchRestaurantJson"),fetch(n).then(function(e){return e.json()}).then(function(e){console.log(e),a.default.open("restaurants").then(function(t){console.log("read transaction reviews");var n=t.transaction("reviews","readwrite");return e.map(function(e){n.objectStore("reviews").put(e)}),n.complete}).catch(function(e){console.log("error "+e)})}).catch(function(e){var t="Request failed. Returned status of "+e.status;callback(t,null)})}},{key:"fetchJson",value:function(t){var n=e.DATABASE_URL+"/restaurants";fetch(n).then(function(e){return e.json()}).then(function(e){t(null,e)}).catch(function(e){var n="Request failed. Returned status of "+e.status;t(n,null)})}},{key:"fetchRestaurants",value:function(t,n){if(console.log("read db"),"indexedDB"in window){if(!navigator.serviceWorker)return Promise.resolve();console.log("open db"),a.default.open("restaurants",1).then(function(e){var t=e.transaction("reviews","readonly").objectStore("reviews");return console.log("get from object store"),n?t.get(n):t.getAll()}).then(function(){console.log("reading from indexeddb"),t(null,response)}).catch(function(n){console.log("fetch from server "+n.message),e.fetchJson(t)})}else console.log("This browser does not support IndexedDB")}},{key:"fetchRestaurantById",value:function(t,n){e.fetchRestaurants(function(e,r){if(e)n(e,null);else{var o=r.find(function(e){return e.id==t});o?n(null,o):n("Restaurant does not exist",null)}},"id")}},{key:"fetchAllReviewsByRestaurant",value:function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"All",r=arguments[2],o=arguments[3],i=e.DATABASE_URL;"All"===n?i=i+"/reviews/?restaurant_id="+t:"I"===n&&(i=i+"/reviews/"+t),fetch(i).then(function(e){return e.json()}).then(function(e){r.then(function(t){var n=t.transaction("reviews-info","readwrite");return e.map(function(e){n.objectStore("reviews-info").put(e)}),n.complete}).catch(function(e){console.log("failed to store "+e.message)}),o(null,e)}).catch(function(r){console.log("fetch from server "+r.message),e.fetchReviews(t,n,o)})}},{key:"fetchReviews",value:function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"All",r=arguments[2],o=e.DATABASE_URL;"All"===n?o=o+"/reviews/?restaurant_id="+t:"I"===n&&(o=o+"/reviews/"+t),fetch(o).then(function(e){return e.json()}).then(function(e){console.log(e),a.default.open("restaurants_review").then(function(t){var n=t.transaction("reviews-info","readwrite");return console.log("help emmemememememe"),n.objectStore("reviews-info").put(e),n.complete}).catch(function(e){console.log("error here"+e)}),r(null,e)}).catch(function(e){var t="Request failed. Returned status of "+e.status;r(t,null)})}},{key:"postReviewData",value:function(t,n){var r=e.DATABASE_URL+"/reviews/";t&&t.review_id&&""!==t.review_id&&(r=r.concat(""+t.review_id));var o={};o.name=t.name,o.rating=parseInt(t.rating),o.comments=t.comments,o.restaurant_id=parseInt(t.restaurant_id);var i=JSON.stringify(o);console.log(JSON.stringify(o)),a.default.open("restaurants_review").then(function(e){var t=e.transaction("reviews-info","readwrite");return console.log("store local"),t.objectStore("reviews-info").put(o),t.complete}).catch(function(e){console.log("error here"+e)}),fetch(r,{headers:{Accept:"application/json","Content-Type":"application/json; charset=utf-8"},method:"post",redirect:"follow",referrer:"no-referrer",mode:"no-cors",cache:"no-cache",body:i}).then(function(e){return console.log("update "+e),e.json()}).then(function(e){console.log("data saved")}).catch(function(e){n(null,t)})}},{key:"fetchRestaurantByCuisine",value:function(t,n){e.fetchRestaurants(function(e,r){if(e)n(e,null);else{var o=r.filter(function(e){return e.cuisine_type==t});n(null,o)}},"cuisine_type")}},{key:"fetchRestaurantByNeighborhood",value:function(t,n){e.fetchRestaurants(function(e,r){if(e)n(e,null);else{var o=r.filter(function(e){return e.neighborhood==t});n(null,o)}})}},{key:"fetchRestaurantByCuisineAndNeighborhood",value:function(t,n,r){e.fetchRestaurants(function(e,o){if(e)r(e,null);else{var i=o;"all"!=t&&(i=i.filter(function(e){return e.cuisine_type==t})),"all"!=n&&(i=i.filter(function(e){return e.neighborhood==n})),r(null,i)}})}},{key:"fetchNeighborhoods",value:function(t){e.fetchRestaurants(function(e,n){if(e)t(e,null);else{var r=n.map(function(e,t){return n[t].neighborhood}),o=r.filter(function(e,t){return r.indexOf(e)==t});t(null,o)}})}},{key:"fetchCuisines",value:function(t){e.fetchRestaurants(function(e,n){if(e)t(e,null);else{var r=n.map(function(e,t){return n[t].cuisine_type}),o=r.filter(function(e,t){return r.indexOf(e)==t});t(null,o)}})}},{key:"urlForRestaurant",value:function(e){return"./restaurant.html?id="+e.id}},{key:"imageUrlForRestaurant",value:function(e){return e.photograph?"/img/"+e.photograph+".jpg":"/img/p.jpg"}},{key:"mapMarkerForRestaurant",value:function(t,n){return new google.maps.Marker({position:t.latlng,title:t.name,url:e.urlForRestaurant(t),map:n,animation:google.maps.Animation.DROP})}},{key:"createDB",value:function(){if("indexedDB"in window)return navigator.serviceWorker?a.default.open("restaurants",1,function(e){switch(console.log("making a new object store"),e.oldVersion){case 0:if(!e.objectStoreNames.contains("reviews"))e.createObjectStore("reviews",{keyPath:"id",autoIncrement:!0});case 1:var t=e.transaction.objectStore("reviews");t.createIndex("neighborhood","neighborhood"),t.createIndex("cuisine_type","cuisine_type"),t.createIndex("id","id")}}):Promise.resolve();console.log("This browser does not support IndexedDB")}},{key:"createReviewDB",value:function(){if("indexedDB"in window)return navigator.serviceWorker?a.default.open("restaurants_review",1,function(e){switch(console.log("making a new object store"),e.oldVersion){case 0:if(!e.objectStoreNames.contains("reviews-info"))e.createObjectStore("reviews-info",{keyPath:"id",autoIncrement:!0});case 1:e.transaction.objectStore("reviews-info").createIndex("id","id")}}):Promise.resolve();console.log("This browser does not support IndexedDB")}},{key:"readDB",value:function(e){if(console.log("read db"),"indexedDB"in window){if(!navigator.serviceWorker)return Promise.resolve();console.log("open db"),a.default.open("restaurants",1).then(function(t){var n=t.transaction("reviews","readonly").objectStore("reviews");return console.log("get from object store"),e?n.get(e):n.getAll()}).catch(function(e){console.log("error reading "+e.message)})}else console.log("This browser does not support IndexedDB")}},{key:"arrayBufferToBlob",value:function(e,t){return new Blob([e],{type:t})}},{key:"blobToArrayBuffer",value:function(e){return new Promise(function(t,n){var r=new FileReader;r.addEventListener("loadend",function(e){t(r,result)}),r.addEventListener("error",n),r.readAsArrayBuffer(e)})}},{key:"DATABASE_URL",get:function(){return"http://localhost:1337"}}]),e}();t.default=s},function(e,t,n){"use strict";!function(){function t(e){return new Promise(function(t,n){e.onsuccess=function(){t(e.result)},e.onerror=function(){n(e.error)}})}function n(e,n,r){var o,i=new Promise(function(i,a){t(o=e[n].apply(e,r)).then(i,a)});return i.request=o,i}function r(e,t,n){n.forEach(function(n){Object.defineProperty(e.prototype,n,{get:function(){return this[t][n]},set:function(e){this[t][n]=e}})})}function o(e,t,r,o){o.forEach(function(o){o in r.prototype&&(e.prototype[o]=function(){return n(this[t],o,arguments)})})}function i(e,t,n,r){r.forEach(function(r){r in n.prototype&&(e.prototype[r]=function(){return this[t][r].apply(this[t],arguments)})})}function a(e,t,r,o){o.forEach(function(o){o in r.prototype&&(e.prototype[o]=function(){return e=this[t],(r=n(e,o,arguments)).then(function(e){if(e)return new u(e,r.request)});var e,r})})}function s(e){this._index=e}function u(e,t){this._cursor=e,this._request=t}function c(e){this._store=e}function l(e){this._tx=e,this.complete=new Promise(function(t,n){e.oncomplete=function(){t()},e.onerror=function(){n(e.error)},e.onabort=function(){n(e.error)}})}function f(e,t,n){this._db=e,this.oldVersion=t,this.transaction=new l(n)}function d(e){this._db=e}r(s,"_index",["name","keyPath","multiEntry","unique"]),o(s,"_index",IDBIndex,["get","getKey","getAll","getAllKeys","count"]),a(s,"_index",IDBIndex,["openCursor","openKeyCursor"]),r(u,"_cursor",["direction","key","primaryKey","value"]),o(u,"_cursor",IDBCursor,["update","delete"]),["advance","continue","continuePrimaryKey"].forEach(function(e){e in IDBCursor.prototype&&(u.prototype[e]=function(){var n=this,r=arguments;return Promise.resolve().then(function(){return n._cursor[e].apply(n._cursor,r),t(n._request).then(function(e){if(e)return new u(e,n._request)})})})}),c.prototype.createIndex=function(){return new s(this._store.createIndex.apply(this._store,arguments))},c.prototype.index=function(){return new s(this._store.index.apply(this._store,arguments))},r(c,"_store",["name","keyPath","indexNames","autoIncrement"]),o(c,"_store",IDBObjectStore,["put","add","delete","clear","get","getAll","getKey","getAllKeys","count"]),a(c,"_store",IDBObjectStore,["openCursor","openKeyCursor"]),i(c,"_store",IDBObjectStore,["deleteIndex"]),l.prototype.objectStore=function(){return new c(this._tx.objectStore.apply(this._tx,arguments))},r(l,"_tx",["objectStoreNames","mode"]),i(l,"_tx",IDBTransaction,["abort"]),f.prototype.createObjectStore=function(){return new c(this._db.createObjectStore.apply(this._db,arguments))},r(f,"_db",["name","version","objectStoreNames"]),i(f,"_db",IDBDatabase,["deleteObjectStore","close"]),d.prototype.transaction=function(){return new l(this._db.transaction.apply(this._db,arguments))},r(d,"_db",["name","version","objectStoreNames"]),i(d,"_db",IDBDatabase,["close"]),["openCursor","openKeyCursor"].forEach(function(e){[c,s].forEach(function(t){e in t.prototype&&(t.prototype[e.replace("open","iterate")]=function(){var t,n=(t=arguments,Array.prototype.slice.call(t)),r=n[n.length-1],o=this._store||this._index,i=o[e].apply(o,n.slice(0,-1));i.onsuccess=function(){r(i.result)}})})}),[s,c].forEach(function(e){e.prototype.getAll||(e.prototype.getAll=function(e,t){var n=this,r=[];return new Promise(function(o){n.iterateCursor(e,function(e){e?(r.push(e.value),void 0===t||r.length!=t?e.continue():o(r)):o(r)})})})});var p={open:function(e,t,r){var o=n(indexedDB,"open",[e,t]),i=o.request;return i.onupgradeneeded=function(e){r&&r(new f(i.result,e.oldVersion,i.transaction))},o.then(function(e){return new d(e)})},delete:function(e){return n(indexedDB,"deleteDatabase",[e])}};e.exports=p,e.exports.default=e.exports}()},,function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.addMarkersToMap=t.createRestaurantHTML=t.fillRestaurantsHTML=t.resetRestaurants=t.updateRestaurants=t.fillCuisinesHTML=t.fetchCuisines=t.fillNeighborhoodsHTML=t.fetchNeighborhoods=void 0;var r,o=n(0),i=(r=o)&&r.__esModule?r:{default:r};t.fetchNeighborhoods=function(){i.default.fetchNeighborhoods(function(e,t){e?console.error(e):(self.neighborhoods=t,s())})};var a,s=t.fillNeighborhoodsHTML=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:self.neighborhoods,t=document.getElementById("neighborhoods-select");e.forEach(function(e){var n=document.createElement("option");n.setAttribute("role","option"),n.setAttribute("id","nng-impl-"+e),n.innerHTML=e,n.value=e,t.append(n)})},u=(t.fetchCuisines=function(){i.default.fetchCuisines(function(e,t){e?console.error(e):(self.cuisines=t,u())})},t.fillCuisinesHTML=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:self.cuisines,t=document.getElementById("cuisines-select");e.forEach(function(e){var n=document.createElement("option");n.setAttribute("role","option"),n.setAttribute("id","cc-impl-"+e),n.innerHTML=e,n.value=e,t.append(n)})}),c=(t.updateRestaurants=function(e){a=e;var t=document.getElementById("cuisines-select"),n=document.getElementById("neighborhoods-select"),r=t.selectedIndex,o=n.selectedIndex,s=t[r].value,u=n[o].value,f=!0,d=!1,p=void 0;try{for(var h,v=t[Symbol.iterator]();!(f=(h=v.next()).done);f=!0){h.value.setAttribute("class","")}}catch(e){d=!0,p=e}finally{try{!f&&v.return&&v.return()}finally{if(d)throw p}}var m=!0,g=!1,b=void 0;try{for(var y,w=n[Symbol.iterator]();!(m=(y=w.next()).done);m=!0){y.value.setAttribute("class","")}}catch(e){g=!0,b=e}finally{try{!m&&w.return&&w.return()}finally{if(g)throw b}}r>0&&(document.querySelector("#cuisines-select").setAttribute("aria-activedecendant",t[r].id),t[r].setAttribute("class","focuesd"));o>0&&(document.querySelector("#neighborhoods-select").setAttribute("aria-activedecendant",n[o].id),n[o].setAttribute("class","focused"));console.log("this is call");var _=i.default.createDB();i.default.fetchRestaurantJson(_),i.default.fetchRestaurantByCuisineAndNeighborhood(s,u,function(e,t){e?console.error(e):(c(t),l())})},t.resetRestaurants=function(e){self=a,self.restaurants=[],document.getElementById("restaurants-list").innerHTML="",self.markers&&self.markers.forEach(function(e){return e.setMap(null)}),self.markers=[],self.restaurants=e}),l=t.fillRestaurantsHTML=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:self.restaurants,t=document.getElementById("restaurants-list");e.forEach(function(e){t.append(f(e))}),d()},f=t.createRestaurantHTML=function(e){var t=document.createElement("li");t.setAttribute("role","option"),t.setAttribute("tabIndex","0"),t.setAttribute("class","restaurant-col"),t.setAttribute("id","rr-impl-"+e.name);var n=i.default.imageUrlForRestaurant(e),r=document.createElement("a"),o=n.substring(0,n.lastIndexOf("."))+"-lg"+n.substring(n.lastIndexOf("."));r.setAttribute("href",o),r.setAttribute("class","progressive replace");var a=document.createElement("img");a.className="restaurant-img",a.src=n.slice(0,n.lastIndexOf("/")+1)+"1-p"+n.substring(n.lastIndexOf(".")),a.title="image of "+e.name,a.setAttribute("alt",e.name),a.setAttribute("class","preview"),r.appendChild(a),t.append(r);var s=document.createElement("h1");s.innerHTML=e.name,t.append(s);var u=document.createElement("p");u.innerHTML=e.neighborhood,t.append(u);var c=document.createElement("p");c.innerHTML=e.address,t.append(c);var l=document.createElement("a");return l.setAttribute("role","link"),l.setAttribute("aria-label",e.name),l.setAttribute("class","review-detail"),l.innerHTML="View Details",l.href=i.default.urlForRestaurant(e),t.append(l),t},d=t.addMarkersToMap=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:a.restaurants;self=a,e.forEach(function(e){var t=i.default.mapMarkerForRestaurant(e,self.map);google.maps.event.addListener(t,"click",function(){window.location.href=t.url}),self.markers.push(t)})}},,,function(e,t,n){"use strict";var r=n(3);n(11);i(n(1));var o=i(n(0));function i(e){return e&&e.__esModule?e:{default:e}}window.updateRestaurants=r.updateRestaurants,document.addEventListener("DOMContentLoaded",function(e){console.log("DOM fully loaded and parsed");o.default.createDB();var t=o.default.fetchRestaurantJson();console.log("restaurant json "+t),(0,r.fetchNeighborhoods)(),(0,r.fetchCuisines)()}),window.initMap=function(){self.map=new google.maps.Map(document.getElementById("map"),{zoom:12,center:{lat:40.722216,lng:-73.987501},scrollwheel:!1}),(0,r.updateRestaurants)(self)}},,,,,function(e,t){}]);