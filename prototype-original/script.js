/* Nexcell BillingFlow – prototype interactions (no backend) */
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];

/* ---------- Data ---------- */
const INVOICES = [
  ['#830418-EST-WDD','Eastern Sands Motel','Website Design','03 Aug 2026','10 Aug 2026',650,'Paid'],
  ['#830418-EST-WHM','Eastern Sands Motel','Hosting & Maintenance','03 Aug 2026','04 Aug 2026',556,'Unpaid'],
  ['#830421-NDC-WDD','No Drama Cleaning','Website Development','06 Aug 2026','13 Aug 2026',800,'Overdue'],
  ['#830425-DRA-WDD','Drever Automotive','Website Redesign','10 Aug 2026','17 Aug 2026',600,'Draft'],
  ['#830427-BLU-MNU','Blu Ginger','Digital Menu','12 Aug 2026','19 Aug 2026',420,'Sent'],
  ['#830430-NDC-WHM','No Drama Cleaning','Hosting & Maintenance','14 Aug 2026','21 Aug 2026',320,'Overdue'],
  ['#830433-DRA-SEO','Drever Automotive','SEO Setup','18 Aug 2026','25 Aug 2026',480,'Paid'],
  ['#830436-BLU-WHM','Blu Ginger','Hosting & Maintenance','20 Aug 2026','27 Aug 2026',250,'Unpaid']];
const CUSTOMERS = [
  ['Eastern Sands Motel','EST','easternsands1@gmail.com','03 5221 5577',1206,556,'03 Aug 2026','Active'],
  ['No Drama Cleaning','NDC','hello@nodramacleaning.com.au','0412 345 678',1120,1120,'14 Aug 2026','Active'],
  ['Blu Ginger','BLU','info@bluginger.com.au','08 8271 9000',670,250,'20 Aug 2026','Active'],
  ['Drever Automotive','DRA','service@dreverautomotive.com.au','03 5983 2211',1080,0,'18 Aug 2026','Active']];
const PAYMENTS = [['PAY-0091','#830418-EST-WDD','Eastern Sands Motel','05 Aug 2026',650,'Bank Transfer','NAB-88213'],['PAY-0092','#830433-DRA-SEO','Drever Automotive','22 Aug 2026',480,'Card','CARD-4417'],['PAY-0093','#830427-BLU-MNU','Blu Ginger','24 Aug 2026',200,'Cash','—']];
const ICONS = { flow:'M4 12c3-6 5-6 8 0s5 6 8 0', menu:'M4 6h16M4 12h16M4 18h16', panel:'M4 5h16v14H4zM9 5v14', search:'M11 4a7 7 0 100 14 7 7 0 000-14zM20 20l-4-4', bell:'M6 9a6 6 0 0112 0c0 6 2 7 2 7H4s2-1 2-7zM10 20h4', plus:'M12 5v14M5 12h14', chev:'M9 6l6 6-6 6', x:'M6 6l12 12M18 6L6 18', home:'M4 11l8-7 8 7v9H4z', doc:'M7 3h8l4 4v14H7zM15 3v4h4', users:'M9 11a3 3 0 100-6 3 3 0 000 6zM3 20c0-4 3-6 6-6s6 2 6 6M17 8a3 3 0 010 6M21 20c0-3-1-5-3-5', tag:'M3 12V4h8l10 10-8 8z', card:'M3 6h18v12H3zM3 10h18', receipt:'M6 3h12v18l-3-2-3 2-3-2-3 2zM9 8h6M9 12h6', clock:'M12 7v5l3 2M12 3a9 9 0 100 18 9 9 0 000-18z', chart:'M4 20V4M4 20h16M8 16v-5M13 16V8M18 16v-9', gear:'M12 9a3 3 0 100 6 3 3 0 000-6zM4 12h2M18 12h2M12 4v2M12 18v2', mail:'M3 6h18v12H3zM3 7l9 7 9-7', help:'M9 9a3 3 0 116 0c0 2-3 2-3 4M12 17v.5M12 3a9 9 0 100 18 9 9 0 000-18z', out:'M10 4H5v16h5M15 8l4 4-4 4M19 12H9' };
const icon = n => `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${ICONS[n]}"/></svg>`;
const money = n => '$' + n.toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const pill = s => `<span class="pill ${s}">${s}</span>`;

