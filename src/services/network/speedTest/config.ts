export const SPEED_TEST_CONFIG = {
  downloadUrls: [
    'https://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.21/lodash.min.js',
    'https://unpkg.com/react@18.2.0/umd/react.production.min.js'
  ],
  uploadEndpoint: 'https://httpbin.org/post',
  testDuration: 5000, // 5 seconds
  uploadChunkSize: 65536, // 64KB (within crypto.getRandomValues limit)
  maxRetries: 3,
  pingEndpoints: [
    'https://api.ipify.org',
    'https://cloudflare.com',
    'https://google.com'
  ],
  pingTimeout: 2000
};