import { fetchRestaurantFromURL, fillBreadcrumb, retrieveReviewById, updateReview, updateReviewModal, displayOfflineMsg, putFavorite } from './restaurant_info.js';
import DBHelper from './dbhelper.js';

window.retrieveReviewById = retrieveReviewById;
window.updateReview = updateReview;
window.updateReviewModal = updateReviewModal;
window.displayOfflineMsg = displayOfflineMsg;
window.putFavorite = putFavorite;

/**
 * Initialize Google map, called from HTML.
 */
window.initMap = () => {
  fetchRestaurantFromURL((error, restaurant) => {
    if (error) { // Got an error!
      console.error(error);
    } else {
      self.map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: restaurant.latlng,
        scrollwheel: false
      });
      fillBreadcrumb();
      DBHelper.mapMarkerForRestaurant(self.restaurant, self.map);
    }
  });
};

navigator.serviceWorker.addEventListener('message', function (event) {
  if (!navigator.onLine) {
    displayOfflineMsg(event.data.message, event.data.review);
  }
});

window.addEventListener('load', function (event) {
  if (localStorage.getItem('newReview') && navigator.onLine) {
    let review = JSON.parse(localStorage.getItem('newReview'));
    localStorage.removeItem('newReview');
    DBHelper.postReviewData(review, (error) => {
      console.log(review);
      console.log(error);
    });
  }
});