/* ---------- Navigation ---------- */
const PAGES = { dashboard:['Dashboard','Overview of your billing activity.','home'], invoices:['Invoices','Create, track and manage customer invoices.','doc'], new:['New Invoice','Create and send a professional invoice.'], detail:['Invoice #830418-EST-WHM','Invoice details and activity.'],edit:['Edit Invoice','Changes are saved as a new revision.'], customers:['Customers','People and businesses you bill.','users'], services:['Services','Services and codes used in invoice numbers.','tag'], payments:['Payments','Money received against invoices.','card'], receipts:['Receipts','Proof of payment for your customers.','receipt'], reminders:['Reminders','Chase late payments.','clock'], tax:['Tax & Records','Keep clean records for your accountant.','doc'], reports:['Reports','Understand where your revenue comes from.','chart'], settings:['Settings','Manage your business and preferences.','gear'] };
function buildNav() {
  $('#nav').innerHTML = Object.entries(PAGES).filter(([, v]) => v[2]).map(([k, v]) => `<a href="#${k}" data-go="${k}">${icon(v[2])}<span class="lbl">${v[0]}</span></a>`).join('');
  $$('[data-i]').forEach(el => el.insertAdjacentHTML('afterbegin', icon(el.dataset.i)));
}
function go(page) {
  if (!$('#p-' + page)) return;
  $$('.page').forEach(p => p.hidden = p.id !== 'p-' + page);
  $$('#nav a').forEach(a => a.classList.toggle('active', a.dataset.go === page || (['new', 'detail', 'edit'].includes(page) && a.dataset.go === 'invoices')));
  $('#title').textContent = PAGES[page][0]; $('#subtitle').textContent = PAGES[page][1];
  $('#app').classList.remove('drawer'); closeMenus(); window.scrollTo(0, 0);
}

