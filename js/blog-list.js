const sorted=[...POSTS].sort((a,b)=>b.date.localeCompare(a.date));
const tags=['All',...new Set(POSTS.flatMap(p=>p.tags))];
const tg=$('#tags'),box=$('#posts');
tg.innerHTML=tags.map((t,i)=>`<button data-t="${t}" class="${i?'':'on'}">${t}</button>`).join('');
const show=t=>{box.innerHTML=sorted.filter(p=>t==='All'||p.tags.includes(t)).map(postCard).join('');observe()};
tg.onclick=e=>{const b=e.target.closest('button');if(!b)return;$$('button',tg).forEach(x=>x.classList.toggle('on',x===b));show(b.dataset.t)};
show('All');
