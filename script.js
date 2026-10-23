'use strict';
const KEY='odyssey-pilipinas-island-search-v1';
const cols=['A','B','C','D','E','F'];
const cells=document.getElementById('cells');
const count=document.getElementById('count');
const undo=document.getElementById('undo');
const reset=document.getElementById('reset');
const status=document.getElementById('status');
const all=Array.from({length:5},(_,r)=>cols.map(c=>c+(r+1))).flat();
let history=[];
try{const stored=JSON.parse(localStorage.getItem(KEY)||'[]');if(Array.isArray(stored)){history=[...new Set(stored.filter(x=>typeof x==='string'&&all.includes(x)))];}}catch(_){history=[];}
// Clickable squares align to the bamboo grid on the 1536 x 1024 artwork.
const IMAGE_WIDTH=1536, IMAGE_HEIGHT=1024;
const bounds={left:218,top:288,width:1189,height:627};
function save(){try{localStorage.setItem(KEY,JSON.stringify(history));}catch(_){status.textContent='Browser storage unavailable. Progress may not survive refresh.';}}
function render(){count.textContent=`${history.length} / 30`;undo.disabled=history.length===0;reset.disabled=history.length===0;document.querySelectorAll('.cell').forEach(el=>{const selected=history.includes(el.dataset.coord);el.classList.toggle('searched',selected);el.setAttribute('aria-pressed',String(selected));el.setAttribute('aria-label',`${el.dataset.coord}: ${selected?'searched':'not searched'}`);el.innerHTML=selected?'<span class="dig" aria-hidden="true"><span class="pit"></span><span class="dig-mark">✕</span></span>':'';});}
for(let r=0;r<5;r++)for(let c=0;c<6;c++){const coord=cols[c]+(r+1);const el=document.createElement('button');el.type='button';el.className='cell';el.dataset.coord=coord;el.style.left=`${(bounds.left+bounds.width*c/6)/IMAGE_WIDTH*100}%`;el.style.top=`${(bounds.top+bounds.height*r/5)/IMAGE_HEIGHT*100}%`;el.style.width=`${bounds.width/6/IMAGE_WIDTH*100}%`;el.style.height=`${bounds.height/5/IMAGE_HEIGHT*100}%`;el.addEventListener('click',()=>{if(history.includes(coord)){history=history.filter(x=>x!==coord);save();render();status.textContent=`${coord} cleared. This square can be searched again.`;return;}history.push(coord);save();render();status.textContent=`${coord} marked searched.`;});cells.appendChild(el);}
undo.addEventListener('click',()=>{if(!history.length)return;const coord=history.pop();save();render();status.textContent=`Removed search marker from ${coord}.`;});
reset.addEventListener('click',()=>{if(!history.length)return;if(!window.confirm('Reset all searched squares? This cannot be undone.'))return;history=[];save();render();status.textContent='Board reset. All 30 squares are available.';});
render();
