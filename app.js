/* app.js - updated with bug fixes following testing */

// ------------------------------
//  Data (static – bundled client-side)
// ------------------------------
const DATA = {
  companies: [
    {id:"ALJUF",display_name:"Provider A",segment:"Traditional",total_assets:5.49,net_profit:628,core:"Auto & Consumer",license_type:"full finance",products:["Auto","Consumer","SME"],funding:["Bank Lines","Securitisation","Sukuk (planned)"],description:"Largest auto-finance player with expanding cash-finance and SME platform. Floating facilities priced at <span class=\"glossary-term\" data-term=\"SAIBOR\">SAIBOR</span> +150 bp.",recent:"2024 cloud core migration; 2025 AI fraud system.",regulatory:"PDPL compliant; no material fines."},
    {id:"NAYF",display_name:"Provider B",segment:"Traditional",total_assets:2.06,net_profit:131,core:"Consumer & SME",license_type:"full finance",products:["Consumer","SME","Credit Card"],funding:["Bank Lines","Receivable Assignment"],description:"Publicly listed consumer lender with growing SME book.",recent:"Crowdfunding sandbox approval 2024.",regulatory:"IFRS 9 ECL model independently validated."},
    {id:"ALYS",display_name:"Provider C",segment:"Traditional",total_assets:3.95,net_profit:75,core:"Auto & Consumer",license_type:"full finance",products:["Auto","Consumer","SME"],funding:["Syndicated Murabaha"],description:"Captive auto-leasing subsidiary of major automotive group.",recent:"Oracle Fusion rollout 2024; new mobile app 2025.",regulatory:"Sharia committee oversight."},
    {id:"QARA",display_name:"Provider D",segment:"Traditional",total_assets:0.98,net_profit:43,core:"Consumer & SME",license_type:"full finance",products:["Consumer","SME","BNPL aggregation"],funding:["Murabaha","Shareholder Loan"],description:"Digital-first consumer lender doubling equity to fund growth.",recent:"Open-banking rails integration 2025.",regulatory:"SAMA non-objection for dividend payouts."},
    {id:"ALJB",display_name:"Provider E",segment:"Traditional",total_assets:3.95,net_profit:105,core:"Auto",license_type:"full finance",products:["Auto","EV Finance"],funding:["Securitisation","Club Loan"],description:"Kia distributor finance arm; strong in EV financing.",recent:"Planned sukuk issue 2025.",regulatory:"ISO 27001 certified platform."},
    {id:"TAMA",display_name:"Digital F",segment:"Digital",total_assets:null,net_profit:null,core:"BNPL & Consumer",license_type:"digital",products:["BNPL","Longer-tenor Loans","Card"],funding:["Equity $500M","Warehouse Lines"],description:"First Saudi fintech unicorn; 10 m users, 30 k merchants.",recent:"Series C unicorn round 2023; full licence 2025.",regulatory:"First BNPL platform with >SAR5k finance cap."},
    {id:"TABB",display_name:"Digital G",segment:"Digital",total_assets:null,net_profit:null,core:"BNPL & Cards",license_type:"BNPL only",products:["BNPL","Subscription","Card"],funding:["Equity $1.8B","ABS Conduits"],description:"Largest MENA fintech by valuation; IPO planned.",recent:"Series E $160M 2025; Tweeq wallet acquisition.",regulatory:"Graduated from sandbox 2023."},
    {id:"MISF",display_name:"Digital H",segment:"Digital",total_assets:null,net_profit:null,core:"BNPL",license_type:"BNPL only",products:["BNPL","Micro-loans"],funding:["Corporate Facility"],description:"Spin-off from IT group providing BNPL at POS.",recent:"STC loyalty integration 2025.",regulatory:"BNPL permit March 2023."},
    {id:"MADF",display_name:"Digital I",segment:"Digital",total_assets:null,net_profit:null,core:"BNPL",license_type:"BNPL only",products:["BNPL"],funding:["Seed Equity","Sukuk planned"],description:"Fashion & travel BNPL with cashback rewards.",recent:"Sharia certification 2025.",regulatory:"BNPL permit Oct 2024."},
    {id:"SPOT",display_name:"Digital J",segment:"Digital",total_assets:null,net_profit:null,core:"BNPL",license_type:"BNPL only",products:["BNPL"],funding:["Parent Company Warehouse"],description:"Cross-border BNPL subsidiary of global player.",recent:"SAR sukuk localisation study.",regulatory:"BNPL permit Jan 2024."}
  ],
  glossary: [
    {term:"NBFI",definition:"Non-Bank Financial Institution – a licensed lender that is not a deposit-taking bank."},
    {term:"BNPL",definition:"Buy Now Pay Later – short-term instalment financing offered at point of sale, typically interest-free to the customer."},
    {term:"Murabaha",definition:"Sharia-compliant cost-plus sale contract used to structure fixed-profit financing."},
    {term:"Tawarruq",definition:"A Sharia structure allowing a borrower to obtain cash via sequential commodity trades."},
    {term:"Sukuk",definition:"Islamic bond representing ownership in an underlying asset or cashflow."},
    {term:"Securitisation",definition:"Packaging receivables into asset-backed securities sold to investors."},
    {term:"SAIBOR",definition:"Saudi Arabian Interbank Offered Rate – local benchmark for floating-rate loans."},
    {term:"ECL",definition:"Expected Credit Loss – IFRS 9 impairment allowance estimate."},
    {term:"ROA",definition:"Return on Assets – net income divided by total assets."},
    {term:"ROE",definition:"Return on Equity – net income divided by shareholders’ equity."},
    {term:"PDPL",definition:"Saudi Personal Data Protection Law."}
  ]
};

