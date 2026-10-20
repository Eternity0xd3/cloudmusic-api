import { eapiRequest } from "../utils/request.js";
import { isIP } from "node:net";

/**
 * Fetch the resource data of a song with url and encode type.
 * 
 * @param {number} id - Song id
 * @param {String} [level="lossless"] - Supported arguments: hires/ lossless(default)/ exhigh/ standard. Quality may affect the encode type of the song
 * @param {*} [cookie=""] - VIP cookie is required when accessing VIP songs.
 * @param {string} [realIP] - Overrides NETEASE_REAL_IP when provided.
 * @returns {Promise<Object>} - The parsed JSON data of a song, including url and real encode type.
 */
async function songResource(id, level = "lossless", cookie = "", realIP = undefined){
    // EncodeType here isn't strictly corresponded to the type of the response, seemingly just affecting 'standard' level
    // Actually, 'lossless' in level gives flac and 'exhigh' in level gives mp3
    
    const url = "https://interfacepc.music.163.com/api/song/enhance/player/url/v1";
    const data = {
        ids: `[\"${id}\"]`,
        level: level,
        encodeType: "flac", 
    };
    const header = cookie.length === 0 ? {} : {cookie: cookie}
    const configuredIP = realIP ?? process.env.NETEASE_REAL_IP;
    const ip = typeof configuredIP === 'string' ? configuredIP.trim() : configuredIP;
    if (ip || realIP !== undefined) {
        if (typeof ip !== 'string' || !isIP(ip)) {
            throw new Error('realIP or NETEASE_REAL_IP must be a valid IPv4 or IPv6 address.');
        }
        header['X-Real-IP'] = ip;
        header['X-Forwarded-For'] = ip;
    }

    const response = await eapiRequest(url, data, header);
    return JSON.parse(response.responseBuffer.toString("utf8"));
}

export { songResource }
