/** BR101 educational assumptions, not an aircraft engineering model. */
export function dailyEnergy({charge, peak, demand}) {
  if (![charge, peak, demand].every(Number.isFinite) || charge < 0 || charge > 100 || peak < 0 || peak > 200 || demand < 1 || demand > 200) {
    throw new RangeError('Use charge 0–100%, solar 0–200 kW and demand 1–200 kW.');
  }
  const capacity = 160;
  const reserve = 32;
  let battery = capacity * charge / 100;
  let reserveHour = battery <= reserve ? 0 : null;
  const rows = [{hour: 0, solar: 0, battery}];
  for (let hour = 1; hour <= 24; hour += 1) {
    // Midpoint irradiance over each one-hour interval; a fixed 12-hour day.
    const midpoint = hour - 0.5;
    const solar = midpoint > 6 && midpoint < 18 ? peak * Math.sin(Math.PI * (midpoint - 6) / 12) : 0;
    if (reserveHour === null) {
      const balance = solar - demand;
      battery = Math.min(capacity, battery + (balance > 0 ? balance * 0.9 : balance));
      if (battery <= reserve) {
        battery = reserve;
        reserveHour = hour;
      }
    }
    // Freeze after reaching reserve: the illustrative mission has stopped.
    rows.push({hour, solar, battery});
  }
  return {rows, reserveHour};
}

/** Fixed demonstration outcomes; no operational navigation instructions. */
export function missionResponse(scenario) {
  const responses = {
    clear: {title: 'Observation update received', message: 'Simulated optical and thermal observations are available for human review.'},
    obstacle: {title: 'Route review required', message: 'A fictional obstacle input triggers route reassessment and an operator alert. No real route is calculated.'},
    reserve: {title: 'Energy review required', message: 'The simulated battery reserve alert requests human review of the mission energy budget.'},
    offline: {title: 'Update failed', message: 'Simulated satellite link unavailable. No current data received. Change the scenario and retry.'}
  };
  if (!Object.hasOwn(responses, scenario)) throw new RangeError('Unknown mission scenario');
  return responses[scenario];
}
