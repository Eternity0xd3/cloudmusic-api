import { songResource } from "./song_resource.js";

/**
 * Fetch the pure source url of a song. Notice the url is temporary and may turn invalid.
 * 
 * @param {number} id - Song id
 * @param {String} [quality="lossless"] - Supported arguments: hires/ lossless(default)/ exhigh/ standard. Quality may affect the encode type of the song
 * @param {*} [cookie=""] - VIP cookie is required when accessing VIP songs.
 * @returns {Promise<String>} - Song URL
 */
async function songUrl(id, quality = "lossless", cookie = ""){
    const response = await songResource(id, quality, cookie);
    return response.data[0].url;
}

export { songUrl };