import{a as p}from"./assets/vendor-9cd2d6af.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))c(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&c(s)}).observe(document,{childList:!0,subtree:!0});function n(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function c(e){if(e.ep)return;e.ep=!0;const r=n(e);fetch(e.href,r)}})();const m=document.querySelector(".search-form"),l=document.querySelector(".gallery"),i=document.querySelector(".load-more");let a=1,d;i.style.display="none";function y(o){o.preventDefault(),d=o.target.elements.searchQuery.value,l.innerHTML="",u(d).then(t=>{t.data.hits.length!==0?(i.style.display="block",l.insertAdjacentHTML("beforeend",f(t.data.hits)),a=1):(i.style.display="none",console.log("Sorry, there are no images matching your search query. Please try again."))}).catch(t=>{console.log("Error:",t)})}m.addEventListener("submit",y);function h(){a+=1,console.log(a),u(d,a).then(o=>{const t=Math.ceil(o.data.totalHits/40);a>=t&&(console.log("We're sorry, but you've reached the end of search results."),i.style.display="none"),l.insertAdjacentHTML("beforeend",f(o.data.hits))}).catch(o=>{console.log("Error:",o)})}i.addEventListener("click",h);async function u(o,t){return await p.get(`https://pixabay.com/api/?key=41245265-a97abc6deb4aa48b974617d51&q=${o}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${t}`).then(n=>n).catch(n=>{throw new Error(n)})}function f(o){return o.map(({webformatURL:t,tags:n,likes:c,views:e,comments:r,downloads:s})=>`
    <div class="photo-card">
    <img src="${t}" alt="${n}"loading="lazy" class="gallery__image"/>
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
            <b>Downloads ${s}</b>
            </p>
        </div>
    </div>
    `).join("")}
//# sourceMappingURL=commonHelpers.js.map