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
  // fill reviews
  DBHelper.fetchAllReviewsByRestaurant(restaurant.id, 'All', (error, reviews) => {
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
  // title.innerHTML = 'Reviews' +  '<a role="option" href="#" class="updateReview" onclick="document.getElementById(\'submission\').style.display=\'block\'">New</a>';
  title.innerHTML = 'Reviews' + '<button type="submit" id="createReview" class="iconbtn" onclick="updateReviewModal(\'reset\')">New</button>'
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
  // name.innerHTML = `${review.name} <a role="option" href="#" class="updateReview" onclick="retrieveReviewById(${reviewId})">Update</a>`;
  name.innerHTML = `${review.name} <button class="iconbtn" onclick="retrieveReviewById(${reviewId})">Edit</button>`;
  li.appendChild(name);

  /* const date = document.createElement('p');
  date.innerHTML = review.createdAt;
  li.appendChild(date);

  const updateDate = document.createElement('p');
  updateDate.innerHTML = review.updatedAt;
  li.appendChild(updateDate); */

  const rating = document.createElement('p');
  rating.innerHTML = `Rating: ${review.rating}`;
  li.appendChild(rating);

  const comments = document.createElement('p');
  comments.innerHTML = review.comments;
  li.appendChild(comments);

  // updateReviewModal(review,);
  return li;
}

/* retrieve the review for update */
export const retrieveReviewById = (reviewId) => {
  // submit a fetch request to retrieve the particular review
  // fill reviews
  DBHelper.fetchAllReviewsByRestaurant(reviewId, 'I', (error, reviews) => {
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
}

/* store the reviw on localStorage */
export const store = () => {
  let newPost = document.getElementById('submission');
  let review = {};
  review.review_id = document.getElementById('reviewid').value;
  review.name = document.getElementById('reviewername').value;
  review.comments = document.getElementById('comment').value;
  review.rating = document.getElementById('rating').value;
  review.restaurant_id = document.getElementById('restid').value;
  // store the data
  localStorage.setItem('newPost', review);
}

/* update review modal field values */
export const updateReviewModal = (review = self.reviews) => {
  document.getElementById('submission').style.display = 'block';
  document.getElementById('createReview').style.display = 'none';
  document.getElementById('restid').value = review.restaurant_id;
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
