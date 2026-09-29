(function(){
  const $=s=>document.querySelector(s),m=$('#menu'),b=$('#backdrop'),bg=$('#burger');
  const t=o=>{m.classList.toggle('open',o);b.classList.toggle('show',o);bg.setAttribute('aria-expanded',o);document.body.style.overflow=o?'hidden':''};
  bg.onclick=()=>t(true);$('#closeMenu').onclick=b.onclick=()=>t(false);
  addEventListener('keydown',e=>{if(e.key==='Escape')t(false)});
  $('#year').textContent=new Date().getFullYear();
})();