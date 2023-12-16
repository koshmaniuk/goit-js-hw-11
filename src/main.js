import axios from 'axios';
import Toastify from 'toastify-js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('.search-form');
const list = document.querySelector('.gallery');
const btn = document.querySelector('.load-more');

let page = 1;
let item;
btn.style.display = 'none';

function errorMessage() {
  Toastify({
    text: 'Sorry, there are no images matching your search query. Please try again.',
    className: 'info',
    style: {
      background: 'linear-gradient(to right, #00b09b, #96c93d)',
    },
  }).showToast();
}

function infoMessage() {
  Toastify({
    text: "We're sorry, but you've reached the end of search results.",
    className: 'info',
    style: {
      background: 'linear-gradient(to right, #00b09b, #96c93d)',
    },
  }).showToast();
}

// FORM CLICK
function createMarkup(event) {
  event.preventDefault();
  item = event.target.elements.searchQuery.value;
  list.innerHTML = '';
  imageFinder(item)
    .then(res => {
      if (res.data.hits.length !== 0 && item !== '' && item !== ' ') {
        btn.style.display = 'block';
        list.insertAdjacentHTML('beforeend', createImageMarkup(res.data.hits));
        page = 1;
        let lightbox = new SimpleLightbox('.gallery__link', {
          captionsData: 'alt',
          captionDelay: 250,
        });
      } else {
        btn.style.display = 'none';
        errorMessage();
      }
    })
    .catch(error => {
      console.log('Error:', error);
    });
}
form.addEventListener('submit', createMarkup);

// BUTTON CLICK
function onLoadMore() {
  page += 1;
  console.log(page);

  imageFinder(item, page)
    .then(res => {
      const pages = Math.ceil(res.data.totalHits / 40);
      if (page >= pages) {
        infoMessage();
        btn.style.display = 'none';
      }
      list.insertAdjacentHTML('beforeend', createImageMarkup(res.data.hits));
      let lightbox = new SimpleLightbox('.gallery__link', {
        captionsData: 'alt',
        captionDelay: 250,
      });
    })
    .catch(error => {
      console.log('Error:', error);
    });
}
btn.addEventListener('click', onLoadMore);

// IMAGE FINDER
async function imageFinder(item, page) {
  return await axios
    .get(
      `https://pixabay.com/api/?key=41245265-a97abc6deb4aa48b974617d51&q=${item}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`
    )
    .then(resp => {
      return resp;
    })
    .catch(error => {
      throw new Error(error);
    });
}

// MARKUP CREATOR
function createImageMarkup(array) {
  return array
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
    <div class="photo-card">
    <a class="gallery__link" href="${largeImageURL}">
    <img src="${webformatURL}" alt="${tags}"loading="lazy" class="gallery__image"/>
    </a>
            <div class="info">
            <p class="info-item">
            <b>Likes ${likes}</b>
            </p>
            <p class="info-item">
            <b>Views ${views}</b>
            </p>
            <p class="info-item">
            <b>Comments ${comments}</b>
            </p>
            <p class="info-item">
            <b>Downloads ${downloads}</b>
            </p>
        </div>
    </div>
    `
    )
    .join('');
}
