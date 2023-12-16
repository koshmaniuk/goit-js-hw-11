import{a as y,T as u}from"./assets/vendor-90820ce8.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&l(s)}).observe(document,{childList:!0,subtree:!0});function a(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function l(e){if(e.ep)return;e.ep=!0;const r=a(e);fetch(e.href,r)}})();const g=document.querySelector(".search-form"),d=document.querySelector(".gallery"),c=document.querySelector(".load-more");let n=1,i;c.style.display="none";function h(){u({text:"Sorry, there are no images matching your search query. Please try again.",className:"info",style:{background:"linear-gradient(to right, #00b09b, #96c93d)"}}).showToast()}function b(){u({text:"We're sorry, but you've reached the end of search results.",className:"info",style:{background:"linear-gradient(to right, #00b09b, #96c93d)"}}).showToast()}function L(o){o.preventDefault(),i=o.target.elements.searchQuery.value,d.innerHTML="",f(i).then(t=>{t.data.hits.length!==0&&i!==""&&i!==" "?(c.style.display="block",d.insertAdjacentHTML("beforeend",p(t.data.hits)),n=1):(c.style.display="none",h())}).catch(t=>{console.log("Error:",t)})}g.addEventListener("submit",L);function v(){n+=1,console.log(n),f(i,n).then(o=>{const t=Math.ceil(o.data.totalHits/40);n>=t&&(b(),c.style.display="none"),d.insertAdjacentHTML("beforeend",p(o.data.hits))}).catch(o=>{console.log("Error:",o)})}c.addEventListener("click",v);async function f(o,t){return await y.get(`https://pixabay.com/api/?key=41245265-a97abc6deb4aa48b974617d51&q=${o}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${t}`).then(a=>a).catch(a=>{throw new Error(a)})}function p(o){return o.map(({webformatURL:t,largeImageURL:a,tags:l,likes:e,views:r,comments:s,downloads:m})=>`
    <div class="photo-card">
    <a class="gallery__link" href="${a}">
    <img src="${t}" alt="${l}"loading="lazy" class="gallery__image"/>
    </a>
            <div class="info">
            <p class="info-item">
            <b>Likes ${e}</b>
            </p>
            <p class="info-item">
            <b>Views ${r}</b>
            </p>
            <p class="info-item">
            <b>Comments ${s}</b>
            </p>
            <p class="info-item">
            <b>Downloads ${m}</b>
            </p>
        </div>
    </div>
    `).join("")}
//# sourceMappingURL=commonHelpers.js.map
