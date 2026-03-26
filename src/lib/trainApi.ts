import { supabase } from "@/integrations/supabase/client";

export interface LiveTrainPosition {
  id: number;
  number: string;
  name: string;
  nameUrdu: string;
  from: string;
  to: string;
  type: string;
  lat: number;
  lng: number;
  speed: number;
  delayMinutes: number;
  lastStation: string;
  nextStation: string;
  progress: number;
  status: "moving" | "at-station" | "completed" | "not-started" | "inactive";
}

export interface LiveStats {
  moving: number;
  atStation: number;
  total: number;
  liveCount: number;
  running?: number;
  offline?: number;
}

export interface TrainDetail {
  id: number;
  number: string;
  name: string;
  nameUrdu: string;
  from: string;
  to: string;
  type: string;
  status: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  days: string[];
  stops: {
    station: string;
    lat: number;
    lng: number;
    arrival: string;
    departure: string;
    day: number;
    distance: number;
  }[];
  livePosition: LiveTrainPosition | null;
}

const PROJECT_ID = import.meta.env.VITE_SUPABASE_PROJECT_ID;

async function callTrainApi(params: Record<string, string>) {
  const searchParams = new URLSearchParams(params);
  const url = `https://${PROJECT_ID}.supabase.co/functions/v1/train-positions?${searchParams}`;
  
  const response = await fetch(url, {
    headers: {
      'apikey': import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
    },
  });
  
  if (!response.ok) throw new Error(`API error: ${response.status}`);
  return response.json();
}

export async function fetchLivePositions(): Promise<{ positions: LiveTrainPosition[]; stats: LiveStats; liveTrainIds: number[] }> {
  const result = await callTrainApi({ action: 'positions' });
  return { 
    positions: result.data || [], 
    stats: result.stats || { moving: 0, atStation: 0, total: 164, liveCount: 0, running: 0, offline: 164 },
    liveTrainIds: result.liveTrainIds || (result.data || []).map((p: any) => p.id),
  };
}

export async function fetchTrainDetail(trainId: number): Promise<TrainDetail | null> {
  const result = await callTrainApi({ action: 'train-detail', trainId: String(trainId) });
  return result.success ? result.data : null;
}

export async function fetchAllTrains() {
  const result = await callTrainApi({ action: 'all-trains' });
  return result.data || [];
}

export async function searchPlannerRoutes(from: string, to: string) {
  const result = await callTrainApi({ action: 'planner-search', from, to });
  return result;
}

export async function fetchPlannerStations() {
  const result = await callTrainApi({ action: 'planner-stations' });
  return result;
}

export async function findMyTrain(lat: number, lng: number) {
  const result = await callTrainApi({ action: 'find-my-train', lat: String(lat), lng: String(lng) });
  return result;
}

export interface NetworkStats {
  totalTrains: number;
  totalStations: number;
  totalRoutes: number;
  expressTrains: number;
  acTrains: number;
  passengerTrains: number;
  movingNow: number;
  atStation: number;
  liveCount: number;
  offline: number;
}

export async function fetchNetworkStats(): Promise<NetworkStats> {
  const result = await callTrainApi({ action: 'network-stats' });
  return result.data || {
    totalTrains: 164, totalStations: 342, totalRoutes: 80,
    expressTrains: 0, acTrains: 0, passengerTrains: 0,
    movingNow: 0, atStation: 0, liveCount: 0, offline: 164,
  };
}
