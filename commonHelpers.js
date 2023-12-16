import{a as f}from"./assets/vendor-a61d8330.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&t(a)}).observe(document,{childList:!0,subtree:!0});function n(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerpolicy&&(o.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?o.credentials="include":e.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function t(e){if(e.ep)return;e.ep=!0;const o=n(e);fetch(e.href,o)}})();const p=document.querySelector(".search-form"),l=document.querySelector(".gallery"),c=document.querySelector(".load-more");let s=1;c.style.display="none";function m(i){s=1,i.preventDefault(),l.innerHTML="",c.style.display="none";const r=i.target.elements.searchQuery.value;d(r,s).then(t=>{t.data.hits.length!==0?(l.insertAdjacentHTML("beforeend",u(t.data.hits)),c.style.display="block",console.log(t),s=1):console.log("Sorry, there are no images matching your search query. Please try again.")}).catch(t=>{console.log("Error:",t)});function n(){s+=1,d(r,s).then(t=>{console.log(s),l.insertAdjacentHTML("beforeend",u(t.data.hits))}).catch(t=>{console.log("Error:",t)})}c.addEventListener("click",n)}p.addEventListener("submit",m);async function d(i,r){return await f.get(`https://pixabay.com/api/?key=41245265-a97abc6deb4aa48b974617d51&q=${i}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${r}`).then(n=>n).catch(n=>{throw new Error(n)})}function u(i){return i.map(({webformatURL:r,tags:n,likes:t,views:e,comments:o,downloads:a})=>`
    <div class="photo-card">
        <img src="${r}" alt="${n}" class="picture"/>
        <div class="info">
            <p class="info-item">
            <b>Likes ${t}</b>
            </p>
            <p class="info-item">
            <b>Views ${e}</b>
            </p>
            <p class="info-item">
            <b>Comments ${o}</b>
            </p>
            <p class="info-item">
            <b>Downloads ${a}</b>
            </p>
        </div>
    </div>
    `).join("")}
//# sourceMappingURL=commonHelpers.js.map
