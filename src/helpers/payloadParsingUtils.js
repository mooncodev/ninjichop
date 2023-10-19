import pako from 'pako';

export function parseMessageData(message){
  return new Promise((resolve, reject) => {
    if (message.data instanceof Blob) {
      const reader = new FileReader();
      reader.onload = function(e) {
        const arrayBuffer = e.target.result;
        const data = decompressJSON(arrayBuffer);
        resolve(data);
      };
      reader.onerror = function(e) {
        reject(e.target.error);
      };
      reader.readAsArrayBuffer(message.data);
    } else if (typeof message.data === 'string') {
      resolve(JSON.parse(message.data));
    } else {
      reject(new Error('Unknown data type in message'));
    }
  });
}

export function decompressJSON(compressed) {
  const decompressed = pako.inflate(new Uint8Array(compressed), { to: 'string' });
  return JSON.parse(decompressed);
}
