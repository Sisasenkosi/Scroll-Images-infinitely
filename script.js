const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// UNsplash api for photos
const count = 20;

// insert your api key here
const apiKey = 'API_KEY';

const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// functio to check if images were loaded
function imageLoaded() {
  imagesLoaded++;

  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
}

// helper function to set attributes on DOM elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

//Create elements for links and photos , add them to DOM
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  console.log('total images', totalImages);
  //for each method
  photosArray.forEach((photo) => {
    //create anchor element of link to unsplash site
    const item = document.createElement('a');
    // item.setAttribute('href', photo.links.html);
    // item.setAttribute('target', '_blank');

    //now instaed of repeating yourself like this you can use the above function we created to set attributes

    setAttributes(item, {
      href: photo.links.html,
      target: '_blank',
    });

    // create image for photo
    const img = document.createElement('img');

    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    // put image inside the anchor element then put both of them inside our imange container element

    // Event listener that checks whether images are done loading
    img.addEventListener('load', imageLoaded());

    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get photos from spash

async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    // catch error here
  }
}

// Well now check to see if scrolling down at end of page loads more photos

window.addEventListener('scroll', () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

// on load
getPhotos();
