import { updateRestaurants, fetchNeighborhoods, fetchCuisines } from './main.js';
import '../css/styles.css';
import idb from 'idb';
import DBHelper from './dbhelper.js';

window.updateRestaurants = updateRestaurants;


/**
 * Fetch neighborhoods and cuisines as soon as the page is loaded.
 */
document.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    /* service worker */
    // registerServiceWorker();
    const dbPromise = DBHelper.createDB();
    const json = DBHelper.fetchRestaurantJson();
    console.log('restaurant json ' + json);
    fetchNeighborhoods();
    fetchCuisines();
});


/**
 * Initialize Google map, called from HTML.
 */
window.initMap = () => {
    let loc = {
        lat: 40.722216,
        lng: -73.987501
    };

   
    self.map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: loc,
        scrollwheel: false
    });
    
    // console.log('restaurant json ' + json);
    updateRestaurants(self);
}