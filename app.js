'use strict';
(() => {
  const slides = [...document.querySelectorAll('.slide')];
  const names = ['Seu jogo continua aqui', 'O que você pode fazer', 'Active Play e highlights', 'Antes da partida', 'Depois da partida', 'Valor e divisão', 'O que vem depois', 'Dúvidas e acesso'];
  const dots = document.getElementById('dots');
  const menu = document.getElementById('menu');
  let current = 0, reading = false;
  const motion = matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
  function render(index, focus = false) {
    current = Math.max(0, Math.min(index, slides.length - 1));
    slides.forEach((s,i) => { s.hidden = !reading && i !== current; });
    [...dots.children].forEach((b,i) => b.setAttribute('aria-current', String(i === current)));
    document.getElementById('counter').textContent = reading ? 'Voltar ao carrossel ↑' : `${String(current+1).padStart(2,'0')} / 08`;
    document.getElementById('progress').style.width = `${(current+1)/slides.length*100}%`;
    document.getElementById('prev').disabled = current === 0;
    document.getElementById('next').innerHTML = current === slides.length-1 ? 'Início <span aria-hidden="true">↺</span>' : 'Próximo <span aria-hidden="true">→</span>';
    if (!reading) {
      history.replaceState(null, '', `#${slides[current].id}`);
      window.scrollTo({top:0, behavior:'instant'});
      if(focus) { const h=slides[current].querySelector('h1,h2'); h.tabIndex=-1; h.focus({preventScroll:true}); }
    }
  }
  slides.forEach((s,i) => {
    const b=document.createElement('button'); b.setAttribute('aria-label', `Tela ${i+1}: ${names[i]}`); b.addEventListener('click',()=>render(i,true)); dots.append(b);
    const m=document.createElement('button'); m.innerHTML=`<span>${String(i+1).padStart(2,'0')}</span>${names[i]}`;
    m.addEventListener('click',()=>{menu.close();if(reading){s.scrollIntoView({behavior:motion});}else{render(i,true);}});
    document.getElementById('menu-links').append(m);
  });
  document.querySelectorAll('[data-go]').forEach(b=>b.addEventListener('click',()=>{if(reading){slides[+b.dataset.go].scrollIntoView({behavior:motion});}else{render(+b.dataset.go,true);}}));
  document.getElementById('next').addEventListener('click',()=>render(current===slides.length-1?0:current+1,true));
  document.getElementById('prev').addEventListener('click',()=>render(current-1,true));
  document.getElementById('open-menu').addEventListener('click',()=>menu.showModal());
  document.getElementById('close-menu').addEventListener('click',()=>menu.close());
  menu.addEventListener('click',e=>{if(e.target===menu){const r=menu.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)menu.close();}});
  function toggleReading(){reading=!reading;document.body.classList.toggle('reading',reading);document.getElementById('read-all').textContent=reading?'Voltar ao carrossel ↑':'Ler tudo em uma página ↓';menu.close();render(current);window.scrollTo({top:0,behavior:'instant'});}
  document.getElementById('read-all').addEventListener('click',toggleReading);
  document.getElementById('counter').addEventListener('click',()=>{if(reading)toggleReading();});
  document.querySelector('.brand-pair').addEventListener('click',e=>{e.preventDefault();if(reading)toggleReading();render(0,true);});
  document.addEventListener('keydown',e=>{if(menu.open||reading||e.altKey||e.ctrlKey||e.metaKey||/INPUT|TEXTAREA|SELECT/.test(e.target.tagName))return;if(e.key==='ArrowRight'){e.preventDefault();render(Math.min(current+1,7),true);}if(e.key==='ArrowLeft'){e.preventDefault();render(current-1,true);}});
  let start=null;
  document.querySelector('.deck').addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse'&&!e.target.closest('button,a,summary,details'))start={x:e.clientX,y:e.clientY};else start=null;});
  document.querySelector('.deck').addEventListener('pointerup',e=>{if(!start||reading)return;const dx=e.clientX-start.x,dy=e.clientY-start.y;start=null;if(Math.abs(dx)>65&&Math.abs(dx)>Math.abs(dy)*1.8)render(current+(dx<0?1:-1),true);});
  document.querySelector('.deck').addEventListener('pointercancel',()=>{start=null;});
  document.querySelectorAll('[data-players]').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('[data-players]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));document.getElementById('split-price').textContent=new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(25/Number(b.dataset.players));}));
  const full=document.getElementById('full-view'),active=document.getElementById('active-view');
  function timeline(trim){document.getElementById('timeline').classList.toggle('trimmed',trim);full.setAttribute('aria-pressed',String(!trim));active.setAttribute('aria-pressed',String(trim));document.getElementById('timeline-description').textContent=trim?'Só as trocas de bola. Intervalos removidos.':'Pontos + pausas entre as jogadas.';}
  full.addEventListener('click',()=>timeline(false));active.addEventListener('click',()=>timeline(true));
  function fromHash(){const i=slides.findIndex(s=>s.id===location.hash.slice(1));render(i<0?0:i);}
  window.addEventListener('hashchange',fromHash);fromHash();
})();
