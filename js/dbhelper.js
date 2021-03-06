/**
 * Common database helper functions.
 */
import idb from 'idb';

export default class DBHelper {
  constructor(db) {
    this.dbPromise = db;
  }

  /**
   * Database URL.
   * Change this to restaurants.json file location on your server.
   */
  static get DATABASE_URL() {
    const port = 1337; // Change this to your server port
    // return `http://localhost:${port}/data/restaurants.json`;
    return `http://localhost:${port}`;
  }
  /*
   * fetch result from website
   */
  static fetchRestaurantJson(dbPromise) {
    const restaurant_url = DBHelper.DATABASE_URL + '/restaurants';

    console.log('fetchRestaurantJson');
    fetch(restaurant_url)
      .then(response => response.json())
      .then((response) => {
        console.log(response);
        dbPromise = idb.open('restaurants');
        dbPromise.then(db => {
          console.log('read transaction reviews');
          const tx = db.transaction('reviews', 'readwrite');
          response.map(data => {
            tx.objectStore('reviews').put(data);
          })
          return tx.complete;
        }).catch(error => {
          console.log('error ' + error);
        });
      })
      .catch((response) => {
        const error = (`Request failed. Returned status of ${response.status}`);
        callback(error, null);
      });
  }
  /*
   * fetch result from website
   */
  static fetchJson(callback) {
    const restaurant_url = DBHelper.DATABASE_URL + '/restaurants';

    fetch(restaurant_url)
      .then(response => response.json())
      .then((response) => {
        // console.log(response);
        // store
        callback(null, response);
      })
      .catch((response) => {
        const error = (`Request failed. Returned status of ${response.status}`);
        callback(error, null);
      });
  }

  /**
   * Fetch all restaurants.
   * this is the main method to read and cache from indexDB
   */
  static fetchRestaurants(callback, index) {
    console.log('read db');
    if (!('indexedDB' in window)) {
      console.log('This browser does not support IndexedDB');
      return;
    }
    if (!navigator.serviceWorker) {
      return Promise.resolve();
    }
    console.log('open db');
    const dbpromise = idb.open('restaurants', 1)
    dbpromise.then(db => {
      let tx = db.transaction('reviews', 'readonly');
      let store = tx.objectStore('reviews');
      console.log('get from object store');
      return index ? store.get(index) : store.getAll();
    })
      .then(() => {
        console.log('reading from indexeddb');
        callback(null, response);
      })
      .catch((error) => {
        console.log(`fetch from server ${error.message}`);
        DBHelper.fetchJson(callback);
      });
  }

