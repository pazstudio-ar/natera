(function(){
'use strict';
var $=function(s,r){return (r||document).querySelector(s)};
var $$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
var money=function(n){return '$'+n.toLocaleString('es-AR')};
var WA='https://wa.me/'+CONFIG.whatsapp;
var state={cat:'todos',q:'',cart:{}};
try{state.cart=JSON.parse(localStorage.getItem('natera_cart')||'{}')}catch(e){}
function persist(){try{localStorage.setItem('natera_cart',JSON.stringify(state.cart))}catch(e){}}
function find(s){return PRODUCTS.filter(function(p){return p.slug===s})[0]}
function price(p){return CONFIG.prices[p.cat]}
function esc(t){return String(t).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}

// ---- enlaces
var hello=WA+'?text='+encodeURIComponent('Hola Natera, quiero info y precios 👋');
$$('[data-wa]').forEach(function(a){a.href=hello});
$$('[data-ig]').forEach(function(a){a.href=CONFIG.instagram});
$$('[data-tt]').forEach(function(a){a.href=CONFIG.tiktok});
$('#year').textContent=new Date().getFullYear();

// ---- catálogo
var LEAF='<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M52 10C26 8 10 22 12 44c0 3 1 6 3 8 22 0 38-14 37-42z"/><path d="M14 50C26 38 36 28 46 18" fill="none" stroke="rgba(255,255,255,.8)" stroke-width="2.5" stroke-linecap="round"/></svg>';
function card(p){
  var tag=p.cat==='mix'?'Mix matero':'Hierba pura';
  return '<article class="card" data-cat="'+p.cat+'">'+
    '<div class="pic pic-'+p.cat+'">'+LEAF+'<img src="img/products/'+p.slug+'.webp" alt="'+esc(p.name)+' en pote Natera" width="600" height="600" loading="lazy" onerror="this.remove()">'+
    (p.featured?'<span class="ribbon">La insignia</span>':'')+'</div>'+
    '<div class="body"><span class="tag">'+tag+'</span><h3>'+esc(p.name)+'</h3>'+
    '<ul class="benefits">'+p.benefits.map(function(b){return '<li>'+esc(b)+'</li>'}).join('')+'</ul>'+
    '<details class="more"><summary>Detalle de venta</summary><dl>'+
      '<dt>Presentación</dt><dd>'+CONFIG.packaging+'</dd>'+
      '<dt>Contenido</dt><dd>'+CONFIG.weightNote+'</dd>'+
      '<dt>Precio</dt><dd>'+money(price(p))+' por pote</dd></dl></details>'+
    '<div class="row"><span class="price">'+money(price(p))+'</span><button class="btn small" data-add="'+p.slug+'" aria-label="Agregar '+esc(p.name)+' al pedido">Agregar</button></div></div></article>';
}
function renderGrid(){
  var q=state.q.trim().toLowerCase();
  var list=PRODUCTS.filter(function(p){
    return (state.cat==='todos'||p.cat===state.cat)&&(!q||(p.name+' '+p.benefits.join(' ')).toLowerCase().indexOf(q)>-1)});
  $('#grid').innerHTML=list.length?list.map(card).join(''):'<p class="empty-grid">No encontramos ese yuyo. Escribinos por WhatsApp y te ayudamos a elegir.</p>';
  $('#results').textContent=list.length+(list.length===1?' producto':' productos');
}
$$('[data-filter]').forEach(function(b){b.addEventListener('click',function(){
  state.cat=b.dataset.filter;$$('[data-filter]').forEach(function(x){x.setAttribute('aria-pressed',x===b)});renderGrid()})});
$('#search').addEventListener('input',function(e){state.q=e.target.value;renderGrid()});

// ---- pedido
function total(){return Object.keys(state.cart).reduce(function(t,s){return t+state.cart[s]*price(find(s))},0)}
function count(){return Object.keys(state.cart).reduce(function(t,s){return t+state.cart[s]},0)}
function renderCart(){
  var keys=Object.keys(state.cart).filter(find);
  $('#items').innerHTML=keys.length?keys.map(function(s){var p=find(s);
    return '<div class="it"><div><strong>'+esc(p.name)+'</strong><small>'+money(price(p))+' c/u</small></div>'+
    '<div class="qty"><button data-dec="'+s+'" aria-label="Quitar uno">−</button><b>'+state.cart[s]+'</b><button data-inc="'+s+'" aria-label="Agregar uno">+</button></div></div>'}).join('')
    :'<div class="empty"><p>Tu pedido está vacío.</p><button class="btn small line" data-close>Ver productos</button></div>';
  $('#total').textContent=money(total());
  var n=count();$('#count').textContent=n;$('#count').hidden=!n;
  $('#send').disabled=!n;
  $('#clear').hidden=!n;
}
function open(on){var d=$('#drawer');d.classList.toggle('on',on);$('#scrim').classList.toggle('on',on);d.setAttribute('aria-hidden',!on);document.body.classList.toggle('lock',on);
  if(on){setTimeout(function(){$('#closeCart').focus()},50)}else{$('#openCart').focus()}}
document.addEventListener('click',function(e){
  var t=e.target.closest('button,a');if(!t)return;
  if(t.dataset.add){state.cart[t.dataset.add]=(state.cart[t.dataset.add]||0)+1;persist();renderCart();
    var o=t.textContent;t.textContent='¡Agregado!';t.classList.add('ok');setTimeout(function(){t.textContent=o;t.classList.remove('ok')},900)}
  if(t.dataset.inc){state.cart[t.dataset.inc]++;persist();renderCart()}
  if(t.dataset.dec){state.cart[t.dataset.dec]--;if(state.cart[t.dataset.dec]<=0)delete state.cart[t.dataset.dec];persist();renderCart()}
  if(t.dataset.close!==undefined){open(false);var c=$('#catalogo');if(c)c.scrollIntoView()}
  if(t.id==='navToggle'){var m=$('#menu');var on=m.classList.toggle('on');t.setAttribute('aria-expanded',on)}
  else if(t.closest('#menu')&&t.tagName==='A'){$('#menu').classList.remove('on');$('#navToggle').setAttribute('aria-expanded',false)}
});
$('#openCart').addEventListener('click',function(){open(true)});
$('#closeCart').addEventListener('click',function(){open(false)});
$('#scrim').addEventListener('click',function(){open(false)});
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&$('#drawer').classList.contains('on'))open(false)});

