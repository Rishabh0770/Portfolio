/* Add new posts at the TOP. "content" is plain HTML (h2, p, ul, pre/code). */
const POSTS = [
{slug:"mobile-first-css-responsive-layouts",title:"Mobile-First CSS: How I Build Responsive Layouts",date:"2026-09-20",tags:["CSS","Responsive"],
excerpt:"Start with the smallest screen, then enhance. A simple workflow that keeps CSS short and layouts solid on every device.",
content:`<p>Most of the websites I deliver are opened on a phone first. That's why I write CSS mobile-first: the base styles are for small screens, and I add <code>min-width</code> media queries only when the layout needs more room.</p>
<h2>1. Start with a single column</h2><p>On a phone, almost everything is a vertical stack. If the content reads well in one column, the hard part is done.</p>
<h2>2. Use fluid units</h2><p>Instead of fixed pixel widths, use <code>max-width</code>, percentages and <code>clamp()</code> for text.</p>
<pre><code>h1 { font-size: clamp(2rem, 6vw, 3.5rem); }
.wrap { max-width: 1000px; padding: 0 20px; margin: 0 auto; }</code></pre>
<h2>3. Let grid do the work</h2><p>CSS Grid with <code>auto-fill</code> and <code>minmax()</code> creates card layouts that adapt without a single media query.</p>
<pre><code>.grid { display: grid; gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(290px, 1fr)); }</code></pre>
<h2>4. Add breakpoints only when it breaks</h2><p>Resize the browser slowly. When the design starts to look stretched, that's where a breakpoint belongs, not at a random device width.</p>
<h2>5. Test on a real phone</h2><p>Browser dev tools are great, but touch targets, scroll behaviour and font sizes only feel right on a real device.</p>`},
{slug:"quick-wins-for-90-plus-pagespeed",title:"5 Quick Wins for a 90+ PageSpeed Score",date:"2026-08-30",tags:["Performance","Web"],
excerpt:"Small, practical changes that make static websites load noticeably faster, without changing the design.",
content:`<p>A fast website converts better and ranks better. These are the five checks I run on every client project before delivery.</p>
<h2>1. Compress and resize images</h2><p>Images are usually the heaviest part of a page. Export at the size they are displayed, and use modern formats like WebP where possible.</p>
<h2>2. Lazy-load below-the-fold images</h2><pre><code>&lt;img src="project.png" alt="Project" loading="lazy"&gt;</code></pre>
<h2>3. Load fewer, lighter libraries</h2><p>Every CSS or JS library is an extra request. Remove what you don't use and prefer small libraries over big ones.</p>
<h2>4. Defer non-critical JavaScript</h2><p>Add <code>defer</code> to scripts that don't need to run before the page is visible.</p>
<h2>5. Set width and height on images</h2><p>This reserves space and prevents layout shift while the page loads, which improves the CLS metric.</p>
<p>Run <b>PageSpeed Insights</b> or <b>GTmetrix</b> after each change so you can see what actually helped.</p>`},
{slug:"from-html-css-js-to-react",title:"Learning React After HTML, CSS and JavaScript",date:"2026-08-05",tags:["React","Learning"],
excerpt:"Why I think a strong foundation in plain HTML, CSS and JavaScript makes learning React much easier.",
content:`<p>I started with HTML, CSS, JavaScript and Bootstrap, and I'm now learning React. Here is what has helped me most.</p>
<h2>Fundamentals first</h2><p>React is JavaScript. If you're comfortable with arrays, objects, functions and the DOM, concepts like props and state feel natural.</p>
<h2>Think in components</h2><p>A project card, a navbar, a button: I already repeated these across pages. React lets me write them once and reuse them.</p>
<h2>Build small things</h2><p>Rebuilding a project you already made in vanilla JS is a great exercise, because you already know what the result should look like.</p>
<h2>Keep shipping</h2><p>Learning never really finishes, so I keep delivering client work while I learn, and apply new skills project by project.</p>`}
];
