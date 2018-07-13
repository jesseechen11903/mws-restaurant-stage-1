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

    fetch(restaurant_url)
      .then(response => response.json())
      .then((response) => {
        console.log(response);
        dbPromise.then(db => {
          const tx = db.transaction('reviews', 'readwrite');
          response.map(data => {
            tx.objectStore('reviews').put(data);
          })
          return tx.complete;
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
        console.log(response);
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
    idb.open('restaurants', 1)
      .then(db => {
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
    return new Blob([buffer], {type: type});
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
