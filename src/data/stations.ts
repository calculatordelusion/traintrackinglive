export interface Station {
  name: string;
  nameUrdu: string;
  slug: string;
  lat: number;
  lng: number;
  city: string;
  province: string;
  trainIds: number[];
  facilities: string[];
}

export const stations: Station[] = [
  { name: "Karachi Cantt", nameUrdu: "کراچی کینٹ", slug: "karachi-cantt", lat: 24.8530, lng: 67.0205, city: "Karachi", province: "Sindh", trainIds: [1,2,5,6,7,8,9,13,14,15,27,28,33,34,35,36,41,42,43,44,47,48], facilities: ["Waiting Room","Ticket Counter","Restrooms","Food Court","ATM","Parking"] },
  { name: "Karachi City", nameUrdu: "کراچی سٹی", slug: "karachi-city", lat: 24.8556, lng: 67.0036, city: "Karachi", province: "Sindh", trainIds: [15,16], facilities: ["Waiting Room","Ticket Counter","Restrooms"] },
  { name: "Hyderabad Jn", nameUrdu: "حیدرآباد جنکشن", slug: "hyderabad-junction", lat: 25.3960, lng: 68.3578, city: "Hyderabad", province: "Sindh", trainIds: [1,2,5,6,7,8,9], facilities: ["Waiting Room","Ticket Counter","Restrooms","Food Stalls"] },
  { name: "Sukkur Jn", nameUrdu: "سکھر جنکشن", slug: "sukkur-junction", lat: 27.7052, lng: 68.8574, city: "Sukkur", province: "Sindh", trainIds: [1,2,5,6,7,8], facilities: ["Waiting Room","Ticket Counter","Restrooms"] },
  { name: "Multan Cantt", nameUrdu: "ملتان کینٹ", slug: "multan-cantt", lat: 30.1984, lng: 71.4687, city: "Multan", province: "Punjab", trainIds: [1,2,5,6,7,8,25,26,37,38,135,136], facilities: ["Waiting Room","Ticket Counter","Restrooms","Food Court","ATM","Parking","WiFi"] },
  { name: "Lahore Jn", nameUrdu: "لاہور جنکشن", slug: "lahore-junction", lat: 31.5580, lng: 74.3124, city: "Lahore", province: "Punjab", trainIds: [1,2,5,6,7,8,9,15,16,27,28,33,34,37,38,43,44,45,46,101,102,105,106,135,136], facilities: ["Waiting Room","VIP Lounge","Ticket Counter","Restrooms","Food Court","ATM","Parking","WiFi","Medical Aid"] },
  { name: "Rawalpindi", nameUrdu: "راولپنڈی", slug: "rawalpindi", lat: 33.5967, lng: 73.0520, city: "Rawalpindi", province: "Punjab", trainIds: [1,2,7,8,35,36,39,40,41,42,45,46,101,102,105,106], facilities: ["Waiting Room","Ticket Counter","Restrooms","Food Court","ATM","Parking"] },
  { name: "Peshawar Cantt", nameUrdu: "پشاور کینٹ", slug: "peshawar-cantt", lat: 34.0151, lng: 71.5249, city: "Peshawar", province: "KPK", trainIds: [1,2,13,14,19,20,47,48], facilities: ["Waiting Room","Ticket Counter","Restrooms","Food Stalls","ATM"] },
  { name: "Quetta", nameUrdu: "کوئٹہ", slug: "quetta", lat: 30.1920, lng: 67.0015, city: "Quetta", province: "Balochistan", trainIds: [39,40], facilities: ["Waiting Room","Ticket Counter","Restrooms","Food Stalls"] },
  { name: "Faisalabad Jn", nameUrdu: "فیصل آباد جنکشن", slug: "faisalabad-junction", lat: 31.4187, lng: 73.0791, city: "Faisalabad", province: "Punjab", trainIds: [17,18], facilities: ["Waiting Room","Ticket Counter","Restrooms","Parking"] },
  { name: "Gujranwala", nameUrdu: "گوجرانوالا", slug: "gujranwala", lat: 32.1877, lng: 74.1945, city: "Gujranwala", province: "Punjab", trainIds: [1,2,13,14], facilities: ["Waiting Room","Ticket Counter","Restrooms"] },
  { name: "Gujrat", nameUrdu: "گجرات", slug: "gujrat", lat: 32.5731, lng: 74.0789, city: "Gujrat", province: "Punjab", trainIds: [1,2], facilities: ["Waiting Room","Ticket Counter","Restrooms"] },
  { name: "Jhelum", nameUrdu: "جہلم", slug: "jhelum", lat: 32.9325, lng: 73.7257, city: "Jhelum", province: "Punjab", trainIds: [1,2,7,8], facilities: ["Waiting Room","Ticket Counter","Restrooms"] },
  { name: "Lala Musa Jn", nameUrdu: "لالہ موسیٰ جنکشن", slug: "lala-musa-junction", lat: 32.7010, lng: 73.9560, city: "Lala Musa", province: "Punjab", trainIds: [1,2], facilities: ["Waiting Room","Ticket Counter","Restrooms"] },
  { name: "Wazirabad Jn", nameUrdu: "وزیرآباد جنکشن", slug: "wazirabad-junction", lat: 32.4428, lng: 74.1198, city: "Wazirabad", province: "Punjab", trainIds: [1,2], facilities: ["Waiting Room","Ticket Counter"] },
  { name: "Gujar Khan", nameUrdu: "گوجر خان", slug: "gujar-khan", lat: 33.2539, lng: 73.3029, city: "Gujar Khan", province: "Punjab", trainIds: [1,2], facilities: ["Ticket Counter"] },
  { name: "Margala", nameUrdu: "مارگلہ", slug: "margala", lat: 33.7294, lng: 73.0551, city: "Islamabad", province: "Punjab", trainIds: [5,6], facilities: ["Waiting Room","Ticket Counter","Restrooms","Parking"] },
  { name: "Sialkot Jn", nameUrdu: "سیالکوٹ جنکشن", slug: "sialkot-junction", lat: 32.4945, lng: 74.5229, city: "Sialkot", province: "Punjab", trainIds: [9,10], facilities: ["Waiting Room","Ticket Counter","Restrooms"] },
  { name: "Bahawalpur", nameUrdu: "بہاولپور", slug: "bahawalpur", lat: 29.3544, lng: 71.6911, city: "Bahawalpur", province: "Punjab", trainIds: [25,26], facilities: ["Waiting Room","Ticket Counter","Restrooms"] },
  { name: "Sahiwal", nameUrdu: "ساہیوال", slug: "sahiwal", lat: 30.6682, lng: 73.1114, city: "Sahiwal", province: "Punjab", trainIds: [7,8,43,44], facilities: ["Waiting Room","Ticket Counter","Restrooms"] },
  { name: "Khanewal Jn", nameUrdu: "خانیوال جنکشن", slug: "khanewal-junction", lat: 30.3017, lng: 71.9321, city: "Khanewal", province: "Punjab", trainIds: [1,2,7,8,25,26], facilities: ["Waiting Room","Ticket Counter","Restrooms"] },
  { name: "Havelian", nameUrdu: "ہویلیاں", slug: "havelian", lat: 34.0530, lng: 73.1573, city: "Havelian", province: "KPK", trainIds: [11,12], facilities: ["Ticket Counter","Restrooms"] },
  { name: "Jacobabad Jn", nameUrdu: "جیکب آباد جنکشن", slug: "jacobabad-junction", lat: 28.2824, lng: 68.4370, city: "Jacobabad", province: "Sindh", trainIds: [], facilities: ["Waiting Room","Ticket Counter"] },
  { name: "Nawabshah", nameUrdu: "نوابشاہ", slug: "nawabshah", lat: 26.2483, lng: 68.4098, city: "Nawabshah", province: "Sindh", trainIds: [1,2,7,8], facilities: ["Waiting Room","Ticket Counter","Restrooms"] },
  { name: "Rohri Jn", nameUrdu: "روہڑی جنکشن", slug: "rohri-junction", lat: 27.6920, lng: 68.8948, city: "Rohri", province: "Sindh", trainIds: [1,2,5,6,7,8], facilities: ["Waiting Room","Ticket Counter","Restrooms","Food Stalls"] },
  { name: "Raiwind Jn", nameUrdu: "رائیونڈ جنکشن", slug: "raiwind-junction", lat: 31.2499, lng: 74.2145, city: "Raiwind", province: "Punjab", trainIds: [], facilities: ["Ticket Counter"] },
  { name: "Okara", nameUrdu: "اوکاڑا", slug: "okara", lat: 30.8092, lng: 73.4534, city: "Okara", province: "Punjab", trainIds: [7,8], facilities: ["Waiting Room","Ticket Counter","Restrooms"] },
  { name: "Attock City", nameUrdu: "اٹک سٹی", slug: "attock-city", lat: 33.7745, lng: 72.3609, city: "Attock", province: "Punjab", trainIds: [1,2], facilities: ["Ticket Counter","Restrooms"] },
  { name: "Nowshera Jn", nameUrdu: "نوشہرہ جنکشن", slug: "nowshera-junction", lat: 34.0062, lng: 71.9750, city: "Nowshera", province: "KPK", trainIds: [1,2,13,14], facilities: ["Waiting Room","Ticket Counter","Restrooms"] },
  { name: "Mardan", nameUrdu: "مردان", slug: "mardan", lat: 34.1987, lng: 72.0404, city: "Mardan", province: "KPK", trainIds: [], facilities: ["Ticket Counter"] },
  { name: "Dera Ghazi Khan", nameUrdu: "ڈیرہ غازی خان", slug: "dera-ghazi-khan", lat: 30.0489, lng: 70.6345, city: "D.G. Khan", province: "Punjab", trainIds: [], facilities: ["Waiting Room","Ticket Counter","Restrooms"] },
  { name: "Rahim Yar Khan", nameUrdu: "رحیم یار خان", slug: "rahim-yar-khan", lat: 28.4212, lng: 70.2989, city: "Rahim Yar Khan", province: "Punjab", trainIds: [1,2,7,8,25,26], facilities: ["Waiting Room","Ticket Counter","Restrooms","Food Stalls"] },
];

export const getStationBySlug = (slug: string) => stations.find(s => s.slug === slug);
export const searchStations = (q: string) => {
  const query = q.toLowerCase();
  return stations.filter(s => 
    s.name.toLowerCase().includes(query) || 
    s.city.toLowerCase().includes(query) ||
    s.nameUrdu.includes(q) ||
    s.slug.includes(query)
  );
};
