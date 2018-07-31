import { updateRestaurants, fetchNeighborhoods, fetchCuisines } from './main.js';
import '../css/styles.css';
import idb from 'idb';
import DBHelper from './dbhelper.js';

window.updateRestaurants = updateRestaurants;

/* offline notification handler */
window.addEventListener('load', () => {
    function handleNetworkChange(event) {
        let modal = document.getElementById('notification');

        if (navigator.onLine) {
            modal.style.display = 'none';
        } else {
            modal.style.display = 'block';
        }
    }

    window.addEventListener('online', handleNetworkChange);
    window.addEventListener('offline', handleNetworkChange);
});

// When the user clicks anywhere outside of the modal, close it

document.getElementById('notification').onclick = function(event) {
    console.log(event);
    console.log(event.srcElement);
    console.log(event.target.tagName);
    if (event.target.tagName == 'A') {
        document.getElementById('notification').style.display = "none";
    }
}

/**
 * Fetch neighborhoods and cuisines as soon as the page is loaded.
 */
document.addEventListener('DOMContentLoaded', (event) => {
    /* service worker */
    // registerServiceWorker();
    const dbPromise = DBHelper.createDB();
    const json = DBHelper.fetchRestaurantJson(dbPromise);
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
    updateRestaurants(self);
}