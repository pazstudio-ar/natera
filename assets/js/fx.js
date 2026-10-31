// ===== Efectos de la "selva viva": luciérnagas, hojas que caen y cinta de nombres =====
// Se apagan solos si la persona pidió "reducir movimiento". Para sacarlos, borrá este archivo
// y la línea <script src="assets/js/fx.js"> del index.html.
(function(){
'use strict';
var calm=window.matchMedia&&matchMedia('(prefers-reduced-motion:reduce)').matches;
var small=window.innerWidth<700;
var rnd=function(a,b){return a+Math.random()*(b-a)};
var LEAF='<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M52 10C26 8 10 22 12 44c0 3 1 6 3 8 22 0 38-14 37-42z"/></svg>';

// cinta con los nombres de los productos (sale de products.js, no hay que tocarla a mano)
var track=document.getElementById('track');
if(track&&typeof PRODUCTS!=='undefined'){
  var one='<span>'+PRODUCTS.map(function(p){return p.name+LEAF}).join('')+'</span>';
  track.innerHTML=one+one;
  if(calm)track.style.animation='none';
}
if(calm)return;

// luciérnagas
var ff=document.getElementById('fireflies');
if(ff){
  var n=small?12:26,s='';
  for(var i=0;i<n;i++){
    s+='<i style="--x:'+rnd(2,98).toFixed(1)+'%;--y:'+rnd(8,96).toFixed(1)+'%;--s:'+rnd(3,6).toFixed(1)+'px;--dx:'+rnd(-70,70).toFixed(0)+'px;--dy:'+rnd(-90,40).toFixed(0)+'px;--t:'+rnd(7,15).toFixed(1)+'s;--d:-'+rnd(0,14).toFixed(1)+'s"></i>';
  }
  ff.innerHTML=s;
}

// hojitas que caen despacio
var dr=document.getElementById('drift');
if(dr){
  var m=small?4:9,h='',cols=['#C6E36E','#86A24A','#A9C75A','#E0925B'];
  for(var j=0;j<m;j++){
    h+='<svg viewBox="0 0 64 64" aria-hidden="true" style="--x:'+rnd(0,96).toFixed(1)+'%;--s:'+rnd(14,28).toFixed(0)+'px;--t:'+rnd(20,34).toFixed(1)+'s;--d:-'+rnd(0,30).toFixed(1)+'s;--c:'+cols[j%cols.length]+'"><path d="M52 10C26 8 10 22 12 44c0 3 1 6 3 8 22 0 38-14 37-42z"/></svg>';
  }
  dr.innerHTML=h;
}
})();
