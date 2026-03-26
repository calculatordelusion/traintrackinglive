import { useState, useEffect } from "react";
import { Bell, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { requestNotificationPermission, getNotificationPermission, registerServiceWorker, startTrainNotifications, sendLocalNotification } from "@/lib/pushNotifications";
import { fetchLivePositions } from "@/lib/trainApi";

export default function NotificationBanner() {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const perm = getNotificationPermission();
    const wasDismissed = localStorage.getItem('notif-dismissed');
    
    if (perm === 'default' && !wasDismissed) {
      // Show after 5 seconds
      const timer = setTimeout(() => setShow(true), 5000);
      return () => clearTimeout(timer);
    }
    
    if (perm === 'granted') {
      registerServiceWorker();
      startTrainNotifications(async () => {
        const { stats } = await fetchLivePositions();
        if (stats.moving > 0) {
          return { hasDelays: true, message: `${stats.moving} trains currently running. ${stats.atStation} at stations. Track your train live now!` };
        }
        return null;
      });
    }
  }, []);

  const handleAllow = async () => {
    const granted = await requestNotificationPermission();
    if (granted) {
      await registerServiceWorker();
      sendLocalNotification(
        '🚂 Notifications Enabled!',
        'You will now receive live train delay alerts and updates from TrackMyTrain.pk',
        { url: '/train' }
      );
      startTrainNotifications(async () => {
        const { stats } = await fetchLivePositions();
        if (stats.moving > 0) {
          return { hasDelays: true, message: `${stats.moving} trains running now. Check live positions!` };
        }
        return null;
      });
    }
    setShow(false);
  };

  const handleDismiss = () => {
    setShow(false);
    setDismissed(true);
    localStorage.setItem('notif-dismissed', 'true');
  };

  if (!show || dismissed) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm z-50 animate-in slide-in-from-bottom-4">
      <div className="bg-card border border-primary/20 rounded-2xl shadow-2xl p-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <Bell className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-sm mb-0.5">Enable Train Alerts 🚂</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Get notified about train delays, live updates, and departure reminders. Never miss your train again!
            </p>
            <div className="flex gap-2 mt-3">
              <Button size="sm" onClick={handleAllow} className="rounded-full text-xs gap-1.5 h-8">
                <Bell className="w-3 h-3" /> Allow Notifications
              </Button>
              <Button size="sm" variant="ghost" onClick={handleDismiss} className="rounded-full text-xs h-8 text-muted-foreground">
                Not Now
              </Button>
            </div>
          </div>
          <button onClick={handleDismiss} className="text-muted-foreground hover:text-foreground p-1">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