// ------------------------------
//  Helper Shortcuts
// ------------------------------
const $ = (selector, ctx = document) => ctx.querySelector(selector);
const $$ = (selector, ctx = document) => Array.from(ctx.querySelectorAll(selector));
const CHART_COLORS = ['#1FB8CD','#FFC185','#B4413C','#ECEBD5','#5D878F','#DB4545','#D2BA4C','#964325','#944454','#13343B'];

// ------------------------------
//  Navigation Handling (delegated)
// ------------------------------
function initNavigation() {
  const navMenu = $('.nav-menu');
  navMenu.addEventListener('click', e => {
    const btn = e.target.closest('.nav-btn');
    if (!btn) return;

    // Update active nav button
    $$('.nav-btn').forEach(b => b.classList.toggle('active', b === btn));

    // Toggle views
    const target = btn.dataset.view;
    $$('.view').forEach(v => v.classList.toggle('active', v.id === `${target}-view`));
  });
}

// ------------------------------
//  Table Rendering & Sorting
// ------------------------------
let currentSort = {key: 'display_name', asc: true};
let currentCompanies = [...DATA.companies];

function renderTable(data) {
  const tbody = $('#profiles-table-body');
  tbody.innerHTML = '';

  data.forEach(company => {
    const tr = document.createElement('tr');
    tr.dataset.id = company.id;

    const segClass = company.segment === 'Traditional' ? 'traditional' : 'digital';

    tr.innerHTML = `
      <td>${company.display_name}</td>
      <td><span class="segment-badge ${segClass}">${company.segment}</span></td>
      <td class="numeric" title="Total assets as of FY-2024">${company.total_assets !== null ? company.total_assets.toFixed(2) : 'N/A'}</td>
      <td class="numeric" title="Net profit after zakat FY-2024">${company.net_profit !== null ? company.net_profit.toLocaleString() : 'N/A'}</td>
      <td>${company.core}</td>
      <td>${company.license_type}</td>`;

    tr.addEventListener('click', () => openProfile(company));
    tbody.appendChild(tr);
  });

  attachGlossaryHandlers(tbody);
}