/* ---------- Rendering ---------- */
function renderRecent() {
  $('#recentBody').innerHTML = INVOICES.slice(0, 4).map(i => `<tr><td data-l="Invoice" class="link" data-go="detail">${i[0]}</td><td data-l="Customer">${i[1]}</td><td data-l="Service">${i[2]}</td><td data-l="Date">${i[3]}</td><td data-l="Amount" class="num">${money(i[5])}</td><td data-l="Status">${pill(i[6])}</td><td>${rowMenu()}</td></tr>`).join('');
}
const rowMenu = () => `<div class="dd"><button class="btn icon ghost" data-dd aria-label="Actions">⋯</button><div class="menu" hidden><button data-go="detail">View</button><button data-go="edit">Edit</button><button data-toast="Downloaded">Download</button><button data-toast="Invoice emailed">Email</button></div></div>`;
function renderInvoices() {
  const q = $('#invSearch').value.toLowerCase(), st = $('#invStatus').value;
  const rows = INVOICES.filter(i => (!st || i[6] === st) && (!q || i.slice(0, 3).join(' ').toLowerCase().includes(q)));
  $('#invBody').innerHTML = rows.map(i => `<tr><td data-l="Invoice" class="link" data-go="detail">${i[0]}</td><td data-l="Customer">${i[1]}</td><td data-l="Service">${i[2]}</td><td data-l="Invoice Date">${i[3]}</td><td data-l="Due Date">${i[4]}</td><td data-l="Amount" class="num">${money(i[5])}</td><td data-l="Payment">${i[6] === 'Paid' ? 'Received' : 'Awaiting'}</td><td data-l="Status">${pill(i[6])}</td><td>${rowMenu()}</td></tr>`).join('');
  $('#invEmpty').hidden = rows.length > 0;
}
function renderLists() {
  $('#custBody').innerHTML = CUSTOMERS.map((c, n) => `<tr data-cust="${n}" style="cursor:pointer"><td data-l="Customer"><b>${c[0]}</b></td><td data-l="Code"><span class="badge">${c[1]}</span></td><td data-l="Email">${c[2]}</td><td data-l="Phone">${c[3]}</td><td data-l="Invoiced" class="num">${money(c[4])}</td><td data-l="Outstanding" class="num">${money(c[5])}</td><td data-l="Last Invoice">${c[6]}</td><td data-l="Status">${pill(c[7])}</td></tr>`).join('');
  $('#payBodyT').innerHTML = PAYMENTS.map(p => `<tr><td data-l="Payment">${p[0]}</td><td data-l="Invoice">${p[1]}</td><td data-l="Customer">${p[2]}</td><td data-l="Date">${p[3]}</td><td data-l="Amount" class="num">${money(p[4])}</td><td data-l="Method">${p[5]}</td><td data-l="Reference">${p[6]}</td><td data-l="Status">${pill('Paid')}</td></tr>`).join('');
  $('#rcBody').innerHTML = PAYMENTS.map((p, n) => `<tr><td data-l="Receipt">RCT-00${n + 41}</td><td data-l="Invoice">${p[1]}</td><td data-l="Customer">${p[2]}</td><td data-l="Date">${p[3]}</td><td data-l="Amount" class="num">${money(p[4])}</td><td data-l="Method">${p[5]}</td><td><button class="btn ghost" data-toast="Receipt opened">View</button><button class="btn ghost" data-toast="Downloaded">Download</button><button class="btn ghost" data-toast="Receipt emailed">Email</button></td></tr>`).join('');
  const bars = (el, data) => $(el).innerHTML = data.map(d => `<div style="margin-bottom:12px"><div class="row sm" style="justify-content:space-between"><span>${d[0]}</span><b class="num">${d[2] || money(d[1])}</b></div><div class="bar"><i style="width:${d[3]}%"></i></div></div>`).join('');
  bars('#ageing', [['Current', 0, '$1,570.00', 60], ['1–14 days', 0, '$556.00', 25], ['15–30 days', 0, '$800.00', 35], ['30+ days', 0, '$320.00', 15]]);
  bars('#topCust', [['Eastern Sands Motel', 1206, 0, 100], ['No Drama Cleaning', 1120, 0, 93], ['Drever Automotive', 1080, 0, 90]]);
  bars('#svcRev', [['Website design', 6400, 0, 100], ['Hosting & maintenance', 3900, 0, 61], ['SEO', 1800, 0, 28]]);
  $('#revBars').innerHTML = [90, 120, 100, 150, 130, 170, 160, 190, 175, 200, 185, 210].map((h, i) => `<rect x="${i * 50 + 8}" y="${220 - h}" width="34" height="${h}" rx="3"/>`).join('');
}
function openCustomer(n) {
  const c = CUSTOMERS[n]; $('#cpName').textContent = c[0];
  $('#cpBody').innerHTML = `<p class="muted sm">${c[2]} · ${c[3]}<br>Business code ${c[1]}</p><div class="kv mt" style="grid-template-columns:1fr 1fr 1fr"><div><span>Invoiced</span><b>${money(c[4])}</b></div><div><span>Outstanding</span><b>${money(c[5])}</b></div><div><span>Invoices</span><b>${INVOICES.filter(i => i[1] === c[0]).length}</b></div></div><div class="tabs mt" data-tabs><button class="on">Invoices</button><button>Payments</button><button>Notes</button><button>Activity</button></div><p class="muted sm mt">Mock content for the selected section.</p>`;
  $('#custPanel').hidden = false;
}
const SET = ['Business Profile', 'Invoice Settings', 'Payment Details', 'Email', 'Notifications', 'Reminders', 'Tax', 'Cloud & Sync', 'Security', 'Appearance'];
function renderSettings(name = SET[0]) {
  $('#snav').innerHTML = SET.map(s => `<button class="${s === name ? 'on' : ''}" data-set="${s}">${s}</button>`).join(''); $('#sTitle').textContent = name;
  $('#sBody').innerHTML = name === 'Cloud & Sync'
    ? `<div class="srow"><div><b>Cloud Sync</b><div class="sm muted"><span class="pill Paid">All changes synced</span> Last sync: 23 Nov 2026, 4:47 PM</div></div><label class="toggle"><input type="checkbox" checked aria-label="Enable cloud sync"><i></i></label></div><div class="srow"><div><b>Device</b><div class="sm muted">Pragesh’s MacBook</div></div><div class="row"><button class="btn" data-toast="Syncing…">Sync Now</button><button class="btn" data-toast="Devices (demo)">Manage Devices</button></div></div><div class="srow"><div><b>Offline storage</b><div class="sm muted">Billing continues offline. Changes sync when available.</div></div><span class="pill Paid">Available</span></div>`
    : `<div class="form-grid"><div class="field"><label>Business name</label><input value="Nexcell Digital"></div><div class="field"><label>ABN</label><input value="42 427 108 413"></div><div class="field"><label>Email</label><input value="billing@nexcell.com.au"></div><div class="field"><label>Business code</label><input value="NXC"></div></div><button class="btn primary mt" data-toast="Settings saved">Save changes</button>`;
}

