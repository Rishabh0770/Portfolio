// Home page only
const CATS={all:'All',commerce:'Business & E-commerce',creative:'Portfolios & Creative',platforms:'Platforms & Communities',tools:'Apps & Tools'};
const grid=$('#grid'),fl=$('#filters');
fl.innerHTML=Object.entries(CATS).map(([k,v])=>`<button data-k="${k}" class="${k==='all'?'on':''}">${v} (${k==='all'?PROJECTS.length:PROJECTS.filter(p=>p.cat===k).length})</button>`).join('');
function render(k){grid.innerHTML=PROJECTS.filter(p=>k==='all'||p.cat===k).map(projectCard).join('');observe()}
fl.onclick=e=>{const b=e.target.closest('button');if(!b)return;$$('button',fl).forEach(x=>x.classList.toggle('on',x===b));render(b.dataset.k)};
render('all');
$('#latest').innerHTML=[...POSTS].sort((a,b)=>b.date.localeCompare(a.date)).slice(0,3).map(postCard).join('');observe();
const certTrack=$('#cert-track'),certCards=$$('.cert',certTrack),certCount=$('#cert-count'),certProgress=$('#cert-progress'),certProgressBar=$('.cert-progress'),certPrev=$('#cert-prev'),certNext=$('#cert-next');
if(certTrack&&certCards.length&&certCount&&certProgress&&certProgressBar&&certPrev&&certNext){
 const updateCertCarousel=()=>{
  const maxScroll=certTrack.scrollWidth-certTrack.clientWidth;
  const step=certCards[0].getBoundingClientRect().width+parseFloat(getComputedStyle(certTrack).gap);
  const current=Math.min(certCards.length,Math.round(certTrack.scrollLeft/step)+1);
  certCount.innerHTML=`${String(current).padStart(2,'0')} <span>/ ${String(certCards.length).padStart(2,'0')}</span>`;
  const progress=maxScroll>0?Math.round(certTrack.scrollLeft/maxScroll*100):100;
  certProgress.style.width=`${progress}%`;
  certProgressBar.setAttribute('aria-valuenow',String(progress));
  certPrev.disabled=certTrack.scrollLeft<=2;
  certNext.disabled=certTrack.scrollLeft>=maxScroll-1;
 };
 const scrollCerts=direction=>{
  const step=certCards[0].getBoundingClientRect().width+parseFloat(getComputedStyle(certTrack).gap);
  certTrack.scrollBy({left:step*direction,behavior:'smooth'});
 };
 certPrev.addEventListener('click',()=>scrollCerts(-1));
 certNext.addEventListener('click',()=>scrollCerts(1));
 certTrack.addEventListener('scroll',updateCertCarousel,{passive:true});
 let dragStartX=0,dragStartScroll=0,isDragging=false,suppressClick=false,suppressClickTimer;
 certTrack.addEventListener('pointerdown',event=>{
  if(event.pointerType!=='mouse'||event.button!==0)return;
  dragStartX=event.clientX;
  dragStartScroll=certTrack.scrollLeft;
  isDragging=false;
  addEventListener('pointermove',dragCerts);
  addEventListener('pointerup',stopDragging,{once:true});
  addEventListener('pointercancel',stopDragging,{once:true});
 });
 function dragCerts(event){
  const distance=event.clientX-dragStartX;
  if(!isDragging&&Math.abs(distance)<6)return;
  isDragging=true;
  certTrack.classList.add('is-dragging');
  certTrack.scrollLeft=dragStartScroll-distance;
  event.preventDefault();
 }
 function stopDragging(){
  removeEventListener('pointermove',dragCerts);
  removeEventListener('pointerup',stopDragging);
  removeEventListener('pointercancel',stopDragging);
  certTrack.classList.remove('is-dragging');
  if(isDragging){
   suppressClick=true;
   clearTimeout(suppressClickTimer);
   suppressClickTimer=setTimeout(()=>{suppressClick=false},300);
  }
  isDragging=false;
 }
 certTrack.addEventListener('click',event=>{
  if(!suppressClick)return;
  event.preventDefault();
  event.stopPropagation();
  suppressClick=false;
  clearTimeout(suppressClickTimer);
 },true);
 certTrack.addEventListener('dragstart',event=>event.preventDefault());
 addEventListener('resize',updateCertCarousel);
 updateCertCarousel();
}
// active nav link
const secs=$$('section[id]'),navA=$$('.links a');
addEventListener('scroll',()=>{let c='';secs.forEach(s=>{if(scrollY>=s.offsetTop-120)c=s.id});navA.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='index.html#'+c))},{passive:true});
// document lightbox
const lb=$('#lb'),lbimg=$('#lbimg');
const closeLb=()=>{lb.hidden=true;document.body.style.overflow=''};
document.addEventListener('click',e=>{const t=e.target.closest('[data-doc]');if(!t)return;const image=t.querySelector('.im img');if(!image)return;lbimg.src=image.src;lbimg.alt=image.alt;lb.hidden=false;document.body.style.overflow='hidden'});
lb.addEventListener('click',closeLb);addEventListener('keydown',e=>{if(e.key==='Escape')closeLb()});