function attachSortHandlers() {
  $$('#profiles-table th').forEach(th => {
    th.addEventListener('click', () => {
      const key = th.dataset.sort;
      if (!key) return;
      currentSort.asc = currentSort.key === key ? !currentSort.asc : true;
      currentSort.key = key;
      const sorted = [...currentCompanies].sort((a, b) => {
        const valA = a[key] ?? '';
        const valB = b[key] ?? '';
        if (typeof valA === 'number' && typeof valB === 'number') {
          return currentSort.asc ? valA - valB : valB - valA;
        }
        return currentSort.asc ? String(valA).localeCompare(String(valB)) : String(valB).localeCompare(String(valA));
      });
      currentCompanies = sorted;
      renderTable(sorted);
      updateRowHighlight();
    });
  });
}

// ------------------------------
//  Filter Logic
// ------------------------------
function getActiveFilters() {
  return {
    traditional: $('#filter-traditional').checked,
    digital: $('#filter-digital').checked,
    auto: $('#filter-auto').checked,
    consumer: $('#filter-consumer').checked,
    bnpl: $('#filter-bnpl').checked,
    sme: $('#filter-sme').checked
  };
}

function applyFilters() {
  const f = getActiveFilters();
  const productMap = {auto: 'Auto', consumer: 'Consumer', bnpl: 'BNPL', sme: 'SME'};
  const allowedProducts = Object.keys(productMap).filter(k => f[k]).map(k => productMap[k]);

  return DATA.companies.filter(c => {
    if ((c.segment === 'Traditional' && !f.traditional) || (c.segment === 'Digital' && !f.digital)) return false;
    return c.products.some(p => allowedProducts.some(ap => p.toLowerCase().includes(ap.toLowerCase())));
  });
}

function initFilterHandlers() {
  $$('#profiles-view input[type="checkbox"]').forEach(cb => {
    cb.addEventListener('change', () => {
      currentCompanies = applyFilters();
      renderTable(currentCompanies);
      updateCharts(currentCompanies);
      clearHighlights();
    });
  });
}

// ------------------------------
//  Profile Modal
// ------------------------------
function openProfile(company) {
  const modal = $('#profile-modal');
  $('#modal-title').textContent = company.display_name;
  const body = $('#modal-body');
  body.innerHTML = `
    <section class="profile-section"><h3>Description</h3><p>${company.description}</p></section>
    <section class="profile-section"><h3>Key Metrics</h3>
      <div class="profile-metrics">
        <div class="metric"><span class="metric-value">${company.total_assets !== null ? company.total_assets.toFixed(2) : 'N/A'}</span><span class="metric-label">Assets (SAR bn)</span></div>
        <div class="metric"><span class="metric-value">${company.net_profit !== null ? company.net_profit.toLocaleString() : 'N/A'}</span><span class="metric-label">Net Profit 2024 (SAR m)</span></div>
        <div class="metric"><span class="metric-value">${company.license_type}</span><span class="metric-label">License</span></div>
      </div>
    </section>
    <section class="profile-section"><h3>Products</h3><div class="tag-list">${company.products.map(p=>`<span class="tag">${p}</span>`).join('')}</div></section>
    <section class="profile-section"><h3>Funding Sources</h3><div class="tag-list">${company.funding.map(f=>`<span class="tag">${f}</span>`).join('')}</div></section>
    <section class="profile-section"><h3>Recent Developments</h3><p>${company.recent}</p></section>
    <section class="profile-section"><h3>Regulatory Notes</h3><p>${company.regulatory}</p></section>`;
  attachGlossaryHandlers(body);
  modal.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeProfile() {
  $('#profile-modal').classList.remove('show');
  document.body.style.overflow = '';
  clearHighlights();
}

function initModalHandlers() {
  $('#modal-close').addEventListener('click', closeProfile);
  window.addEventListener('click', e => { if (e.target === $('#profile-modal')) closeProfile(); });
  window.addEventListener('keydown', e => { if (e.key === 'Escape') closeProfile(); });
}

// ------------------------------
//  Charts
// ------------------------------
let marketShareChart, assetsVsProfitChart, productMixChart, fundingChart;

function createMarketShareChart(data) {
  const ctx = $('#marketShareChart');
  const totals = {Traditional: 0, Digital: 0};
  data.forEach(c => { if (typeof c.total_assets === 'number') totals[c.segment] += c.total_assets; });
  marketShareChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: Object.keys(totals),
      datasets: [{label: 'Total Assets (SAR bn)', data: Object.values(totals), backgroundColor: [CHART_COLORS[0], CHART_COLORS[1]]}]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction:{mode:'nearest',intersect:true},
      plugins: {tooltip:{enabled:true}, legend:{display:false}},
      scales:{y:{beginAtZero:true,title:{display:true,text:'SAR bn'}}}
    }
  });
}

