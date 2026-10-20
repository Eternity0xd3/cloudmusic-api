import { songResource } from "./song_resource.js";

/**
 * Fetch the pure source url of a song. Notice the url is temporary and may turn invalid.
 * 
 * @param {number} id - Song id
 * @param {String} [quality="lossless"] - Supported arguments: hires/ lossless(default)/ exhigh/ standard. Quality may affect the encode type of the song
 * @param {*} [cookie=""] - VIP cookie is required when accessing VIP songs.
 * @param {string} [realIP] - Overrides NETEASE_REAL_IP when provided.
 * @returns {Promise<String>} - Song URL
 */
async function songUrl(id, quality = "lossless", cookie = "", realIP = undefined){
    const response = await songResource(id, quality, cookie, realIP);
    return response.data[0].url;
}

export { songUrl };
