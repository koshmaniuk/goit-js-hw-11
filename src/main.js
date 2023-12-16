import axios from 'axios';
// axios.defaults.headers.common['key'] =
//   '41245265-a97abc6deb4aa48b974617d51&q=cat+flowers&image_type=photo';

const form = document.querySelector('.search-form');
const list = document.querySelector('.gallery');
const btn = document.querySelector('.load-more');

let page = 1;
btn.style.display = 'none';

// FORM CLICK
function createMarkup(event) {
  page = 1;
  event.preventDefault();
  list.innerHTML = '';
  btn.style.display = 'none';
  const item = event.target.elements.searchQuery.value;

  imageFinder(item, page)
    .then(res => {
      if (res.data.hits.length !== 0) {
        list.insertAdjacentHTML('beforeend', createImageMarkup(res.data.hits));
        btn.style.display = 'block';
        console.log(res);
        page = 1
      } else {
        console.log(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
    })
    .catch(error => {
      console.log('Error:', error);
    });

// BUTTON CLICK
  function onLoadMore() {
    page += 1;
    imageFinder(item, page)
      .then(res => {
        console.log(page);
        list.insertAdjacentHTML('beforeend', createImageMarkup(res.data.hits));
      })
      .catch(error => {
        console.log('Error:', error);
      });
  }
  btn.addEventListener('click', onLoadMore);
}

form.addEventListener('submit', createMarkup);

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
        <img src="${webformatURL}" alt="${tags}" class="picture"/>
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
