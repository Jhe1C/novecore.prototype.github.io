// NovaCore Service Worker
const CACHE_NAME = 'novacore-v1.0.0'
const STATIC_CACHE = 'novacore-static-v1.0.0'
const RUNTIME_CACHE = 'novacore-runtime-v1.0.0'

// Assets to cache on install
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/main.tsx',
  '/App.tsx',
  '/styles/globals.css',
  '/site.webmanifest',
  '/favicon.svg',
  '/icon-192.png',
  '/icon-512.png'
]

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('🔧 Service Worker installing...')
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('📦 Caching static assets')
        return cache.addAll(STATIC_ASSETS)
      })
      .then(() => {
        console.log('✅ Static assets cached')
        return self.skipWaiting()
      })
      .catch((error) => {
        console.error('❌ Failed to cache static assets:', error)
      })
  )
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('🚀 Service Worker activating...')
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== RUNTIME_CACHE) {
              console.log('🗑️ Deleting old cache:', cacheName)
              return caches.delete(cacheName)
            }
          })
        )
      })
      .then(() => {
        console.log('✅ Service Worker activated')
        return self.clients.claim()
      })
  )
})

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Handle navigation requests
  if (request.mode === 'navigate') {
    event.respondWith(
      caches.match('/index.html')
        .then((response) => {
          return response || fetch(request)
        })
        .catch(() => {
          return caches.match('/index.html')
        })
    )
    return
  }

  // Handle static assets
  if (url.origin === location.origin) {
    event.respondWith(
      caches.match(request)
        .then((response) => {
          if (response) {
            return response
          }

          return fetch(request)
            .then((fetchResponse) => {
              // Don't cache non-successful responses
              if (!fetchResponse || fetchResponse.status !== 200 || fetchResponse.type !== 'basic') {
                return fetchResponse
              }

              // Cache successful responses
              const responseToCache = fetchResponse.clone()
              caches.open(RUNTIME_CACHE)
                .then((cache) => {
                  cache.put(request, responseToCache)
                })

              return fetchResponse
            })
        })
        .catch(() => {
          // Return offline fallback for images
          if (request.destination === 'image') {
            return new Response(
              '<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="200" fill="#1F2331"/><text x="100" y="100" text-anchor="middle" dy=".3em" fill="#6B7280">離線</text></svg>',
              {
                headers: {
                  'Content-Type': 'image/svg+xml',
                  'Cache-Control': 'no-store'
                }
              }
            )
          }
        })
    )
  }
})

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  console.log('🔄 Background sync:', event.tag)
  
  if (event.tag === 'wishlist-sync') {
    event.waitUntil(syncWishlist())
  } else if (event.tag === 'cart-sync') {
    event.waitUntil(syncCart())
  }
})

// Push notifications
self.addEventListener('push', (event) => {
  console.log('📱 Push notification received')
  
  const options = {
    body: event.data ? event.data.text() : 'NovaCore 有新消息！',
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    vibrate: [200, 100, 200],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: '探索',
        icon: '/icon-192.png'
      },
      {
        action: 'close',
        title: '關閉'
      }
    ]
  }

  event.waitUntil(
    self.registration.showNotification('NovaCore', options)
  )
})

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  console.log('🔔 Notification clicked:', event.action)
  
  event.notification.close()

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    )
  }
})

// Helper functions
async function syncWishlist() {
  try {
    console.log('🔄 Syncing wishlist...')
    // Implement wishlist sync logic
    return true
  } catch (error) {
    console.error('❌ Wishlist sync failed:', error)
    throw error
  }
}

async function syncCart() {
  try {
    console.log('🔄 Syncing cart...')
    // Implement cart sync logic
    return true
  } catch (error) {
    console.error('❌ Cart sync failed:', error)
    throw error
  }
}

// Skip waiting
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})