function createAssetsVsProfitChart(data) {
  const ctx = $('#assetsVsProfitChart');
  assetsVsProfitChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: data.map(c=>c.display_name),
      datasets:[
        {label:'Assets (SAR bn)', data:data.map(c=>c.total_assets??0), backgroundColor:CHART_COLORS[0]},
        {label:'Net Profit (SAR m)', data:data.map(c=>c.net_profit??0), backgroundColor:CHART_COLORS[2]}
      ]
    },
    options:{responsive:true,maintainAspectRatio:false,interaction:{mode:'nearest',intersect:true},onClick:(evt,elements)=>{
      if(elements.length){const idx=elements[0].index;highlightRowByName(assetsVsProfitChart.data.labels[idx]);}
    }, scales:{y:{beginAtZero:true}}}
  });
}

function createProductMixChart(){
  const ctx=$('#productMixChart');
  productMixChart=new Chart(ctx,{type:'bar',data:{labels:['Auto','Consumer','SME','BNPL'],datasets:[{label:'Traditional Sample',data:[42,35,18,5],backgroundColor:CHART_COLORS[4]},{label:'Digital Sample',data:[0,40,0,60],backgroundColor:CHART_COLORS[5]}]},options:{responsive:true,maintainAspectRatio:false,interaction:{mode:'nearest',intersect:true},scales:{y:{beginAtZero:true,max:100,title:{display:true,text:'% of Income'}}}}});}

function createFundingChart(data){
  const ctx=$('#fundingSourcesChart');
  const counts={};
  data.forEach(c=>c.funding.forEach(f=>{const generic=f.split(' ')[0];counts[generic]=(counts[generic]||0)+1;}));
  fundingChart=new Chart(ctx,{type:'doughnut',data:{labels:Object.keys(counts),datasets:[{data:Object.values(counts),backgroundColor:CHART_COLORS.slice(0,Object.keys(counts).length)}]},options:{responsive:true,maintainAspectRatio:false,interaction:{mode:'nearest',intersect:true},onClick:(evt,elements)=>{if(elements.length){const idx=elements[0].index;highlightRowsByFunding(fundingChart.data.labels[idx]);}}}});
}

function updateCharts(filtered){
  // market share
  const totals={Traditional:0,Digital:0};filtered.forEach(c=>{if(typeof c.total_assets==='number')totals[c.segment]+=c.total_assets;});
  marketShareChart.data.datasets[0].data=Object.values(totals);marketShareChart.update();
  // assets/profit
  assetsVsProfitChart.data.labels=filtered.map(c=>c.display_name);
  assetsVsProfitChart.data.datasets[0].data=filtered.map(c=>c.total_assets??0);
  assetsVsProfitChart.data.datasets[1].data=filtered.map(c=>c.net_profit??0);
  assetsVsProfitChart.update();
  // funding
  const counts={};filtered.forEach(c=>c.funding.forEach(f=>{const generic=f.split(' ')[0];counts[generic]=(counts[generic]||0)+1;}));
  fundingChart.data.labels=Object.keys(counts);
  fundingChart.data.datasets[0].data=Object.values(counts);
  fundingChart.data.datasets[0].backgroundColor=CHART_COLORS.slice(0,Object.keys(counts).length);
  fundingChart.update();
}

