import { eapiRequest } from "../utils/request.js";

async function songResource(id, quality = "lossless", cookie = ""){
    // EncodeType here isn't strictly corresponded to the type of the response, seemingly just affecting 'standard' level
    // Actually, 'lossless' in level gives flac and 'exhigh' in level gives mp3
    
    const url = "https://interfacepc.music.163.com/api/song/enhance/player/url/v1";
    const data = {
        ids: `[\"${id}\"]`,
        level: quality,
        encodeType: "flac",
    };
    const header = cookie.length === 0 ? {} : {cookie: cookie}

    const response = await eapiRequest(url, data, header);
    return JSON.parse(response.responseBuffer.toString("utf8"));
}

export { songResource }