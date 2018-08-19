import DBHelper from './dbhelper.js';

let restaurant;
var map;

/**
 * Get current restaurant from page URL.
 */
export const fetchRestaurantFromURL = (callback) => {
  if (self.restaurant) { // restaurant already fetched!
    callback(null, self.restaurant)
    return;
  }
  const id = getParameterByName('id');
  if (!id) { // no id found in URL
    error = 'No restaurant id in URL'
    callback(error, null);
  } else {
    DBHelper.fetchRestaurantById(id, (error, restaurant) => {
      self.restaurant = restaurant;
      if (!restaurant) {
        console.log(error);
        return;
      }
      fillRestaurantHTML();
      callback(null, restaurant)
    });
  }
}

export const getImageSource = (source, targetwidth) => {
  let src = source;

  if (source && targetwidth) {
    src = source.substring(0, source.lastIndexOf('.')) + '-' + targetwidth + source.substring(source.lastIndexOf('.'));
  }
  return src;
}

/**
 * Create restaurant HTML and add it to the webpage
 */
export const fillRestaurantHTML = (restaurant = self.restaurant) => {
  const name = document.getElementById('restaurant-name');
  name.innerHTML = restaurant.name;

  if (restaurant.is_favorite) {
      const favorite = document.getElementById('restaurant-favorite');
      favorite.innerHTML = '&#10084;';
      const favoriteClick = document.getElementById('restaurant-favorite');
      favoriteClick.setAttribute('onclick', 'putFavorite(false);');
  }
  
  const address = document.getElementById('restaurant-address');
  address.innerHTML = restaurant.address;

  const image = document.getElementById('restaurant-img');
  image.className = 'restaurant-img';
  let imagename = DBHelper.imageUrlForRestaurant(restaurant);
  let sourceSet = getImageSource(imagename, 'sm') + ' 400w,' + getImageSource(imagename, 'md') + ' 600w,' + getImageSource(imagename, 'lg') + ' 1440w';
  image.setAttribute('srcset', sourceSet);
  image.src = getImageSource(imagename, 'lg');
  image.setAttribute('alt', restaurant.name);

  const picture = document.getElementById('restaurant-pic');
  const sourceElement = picture.getElementsByTagName('source');
  // 900 breakpoint, lg
  sourceElement[0].setAttribute('srcset', getImageSource(imagename, 'lg') + ' 1x,' + getImageSource(imagename, 'lg_2x') + ' 2x');
  // 600 breakpoint, sm
  sourceElement[1].setAttribute('srcset', getImageSource(imagename, 'sm') + ' 1x,' + getImageSource(imagename, 'sm_2x') + ' 2x');
  // 601 breakpoint, md
  sourceElement[2].setAttribute('srcset', getImageSource(imagename, 'md') + ' 1x,' + getImageSource(imagename, 'md_2x') + ' 2x');

  const cuisine = document.getElementById('restaurant-cuisine');
  cuisine.innerHTML = restaurant.cuisine_type;

  // fill operating hours
  if (restaurant.operating_hours) {
    fillRestaurantHoursHTML();
  }

  // create DB
  const dbPromiser = DBHelper.createReviewDB();

  // fill reviews
  DBHelper.fetchAllReviewsByRestaurant(restaurant.id, 'All',  dbPromiser, (error, reviews) => {
    self.reviews = reviews;
    if (!reviews) {
      console.log(error);
      return;
    }
    fillReviewsHTML();
    // callback(null, reviews);
  });
  // fillReviewsHTML();
}

/**
 * Create restaurant operating hours HTML table and add it to the webpage.
 */
export const fillRestaurantHoursHTML = (operatingHours = self.restaurant.operating_hours) => {
  const hours = document.getElementById('restaurant-hours');
  for (let key in operatingHours) {
    const row = document.createElement('tr');

    const day = document.createElement('td');
    day.innerHTML = key;
    row.appendChild(day);

    const time = document.createElement('td');
    time.innerHTML = operatingHours[key];
    row.appendChild(time);

    hours.appendChild(row);
  }
}

/**
 * Create all reviews HTML and add them to the webpage.
 */
export const fillReviewsHTML = (reviews = self.reviews) => {
  const container = document.getElementById('reviews-container');
  const title = document.createElement('h2');
  const restId = reviews ? reviews[0].restaurant_id : '';
  title.innerHTML = 'Reviews' + `<button type="submit" id="createReview" class="iconbtn" onclick="updateReviewModal(\'reset\', ${restId})">New</button>`
  container.appendChild(title);

  if (!reviews) {
    const noReviews = document.createElement('p');
    noReviews.innerHTML = 'No reviews yet!';
    container.appendChild(noReviews);
    return;
  }

  const ul = document.getElementById('reviews-list');
 
  reviews.forEach((review) => {
    ul.appendChild(createReviewHTML(review));
  });
  container.appendChild(ul);
}

