// ═══════════════════════════════════════════════════════════════
// FEED CALCULATOR
// ═══════════════════════════════════════════════════════════════
const INTAKE_MAP={'Lekke vir Beeste':{mode:'fixed',g:1200},'Lekke vir Verse':{mode:'fixed',g:680},'Lekke vir Bulle (Crash Course)':{mode:'per100',g:550},'Fosfaatlekke (Somer)':{mode:'fixed',g:170},'Fos/Prot-lekke (Herfs)':{mode:'fixed',g:210},'Lekke vir Skape':{mode:'fixed',g:300}};
function getIntake(cat){ return INTAKE_MAP[cat]||{mode:'fixed',g:500}; }
function calcBags(prod,animals,weight,days){
  const intake=getIntake(prod.category);
  const gTotal=intake.mode==='per100'?(intake.g/100)*weight*animals*days:intake.g*animals*days;
  const bagKg=parseInt(prod.unit)||50;
  return{bags:gTotal/(bagKg*1000),gTotal,bagKg,intake};
}
function renderCalcPicker(){
  const s=(document.getElementById('cp-search')?.value||'').toLowerCase();
  document.getElementById('cp-picker').innerHTML=products.filter(p=>p.name.toLowerCase().includes(s)||p.category.toLowerCase().includes(s)).slice(0,40).map(p=>`<button class="picker-item" onclick="addCalcItem(${p.id})"><span class="picker-name">${escH(p.name)}</span><span class="picker-sub">${p.category} · R${getDiscounted(p).toFixed(2)}/${p.unit}</span></button>`).join('');
}
function addCalcItem(id){
  const p=products.find(x=>x.id===id); if(!p) return;
  if(calcItems.find(i=>i.productId===id)){ closeModal('calc-pick-modal'); return; }
  calcItems.push({productId:id,name:p.name,category:p.category,unit:p.unit,price:getDiscounted(p)});
  closeModal('calc-pick-modal'); renderCalc();
}
function removeCalcItem(id){ calcItems=calcItems.filter(i=>i.productId!==id); renderCalc(); }
function renderCalc(){
  const animals=parseInt(document.getElementById('calc-animals')?.value)||100;
  const weight=parseInt(document.getElementById('calc-weight')?.value)||300;
  const days=parseInt(document.getElementById('calc-days')?.value)||30;
  const totalBags=calcItems.reduce((s,i)=>{ const{bags}=calcBags(i,animals,weight,days); return s+Math.ceil(bags); },0);
  const totalCost=calcItems.reduce((s,i)=>{ const{bags}=calcBags(i,animals,weight,days); return s+Math.ceil(bags)*i.price; },0);
  const costPerAnimalDay=animals>0&&days>0?totalCost/(animals*days):0;
  document.getElementById('calc-totals').innerHTML=`
    <div class="calc-total"><div class="calc-total-lbl">Totaal Sakke</div><span class="calc-total-val accent">${totalBags}</span></div>
    <div class="calc-total"><div class="calc-total-lbl">Totale Koste</div><span class="calc-total-val">R${totalCost.toLocaleString('af-ZA',{minimumFractionDigits:2})}</span></div>
    <div class="calc-total"><div class="calc-total-lbl">Koste/Dier/Dag</div><span class="calc-total-val">R${costPerAnimalDay.toFixed(2)}</span></div>`;
  const el=document.getElementById('calc-list');
  if(!calcItems.length){ el.innerHTML='<div class="empty">🧮 Voeg produkte by om die berekening te begin.</div>'; return; }
  el.innerHTML=calcItems.map(item=>{
    const{bags,bagKg,intake}=calcBags(item,animals,weight,days);
    const bagsR=Math.ceil(bags);
    const cost=bagsR*item.price;
    const gPerDay=intake.mode==='per100'?(intake.g/100)*weight:intake.g;
    const intakeDesc=intake.mode==='per100'?`${intake.g}g / 100kg LG / dag`:`${intake.g}g / kop / dag`;
    const open=expandedItems['calc_'+item.productId];
    return `<div class="calc-card">
      <div class="calc-head" onclick="toggleExpand('calc_${item.productId}');renderCalc()">
        <div style="flex:1"><div class="calc-prod-name">${escH(item.name)}</div><div class="calc-prod-cat">${escH(item.category)}</div></div>
        <div class="calc-result">
          <div class="calc-bags">${bagsR} <span>sakke</span></div>
          <div class="calc-cost">R${cost.toFixed(2)}</div>
        </div>
        <div style="display:flex;flex-direction:column;gap:4px;align-items:center">
          <span>${open?'▲':'▼'}</span>
          <button class="icon-btn red sm" onclick="event.stopPropagation();removeCalcItem(${item.productId})">🗑</button>
        </div>
      </div>
      ${open?`<div class="calc-detail">
        <div class="calc-intake-info">📊 Standaard inname: ${intakeDesc}</div>
        <div class="calc-breakdown">
          <span>${animals} diere</span><span>×</span>
          <span>${Math.round(gPerDay/1000*100)/100}kg/dag</span><span>×</span>
          <span>${days} dae</span><span>=</span>
          <span style="color:var(--accent);font-weight:700">${bagsR} sakke (${bagKg}kg)</span>
        </div>
        <div class="calc-price-line">R${item.price.toFixed(2)} × ${bagsR} sakke = <strong>R${cost.toFixed(2)}</strong></div>
      </div>`:''}
    </div>`;
  }).join('');
}
function exportCalc(){
  const animals=parseInt(document.getElementById('calc-animals')?.value)||100;
  const weight=parseInt(document.getElementById('calc-weight')?.value)||300;
  const days=parseInt(document.getElementById('calc-days')?.value)||30;
  const lines=['LOBOL – Voerberekening',`Datum: ${new Date().toLocaleDateString('af-ZA')}`,`Kudde: ${animals} diere × ${weight}kg × ${days} dae`,'',
    ...calcItems.map(i=>{ const{bags,bagKg}=calcBags(i,animals,weight,days); const br=Math.ceil(bags); return`${i.name} – ${br} sakke (${bagKg}kg) – R${(br*i.price).toFixed(2)}`; }),
    '',`Totaal: ${calcItems.reduce((s,i)=>s+Math.ceil(calcBags(i,animals,weight,days).bags),0)} sakke`,
    `Totale Koste: R${calcItems.reduce((s,i)=>s+Math.ceil(calcBags(i,animals,weight,days).bags)*i.price,0).toLocaleString('af-ZA',{minimumFractionDigits:2})}`];
  dl(lines.join('\n'),'voer_berekening.txt','text/plain');
}
