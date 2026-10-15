import { requestEncrypt, decrypt128Ecb } from './crypto.js';

/**
 * Sends an encrypted API request to the NetEase Music API.
 * 
 * @param {String} url - The original full API URL (e.g. https://interfacepc.music.163.com/api/v6/playlist/detail).
 * @param {Object} data - The original request parameters before encryption.
 * @param {Object} [headers={}] - Optional additional headers to include in the request.
 * @returns {Promise<{status: number, responseBuffer: Buffer}>} The HTTP status code and the response body as a Buffer.
 */
async function eapiRequest(url, data, headers = {}) {
    const { url: eapiUrl, body } = requestEncrypt(url, data);
    const requestBody = new URLSearchParams(body).toString();
    const response = await fetch(eapiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            ...headers
        },
        body: requestBody,
    });
    const status = response.status;
    const responseBuffer = Buffer.from(await response.arrayBuffer());
    return { status, responseBuffer };
}

export { eapiRequest };