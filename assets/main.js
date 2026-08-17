const items=document.querySelectorAll('.reveal');const io=new IntersectionObserver((entries)=>{entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add('show')})},{threshold:.12});items.forEach(el=>io.observe(el));

window.gulooConversionEvents=window.gulooConversionEvents||[];
document.querySelectorAll('[data-cta-id]').forEach((el)=>{el.addEventListener('click',()=>{const event={event_name:'cta_clicked',cta_id:el.dataset.ctaId||null,journey:el.dataset.journey||null,source_page:location.pathname,occurred_at:new Date().toISOString()};window.gulooConversionEvents.push(event);window.dispatchEvent(new CustomEvent('guloo:conversion',{detail:event}))})});
