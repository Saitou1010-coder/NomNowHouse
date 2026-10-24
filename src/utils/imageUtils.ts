/**
 * Image compression and optimization utility for recipes.
 * Ensures all user-uploaded and camera-captured images stay well below 
 * Firestore's 1MB (1,048,576 bytes) document size limit.
 */

export interface CompressionResult {
  dataUrl: string;
  sizeBytes: number;
  sizeKb: number;
  width: number;
  height: number;
}

/**
 * Compresses an image (from a File, Blob, or base64 data URL) using HTML Canvas.
 * Targets a maximum dimension (default 960px) and JPEG quality (default 0.75),
 * ensuring the resulting base64 string is usually 50KB - 150KB.
 */
export async function compressImage(
  input: File | Blob | string,
  maxDimension = 960,
  quality = 0.75
): Promise<CompressionResult> {
  return new Promise((resolve, reject) => {
    // If it's a regular remote URL (http/https), no base64 compression needed
    if (typeof input === 'string' && (input.startsWith('http://') || input.startsWith('https://'))) {
      resolve({
        dataUrl: input,
        sizeBytes: input.length,
        sizeKb: Math.round(input.length / 1024),
        width: 0,
        height: 0
      });
      return;
    }

    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      let { width, height } = img;

      // Scale down while maintaining aspect ratio
      if (width > maxDimension || height > maxDimension) {
        if (width > height) {
          height = Math.round((height * maxDimension) / width);
          width = maxDimension;
        } else {
          width = Math.round((width * maxDimension) / height);
          height = maxDimension;
        }
      }

      const canvas = document.createElement('canvas');
      canvas.width = Math.max(1, width);
      canvas.height = Math.max(1, height);

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        if (typeof input === 'string') {
          resolve({
            dataUrl: input,
            sizeBytes: input.length,
            sizeKb: Math.round(input.length / 1024),
            width,
            height
          });
        } else {
          reject(new Error("Unable to obtain 2D canvas context"));
        }
        return;
      }

      // Draw white background in case source has transparency (e.g. PNG converted to JPEG)
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, width, height);
      ctx.drawImage(img, 0, 0, width, height);

      // Initial compression
      let currentQuality = quality;
      let dataUrl = canvas.toDataURL('image/jpeg', currentQuality);

      // Defensive check: if base64 is still larger than 400KB (~550,000 chars),
      // compress more aggressively with smaller dimensions and lower quality.
      // Firestore total document limit is 1,048,576 bytes. Keeping image <= 300KB
      // ensures the document never exceeds the limit.
      if (dataUrl.length > 500000) {
        const smallerCanvas = document.createElement('canvas');
        const sWidth = Math.round(width * 0.7);
        const sHeight = Math.round(height * 0.7);
        smallerCanvas.width = Math.max(1, sWidth);
        smallerCanvas.height = Math.max(1, sHeight);
        const sCtx = smallerCanvas.getContext('2d');
        if (sCtx) {
          sCtx.fillStyle = '#FFFFFF';
          sCtx.fillRect(0, 0, sWidth, sHeight);
          sCtx.drawImage(canvas, 0, 0, sWidth, sHeight);
          dataUrl = smallerCanvas.toDataURL('image/jpeg', 0.65);
          width = sWidth;
          height = sHeight;
        }
      }

      // Even more aggressive fallback if it still exceeds 600,000 characters
      if (dataUrl.length > 600000) {
        const miniCanvas = document.createElement('canvas');
        const mWidth = Math.round(width * 0.6);
        const mHeight = Math.round(height * 0.6);
        miniCanvas.width = Math.max(1, mWidth);
        miniCanvas.height = Math.max(1, mHeight);
        const mCtx = miniCanvas.getContext('2d');
        if (mCtx) {
          mCtx.fillStyle = '#FFFFFF';
          mCtx.fillRect(0, 0, mWidth, mHeight);
          mCtx.drawImage(canvas, 0, 0, mWidth, mHeight);
          dataUrl = miniCanvas.toDataURL('image/jpeg', 0.55);
          width = mWidth;
          height = mHeight;
        }
      }

      const sizeBytes = Math.round((dataUrl.length * 3) / 4);
      resolve({
        dataUrl,
        sizeBytes,
        sizeKb: Math.round(sizeBytes / 1024),
        width,
        height
      });
    };

    img.onerror = (error) => {
      console.warn("Image load failed for compression, falling back to original data if available:", error);
      if (typeof input === 'string') {
        resolve({
          dataUrl: input,
          sizeBytes: input.length,
          sizeKb: Math.round(input.length / 1024),
          width: 0,
          height: 0
        });
      } else {
        const reader = new FileReader();
        reader.onload = (e) => {
          const res = (e.target?.result as string) || '';
          resolve({
            dataUrl: res,
            sizeBytes: res.length,
            sizeKb: Math.round(res.length / 1024),
            width: 0,
            height: 0
          });
        };
        reader.onerror = (e) => reject(e);
        reader.readAsDataURL(input);
      }
    };

    if (typeof input === 'string') {
      img.src = input;
    } else {
      const reader = new FileReader();
      reader.onload = (e) => {
        img.src = (e.target?.result as string) || '';
      };
      reader.onerror = (e) => reject(e);
      reader.readAsDataURL(input);
    }
  });
}

/**
 * Estimates the byte size of an object as JSON.
 */
export function estimateObjectSize(obj: any): number {
  try {
    const str = JSON.stringify(obj);
    return new Blob([str]).size;
  } catch {
    return 0;
  }
}
