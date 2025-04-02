export const generateTestData = (size: number): Uint8Array => {
  const data = new Uint8Array(size);
  crypto.getRandomValues(data);
  return data;
};