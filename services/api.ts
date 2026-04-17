/**
 * HAKIKI SCANNER — API Service
 * Communicates with the FastAPI backend at /predict, /health, /info
 */

import { Platform } from 'react-native';

// Change this to your backend URL (LAN IP for physical device testing)
const API_BASE_URL = 'http://192.168.1.181:8000';

export type Verdict = 'real' | 'suspicious' | 'fake';

export interface PredictionScores {
  real: number;
  suspicious: number;
  fake: number;
}

export interface PredictionResult {
  verdict: Verdict;
  confidence: number;
  scores: PredictionScores;
}

export interface HealthStatus {
  status: string;
  model_loaded: boolean;
  version: string;
}

export interface ApiError {
  error: string;
}

class HakikiApiService {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  /**
   * POST /predict — Analyze image for face authenticity
   * Accepts a local image URI from the device gallery or camera
   */
  async predict(imageUri: string): Promise<PredictionResult> {
    const formData = new FormData();

    // 1. Clean up and format the URI
    // React Native's bridge needs 'file://' prefix on some platforms,
    // and sometimes needs it removed on others depending on the picker.
    let finalUri = imageUri;
    if (Platform.OS === 'android' && !finalUri.startsWith('file://') && !finalUri.startsWith('content://')) {
      finalUri = `file://${finalUri}`;
    }

    // 2. Extract filename and extension
    const filename = finalUri.split('/').pop() || 'upload_image.jpg';
    const ext = filename.split('.').pop()?.toLowerCase() || 'jpg';
    
    // 3. Map to correct MIME type
    const mimeType = ext === 'png' ? 'image/png' : 
                     ext === 'webp' ? 'image/webp' : 
                     'image/jpeg';

    // 4. Build the multipart part
    // The structure [uri, name, type] triggers the native binary upload
    // @ts-ignore - FormData.append expects special object for files in RN
    formData.append('image', {
      uri: finalUri,
      name: filename,
      type: mimeType,
    });

    console.log(`[API] Uploading binary: ${filename} (${mimeType}) from ${finalUri}`);

    try {
      const response = await fetch(`${this.baseUrl}/predict`, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
          // CRITICAL: Do NOT set Content-Type header. 
          // fetch will auto-set it to multipart/form-data with the correct boundary.
        },
      });

      if (!response.ok) {
        let errorMsg = `Server error (HTTP ${response.status})`;
        try {
          const errorData = await response.json();
          // FastAPI common error formats
          errorMsg = errorData.detail || errorData.error || errorMsg;
          if (Array.isArray(errorData.detail)) {
            // Handle validation errors (422)
            errorMsg = errorData.detail.map((e: any) => `${e.loc.join('.')}: ${e.msg}`).join(', ');
          }
        } catch {
          // Fallback if not JSON
        }
        throw new Error(errorMsg);
      }

      const data: PredictionResult = await response.json();
      return data;
    } catch (error) {
      console.error('[API Error]', error);
      throw error;
    }
  }

  /**
   * GET /health — Check if API and model are running
   */
  async health(): Promise<HealthStatus> {
    try {
      const response = await fetch(`${this.baseUrl}/health`, {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
      });

      if (!response.ok) throw new Error('Health check failed');
      return response.json();
    } catch (error) {
      console.warn('[API Health Check Failed]', error);
      throw error;
    }
  }

  /**
   * GET /info — Get API and model information
   */
  async info(): Promise<Record<string, any>> {
    const response = await fetch(`${this.baseUrl}/info`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
    });

    if (!response.ok) throw new Error('Could not fetch API info');
    return response.json();
  }
}

// Export singleton instance
export const hakikiApi = new HakikiApiService();
export default hakikiApi;
