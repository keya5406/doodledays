self.addEventListener('push', function(event) {
  console.log("[Service Worker] Push Received.");

  const data = event.data?.json();

  const options = {
    body: data.body || "Default body",
    icon: '/icon.png',
    badge: '/badge.png'
  };

  event.waitUntil(
    self.registration.showNotification(data.title || "Default title", options)
  );
});
