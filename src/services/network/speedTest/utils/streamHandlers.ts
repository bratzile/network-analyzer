import { SPEED_TEST_CONFIG } from '../config';

export const handleDownloadStream = async (url: string, startTime: number): Promise<number> => {
  const timestamp = Date.now();
  const response = await fetch(`${url}?t=${timestamp}`, {
    cache: 'no-store',
    headers: {
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache'
    }
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const reader = response.body?.getReader();
  if (!reader) {
    throw new Error('No reader available');
  }

  let bytes = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done || performance.now() - startTime >= SPEED_TEST_CONFIG.testDuration) {
      break;
    }
    bytes += value?.length || 0;
  }

  return bytes;
};

export const handleUploadStream = async (
  data: Uint8Array,
  endpoint: string
): Promise<number> => {
  const formData = new FormData();
  formData.append('file', new Blob([data]));

  const response = await fetch(endpoint, {
    method: 'POST',
    body: formData
  });

  if (!response.ok) {
    throw new Error(`Upload failed with status ${response.status}`);
  }

  return data.length;
};