/* ---------- Invoice items & totals ---------- */
const ITEMS = [['Website Hosting & Maintenance', '1 Year', 1, 300], ['Domain Renewal', 'easternsandsmotel.com.au', 1, 80], ['SSL Certificate', 'Yearly Renewal', 1, 80], ['Business Email Hosting', 'Annual Renewal', 1, 96]];
const itemRow = it => `<tr><td><input value="${it[0]}" aria-label="Description"></td><td><input value="${it[1]}" aria-label="Details"></td><td><input type="number" min="0" value="${it[2]}" aria-label="Qty"></td><td><input type="number" min="0" step="0.01" value="${it[3]}" aria-label="Rate"></td><td class="num amt"></td><td><button class="btn icon ghost rm" aria-label="Remove item">${icon('x')}</button></td></tr>`;
function recalc() {
  let sum = 0;
  $$('#items tr').forEach(r => { const [, , q, p] = $$('input', r), a = (+q.value || 0) * (+p.value || 0); sum += a; $('.amt', r).textContent = money(a); });
  ['#tSub', '#tTot', '#tBal'].forEach(s => $(s).textContent = money(sum));
  renderPreview();
}
function checkBackdate() {
  const old = $('#invDate').value < '2026-11-23';
  $('#backdate').hidden = !old; $('#todayBadge').hidden = old;
}

/* ---------- UI helpers ---------- */
function toast(msg) { const t = document.createElement('div'); t.className = 'toast'; t.textContent = msg; $('#toasts').append(t); setTimeout(() => t.remove(), 2800); }
function closeMenus() { $$('.menu').forEach(m => m.hidden = true); }
function closeOverlays() { $$('.overlay,.slide').forEach(o => o.hidden = true); }
function setTheme(t) { document.documentElement.dataset.theme = t; try { localStorage.setItem('bf-theme', t); } catch (e) {} }
const SYNC = [['ok', 'All changes synced'], ['syncing', 'Syncing...'], ['pending', '3 changes waiting'], ['offline', 'Offline'], ['error', 'Sync error'], ['conflict', 'Conflict · review needed']];
let syncI = 0;

/* ---------- Events ---------- */
document.addEventListener('click', e => {
  const t = e.target;
  const dd = t.closest('[data-dd]');
  if (dd) { const m = dd.dataset.dd ? $('#' + dd.dataset.dd) : dd.nextElementSibling, was = m.hidden; closeMenus(); m.hidden = !was; return; }
  if (!t.closest('.menu')) closeMenus();
  const tab = t.closest('[data-tabs] button'); if (tab) { $$('button', tab.parentNode).forEach(b => b.classList.toggle('on', b === tab)); }
  const mo = t.closest('[data-modal]'); if (mo) { closeMenus(); $('#' + mo.dataset.modal).hidden = false; $('#' + mo.dataset.modal + ' input,#' + mo.dataset.modal + ' select')?.focus(); }
  const el = t.closest('[data-toast],[data-go],[data-close],[data-dismiss],[data-cust],[data-set]');
  if (t.classList.contains('overlay')) closeOverlays();
  if (!el) return;
  if (el.dataset.toast) toast(el.dataset.toast);
  if (el.dataset.close !== undefined) closeOverlays();
  if (el.dataset.go) go(el.dataset.go);
  if (el.dataset.dismiss) $('#' + el.dataset.dismiss).hidden = true;
  if (el.dataset.cust) openCustomer(+el.dataset.cust);
  if (el.dataset.set) renderSettings(el.dataset.set);
});
document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeOverlays(); closeMenus(); } });
$('#collapseBtn').onclick = () => $('#app').classList.toggle('collapsed');
$('#menuBtn').onclick = () => $('#app').classList.toggle('drawer');
$('#themeBtn').onclick = () => setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark');
$('#sync').onclick = () => setSync((syncI + 1) % SYNC.length);
$('#invSearch').oninput = renderInvoices; $('#invStatus').onchange = renderInvoices;
$('#addItem').onclick = () => { $('#items').insertAdjacentHTML('beforeend', itemRow(['New item', 'Details', 1, 50])); recalc(); toast('Line item added'); };
$('#items').addEventListener('input', recalc);
$('#items').addEventListener('click', e => { if (e.target.closest('.rm')) { e.target.closest('tr').remove(); recalc(); } });
$('#invDate').onchange = checkBackdate;
$('#payToggle').onclick = e => { const h = $('#payBody').hidden = !$('#payBody').hidden; e.target.textContent = h ? 'Show' : 'Hide'; e.target.setAttribute('aria-expanded', !h); };
window.addEventListener('hashchange', () => go(location.hash.slice(1) || 'dashboard'));

