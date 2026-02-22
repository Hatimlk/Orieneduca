export const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxcrKS0tD5mCdxFsUfF9_WytLShhJv8aiR03nUmY-gYjtOwu-xjAZwV8oDTBhTPvkakWA/exec';

export const submitToGoogleSheet = async (data: Record<string, string>) => {
    try {
        const formData = new URLSearchParams();
        Object.keys(data).forEach(key => formData.append(key, data[key]));

        // Google Apps Script usually requires no-cors for direct browser fetch calls
        // unless specific headers are set. However, no-cors means we can't read the response.
        // We'll try standard fetch first, but with simple Content-Type to avoid preflight if possible.
        // Actually, URLSearchParams sets Content-Type to application/x-www-form-urlencoded
        // which is a "simple" content type.

        await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            body: formData,
            mode: 'no-cors' // Important: GAS response is opaque in browser
        });

        // Since we use no-cors, we assume success if no network error thrown.
        return { success: true };
    } catch (error) {
        console.error('Error submitting to Google Sheet:', error);
        return { success: false, error };
    }
};
