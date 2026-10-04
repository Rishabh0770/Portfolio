const id=new URLSearchParams(location.search).get('id');
const i=PROJECTS.findIndex(p=>p.slug===id),app=$('#app');
if(i<0){document.title='Project not found';app.innerHTML=`<a class="back" href="index.html#projects"><i class="bi bi-arrow-left"></i> All projects</a><h1 class="pg-title">Project not found</h1><p class="sub">That project doesn't exist. <a href="index.html#projects" style="text-decoration:underline">Browse all projects</a>.</p>`}
else{
 const p=PROJECTS[i],prev=PROJECTS[(i-1+PROJECTS.length)%PROJECTS.length],next=PROJECTS[(i+1)%PROJECTS.length];
 const related=PROJECTS.filter(x=>x.cat===p.cat&&x.slug!==p.slug).slice(0,3);
 const catName={commerce:'Business & E-commerce',creative:'Portfolios & Creative',platforms:'Platforms & Communities',tools:'Apps & Tools'}[p.cat];
 document.title=`${p.t} | Rishav Kumar`;
 app.innerHTML=`
 <a class="back rv" href="index.html#projects"><i class="bi bi-arrow-left"></i> All projects</a>
 <h1 class="pg-title rv">${p.t}${p.ongoing?' <span class="badge">Ongoing</span>':''}</h1>
 <p class="sub rv">${catName}</p>
 <div class="shot rv"><div class="dots"><i></i><i></i><i></i></div><img src="${p.img}" alt="${p.t} preview"></div>
 <div class="detail">
  <div class="rv"><h2>Overview</h2><p class="lead">${p.d}</p>${p.long?`<p class="lead">${p.long}</p>`:''}
   ${p.work&&p.work.length?`<h2>What I did</h2><ul class="feat">${p.work.map(f=>`<li>${f}</li>`).join('')}</ul>`:''}
   ${p.features&&p.features.length?`<h2 style="margin-top:28px">Key features</h2><ul class="feat">${p.features.map(f=>`<li>${f}</li>`).join('')}</ul>`:''}</div>
  <aside class="box rv"><h3>Project info</h3>
   <dl>${p.client?`<dt>Client</dt><dd>${p.client}</dd>`:''}<dt>Category</dt><dd>${catName}</dd><dt>Status</dt><dd>${p.status}</dd><dt>Tech stack</dt><dd class="chips">${p.tags.map(t=>`<span class="chip sm">${t}</span>`).join('')}</dd></dl>
   <div class="stack">${p.live?`<a class="btn fill" href="${p.live}" target="_blank" rel="noopener"><i class="bi bi-box-arrow-up-right"></i> Live site</a>`:''}${p.gh?`<a class="btn" href="${p.gh}" target="_blank" rel="noopener"><i class="bi bi-github"></i> Source code</a>`:''}${(p.social||[]).map(s=>`<a class="btn" href="${s.u}" target="_blank" rel="noopener"><i class="bi bi-${/facebook/.test(s.u)?"facebook":"instagram"}"></i> ${s.l}</a>`).join('')}</div>
  </aside>
 </div>
 <div class="pn rv"><a href="project.html?id=${prev.slug}"><small><i class="bi bi-arrow-left"></i> Previous</small>${prev.t}</a><a href="project.html?id=${next.slug}" style="text-align:right"><small>Next <i class="bi bi-arrow-right"></i></small>${next.t}</a></div>
 ${related.length?`<h2 class="rv" style="margin:48px 0 18px">More like this</h2><div class="grid">${related.map(projectCard).join('')}</div>`:''}`;
 observe();
}