/* ---------- Services, customers, revisions ---------- */
const TODAY = '2026-11-23', esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
const fmt = x => new Date(x + 'T00:00').toLocaleDateString('en-AU', { day: '2-digit', month: 'short', year: 'numeric' });
const SERVICES = [['Website Hosting & Maintenance', 'WHM', 300, 'Annual', 3, 'Active'], ['Website Design', 'WDD', 650, 'Project', 3, 'Active'], ['Digital Menu', 'MNU', 420, 'Project', 1, 'Active'], ['SEO Setup', 'SEO', 480, 'Project', 1, 'Active']];
const ADDR = { 'Eastern Sands Motel': '1 Belerine Street, Geelong VIC 3220' };
const REVS = [{ n: 1, date: '03 Aug 2026', note: 'Original invoice created', total: 556 }, { n: 2, date: '05 Aug 2026', note: 'Customer email corrected', total: 556 }];
function renderServices() { $('#svcBody').innerHTML = SERVICES.map(s => `<tr><td data-l="Service"><b>${esc(s[0])}</b></td><td data-l="Code"><span class="badge">${s[1]}</span></td><td data-l="Rate" class="num">${money(s[2])}</td><td data-l="Billing">${s[3]}</td><td data-l="Invoices" class="num">${s[4]}</td><td data-l="Status">${pill(s[5])}</td></tr>`).join(''); }
function fillCust() { const v = $('#cust').selectedIndex; $('#cust').innerHTML = CUSTOMERS.map(c => `<option>${esc(c[0])}</option>`).join(''); $('#cust').selectedIndex = Math.max(v, 0); }
function fillSvc() { const v = $('#svc').selectedIndex; $('#svc').innerHTML = SERVICES.map(s => `<option>${esc(s[0])}</option>`).join(''); $('#svc').selectedIndex = Math.max(v, 0); }
function updateCustomer() {
  const c = CUSTOMERS[$('#cust').selectedIndex], s = SERVICES[$('#svc').selectedIndex];
  $('.cust').innerHTML = `<b>${esc(c[0])}</b><div class="sm muted">${esc(ADDR[c[0]] || 'Address not set')}<br>${esc(c[2])} · ${esc(c[3])}</div><span class="badge" style="margin-top:6px">Business code: ${c[1]}</span>`;
  $('#svcCode').value = s[1]; $('#invNo').value = `#830418-${c[1]}-${s[1]}`; renderPreview();
}
function renderRevs() {
  $('#revList').innerHTML = [...REVS].reverse().map(r => `<li><b>Revision ${r.n}</b> ${r.n === REVS.length ? '<span class="badge">Current</span>' : ''}<div class="sm muted">${r.date} · Pragesh · ${money(r.total)}</div><div class="sm">${esc(r.note)}</div></li>`).join('');
  $('#revCount').textContent = REVS.length + ' revisions'; $('#revNext').textContent = 'Revision ' + (REVS.length + 1) + ' draft';
}
function renderDiff() {
  const r = +$('#eRate').value || 0, due = $('#eDue').value, L = [];
  if (due && due !== '2026-08-04') L.push(['Due Date', '04 Aug 2026', fmt(due)]);
  if (r !== 300) L.push(['Rate', money(300), money(r)], ['Total', money(556), money(256 + r)]);
  if ($('#eNote').value) L.push(['Customer note', 'none', 'added']);
  $('#diff').innerHTML = L.length ? L.map(l => `<div class="diff"><span class="muted">${l[0]}</span><span><s class="muted">${l[1]}</s> → <b>${esc(l[2])}</b></span></div>`).join('') : '<p class="muted sm">No changes yet. Edit a field to see what will change.</p>';
}
function saveRevision() {
  const why = $('#eReason').value.trim();
  if (!why) { toast('Add a reason for this revision'); $('#eReason').focus(); return; }
  REVS.push({ n: REVS.length + 1, date: '23 Nov 2026', note: why, total: 256 + (+$('#eRate').value || 0) });
  renderRevs(); renderDiff(); toast('Revision ' + REVS.length + ' saved. Original preserved.'); go('detail');
}

