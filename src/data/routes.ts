export interface PopularRoute {
  from: string;
  to: string;
  trainCount: number;
  duration: string;
  fare: string;
  trains: string[];
}

export const popularRoutes: PopularRoute[] = [
  { from: "Karachi", to: "Lahore", trainCount: 12, duration: "18-22 hours", fare: "Rs. 1,500 - 8,000", trains: ["Tezgam", "Green Line", "Business Express", "Karakoram Express"] },
  { from: "Lahore", to: "Rawalpindi", trainCount: 8, duration: "4-5 hours", fare: "Rs. 600 - 3,500", trains: ["Awam Express", "Tezgam", "Green Line", "Business Express"] },
  { from: "Karachi", to: "Peshawar", trainCount: 6, duration: "24-28 hours", fare: "Rs. 2,000 - 9,000", trains: ["Khyber Mail", "Awam Express", "Tezgam"] },
  { from: "Lahore", to: "Multan", trainCount: 10, duration: "5-6 hours", fare: "Rs. 500 - 2,500", trains: ["Chenab Express", "Hazara Express", "Jaffar Express"] },
  { from: "Quetta", to: "Rawalpindi", trainCount: 2, duration: "20-24 hours", fare: "Rs. 1,800 - 7,000", trains: ["Jaffar Express", "Bolan Mail"] },
  { from: "Karachi", to: "Hyderabad", trainCount: 8, duration: "2-3 hours", fare: "Rs. 200 - 1,200", trains: ["Shalimar Express", "Millat Express", "Tezgam"] },
  { from: "Multan", to: "Lahore", trainCount: 10, duration: "5-6 hours", fare: "Rs. 500 - 2,500", trains: ["Green Line", "Tezgam", "Shalimar Express"] },
  { from: "Rawalpindi", to: "Peshawar", trainCount: 6, duration: "3-4 hours", fare: "Rs. 300 - 1,500", trains: ["Khyber Mail", "Awam Express", "Jaffar Express"] },
  { from: "Faisalabad", to: "Lahore", trainCount: 5, duration: "3-3.5 hours", fare: "Rs. 250 - 1,200", trains: ["Thal Express", "Mianwali Express"] },
  { from: "Karachi", to: "Multan", trainCount: 8, duration: "14-17 hours", fare: "Rs. 1,200 - 6,500", trains: ["Bahauddin Zikria Express", "Green Line", "Tezgam"] },
  { from: "Lahore", to: "Peshawar", trainCount: 6, duration: "7-9 hours", fare: "Rs. 800 - 4,000", trains: ["Khyber Mail", "Tezgam", "Awam Express"] },
  { from: "Karachi", to: "Quetta", trainCount: 2, duration: "18-20 hours", fare: "Rs. 1,500 - 7,000", trains: ["Jaffar Express"] },
  { from: "Karachi", to: "Sukkur", trainCount: 8, duration: "8-10 hours", fare: "Rs. 800 - 4,000", trains: ["Tezgam", "Khyber Mail", "Shalimar Express"] },
];