/**
 * Create review HTML and add it to the webpage.
 */
export const createReviewHTML = (review) => {
  const li = document.createElement('li');
  li.setAttribute('role', 'listitem');
  li.setAttribute('tabindex', '0');
  const name = document.createElement('p');
  const reviewId = review.id;
  const restaurantId = review.restaurant_id;
  name.innerHTML = `${review.name} <button class="iconbtn" onclick="retrieveReviewById(${reviewId})">Edit</button>`;
  li.appendChild(name);

  const rating = document.createElement('p');
  rating.innerHTML = `Rating: ${review.rating}`;
  li.appendChild(rating);

  const comments = document.createElement('p');
  comments.innerHTML = review.comments;
  li.appendChild(comments);

  return li;
}

/* retrieve the review for update */
export const retrieveReviewById = (reviewId) => {
  // submit a fetch request to retrieve the particular review
  // fill reviews
  DBHelper.fetchAllReviewsByRestaurant(reviewId, 'I', null, (error, reviews) => {
    self.reviews = reviews;
    if (!reviews) {
      console.log(error);
      return;
    }
    updateReviewModal();
    // callback(null, reviews);
  });
}

/* create/update review */
export const updateReview = () => {
  console.log('update review');
  // if goes offline store to localStorage
  
  let newPost = document.getElementById('submission');
  let review = {};
  review.review_id = document.getElementById('reviewid').value;
  review.name = document.getElementById('reviewername').value;
  review.comments = document.getElementById('comment').value;
  review.rating = parseInt(document.getElementById('rating').value);
  review.restaurant_id = parseInt(document.getElementById('restid').value);
  // store the data
  DBHelper.postReviewData(review, (error) => {
    console.log(review);
    console.log(error);
  });
}

/* favorite a restaurant */
export const putFavorite = (isfavorite = true) => {
  console.log('put favorite');
  // if goes offline store to localStorage
  
  const id = getParameterByName('id');
  const favorite = document.getElementById('restaurant-favorite');
  if (isfavorite) {
    favorite.innerHTML = '&#10084;';
  } else {
    favorite.innerHTML = '&#10085;';
  }
  
  // store the data
  DBHelper.favoriteRestaurant(id, isfavorite, (error) => {
    console.log(id);
    console.log(error);
  });
}
export const displayOfflineMsg = (message, review) => {
  let modal = document.getElementById('notification');

  alert(message);
  // console.log('displayOfflineMsg ' + JSON.parse(review));
  // modal.style.display = 'none';
  let newPost = document.getElementById('submission');
  review.review_id = document.getElementById('reviewid').value;
  review.name = document.getElementById('reviewername').value;
  review.comments = document.getElementById('comment').value;
  review.rating = parseInt(document.getElementById('rating').value);
  review.restaurant_id = parseInt(document.getElementById('restid').value);
  console.log('wth ' + review);
  localStorage.setItem('newReview', JSON.stringify(review));
}

/* update review modal field values */
export const updateReviewModal = (review = self.reviews, restaurant_id) => {
  document.getElementById('submission').style.display = 'block';
  document.getElementById('createReview').style.display = 'none';
  document.getElementById('restid').value = restaurant_id;
  if (review === 'reset') {
    document.getElementById('reviewid').value = '';
    document.getElementById('reviewername').value = '';
    document.getElementById('reviewername').disabled = false;
    document.getElementById('comment').value = '';
    document.getElementById('rating').value = '5';
  } else {
    document.getElementById('reviewid').value = review.id;
    document.getElementById('reviewername').value = review.name;
    document.getElementById('reviewername').disabled = true;
    document.getElementById('comment').value = review.comments;
    document.getElementById('rating').value = review.rating;
  }
}
/**
 * Add restaurant name to the breadcrumb navigation menu
 */
export const fillBreadcrumb = (restaurant = self.restaurant) => {
  const breadcrumb = document.getElementById('breadcrumb');
  const li = document.createElement('li');
  li.setAttribute('class', 'restaurant-selected');
  li.innerHTML = restaurant.name;
  breadcrumb.appendChild(li);
}

/**
 * Get a parameter by name from page URL.
 */
export const getParameterByName = (name, url) => {
  if (!url)
    url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`),
    results = regex.exec(url);
  if (!results)
    return null;
  if (!results[2])
    return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