/* ---------- Live invoice preview ---------- */
function renderPreview() {
  const c = CUSTOMERS[$('#cust').selectedIndex] || CUSTOMERS[0], date = $('#invDate').value, due = $('#dueDate').value;
  const it = $$('#items tr').map(r => { const v = $$('input', r); return [v[0].value, v[1].value, +v[2].value || 0, +v[3].value || 0]; });
  const sum = it.reduce((a, i) => a + i[2] * i[3], 0), back = date && date < TODAY, note = $('#cn').value.trim();
  $('#paper').innerHTML = `<div class="ph"><div><b style="font-size:14px">Nexcell Digital</b><div class="mut">ABN 42 427 108 413<br>Unley SA, Australia</div></div><div class="r"><div class="mut">Tax invoice</div><div class="no">${esc($('#invNo').value)}</div><div class="mut">Draft${back ? ' · <span class="flag">Backdated</span>' : ''}</div></div></div>
  <div class="meta"><div><div class="mut">Bill to</div><b>${esc(c[0])}</b><div class="mut">${esc(ADDR[c[0]] || '')}<br>${esc(c[2])}</div></div><div class="r"><div class="mut">Issued</div><b>${date ? fmt(date) : '–'}</b><div class="mut" style="margin-top:6px">Due</div><b>${due ? fmt(due) : '–'}</b></div></div>
  <table><thead><tr><th>Description</th><th class="r">Qty</th><th class="r">Amount</th></tr></thead><tbody>${it.map(i => `<tr><td><b>${esc(i[0])}</b><div class="mut">${esc(i[1])}</div></td><td class="r">${i[2]}</td><td class="r">${money(i[2] * i[3])}</td></tr>`).join('')}</tbody></table>
  <div class="tot"><div><span class="mut">Subtotal</span><span>${money(sum)}</span></div><div><span class="mut">GST</span><span>$0.00</span></div><div class="due"><span>Balance due</span><span>${money(sum)}</span></div></div>
  <div class="foot mut">Pay by bank transfer: NAB · Nexcell Digital · BSB 085-005 · Acc ••••••500${note ? '<br><br>' + esc(note) : ''}</div>`;
}

/* ---------- Forms, sync, command palette ---------- */
function openM(id) { closeOverlays(); $('#' + id).hidden = false; $('#' + id + ' input')?.focus(); }
function setSync(i) { syncI = i; $('#sync').dataset.s = SYNC[i][0]; $('#sync .t').textContent = SYNC[i][1]; $('#conflictBar').hidden = SYNC[i][0] !== 'conflict'; }
function saveCustomer() {
  const n = $('#cName').value.trim(), code = $('#cCode').value.trim().toUpperCase();
  if (!n || !code) return toast('Enter a business name and code');
  if (CUSTOMERS.some(c => c[1] === code)) return toast('Business code ' + code + ' is already used');
  CUSTOMERS.push([n, code, $('#cEmail').value || 'none', $('#cPhone').value || 'none', 0, 0, 'none', 'Active']); ADDR[n] = $('#cAddr').value;
  renderLists(); fillCust(); closeOverlays(); toast('Customer created'); $$('#custModal input').forEach(i => i.value = '');
}
function saveService() {
  const n = $('#sName').value.trim(), code = $('#sCode').value.trim().toUpperCase();
  if (!n || !code) return toast('Enter a service name and code');
  if (SERVICES.some(s => s[1] === code)) return toast('Service code ' + code + ' is already used');
  SERVICES.push([n, code, +$('#sRate').value || 0, $('#sBill').value, 0, 'Active']);
  renderServices(); fillSvc(); closeOverlays(); toast('Service created'); $$('#svcModal input').forEach(i => i.value = '');
}
let cmdI = 0, cmdRes = [];
const cmdItems = () => [...Object.entries(PAGES).filter(([, v]) => v[2]).map(([k, v]) => ({ g: 'Go to', t: v[0], a: () => go(k) })),
  { g: 'Action', t: 'New invoice', a: () => go('new') }, { g: 'Action', t: 'New customer', a: () => openM('custModal') }, { g: 'Action', t: 'New service', a: () => openM('svcModal') }, { g: 'Action', t: 'Record payment', a: () => openM('payModal') }, { g: 'Action', t: 'Toggle dark mode', a: () => $('#themeBtn').click() },
  ...INVOICES.map(i => ({ g: 'Invoice', t: i[0] + ' · ' + i[1], a: () => go('detail') })), ...CUSTOMERS.map((c, n) => ({ g: 'Customer', t: c[0], a: () => openCustomer(n) })), ...SERVICES.map(s => ({ g: 'Service', t: s[0] + ' (' + s[1] + ')', a: () => go('services') }))];
