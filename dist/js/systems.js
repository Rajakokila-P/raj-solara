import {dailyEnergy, missionResponse} from './systems-model.js';
const byId = id => document.getElementById(id);

/** Render textual hourly results, available to keyboard and screen-reader users. */
function renderCycle() {
  const fields = ['cycle-charge', 'cycle-solar', 'cycle-demand'].map(byId);
  const invalid = fields.find(field => !field.checkValidity());
  if (invalid) {
    byId('cycle-status').textContent = 'Check the limits: charge 0–100%, solar 0–200 kW and demand 1–200 kW.';
    byId('cycle-table').querySelector('tbody').replaceChildren();
    invalid.focus();
    return;
  }
  const [charge, peak, demand] = fields.map(field => Number(field.value));
  const result = dailyEnergy({charge, peak, demand});
  const body = byId('cycle-table').querySelector('tbody');
  body.replaceChildren();
  for (const row of result.rows) {
    const tr = document.createElement('tr');
    for (const value of [`${String(row.hour).padStart(2, '0')}:00`, row.solar.toFixed(1), row.battery.toFixed(1)]) {
      const td = document.createElement('td');
      td.textContent = value;
      tr.append(td);
    }
    body.append(tr);
  }
  byId('cycle-status').textContent = result.reserveHour === null
    ? 'The illustrative budget lasts 24 hours. This does not establish continuous or unlimited flight.'
    : `Reserve reached or already unavailable at hour ${result.reserveHour}. The illustrative mission stops; battery values then remain fixed.`;
}
byId('run-cycle').addEventListener('click', renderCycle);
renderCycle();

let requestVersion = 0;
let pendingTimer;
/** Changing or cancelling a request invalidates old callbacks and clears its timer. */
function stopRequest(message) {
  requestVersion += 1;
  clearTimeout(pendingTimer);
  byId('mission-progress').hidden = true;
  byId('cancel-mission').disabled = true;
  byId('request-mission').disabled = false;
  byId('mission-status').textContent = message;
}
byId('request-mission').addEventListener('click', () => {
  stopRequest('Waiting for simulated satellite update…');
  const version = requestVersion;
  const scenario = byId('mission-scenario').value;
  byId('mission-result').replaceChildren();
  byId('request-mission').disabled = true;
  byId('cancel-mission').disabled = false;
  byId('mission-progress').hidden = false;
  pendingTimer = setTimeout(() => {
    if (version !== requestVersion) return;
    const result = missionResponse(scenario);
    const heading = document.createElement('h4');
    heading.textContent = result.title;
    const paragraph = document.createElement('p');
    paragraph.textContent = result.message;
    byId('mission-result').append(heading, paragraph);
    stopRequest(scenario === 'offline' ? 'Simulation failed. Retry is available.' : 'Simulated update complete.');
  }, 1200);
});
byId('cancel-mission').addEventListener('click', () => {
  stopRequest('Request cancelled. No update applied.');
  byId('request-mission').focus();
});
byId('mission-scenario').addEventListener('change', () => {
  stopRequest('Scenario changed. Request a new simulated update.');
  byId('mission-result').replaceChildren();
});
window.addEventListener('pagehide', () => stopRequest('Request stopped.'));
