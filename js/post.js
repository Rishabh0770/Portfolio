const slug=new URLSearchParams(location.search).get('slug');
const sorted=[...POSTS].sort((a,b)=>b.date.localeCompare(a.date));
const k=sorted.findIndex(p=>p.slug===slug),app=$('#app');
if(k<0){document.title='Post not found';app.innerHTML=`<a class="back" href="blog.html"><i class="bi bi-arrow-left"></i> All posts</a><h1 class="pg-title">Post not found</h1><p class="sub">That post doesn't exist. <a href="blog.html" style="text-decoration:underline">See all posts</a>.</p>`}
else{
 const p=sorted[k],newer=sorted[k-1],older=sorted[k+1];
 document.title=`${p.title} | Rishav Kumar`;
 app.innerHTML=`<article class="post">
  <a class="back rv" href="blog.html"><i class="bi bi-arrow-left"></i> All posts</a>
  <div class="meta rv">${fmtDate(p.date)} · ${readTime(p)} min read</div>
  <h1 class="pg-title rv">${p.title}</h1>
  <div class="chips rv" style="margin:12px 0 28px">${p.tags.map(t=>`<span class="chip sm">${t}</span>`).join('')}</div>
  <div class="prose rv">${p.content}</div>
  <div class="pn rv">${older?`<a href="post.html?slug=${older.slug}"><small><i class="bi bi-arrow-left"></i> Older</small>${older.title}</a>`:'<span></span>'}${newer?`<a href="post.html?slug=${newer.slug}" style="text-align:right"><small>Newer <i class="bi bi-arrow-right"></i></small>${newer.title}</a>`:'<span></span>'}</div>
 </article>`;
 observe();
}
