import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const form = document.querySelector('.search-form');
const list = document.querySelector('.gallery');
const btn = document.querySelector('.load-more');

let page = 1;
let item;
btn.style.display = 'none';

function errorMessage() {
  Notiflix.Notify.success(
    'Sorry, there are no images matching your search query. Please try again.',
    {
      timeout: 3000,
      width: '400px',
      fontSize: '24px',
    }
  );
}

// FORM CLICK
function createMarkup(event) {
  event.preventDefault();
  item = event.target.elements.searchQuery.value;
  list.innerHTML = '';
    imageFinder(item)
    .then(res => {
      if (res.data.hits.length !== 0) {
        btn.style.display = 'block';
        list.insertAdjacentHTML('beforeend', createImageMarkup(res.data.hits));
        page = 1
        } else {
          errorMessage() 
          btn.style.display = 'none';
          
      }
    })
    .catch(error => {
      console.log('Error:', error);
    });
}
form.addEventListener('submit', createMarkup);

// BUTTON CLICK
 function onLoadMore()  {
    page += 1;
    console.log(page);
    imageFinder(item, page)
      .then(res => {
        const pages = Math.ceil(res.data.totalHits / 40);
        if(page >= pages) {
          console.log("We're sorry, but you've reached the end of search results.");
          btn.style.display = 'none';
        }
        list.insertAdjacentHTML('beforeend', createImageMarkup(res.data.hits));
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
      ({ webformatURL, tags, likes, views, comments, downloads }) => `
    <div class="photo-card">
    <img src="${webformatURL}" alt="${tags}"loading="lazy" class="gallery__image"/>
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
