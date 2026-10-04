const $=(s,e=document)=>e.querySelector(s),$$=(s,e=document)=>[...e.querySelectorAll(s)];
const root=document.documentElement,tbtn=$('#theme');
const setTheme=t=>{root.dataset.theme=t;tbtn.innerHTML=`<i class="bi bi-${t==='dark'?'sun-fill':'moon-fill'}"></i>`;try{localStorage.setItem('theme',t)}catch(e){}};
let saved;try{saved=localStorage.getItem('theme')}catch(e){}
setTheme(saved||'dark');tbtn.onclick=()=>setTheme(root.dataset.theme==='dark'?'light':'dark');
$('#burger').onclick=()=>$('.links').classList.toggle('open');
$$('.links a').forEach(a=>a.addEventListener('click',()=>$('.links').classList.remove('open')));
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
function observe(){$$('.rv:not(.in)').forEach(el=>io.observe(el))}
observe();
const yr=$('#yr');if(yr)yr.textContent=new Date().getFullYear();
const fmtDate=d=>new Date(d).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'});
const projectCard=p=>`<article class="card rv"><a class="im" href="project.html?id=${p.slug}"><img src="${p.img}" alt="${p.t}" loading="lazy"></a><div class="bd"><h3><a href="project.html?id=${p.slug}">${p.t}</a>${p.ongoing?'<span class="badge">Ongoing</span>':''}</h3><p>${p.d}</p><div class="chips">${p.tags.map(t=>`<span class="chip sm">${t}</span>`).join('')}</div><div class="ft"><a href="project.html?id=${p.slug}"><i class="bi bi-arrow-right-circle"></i> Details</a>${p.live?`<a href="${p.live}" target="_blank" rel="noopener"><i class="bi bi-box-arrow-up-right"></i> Live</a>`:''}${p.gh?`<a href="${p.gh}" target="_blank" rel="noopener"><i class="bi bi-github"></i> Code</a>`:''}</div></div></article>`;
const postCard=p=>`<article class="card rv"><div class="bd"><div class="meta">${fmtDate(p.date)} · ${readTime(p)} min read</div><h3><a href="post.html?slug=${p.slug}">${p.title}</a></h3><p>${p.excerpt}</p><div class="chips">${p.tags.map(t=>`<span class="chip sm">${t}</span>`).join('')}</div><div class="ft"><a href="post.html?slug=${p.slug}">Read more <i class="bi bi-arrow-right"></i></a></div></div></article>`;
const readTime=p=>Math.max(1,Math.round(p.content.replace(/<[^>]+>/g,' ').split(/\s+/).length/200));
