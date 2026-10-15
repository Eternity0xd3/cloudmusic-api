import { eapiRequest } from "../utils/request.js";

/**
 * Fetch the resource data of a song with url and encode type.
 * 
 * @param {number} id - Song id
 * @param {String} [level="lossless"] - Supported arguments: hires/ lossless(default)/ exhigh/ standard. Quality may affect the encode type of the song
 * @param {*} [cookie=""] - VIP cookie is required when accessing VIP songs.
 * @returns {Promise<Object>} - The parsed JSON data of a song, including url and real encode type.
 */
async function songResource(id, level = "lossless", cookie = ""){
    // EncodeType here isn't strictly corresponded to the type of the response, seemingly just affecting 'standard' level
    // Actually, 'lossless' in level gives flac and 'exhigh' in level gives mp3
    
    const url = "https://interfacepc.music.163.com/api/song/enhance/player/url/v1";
    const data = {
        ids: `[\"${id}\"]`,
        level: level,
        encodeType: "flac", 
    };
    const header = cookie.length === 0 ? {} : {cookie: cookie}

    const response = await eapiRequest(url, data, header);
    return JSON.parse(response.responseBuffer.toString("utf8"));
}

export { songResource }