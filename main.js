(function(){
  const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);
  AOS.init({duration:900,once:true,offset:80,easing:'ease-out-cubic'});
  $('#year').textContent=new Date().getFullYear();

  const nav=$('#nav'); let last=0;
  addEventListener('scroll',()=>{
    const y=scrollY;
    nav.classList.toggle('scrolled',y>60);
    nav.classList.toggle('hide',y>last && y>200 && !$('#menu').classList.contains('open'));
    last=y;
  },{passive:true});

  const menu=$('#menu'), bd=$('#backdrop'), burger=$('#burger');
  const toggle=o=>{menu.classList.toggle('open',o);bd.classList.toggle('show',o);burger.setAttribute('aria-expanded',o);document.body.style.overflow=o?'hidden':''};
  burger.onclick=()=>toggle(true); $('#closeMenu').onclick=bd.onclick=()=>toggle(false);
  $$('#menu a').forEach(a=>a.onclick=()=>toggle(false));
  addEventListener('keydown',e=>{if(e.key==='Escape'){toggle(false);$('#cModal').hidden=true}});

  const slides=$$('.slide'); let i=0;
  setInterval(()=>{slides[i].classList.remove('active');i=(i+1)%slides.length;slides[i].classList.add('active')},6000);

  const loadMap=()=>{const m=$('#map');if(m.querySelector('iframe'))return;
    m.innerHTML='<iframe title="Standort von Stine Photography" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="'+m.dataset.src+'"></iframe>'};
  $('#loadMap').onclick=()=>{const c=getC()||{necessary:true};c.media=true;save(c,false);loadMap()};

  const KEY='stine_cookies', banner=$('#cookie'), modal=$('#cModal');
  const getC=()=>{try{return JSON.parse(localStorage.getItem(KEY))}catch(e){return null}};
  function save(c,close=true){try{localStorage.setItem(KEY,JSON.stringify(c))}catch(e){}
    if(close){banner.hidden=true;modal.hidden=true}
    if(c.media)loadMap()}
  const c0=getC();
  if(c0){if(c0.media)loadMap()}else banner.hidden=false;
  $$('[data-c]').forEach(b=>b.onclick=()=>save(b.dataset.c==='all'?{necessary:true,stats:true,media:true}:{necessary:true,stats:false,media:false}));
  $('#cSettings').onclick=()=>{const c=getC()||{};$('#cStats').checked=!!c.stats;$('#cMedia').checked=!!c.media;modal.hidden=false};
  $('#openCookies').onclick=e=>{e.preventDefault();$('#cSettings').click()};
  $('#cSave').onclick=()=>save({necessary:true,stats:$('#cStats').checked,media:$('#cMedia').checked});
  modal.onclick=e=>{if(e.target===modal)modal.hidden=true};
})();

(function(){
  const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;io.unobserve(e.target);
    const el=e.target,end=+el.dataset.count,t0=performance.now();
    (function f(t){const p=Math.min((t-t0)/1400,1);el.textContent=Math.round(end*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(f)})(t0)}),{threshold:.6});
  $$('.num').forEach(n=>io.observe(n));
  const nums=$$('.count span'),msg=$('#smile'),fl=$('#flash');let busy=false;
  function run(){if(busy)return;busy=true;msg.classList.remove('on');nums.forEach(n=>n.classList.remove('on'));
    nums.forEach((n,k)=>setTimeout(()=>n.classList.add('on'),k*800));
    setTimeout(()=>{msg.classList.add('on');fl.classList.add('go');setTimeout(()=>fl.classList.remove('go'),650);busy=false},2700)}
  $('#buzz').onclick=run;
  const bo=new IntersectionObserver(es=>{if(es[0].isIntersecting){bo.disconnect();setTimeout(run,900)}},{threshold:.5});
  bo.observe($('#buzz'));
  $$('mark').forEach((m,i)=>m.style.transitionDelay=(.3+i*.18)+'s');
})();

if(location.hash==='#cookie-settings')document.querySelector('#cSettings').click();