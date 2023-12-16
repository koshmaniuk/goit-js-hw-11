import{S as u,a as m,T as f}from"./assets/vendor-c7630d1d.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&l(n)}).observe(document,{childList:!0,subtree:!0});function a(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function l(e){if(e.ep)return;e.ep=!0;const r=a(e);fetch(e.href,r)}})();const h=document.querySelector(".search-form"),d=document.querySelector(".gallery"),c=document.querySelector(".load-more");let s=1,i;c.style.display="none";function b(){f({text:"Sorry, there are no images matching your search query. Please try again.",className:"info",style:{background:"linear-gradient(to right, #00b09b, #96c93d)"}}).showToast()}function L(){f({text:"We're sorry, but you've reached the end of search results.",className:"info",style:{background:"linear-gradient(to right, #00b09b, #96c93d)"}}).showToast()}function v(o){o.preventDefault(),i=o.target.elements.searchQuery.value,d.innerHTML="",p(i).then(t=>{t.data.hits.length!==0&&i!==""&&i!==" "?(c.style.display="block",d.insertAdjacentHTML("beforeend",y(t.data.hits)),s=1,new u(".gallery__link",{captionsData:"alt",captionDelay:250})):(c.style.display="none",b())}).catch(t=>{console.log("Error:",t)})}h.addEventListener("submit",v);function w(){s+=1,console.log(s),p(i,s).then(o=>{const t=Math.ceil(o.data.totalHits/40);s>=t&&(L(),c.style.display="none"),d.insertAdjacentHTML("beforeend",y(o.data.hits)),new u(".gallery__link",{captionsData:"alt",captionDelay:250})}).catch(o=>{console.log("Error:",o)})}c.addEventListener("click",w);async function p(o,t){return await m.get(`https://pixabay.com/api/?key=41245265-a97abc6deb4aa48b974617d51&q=${o}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${t}`).then(a=>a).catch(a=>{throw new Error(a)})}function y(o){return o.map(({webformatURL:t,largeImageURL:a,tags:l,likes:e,views:r,comments:n,downloads:g})=>`
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
            <b>Comments ${n}</b>
            </p>
            <p class="info-item">
            <b>Downloads ${g}</b>
            </p>
        </div>
    </div>
    `).join("")}
//# sourceMappingURL=commonHelpers.js.map
