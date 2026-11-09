// Zeigt Push-Nachrichten an – nur "X hat etwas eingetragen", nie den Inhalt.
self.addEventListener('push', (ev) => {
  const d = ev.data ? ev.data.json() : {};
  ev.waitUntil(self.registration.showNotification(d.titel || 'Übergabebuch', {
    body: d.text || 'Es gibt einen neuen Eintrag.',
    icon: 'icon-192.png',
    badge: 'icon-192.png',
    tag: 'neuer-eintrag',
    renotify: true,
  }));
});

// Tippen auf die Nachricht öffnet die App (oder holt sie nach vorne).
self.addEventListener('notificationclick', (ev) => {
  ev.notification.close();
  ev.waitUntil(clients.matchAll({ type: 'window', includeUncontrolled: true })
    .then((fenster) => fenster.length ? fenster[0].focus() : clients.openWindow('./')));
});
