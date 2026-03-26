import { useState, useEffect } from "react";
import { fetchNetworkStats, type NetworkStats } from "@/lib/trainApi";

const defaultStats: NetworkStats = {
  totalTrains: 0,
  totalStations: 0,
  totalRoutes: 0,
  expressTrains: 0,
  acTrains: 0,
  passengerTrains: 0,
  movingNow: 0,
  atStation: 0,
  liveCount: 0,
  offline: 0,
};

export function useNetworkStats(pollInterval = 5000) {
  const [stats, setStats] = useState<NetworkStats>(defaultStats);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const data = await fetchNetworkStats();
        if (mounted) {
          setStats(data);
          setLoading(false);
        }
      } catch (e) {
        console.error("Failed to fetch network stats:", e);
        if (mounted) setLoading(false);
      }
    };
    load();
    const interval = setInterval(load, pollInterval);
    return () => { mounted = false; clearInterval(interval); };
  }, [pollInterval]);

  return { stats, loading };
}
