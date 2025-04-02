import { SpeedTestResult } from '../types/network';
import axios from 'axios';

// German speed test servers
const GERMAN_TEST_SERVERS = [
  'https://fra.speedtest.clouvider.net/backend/garbage.php?ckSize=25',
  'https://speedtest-fra1.digitalocean.com/__down?bytes=25000000',
  'https://speedtest.frankfurt.linode.com/__down?bytes=25000000'
];

const TEST_DURATION = 10000; // 10 seconds
const CHUNK_SIZE = 1024 * 1024; // 1MB chunks for upload

async function downloadTest(): Promise<number> {
  const startTime = performance.now();
  let totalBytes = 0;
  
  try {
    const downloads = GERMAN_TEST_SERVERS.map(async (url) => {
      const response = await fetch(url, {
        cache: 'no-store',
      });
      
      if (!response.ok) throw new Error('Download failed');
      
      const reader = response.body?.getReader();
      if (!reader) return 0;
      
      let bytes = 0;
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        bytes += value.length;
      }
      
      return bytes;
    });
    
    const results = await Promise.allSettled(downloads);
    totalBytes = results.reduce((sum, result) => {
      return sum + (result.status === 'fulfilled' ? result.value : 0);
    }, 0);
    
    const duration = (performance.now() - startTime) / 1000;
    const bitsPerSecond = (totalBytes * 8) / duration;
    return Math.round(bitsPerSecond / 1024 / 1024);
  } catch (error) {
    console.error('Download test error:', error);
    return 0;
  }
}

async function uploadTest(): Promise<number> {
  const startTime = performance.now();
  let totalBytes = 0;
  
  try {
    const data = new Uint8Array(CHUNK_SIZE).fill(255);
    const blob = new Blob([data]);
    const server = GERMAN_TEST_SERVERS[0];
    
    while (performance.now() - startTime < TEST_DURATION) {
      await fetch(server, {
        method: 'POST',
        body: blob,
        cache: 'no-store'
      });
      totalBytes += CHUNK_SIZE;
    }
    
    const duration = (performance.now() - startTime) / 1000;
    const bitsPerSecond = (totalBytes * 8) / duration;
    return Math.round(bitsPerSecond / 1024 / 1024);
  } catch (error) {
    console.error('Upload test error:', error);
    return 0;
  }
}

async function measureLatency(): Promise<number> {
  const samples = 5;
  const results: number[] = [];
  const server = GERMAN_TEST_SERVERS[0];
  
  for (let i = 0; i < samples; i++) {
    const start = performance.now();
    try {
      await fetch(`${server}?ping=1`, {
        cache: 'no-store'
      });
      results.push(performance.now() - start);
    } catch (error) {
      console.error('Latency measurement error:', error);
    }
    await new Promise(resolve => setTimeout(resolve, 200));
  }
  
  if (results.length > 2) {
    results.sort((a, b) => a - b);
    results.shift();
    results.pop();
  }
  
  return results.length > 0
    ? Math.round(results.reduce((sum, val) => sum + val, 0) / results.length)
    : 0;
}

export const measureNetworkSpeed = async (): Promise<SpeedTestResult> => {
  const ping = await measureLatency();
  const download = await downloadTest();
  const upload = await uploadTest();

  return {
    ping,
    download,
    upload,
    timestamp: new Date()
  };
};

export const getNetworkInfo = async () => {
  try {
    const [ipResponse, ispResponse] = await Promise.all([
      axios.get('https://api.ipify.org?format=json'),
      axios.get('https://ipapi.co/json/')
    ]);

    const connection = (navigator as any).connection || {
      effectiveType: 'unknown',
      downlink: 0,
      rtt: 0,
      saveData: false
    };

    return {
      networkInfo: {
        effectiveType: connection.effectiveType,
        downlink: connection.downlink,
        rtt: connection.rtt,
        saveData: connection.saveData
      },
      publicIP: ipResponse.data.ip,
      ispInfo: {
        name: ispResponse.data.org || 'Unknown ISP',
        city: ispResponse.data.city || 'Unknown',
        country: ispResponse.data.country_name || 'Unknown',
        asn: ispResponse.data.asn || 'Unknown'
      },
      localIP: window.location.hostname
    };
  } catch (error) {
    console.error('Error fetching network info:', error);
    return {
      networkInfo: {
        effectiveType: 'unknown',
        downlink: 0,
        rtt: 0,
        saveData: false
      },
      publicIP: 'Unknown',
      ispInfo: {
        name: 'Unknown ISP',
        city: 'Unknown',
        country: 'Unknown',
        asn: 'Unknown'
      },
      localIP: window.location.hostname
    };
  }
};