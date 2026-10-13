/**
 * NetEase Cloud Music EAPI Cryptography
 *
 * Implements encryption and decryption for the EAPI protocol.
 *
 * References:
 * - NeteaseCloudMusicApiEnhanced/api-clawer
 *   https://github.com/NeteaseCloudMusicApiEnhanced/api-clawer
 *
 * The implementation is written based on publicly
 * available protocol analysis and reference code.
 *
 * This project is intended for personal learning and research.
 * 
 * Thanks for the original author and contributors of the NeteaseCloudMusicApiEnhanced project for their work on the EAPI protocol.
 * 
 * Eapi Encryption Process:
 * - text: stringified JSON
 * - MD5 message = `nobody${url.path}use${text}md5forencrypt`
 * - digest: md5(message)
 * - data: `${url.path}-36cd479b6b5-${text}-36cd479b6b5-${digest}`
 * - body: encrypt128Ecb(data, eapiKey).toString('hex').toUpperCase()
 * - url: url.href.replace(/\w*api/, 'eapi')
 */
import crypto from "node:crypto";


const eapiKey = Buffer.from('e82ckenh8dichen8');

// the argument and return values are all Buffers
function encrypt128Ecb(data, key = eapiKey) {
    const cipher = crypto.createCipheriv('aes-128-ecb', key, null);
    return Buffer.concat([cipher.update(data), cipher.final()]);
}

// the argument and return values are all Buffers
function decrypt128Ecb(data, key = eapiKey) {
    const cipher = crypto.createDecipheriv('aes-128-ecb', key, null);
    return Buffer.concat([cipher.update(data), cipher.final()]);
}

// the argument and return values are all Buffers
function md5(data) {
    return crypto.createHash('md5').update(data).digest();
}

/**
 * Encrypts a NetEase Cloud Music API request using the EAPI protocol.
 *
 * @param {string} url - The original full API URL (e.g. https://interfacepc.music.163.com/api/v6/playlist/detail).
 * @param {Object} object - The original request parameters before encryption.
 * @returns {{url: string, body: {params: string}}} The EAPI URL and encrypted request body.
 */
function requestEncrypt(url, object) {
    url = new URL(url);
    const path = url.pathname;
    const text = JSON.stringify(object);
    const md5Message = `nobody${path}use${text}md5forencrypt`;
    const md5HashHex = md5(md5Message).toString("hex");
    const data = `${path}-36cd479b6b5-${text}-36cd479b6b5-${md5HashHex}`;
    const encrypted = encrypt128Ecb(Buffer.from(data), eapiKey).toString("hex").toUpperCase();
    const body = { params: encrypted };
    const eapiUrl = url.href.replace(/\w*api/, 'eapi');
    return { url: eapiUrl, body: body };
}

export {requestEncrypt, decrypt128Ecb};
