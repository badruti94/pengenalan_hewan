const CACHE_NAME = 'p_hewan-v5';
const urlToCache = [
    '/',
    '/manifest.json',
    '/nav.html',
    '/index.html',
    '/css/materialize.min.css',
    '/css/style.css',
    '/img/anjing.jpg',
    '/img/biawak.jpg',
    '/img/buaya.png',
    '/img/elang.jpg',
    '/img/favicon.png',
    '/img/kucing.jpg',
    '/img/lele.jpg',
    '/img/merpati.jpg',
    '/img/mujair.jpeg',
    '/js/jquery-2.1.4.min.js',
    '/js/materialize.min.js',
    '/pages/burung.html',
    '/pages/ikan.html',
    '/pages/mamalia.html',
    '/pages/reptil.html',
    '/img/icons/android-icon-36x36.png',
    '/img/icons/android-icon-48x48.png',
    '/img/icons/android-icon-72x72.png',
    '/img/icons/android-icon-96x96.png',
    '/img/icons/android-icon-144x144.png',
    '/img/icons/android-icon-192x192.png',
    '/img/icons/apple-icon.png'
];


self.addEventListener('install', (e)=>{
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache)=>{
            return cache.addAll(urlToCache);
        })
    );
});

self.addEventListener('fetch',(e)=>{
    e.respondWith(
        caches.match(e.request, {
            cacheName: CACHE_NAME
        })
        .then((response)=>{
            if(response){
                console.log('ServiceWorker: Gunakan aset dari cache: ', response.url);
                return response;
            }

            console.log(
                'ServiceWorker: Memuat aset dari server: ',
                e.request.url
            );
            return fetch(e.request);
        })
    );
});

self.addEventListener('activate',(e)=>{
    e.waitUntil(
        caches.keys().then((cacheNames)=>{
            return Promise.all(
                cacheNames.map((cacheName)=>{
                    if(cacheName != CACHE_NAME){
                        console.log(`ServiceWorker: cache ${cacheName} dihapus`);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});