var clearTimer;
$('#clear').addEventListener('click',function(){
  var b=this;
  if(b.dataset.sure){clearTimeout(clearTimer);delete b.dataset.sure;b.textContent='Vaciar pedido';b.classList.remove('sure');
    state.cart={};persist();renderCart();return}
  b.dataset.sure='1';b.textContent='¿Seguro? Tocá de nuevo para vaciar';b.classList.add('sure');
  clearTimer=setTimeout(function(){delete b.dataset.sure;b.textContent='Vaciar pedido';b.classList.remove('sure')},3500);
});
var PAY_MSG={mp:'Mercado Pago (pasame el link de pago)',transfer:'Transferencia (pasame los datos)',cash:'Efectivo'};
function validate(){
  var keys=Object.keys(state.cart).filter(find),name=$('#name').value.trim(),err=$('#err');
  if(!keys.length){err.textContent='Agregá al menos un producto.';return null}
  if(!name){err.textContent='Escribí tu nombre para el pedido.';$('#name').focus();return null}
  err.textContent='';
  return {keys:keys,name:name,zone:$('#zone').value.trim(),note:$('#note').value.trim(),deliv:$('#deliv').value}
}
function orderMessage(o){
  return 'Hola Natera! Soy '+o.name+' y quiero hacer este pedido:\n\n'+
    o.keys.map(function(s){var p=find(s);return '• '+state.cart[s]+' x '+p.name+' - '+money(state.cart[s]*price(p))}).join('\n')+
    '\n\nTotal productos: '+money(total())+'\nEntrega: '+o.deliv+(o.zone?' ('+o.zone+')':'')+'\nPago: '+PAY_MSG[$('#pay').value]+(o.note?'\nNota: '+o.note:'');
}
$('#send').addEventListener('click',function(){
  var o=validate();if(!o)return;
  window.open(WA+'?text='+encodeURIComponent(orderMessage(o)),'_blank','noopener');
});

// ---- aparición suave al scroll
if('IntersectionObserver' in window&&!matchMedia('(prefers-reduced-motion:reduce)').matches){
  var io=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target)}})},{threshold:.12});
  $$('.reveal').forEach(function(el){io.observe(el)});
}else{$$('.reveal').forEach(function(el){el.classList.add('in')})}

renderGrid();renderCart();
})();
