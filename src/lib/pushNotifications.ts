// Push Notification Manager for TrackMyTrain.pk
// Uses browser Notification API (no external push service needed for local notifications)

export async function registerServiceWorker(): Promise<ServiceWorkerRegistration | null> {
  if (!('serviceWorker' in navigator)) return null;
  try {
    const reg = await navigator.serviceWorker.register('/sw.js');
    return reg;
  } catch (e) {
    console.error('SW registration failed:', e);
    return null;
  }
}

export async function requestNotificationPermission(): Promise<boolean> {
  if (!('Notification' in window)) return false;
  if (Notification.permission === 'granted') return true;
  if (Notification.permission === 'denied') return false;
  const result = await Notification.requestPermission();
  return result === 'granted';
}

export function getNotificationPermission(): NotificationPermission | 'unsupported' {
  if (!('Notification' in window)) return 'unsupported';
  return Notification.permission;
}

export function sendLocalNotification(title: string, body: string, options?: { url?: string; tag?: string }) {
  if (!('Notification' in window) || Notification.permission !== 'granted') return;
  
  const notification = new Notification(title, {
    body,
    icon: '/favicon.ico',
    badge: '/favicon.ico',
    tag: options?.tag || 'train-update',
  });

  notification.onclick = () => {
    window.focus();
    if (options?.url) window.location.href = options.url;
    notification.close();
  };
}

// Schedule periodic train delay notifications
let notificationInterval: ReturnType<typeof setInterval> | null = null;

export function startTrainNotifications(checkFn: () => Promise<{ hasDelays: boolean; message: string } | null>) {
  if (notificationInterval) return;
  
  notificationInterval = setInterval(async () => {
    if (Notification.permission !== 'granted') return;
    try {
      const result = await checkFn();
      if (result?.hasDelays) {
        sendLocalNotification('🚂 Train Delay Alert', result.message, { tag: 'delay-alert', url: '/train' });
      }
    } catch {}
  }, 5 * 60 * 1000); // Check every 5 minutes
}

export function stopTrainNotifications() {
  if (notificationInterval) {
    clearInterval(notificationInterval);
    notificationInterval = null;
  }
}
