const $=(s,e=document)=>e.querySelector(s),$$=(s,e=document)=>[...e.querySelectorAll(s)];
// theme
const root=document.documentElement,tbtn=$('#theme');
const setTheme=t=>{root.dataset.theme=t;tbtn.innerHTML=`<i class="bi bi-${t==='dark'?'sun-fill':'moon-fill'}"></i>`;try{localStorage.setItem('theme',t)}catch(e){}};
let saved;try{saved=localStorage.getItem('theme')}catch(e){}
setTheme(saved||'dark');tbtn.onclick=()=>setTheme(root.dataset.theme==='dark'?'light':'dark');
// mobile menu
$('#burger').onclick=()=>$('.links').classList.toggle('open');
$$('.links a').forEach(a=>a.onclick=()=>$('.links').classList.remove('open'));
// projects
const CATS={all:'All',commerce:'Business & E-commerce',creative:'Portfolios & Creative',platforms:'Platforms & Communities',tools:'Apps & Tools'};
const grid=$('#grid'),fl=$('#filters');
fl.innerHTML=Object.entries(CATS).map(([k,v])=>`<button data-k="${k}" class="${k==='all'?'on':''}">${v} (${k==='all'?PROJECTS.length:PROJECTS.filter(p=>p.cat===k).length})</button>`).join('');
function render(k){grid.innerHTML=PROJECTS.filter(p=>k==='all'||p.cat===k).map(p=>`<article class="card rv"><div class="im"><img src="${p.img}" alt="${p.t}" loading="lazy"></div><div class="bd"><h3>${p.t}${p.ongoing?'<span class="badge">Ongoing</span>':''}</h3><p>${p.d}</p><div class="chips">${p.tags.map(t=>`<span class="chip sm">${t}</span>`).join('')}</div><div class="ft">${p.live?`<a href="${p.live}" target="_blank" rel="noopener"><i class="bi bi-box-arrow-up-right"></i> Live</a>`:''}${p.gh?`<a href="${p.gh}" target="_blank" rel="noopener"><i class="bi bi-github"></i> Code</a>`:''}</div></div></article>`).join('');observe()}
fl.onclick=e=>{const b=e.target.closest('button');if(!b)return;$$('button',fl).forEach(x=>x.classList.toggle('on',x===b));render(b.dataset.k)};
// scroll reveal
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
function observe(){$$('.rv:not(.in)').forEach(el=>io.observe(el))}
render('all');
// active nav link
const secs=$$('section[id]'),navA=$$('.links a');
addEventListener('scroll',()=>{let c='';secs.forEach(s=>{if(scrollY>=s.offsetTop-120)c=s.id});navA.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+c))},{passive:true});
$('#yr').textContent=new Date().getFullYear();
