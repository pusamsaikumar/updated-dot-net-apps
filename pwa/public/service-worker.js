// Set this to true for production
var doCache = false;

// Name our cache
var CACHE_NAME = 'my-pwa-cache-axtell';

// Delete old caches that are not our current one!
self.addEventListener("activate", event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys()
        .then(keyList =>
            Promise.all(keyList.map(key => {
                if (!cacheWhitelist.includes(key)) {
                    console.log('Deleting cache: ' + key)
                    return caches.delete(key);
                }
            }))
        )
    );
});

// The first time the user starts up the PWA, 'install' is triggered.
self.addEventListener('install', function(event) {
    if (doCache) {
        event.waitUntil(
            caches.open(CACHE_NAME)
            .then(function(cache) {
                // Get the assets manifest so we can see what our js file is named
                // This is because webpack hashes it

                {/*------------------This is a original content-----------------------------------------*/}
                fetch("asset-manifest.json")
                    .then(response => {
                        response.json()
                    })
                    .then(assets => {
                        // Open a cache and cache our files
                        // We want to cache the page and the main.js generated by webpack
                        // We could also cache any static assets like CSS or images
                        const urlsToCache = [
                            "/",
                            assets["main.js"]
                        ]
                        cache.addAll(urlsToCache)
                        console.log('cached');
                    })
                {/*---------------End of Original Content ----------------------------------------------*/}

                {/*---------------my content ---------------------------*/}

                    // fetch("asset-manifest.json")
                    // .then(response => {
                    //     response.json()
                    // })
                    // .then(assets => {
                    //     console.log("assest is ==============================================>",assets)
                    //     // Open a cache and cache our files
                    //     // We want to cache the page and the main.js generated by webpack
                    //     // We could also cache any static assets like CSS or images
                    //     const urlsToCache = [
                    //         "/",
                    //         assets["main.js"]
                            
                    //     ]
                    //     return cache.addAll(urlsToCache)
                    //     //console.log('cached');
                    // }).catch(err=>{
                    //     console.log("err is come in service worker ==========================>",err);
                    // })

                {/*--------End of my content-----------------------------*/}

            })
        );
    }
});

// When the webpage goes to fetch files, we intercept that request and serve up the matching files
// if we have them
self.addEventListener('fetch', function(event) {

    if(!navigator.onLine)
    {
        event.waitUntil(
            this.registration.showNotification("NETWORK",{
              body:"Please Check Your Internet Connection"
            }).then(res=>{console.log("res is ",res)})
            .catch(err=>{
              console.log("error is ",err);
            })
          )
    }

    if (doCache) {
        event.respondWith(
            caches.match(event.request).then(function(response) {
                return response || fetch(event.request);
            })
        );
    }
});