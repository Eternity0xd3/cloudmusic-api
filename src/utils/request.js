import { requestEncrypt, decrypt128Ecb } from './crypto.js';
import { isIP } from 'node:net';

/**
 * Sends an encrypted API request to the NetEase Music API.
 * 
 * @param {String} url - The original full API URL (e.g. https://interfacepc.music.163.com/api/v6/playlist/detail).
 * @param {Object} data - The original request parameters before encryption.
 * @param {Object} [headers={}] - Optional additional headers to include in the request.
 * @returns {Promise<{status: number, responseBuffer: Buffer}>} The HTTP status code and the response body as a Buffer.
 */
async function eapiRequest(url, data, headers = {}) {
    const requestHeaders = new Headers({
        'Content-Type': 'application/x-www-form-urlencoded',
        ...headers
    });
    const realIP = (requestHeaders.get('X-Real-IP') ?? process.env.NETEASE_REAL_IP)?.trim();
    if (realIP) {
        if (!isIP(realIP)) {
            throw new Error('realIP or NETEASE_REAL_IP must be a valid IPv4 or IPv6 address.');
        }
        requestHeaders.set('X-Real-IP', realIP);
        requestHeaders.set('X-Forwarded-For', realIP);
    }
    const { url: eapiUrl, body } = requestEncrypt(url, data);
    const requestBody = new URLSearchParams(body).toString();
    const response = await fetch(eapiUrl, {
        method: 'POST',
        headers: requestHeaders,
        body: requestBody,
    });
    const status = response.status;
    const responseBuffer = Buffer.from(await response.arrayBuffer());
    return { status, responseBuffer };
}

export { eapiRequest };
