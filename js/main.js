// Home page only
const CATS={all:'All',commerce:'Business & E-commerce',creative:'Portfolios & Creative',platforms:'Platforms & Communities',tools:'Apps & Tools'};
const grid=$('#grid'),fl=$('#filters');
fl.innerHTML=Object.entries(CATS).map(([k,v])=>`<button data-k="${k}" class="${k==='all'?'on':''}">${v} (${k==='all'?PROJECTS.length:PROJECTS.filter(p=>p.cat===k).length})</button>`).join('');
function render(k){grid.innerHTML=PROJECTS.filter(p=>k==='all'||p.cat===k).map(projectCard).join('');observe()}
fl.onclick=e=>{const b=e.target.closest('button');if(!b)return;$$('button',fl).forEach(x=>x.classList.toggle('on',x===b));render(b.dataset.k)};
render('all');
$('#latest').innerHTML=[...POSTS].sort((a,b)=>b.date.localeCompare(a.date)).slice(0,3).map(postCard).join('');observe();
// active nav link
const secs=$$('section[id]'),navA=$$('.links a');
addEventListener('scroll',()=>{let c='';secs.forEach(s=>{if(scrollY>=s.offsetTop-120)c=s.id});navA.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='index.html#'+c))},{passive:true});
