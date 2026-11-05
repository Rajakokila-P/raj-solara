import { aircraft, filterAircraft, validDesign, energy } from './model.js';
import { plane } from './art.js';
const $ = id => document.getElementById(id);
const selected = new Set();
const KEY = 'aether-solara-designs-v1';
let saved = [], persistent = true;
/** Reject unsupported browser-storage values, limiting retained records. */
function clean(value) {
  if (!Array.isArray(value)) return [];
  return value.filter(validDesign).slice(0,6).map(({model,finish,cabin})=>({model,finish,cabin}));
}
try { saved = clean(JSON.parse(localStorage.getItem(KEY)||'[]')); } catch { persistent=false; }
function storageNote() { $('storage-note').textContent=persistent?'Saved in this browser. Maximum six designs.':'Storage unavailable or unreadable. Changes stay in memory until reload; download a brief to keep a copy.'; }
function persist() {
  try { localStorage.setItem(KEY,JSON.stringify(saved)); persistent=true; } catch { persistent=false; }
  storageNote();
}
function button(text,action) { const b=document.createElement('button'); b.type='button'; b.textContent=text; b.addEventListener('click',action); return b; }
function current() { return {model:$('model').value,finish:$('finish').value,cabin:$('cabin').value}; }
function description(d) { return `${aircraft.find(a=>a.id===d.model).name} / ${d.finish} / ${d.cabin}`; }
for (const id of ['model','energy-model']) for (const a of aircraft) { const o=document.createElement('option'); o.value=a.id; o.textContent=a.name; $(id).append(o); }
$('hero-art').innerHTML='<img src="assets/solara-british-aircraft.png" width="1672" height="941" alt="Modern fictional solar aircraft in navy blue, red and white with a Union Jack on its tail">';
function renderCards() {
  const matches=filterAircraft($('search').value,$('mission').value);
  $('results').textContent=matches.length?`${matches.length} of ${aircraft.length} concepts`:'No matching aircraft. Try another search or reset the filters.';
  $('cards').replaceChildren();
  for (const a of matches) {
    const card=document.createElement('article'); card.className='card';
    const art=document.createElement('div'); art.className='card-art'; art.innerHTML='<img src="assets/solara-british-aircraft.png" width="1672" height="941" loading="lazy" alt="Shared British-livery aircraft concept illustration">';
    const type=document.createElement('p'); type.className='tag'; type.textContent=a.type+' / CONCEPT';
    const h=document.createElement('h3'); h.textContent=a.name;
    const p=document.createElement('p'); p.textContent=a.description;
    const actions=document.createElement('div'); actions.className='actions';
    const compare=button((selected.has(a.id)?'Remove ':'Compare ')+a.name,()=>{
      if(selected.has(a.id)) selected.delete(a.id); else if(selected.size<3) selected.add(a.id); else { $('compare-status').textContent='Three-concept limit reached. Remove one before adding another.'; return; }
      compare.textContent=(selected.has(a.id)?'Remove ':'Compare ')+a.name;
      compare.setAttribute('aria-pressed',String(selected.has(a.id))); renderComparison();
    }); compare.setAttribute('aria-pressed',String(selected.has(a.id)));
    actions.append(compare,button('Design '+a.name,()=>{ $('model').value=a.id; updatePreview(); location.hash='studio'; $('model').focus(); }));
    card.append(art,type,h,p,actions); $('cards').append(card);
  }
}
function renderComparison() {
  $('comparison').replaceChildren(); $('compare-status').textContent=selected.size?`${selected.size} aircraft selected.`:'Select up to three aircraft.';
  $('clear').disabled=!selected.size;
  if(!selected.size) return;
  const table=document.createElement('table'); const caption=table.createCaption(); caption.textContent='Invented design assumptions, not certified specifications';
  const rows=[['Aircraft',...aircraft.filter(a=>selected.has(a.id)).map(a=>a.name)],['Mission',...aircraft.filter(a=>selected.has(a.id)).map(a=>a.type)],['Proposed seats',...aircraft.filter(a=>selected.has(a.id)).map(a=>a.seats)],['Battery assumption (kWh)',...aircraft.filter(a=>selected.has(a.id)).map(a=>a.battery)],['Solar area assumption (m²)',...aircraft.filter(a=>selected.has(a.id)).map(a=>a.area)]];
  rows.forEach((row,i)=>{const tr=table.insertRow();row.forEach((value,j)=>{const cell=document.createElement(i===0||j===0?'th':'td');if(i===0||j===0)cell.scope=i===0?'col':'row';cell.textContent=String(value);tr.append(cell);});}); $('comparison').append(table);
}
function updatePreview() { const d=current(); $('preview').innerHTML=plane(d.finish,d.cabin); $('summary').textContent=description(d); }
function renderSaved() {
  $('saved').replaceChildren(); $('saved-count').textContent=`${saved.length} / 6`;
  if(!saved.length) $('saved').textContent='No saved designs yet.';
  saved.forEach((d,index)=>{const item=document.createElement('div');item.className='saved-item';const p=document.createElement('p');p.textContent=description(d);
    item.append(p,button('Open design '+(index+1),()=>{for(const key of ['model','finish','cabin'])$(key).value=d[key];updatePreview();$('model').focus();$('save-status').textContent='Saved design opened.';}),button('Delete design '+(index+1),()=>{saved.splice(index,1);persist();renderSaved();$('save').focus();$('save-status').textContent='Design deleted.';}));$('saved').append(item);});
}
$('save').addEventListener('click',()=>{const d=current();if(!validDesign(d))return;
  if(saved.some(s=>description(s)===description(d))) {$('save-status').textContent='This design is already saved.';return;}
  if(saved.length>=6){$('save-status').textContent='Six-design limit reached. Delete a design first.';return;}
  saved.push(d);persist();renderSaved();$('save-status').textContent=persistent?'Design saved in this browser.':'Design saved in memory only.';
});
$('download').addEventListener('click',()=>{const blob=new Blob([`RAJ SOLARA — FICTIONAL CONCEPT BRIEF\n${description(current())}\nEducational design only. No certified aircraft performance.\n`],{type:'text/plain'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='raj-solara-brief.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);$('save-status').textContent='Brief download requested.';});
function updateEnergy() {
  $('charge-value').textContent=$('charge').value+'%';$('sun-value').textContent=$('sun').value+'%';
  if(!$('demand').checkValidity()) {$('energy-error').textContent='Enter a demand between 10 and 200 kW.';$('metrics').replaceChildren();return;}
  $('energy-error').textContent='';const a=aircraft.find(x=>x.id===$('energy-model').value);
  const r=energy({battery:a.battery,area:a.area,charge:Number($('charge').value),sun:Number($('sun').value),demand:Number($('demand').value)});
  $('metrics').replaceChildren();
  for(const [label,value,unit] of [['Solar contribution',r.solar.toFixed(2),'kW'],['Available energy',r.available.toFixed(1),'kWh'],['Net battery demand',r.net.toFixed(2),'kW'],['Illustrative endurance',r.hours===null?'N/A':r.hours.toFixed(2),'hours • simplified model']]) {const d=document.createElement('div');d.className='metric';const l=document.createElement('span');l.textContent=label;const v=document.createElement('strong');v.textContent=value;const u=document.createElement('span');u.textContent=unit;d.append(l,v,u);$('metrics').append(d);}
}
const topics={form:['◇','Curved wings. A silver design language.','Your BR101 presentation proposes curved wings and a reflective silver skin. The site presents their intended aerodynamic and thermal roles; no measured lift, drag or thermal performance is available.'],satellite:['↗','A link beyond the horizon.','BR101 proposes satellite communication for mission updates and data transfer beyond local radio coverage. Coverage, delay, bandwidth, weather and loss of connection remain design constraints. Try the delayed-link demonstration below.'],sensing:['◉','Observe. Interpret. Reassess.','Your concept combines optical and thermal imaging with environmental sensing and obstacle awareness. Proposed onboard processing would reassess routes. This website uses illustrative scenarios only; it contains no real sensor feed or flight-control commands.'],solar:['☀','Every surface asks a question.','Wing-mounted solar panels are a design proposal. Their contribution depends on illumination and available area. Explore those assumptions in the energy lab.'],battery:['▤','Store energy. Understand the limits.','The rechargeable battery pack is an onboard energy store, not a consumer power bank. This concept does not establish battery mass, cooling, charging time or airworthiness.'],autonomy:['◎','Autonomous does not mean unsupervised.','The proposed concept has no onboard pilot. It imagines remote human oversight, redundant sensing and defined contingency procedures. No autonomous flight system is implemented or certified in this website.']};
function showTopic(key) {const [symbol,title,text]=topics[key];$('topic').replaceChildren();for(const [tag,value] of [['div',symbol],['h3',title],['p',text]]){const e=document.createElement(tag);e.textContent=value;if(tag==='div'){e.className='symbol';e.setAttribute('aria-hidden','true');}$('topic').append(e);} }
$('topics').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;for(const item of $('topics').querySelectorAll('button'))item.setAttribute('aria-pressed',String(item===b));showTopic(b.dataset.topic);});
$('enquiry').addEventListener('submit',e=>{e.preventDefault();const fields=[$('name'),$('email'),$('message')];for(const f of fields)f.removeAttribute('aria-invalid');
  const bad=fields.find(f=>!f.checkValidity()||(f.id==='name'&&!f.value.trim())||(f.id==='message'&&f.value.trim().length<10));
  if(bad){bad.setAttribute('aria-invalid','true');bad.setAttribute('aria-describedby','form-status');$('form-status').textContent=bad.id==='name'?'Enter a name.':bad.id==='email'?'Enter a valid email address.':'Enter an idea of 10–1,000 characters.';bad.focus();return;}
  $('form-status').textContent='Your enquiry passed validation. Demonstration only: nothing was sent or stored.';
});
for(const id of ['model','finish','cabin'])$(id).addEventListener('change',updatePreview);
for(const id of ['charge','sun','demand'])$(id).addEventListener('input',updateEnergy);
$('energy-model').addEventListener('change',()=>{$('demand').value=aircraft.find(a=>a.id===$('energy-model').value).demand;updateEnergy();});
$('search').addEventListener('input',renderCards);$('mission').addEventListener('change',renderCards);
$('reset').addEventListener('click',()=>{$('search').value='';$('mission').value='All';renderCards();});
$('clear').addEventListener('click',()=>{selected.clear();renderCards();renderComparison();$('search').focus();});
/** Cross-tab events are asynchronous. Concurrent writes are last-writer-wins. */
window.addEventListener('storage',event=>{if(event.key!==KEY&&event.key!==null)return;try{saved=clean(JSON.parse(event.newValue||'[]'));}catch{saved=[];}renderSaved();$('save-status').textContent='Saved designs updated from another tab.';});
$('demand').value=aircraft[0].demand;
renderCards();renderComparison();updatePreview();renderSaved();storageNote();updateEnergy();showTopic('solar');
