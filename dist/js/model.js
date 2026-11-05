/** Fictional design catalogue and transparent educational energy model. */
export const aircraft = [
  {id:'br101',name:'BR101',type:'Research',seats:0,battery:160,area:90,demand:30,tag:'Your vision. A connected sky.',description:'Rajakokila-P’s uncrewed research concept: curved solar wings, rechargeable power storage, onboard decisions, satellite links and optical/thermal observation.'},
  {id:'aurora',name:'Aurora',type:'Regional',seats:6,battery:120,area:40,demand:60,tag:'A quieter way to connect.',description:'A six-seat regional concept exploring battery-assisted travel between smaller communities.'},
  {id:'stratos',name:'Stratos',type:'Research',seats:2,battery:80,area:60,demand:35,tag:'Room for a different perspective.',description:'A research concept with a larger proposed solar surface for studying energy trade-offs.'},
  {id:'courier',name:'Courier',type:'Cargo',seats:0,battery:100,area:30,demand:50,tag:'Useful journeys. Lighter footprints.',description:'An uncrewed cargo design study considering supervised autonomy and modular payload space.'}
];
export const finishes = {pearl:'#e4e8e7',ocean:'#10275a',copper:'#c92036'};
export function filterAircraft(query='',type='All') {
  return aircraft.filter(a=>(type==='All'||a.type===type)&&`${a.name} ${a.type} ${a.description}`.toLowerCase().includes(query.trim().toLowerCase()));
}
export function validDesign(d) {
  return !!d && aircraft.some(a=>a.id===d.model) && Object.hasOwn(finishes,d.finish) && ['panorama','quiet','flex'].includes(d.cabin);
}
/** Constant-power illustration. Not an aircraft performance or flight-planning tool. */
export function energy({battery,charge,sun,area,demand}) {
  if (![battery,charge,sun,area,demand].every(Number.isFinite)||battery<=0||area<=0||demand<=0||charge<0||charge>100||sun<0||sun>100) throw new RangeError('Invalid energy inputs');
  const solar=area*1*(sun/100)*0.22;
  const available=battery*(charge/100)*0.8;
  const net=demand-solar;
  return {solar,available,net,hours:net>0?available/net:null};
}