// ------------------------------
//  Highlight Helpers
// ------------------------------
function clearHighlights(){$$('#profiles-table tbody tr').forEach(r=>r.classList.remove('highlighted'));}

function highlightRowByName(name){clearHighlights();$$('#profiles-table tbody tr').forEach(r=>{if(r.children[0].textContent===name)r.classList.add('highlighted');});}

function highlightRowsByFunding(type){clearHighlights();$$('#profiles-table tbody tr').forEach(r=>{const company=DATA.companies.find(c=>c.id===r.dataset.id);if(company && company.funding.some(f=>f.startsWith(type))){r.classList.add('highlighted');}});}

function updateRowHighlight(){/* keeps highlight after sort/filter */const highlightedNames=$$('#profiles-table tbody tr.highlighted').map(r=>r.children[0].textContent);clearHighlights();$$('#profiles-table tbody tr').forEach(r=>{if(highlightedNames.includes(r.children[0].textContent))r.classList.add('highlighted');});}

// ------------------------------
//  Glossary Tooltip & Drawer
// ------------------------------
function showTooltip(term,x,y){const tooltip=$('#glossary-tooltip');const entry=DATA.glossary.find(g=>g.term===term);if(!entry)return;$('#tooltip-content').textContent=entry.definition;tooltip.style.left=`${x+12}px`;tooltip.style.top=`${y+12}px`;tooltip.classList.add('show');}
function hideTooltip(){$('#glossary-tooltip').classList.remove('show');}
function attachGlossaryHandlers(container=document){$$('.glossary-term',container).forEach(el=>{const term=el.dataset.term;const entry=DATA.glossary.find(g=>g.term===term);if(!entry)return;el.addEventListener('mouseenter',e=>showTooltip(term,e.pageX,e.pageY));el.addEventListener('mousemove',e=>showTooltip(term,e.pageX,e.pageY));el.addEventListener('mouseleave',hideTooltip);el.addEventListener('click',e=>{e.preventDefault();openDrawer(term,entry.definition);} );});}

function populateGlossaryList(){const list=$('#glossary-list');DATA.glossary.forEach(entry=>{const item=document.createElement('div');item.className='glossary-item';item.innerHTML=`<div class='glossary-term-name'>${entry.term}</div><p class='glossary-definition'>${entry.definition}</p>`;list.appendChild(item);});}

function initGlossarySearch(){$('#glossary-search').addEventListener('input',e=>{const q=e.target.value.trim().toLowerCase();$$('#glossary-list .glossary-item').forEach(item=>{const term=$('.glossary-term-name',item).textContent.toLowerCase();item.style.display=term.includes(q)?'':'none';});});}

function openDrawer(term,definition){const drawer=$('#glossary-drawer');$('#drawer-term').textContent=term;$('#drawer-definition').textContent=definition;drawer.classList.add('show');drawer.setAttribute('aria-hidden','false');}
function closeDrawer(){const drawer=$('#glossary-drawer');drawer.classList.remove('show');drawer.setAttribute('aria-hidden','true');}
function initDrawerHandlers(){$('#drawer-close').addEventListener('click',closeDrawer);window.addEventListener('keydown',e=>{if(e.key==='Escape')closeDrawer();});}

// ------------------------------
//  App Init
// ------------------------------
function initApp(){
  initNavigation();
  initModalHandlers();
  initDrawerHandlers();
  populateGlossaryList();
  initGlossarySearch();
  currentCompanies=[...DATA.companies];
  renderTable(currentCompanies);
  attachSortHandlers();
  initFilterHandlers();
  createMarketShareChart(currentCompanies);
  createAssetsVsProfitChart(currentCompanies);
  createProductMixChart();
  createFundingChart(currentCompanies);
  attachGlossaryHandlers(document);
}

document.addEventListener('DOMContentLoaded',initApp);