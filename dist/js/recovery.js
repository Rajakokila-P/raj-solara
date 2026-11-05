// Root-host recovery. For a project subdirectory, update every / path in 404.html and HOME below.
const HOME='/';
const status=document.getElementById('recovery-status');
const cancel=document.getElementById('cancel');
cancel.hidden=false;
status.textContent='Returning to the homepage in approximately 15 seconds. You can cancel.';
const timer=setTimeout(()=>location.replace(HOME),15000);
cancel.addEventListener('click',()=>{clearTimeout(timer);status.textContent='Automatic return cancelled.';cancel.disabled=true;document.getElementById('home').focus();});
