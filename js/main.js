let restaurants,
  neighborhoods,
  cuisines
var map
var markers = []

registerServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js', {scope: './'})
    .then(function(reg) {
      // registration worked
      console.log('Registration succeeded. Scope is ' + reg.scope);
    }).catch(function(error) {
      // registration failed
      console.log('Registration failed with ' + error);
    });
  }
}

/**
 * Fetch neighborhoods and cuisines as soon as the page is loaded.
 */
document.addEventListener('DOMContentLoaded', (event) => {
  /* service worker */
  registerServiceWorker();
  fetchNeighborhoods();
  fetchCuisines();
});


/**
 * Fetch all neighborhoods and set their HTML.
 */
fetchNeighborhoods = () => {
  DBHelper.fetchNeighborhoods((error, neighborhoods) => {
    if (error) { // Got an error
      console.error(error);
    } else {
      self.neighborhoods = neighborhoods;
      fillNeighborhoodsHTML();
    }
  });
}

/**
 * Set neighborhoods HTML.
 */
fillNeighborhoodsHTML = (neighborhoods = self.neighborhoods) => {
  const select = document.getElementById('neighborhoods-select');
  neighborhoods.forEach(neighborhood => {
    const option = document.createElement('option');
    // Add Aria attribute for screen reader
    option.setAttribute('role', 'option');
    option.setAttribute('id', 'nng-impl-' + neighborhood);
    option.innerHTML = neighborhood;
    option.value = neighborhood;
    select.append(option);
  });
}

/**
 * Fetch all cuisines and set their HTML.
 */
fetchCuisines = () => {
  DBHelper.fetchCuisines((error, cuisines) => {
    if (error) { // Got an error!
      console.error(error);
    } else {
      self.cuisines = cuisines;
      fillCuisinesHTML();
    }
  });
}

/**
 * Set cuisines HTML.
 */
fillCuisinesHTML = (cuisines = self.cuisines) => {
  const select = document.getElementById('cuisines-select');

  cuisines.forEach(cuisine => {
    const option = document.createElement('option');
    // Add Aria attribute for screen reader
    option.setAttribute('role', 'option');
    option.setAttribute('id', 'cc-impl-' +cuisine);
    option.innerHTML = cuisine;
    option.value = cuisine;
    select.append(option);
  });
}

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
  updateRestaurants();
}

/**
 * Update page and map for current restaurants.
 */
updateRestaurants = () => {
  const cSelect = document.getElementById('cuisines-select');
  const nSelect = document.getElementById('neighborhoods-select');

  const cIndex = cSelect.selectedIndex;
  const nIndex = nSelect.selectedIndex;

  const cuisine = cSelect[cIndex].value;
  const neighborhood = nSelect[nIndex].value;
  
  // Reset all the class
  for (var cc of cSelect) {
    cc.setAttribute('class', '');
  }

  for (var cc of nSelect) {
    cc.setAttribute('class', '');
  }
  // Update aria attribute for selected option
  if (cIndex > 0) {
    // Get the selector
    let cSelector = document.querySelector('#cuisines-select');
    cSelector.setAttribute('aria-activedecendant', cSelect[cIndex].id);
    cSelect[cIndex].setAttribute('class', 'focuesd');
  }
  if (nIndex > 0) {
    // Get the selector
    let nSelector = document.querySelector('#neighborhoods-select');
    nSelector.setAttribute('aria-activedecendant', nSelect[nIndex].id);
    nSelect[nIndex].setAttribute('class', 'focused');
  }

  DBHelper.fetchRestaurantByCuisineAndNeighborhood(cuisine, neighborhood, (error, restaurants) => {
    if (error) { // Got an error!
      console.error(error);
    } else {
      resetRestaurants(restaurants);
      fillRestaurantsHTML();
    }
  })
}

/**
 * Clear current restaurants, their HTML and remove their map markers.
 */
resetRestaurants = (restaurants) => {
  // Remove all restaurants
  self.restaurants = [];
  const ul = document.getElementById('restaurants-list');
  ul.innerHTML = '';

  // Remove all map markers
  self.markers.forEach(m => m.setMap(null));
  self.markers = [];
  self.restaurants = restaurants;
}

/**
 * Create all restaurants HTML and add them to the webpage.
 */
fillRestaurantsHTML = (restaurants = self.restaurants) => {
  const ul = document.getElementById('restaurants-list');
  restaurants.forEach(restaurant => {
    ul.append(createRestaurantHTML(restaurant));
  });
  addMarkersToMap();
}

/**
 * Create restaurant HTML.
 */
createRestaurantHTML = (restaurant) => {
  const li = document.createElement('li');
  li.setAttribute('role', 'option');
  li.setAttribute('tabIndex', '0');
  li.setAttribute('class', 'restaurant-col');
  li.setAttribute('id', 'rr-impl-' + restaurant.name);

  let image_src = DBHelper.imageUrlForRestaurant(restaurant);
  const responsive_image = document.createElement('a');
  responsive_image.setAttribute('href', image_src);
  responsive_image.setAttribute('class', 'progressive replace');

  const image = document.createElement('img');
  image.className = 'restaurant-img';
  image.src = image_src.substring(0, image_src.lastIndexOf('.')) + '-80_preview' + image_src.substring(image_src.lastIndexOf('.'));
  // image.src = image_src + '_preview';
  image.setAttribute('alt', restaurant.name);
  image.setAttribute('class', 'preview');
  responsive_image.appendChild(image);
  
  li.append(responsive_image);

  const name = document.createElement('h1');
  name.innerHTML = restaurant.name;
  li.append(name);

  const neighborhood = document.createElement('p');
  neighborhood.innerHTML = restaurant.neighborhood;
  li.append(neighborhood);

  const address = document.createElement('p');
  address.innerHTML = restaurant.address;
  li.append(address);

  const more = document.createElement('a');
  more.setAttribute('role', 'link');
  more.setAttribute('aria-label', restaurant.name);
  more.setAttribute('class', 'review-detail');
  // more.setAttribute('aria-describedby', 'rr-impl-' + restaurant.name);

  more.innerHTML = 'View Details';
  more.href = DBHelper.urlForRestaurant(restaurant);
  li.append(more)

  return li
}

/**
 * Add markers for current restaurants to the map.
 */
addMarkersToMap = (restaurants = self.restaurants) => {
  restaurants.forEach(restaurant => {
    // Add marker to the map
    const marker = DBHelper.mapMarkerForRestaurant(restaurant, self.map);
    google.maps.event.addListener(marker, 'click', () => {
      window.location.href = marker.url
    });
    self.markers.push(marker);
  });
}