  /**
   * Fetch a restaurant by its ID.
   */
  static fetchRestaurantById(id, callback) {
    const identifier = 'id';
    // fetch all restaurants with proper error handling.
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        const restaurant = restaurants.find(r => r.id == id);
        if (restaurant) { // Got the restaurant
          callback(null, restaurant);
        } else { // Restaurant does not exist in the database
          callback('Restaurant does not exist', null);
        }
      }
    }, identifier);
  }

  /**
   * Fetch all restaurants.
   * this is the main method to read and cache from indexDB
   */
  static fetchAllReviewsByRestaurant(id, type = 'All', dbPromise, callback) {
    let restaurant_url = DBHelper.DATABASE_URL;
    if (type === 'All') {
      restaurant_url = restaurant_url + `/reviews/?restaurant_id=${id}`;
    } else if (type === 'I') {
      restaurant_url = restaurant_url + `/reviews/${id}`;
    }

    fetch(restaurant_url)
      .then(response => response.json())
      .then(response => {

        dbPromise.then(db => {
          const tx = db.transaction('reviews-info', 'readwrite');
          response.map(data => {
            tx.objectStore('reviews-info').put(data);
          })
          return tx.complete;
        })
          .catch(error => {
            console.log('failed to store ' + error.message);
          });
        callback(null, response);
      })
      .catch((error) => {
        console.log(`fetch from server ${error.message}`);
        DBHelper.fetchReviews(id, type, callback);
      });
  }
  /**
   * Fetch a restaurant by its ID.
   */
  static fetchReviews(id, type = 'All', callback) {
    // static fetchAllReviewsByRestaurant(id, type = 'All', callback) {
    let restaurant_url = DBHelper.DATABASE_URL;
    if (type === 'All') {
      restaurant_url = restaurant_url + `/reviews/?restaurant_id=${id}`;
    } else if (type === 'I') {
      restaurant_url = restaurant_url + `/reviews/${id}`;
    }

    fetch(restaurant_url)
      .then(response => response.json())
      .then((response) => {
        console.log(response);

        // store
        const dbPromise = idb.open('restaurants_review');
        dbPromise.then(db => {
          const tx = db.transaction('reviews-info', 'readwrite');
          // response.map(data => {
          console.log('help emmemememememe');
          tx.objectStore('reviews-info').put(response);
          //})
          return tx.complete;
        })
          .catch((response) => {
            console.log('error here' + response);
            // DOMEXception here
          });
        callback(null, response);
      })
      .catch((response) => {
        const error = (`Request failed. Returned status of ${response.status}`);

        callback(error, null);
      });
  }

  /* post the review data */
  static postReviewData(review, callback) {
    let restaurant_url = `${DBHelper.DATABASE_URL}/reviews/`;

    if (review && review.review_id && review.review_id !== '') {
      restaurant_url = restaurant_url.concat(`${review.review_id}`);
    }
    let value = {};
    value.name = review.name;
    value.rating = parseInt(review.rating);
    value.comments = review.comments;
    value.restaurant_id = parseInt(review.restaurant_id);

    let data = JSON.stringify(value);
    console.log(JSON.stringify(value));

    // store locally
    const dbPromise = idb.open('restaurants_review');
    dbPromise.then(db => {
      const tx = db.transaction('reviews-info', 'readwrite');
      console.log('store local');
      tx.objectStore('reviews-info').put(value);
      return tx.complete;
    })
      .catch((response) => {
        console.log('error here' + response);
        // DOMEXception here
      });
    // }
    fetch(restaurant_url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8'
      },
      method: 'post',
      redirect: 'follow',
      referrer: 'no-referrer',
      mode: 'no-cors',
      cache: 'no-cache',
      body: data
    }).then(response => {
      console.log('update ' + response);
      return response.json();
    }).then(response => {
      console.log('data saved');
    }).catch(response => {
      let msg = 'Currently offline data will be save later';
      callback(null, review);
    })
  }

  /* put the review data */
  static favoriteRestaurant(restaurant, callback) {
    let restaurant_url = `${DBHelper.DATABASE_URL}/restaurants/${restaurant.id}/?is_favorite=${restaurant.is_favorite}`;
    // update the local data

    // store locally
    const dbpromise = idb.open('restaurants', 1)
    dbpromise.then(db => {
      let tx = db.transaction('reviews', 'readwrite');
      let store = tx.objectStore('reviews');
      console.log('get from object store');
      return store.put(restaurant);
    })
      .then(() => {
        console.log('reading from indexeddb');
      })
      .catch((error) => {
        console.log(`store to indexdb ${error.message}`);
      });

    return fetch(restaurant_url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8'
      },
      method: 'put',
      redirect: 'follow',
      referrer: 'no-referrer',
      mode: 'cors',
      cache: 'no-cache',
      // body: JSON.stringify({'is_favorite'})
    }).then(response => {
      console.log('put ' + response);
      return response.json();
    }).then(response => {
      console.log('data saved');
    }).catch(response => {
      let msg = 'Currently offline data will be save later';
      callback(null, id);
    })
  }

  /**
   * Fetch restaurants by a cuisine type with proper error handling.
   */
  static fetchRestaurantByCuisine(cuisine, callback) {
    const identifier = 'cuisine_type';
    // Fetch all restaurants  with proper error handling
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        // Filter restaurants to have only given cuisine type
        const results = restaurants.filter(r => r.cuisine_type == cuisine);
        callback(null, results);
      }
    }, identifier);
  }

  /**
   * Fetch restaurants by a neighborhood with proper error handling.
   */
  static fetchRestaurantByNeighborhood(neighborhood, callback) {
    const identifier = 'neighborhood';
    // Fetch all restaurants
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        // Filter restaurants to have only given neighborhood
        const results = restaurants.filter(r => r.neighborhood == neighborhood);
        callback(null, results);
      }
    });
  }

  /**
   * Fetch restaurants by a cuisine and a neighborhood with proper error handling.
   */
  static fetchRestaurantByCuisineAndNeighborhood(cuisine, neighborhood, callback) {
    // Fetch all restaurants
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        let results = restaurants
        if (cuisine != 'all') { // filter by cuisine
          results = results.filter(r => r.cuisine_type == cuisine);
        }
        if (neighborhood != 'all') { // filter by neighborhood
          results = results.filter(r => r.neighborhood == neighborhood);
        }
        callback(null, results);
      }
    });
  }

  /**
   * Fetch all neighborhoods with proper error handling.
   * read from IndexDB if exists else store it
   */
  static fetchNeighborhoods(callback) {
    // Fetch all restaurants
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        // Get all neighborhoods from all restaurants
        const neighborhoods = restaurants.map((v, i) => restaurants[i].neighborhood)
        // Remove duplicates from neighborhoods
        const uniqueNeighborhoods = neighborhoods.filter((v, i) => neighborhoods.indexOf(v) == i)
        callback(null, uniqueNeighborhoods);
      }
    });
  }

  /**
   * Fetch all cuisines with proper error handling.
   * read from IndexDB if exists or else exist
   */
  static fetchCuisines(callback) {
    // Fetch all restaurants
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        // Get all cuisines from all restaurants
        const cuisines = restaurants.map((v, i) => restaurants[i].cuisine_type)
        // Remove duplicates from cuisines
        const uniqueCuisines = cuisines.filter((v, i) => cuisines.indexOf(v) == i)
        callback(null, uniqueCuisines);
      }
    });
  }

  /**
   * Restaurant page URL.
   */
  static urlForRestaurant(restaurant) {
    return (`./restaurant.html?id=${restaurant.id}`);
  }

  /**
   * Restaurant image URL.
   */
  static imageUrlForRestaurant(restaurant) {
    return restaurant.photograph ? `/img/${restaurant.photograph}.jpg` : `/img/p.jpg`;
  }

  /**
   * Map marker for a restaurant.
   */
  static mapMarkerForRestaurant(restaurant, map) {
    const marker = new google.maps.Marker({
      position: restaurant.latlng,
      title: restaurant.name,
      url: DBHelper.urlForRestaurant(restaurant),
      map: map,
      animation: google.maps.Animation.DROP
    }
    );
    return marker;
  }

  static createDB() {
    if (!('indexedDB' in window)) {
      console.log('This browser does not support IndexedDB');
      return;
    }
    if (!navigator.serviceWorker) {
      return Promise.resolve();
    }
    return idb.open('restaurants', 1, upgradeDB => {
      console.log('making a new object store');
      switch (upgradeDB.oldVersion) {
        case 0:
          if (!upgradeDB.objectStoreNames.contains('reviews')) {
            let store = upgradeDB.createObjectStore('reviews', {
              keyPath: 'id',
              autoIncrement: true
            });
          }
        case 1:
          let store = upgradeDB.transaction.objectStore('reviews');
          store.createIndex('neighborhood', 'neighborhood');
          store.createIndex('cuisine_type', 'cuisine_type');
          store.createIndex('id', 'id');
      }
    });
  }

  static createReviewDB() {
    if (!('indexedDB' in window)) {
      console.log('This browser does not support IndexedDB');
      return;
    }
    if (!navigator.serviceWorker) {
      return Promise.resolve();
    }
    return idb.open('restaurants_review', 1, upgradeDB => {
      console.log('making a new object store');
      switch (upgradeDB.oldVersion) {
        case 0:
          if (!upgradeDB.objectStoreNames.contains('reviews-info')) {
            let review = upgradeDB.createObjectStore('reviews-info', {
              keyPath: 'id',
              autoIncrement: true
            })
          }
        case 1:
          let review = upgradeDB.transaction.objectStore('reviews-info');
          review.createIndex('id', 'id');
      }
    });
  }
  static readDB(index) {
    console.log('read db');
    if (!('indexedDB' in window)) {
      console.log('This browser does not support IndexedDB');
      return;
    }
    if (!navigator.serviceWorker) {
      return Promise.resolve();
    }
    console.log('open db');
    idb.open('restaurants', 1)
      .then(db => {
        let tx = db.transaction('reviews', 'readonly');
        let store = tx.objectStore('reviews');
        console.log('get from object store');
        return index ? store.get(index) : store.getAll();
      })
      .catch(error => {
        console.log('error reading ' + error.message);
      });
  }

  static arrayBufferToBlob(buffer, type) {
    return new Blob([buffer], { type: type });
  }

  static blobToArrayBuffer(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.addEventListener('loadend', (e) => {
        resolve(reader, result);
      });
      reader.addEventListener('error', reject);
      reader.readAsArrayBuffer(blob);
    })
  }
}
