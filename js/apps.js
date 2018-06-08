import { updateRestaurants, fetchNeighborhoods, fetchCuisines } from './main.js';

window.updateRestaurants = updateRestaurants;
/**
 * Fetch neighborhoods and cuisines as soon as the page is loaded.
 */
document.addEventListener('DOMContentLoaded', (event) => {
    /* service worker */
    // registerServiceWorker();
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