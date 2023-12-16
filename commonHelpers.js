import{a as p}from"./assets/vendor-9cd2d6af.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))c(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&c(n)}).observe(document,{childList:!0,subtree:!0});function s(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function c(e){if(e.ep)return;e.ep=!0;const r=s(e);fetch(e.href,r)}})();const m=document.querySelector(".search-form"),l=document.querySelector(".gallery"),a=document.querySelector(".load-more");let i=1,d;a.style.display="none";function y(){Notiflix.Notify.success("Sorry, there are no images matching your search query. Please try again.",{timeout:3e3,width:"400px",fontSize:"24px"})}function h(o){o.preventDefault(),d=o.target.elements.searchQuery.value,l.innerHTML="",u(d).then(t=>{t.data.hits.length!==0?(a.style.display="block",l.insertAdjacentHTML("beforeend",f(t.data.hits)),i=1):(y(),a.style.display="none")}).catch(t=>{console.log("Error:",t)})}m.addEventListener("submit",h);function g(){i+=1,console.log(i),u(d,i).then(o=>{const t=Math.ceil(o.data.totalHits/40);i>=t&&(console.log("We're sorry, but you've reached the end of search results."),a.style.display="none"),l.insertAdjacentHTML("beforeend",f(o.data.hits))}).catch(o=>{console.log("Error:",o)})}a.addEventListener("click",g);async function u(o,t){return await p.get(`https://pixabay.com/api/?key=41245265-a97abc6deb4aa48b974617d51&q=${o}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${t}`).then(s=>s).catch(s=>{throw new Error(s)})}function f(o){return o.map(({webformatURL:t,tags:s,likes:c,views:e,comments:r,downloads:n})=>`
    <div class="photo-card">
    <img src="${t}" alt="${s}"loading="lazy" class="gallery__image"/>
            <div class="info">
            <p class="info-item">
            <b>Likes ${c}</b>
            </p>
            <p class="info-item">
            <b>Views ${e}</b>
            </p>
            <p class="info-item">
            <b>Comments ${r}</b>
            </p>
            <p class="info-item">
            <b>Downloads ${n}</b>
            </p>
        </div>
    </div>
    `).join("")}
//# sourceMappingURL=commonHelpers.js.map
