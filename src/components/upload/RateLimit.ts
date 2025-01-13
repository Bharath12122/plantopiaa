const RATE_LIMIT_KEY = 'plant_upload_rate_limit';
const RATE_LIMIT_DURATION = 60000; // 1 minute
const MAX_REQUESTS = 5; // 5 requests per minute

export const checkRateLimit = (isPro: boolean) => {
  if (isPro) return true;
  
  const now = Date.now();
  const stored = localStorage.getItem(RATE_LIMIT_KEY);
  let requests = stored ? JSON.parse(stored) : [];
  
  requests = requests.filter((time: number) => now - time < RATE_LIMIT_DURATION);
  
  if (requests.length >= MAX_REQUESTS) {
    return false;
  }
  
  requests.push(now);
  localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(requests));
  return true;
};