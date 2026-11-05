import test from 'node:test';
import assert from 'node:assert/strict';
import {dailyEnergy,missionResponse} from '../dist/js/systems-model.js';
test('dark day reaches 20% reserve at hour eight',()=>{
  const r=dailyEnergy({charge:70,peak:0,demand:10});
  assert.equal(r.reserveHour,8); assert.equal(r.rows.length,25);
  assert.equal(r.rows[8].battery,32); assert.equal(r.rows[24].battery,32);
});
test('empty battery does not invent reserve energy',()=>{
  const r=dailyEnergy({charge:0,peak:80,demand:10});
  assert.equal(r.reserveHour,0); assert.equal(r.rows.at(-1).battery,0);
});
test('surplus remains capped at capacity',()=>{
  const r=dailyEnergy({charge:100,peak:200,demand:1});
  assert.equal(r.reserveHour,null); assert.ok(r.rows.every(x=>x.battery<=160));
  assert.equal(r.rows[12].battery,160);
});
test('invalid cycle inputs rejected',()=>{
  for(const data of [{charge:101,peak:0,demand:1},{charge:80,peak:-1,demand:1},{charge:80,peak:0,demand:NaN}]) assert.throws(()=>dailyEnergy(data),RangeError);
});
test('scenario responses distinguish sensor and connection failures',()=>{
  assert.match(missionResponse('obstacle').message,/obstacle/i);
  assert.match(missionResponse('offline').message,/unavailable/i);
  assert.throws(()=>missionResponse('__proto__'),RangeError);
});