function renderCmd() {
  const q = $('#cmdIn').value.toLowerCase().trim(); cmdRes = cmdItems().filter(i => !q || (i.t + ' ' + i.g).toLowerCase().includes(q)).slice(0, 9); cmdI = Math.min(cmdI, Math.max(cmdRes.length - 1, 0));
  $('#cmdList').innerHTML = cmdRes.length ? cmdRes.map((r, n) => `<li role="option" data-n="${n}" class="${n === cmdI ? 'on' : ''}"><span>${esc(r.t)}</span><span class="g">${r.g}</span></li>`).join('') : '<li class="g">No matches. Try an invoice number, customer or service.</li>';
}
const runCmd = n => { const r = cmdRes[n]; if (!r) return; closeOverlays(); r.a(); };
function openCmd() { closeOverlays(); $('#cmdk').hidden = false; $('#cmdIn').value = ''; cmdI = 0; renderCmd(); $('#cmdIn').focus(); }
$('#cmdBtn').onclick = openCmd; $('#cmdIn').oninput = () => { cmdI = 0; renderCmd(); };
$('#cmdList').onclick = e => { const li = e.target.closest('li[data-n]'); if (li) runCmd(+li.dataset.n); };
$('#cmdIn').onkeydown = e => { if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); cmdI = (cmdI + (e.key === 'ArrowDown' ? 1 : -1) + cmdRes.length) % (cmdRes.length || 1); renderCmd(); } if (e.key === 'Enter') runCmd(cmdI); };
document.addEventListener('keydown', e => { const typing = /INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName); if (((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') || (e.key === '/' && !typing)) { e.preventDefault(); openCmd(); } });
$('#saveCust').onclick = saveCustomer; $('#saveSvc').onclick = saveService; $('#saveRev').onclick = saveRevision;
$('#cName').oninput = e => { $('#cCode').value = e.target.value.replace(/[^a-z]/gi, '').slice(0, 3).toUpperCase(); };
$('#sName').oninput = e => { $('#sCode').value = e.target.value.replace(/[^a-z]/gi, '').slice(0, 3).toUpperCase(); };
$('#p-edit').addEventListener('input', renderDiff);
$('#p-new').addEventListener('input', renderPreview);
$('#p-new').addEventListener('change', e => { if (e.target.id === 'cust' || e.target.id === 'svc') updateCustomer(); renderPreview(); });
document.addEventListener('click', e => { const r = e.target.closest('[data-res]'); if (r) { closeOverlays(); setSync(0); toast(r.dataset.res); if (r.dataset.res.startsWith('Both')) { REVS.push({ n: REVS.length + 1, date: '23 Nov 2026', note: 'Merged from two devices after sync conflict', total: 576 }); renderRevs(); } } });

/* ---------- Init ---------- */
(function init() {
  try { setTheme(localStorage.getItem('bf-theme') || 'light'); } catch (e) { setTheme('light'); }
  buildNav(); renderRecent(); renderInvoices(); renderLists(); renderSettings(); renderServices(); fillCust(); fillSvc(); updateCustomer(); renderRevs(); renderDiff();
  $('#items').innerHTML = ITEMS.map(itemRow).join(''); recalc();
  go(location.hash.slice(1) || 'dashboard');
})();
