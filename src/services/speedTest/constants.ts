export const SPEED_TEST_CONFIG = {
  // Using multiple CDN endpoints for more accurate testing
  downloadUrls: [
    'https://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.21/lodash.min.js',
    'https://unpkg.com/react@18.2.0/umd/react.production.min.js',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.min.js'
  ],
  uploadEndpoints: [
    'https://httpbin.org/post',
    'https://postman-echo.com/post'
  ],
  testDuration: 5000, // 5 seconds per test
  uploadChunkSize: 1024 * 256, // 256KB chunks
  downloadRetries: 3,
  uploadRetries: 3,
  pingEndpoints: [
    'https://api.ipify.org',
    'https://cloudflare.com',
    'https://google.com'
  ],
  pingTimeout: 2000,
  pingRetries: 5
};