const CACHE='sanya-guide-v3';
const ASSETS=[
  './sanya_offline_guide_v3.html',
  './sanya_locations_v3.geojson',
  './sanya_locations_v3.csv',
  './sanya_locations_v3.gpx',
  './sanya_locations_v3.kml',
  './manifest.webmanifest',
  './sanya-guide-icon.svg'
];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS))));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key))))));
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request).then(response=>{
    const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy));return response;
  }).catch(()=>caches.match('./sanya_offline_guide_v3.html'))));
});
