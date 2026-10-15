import { songResource } from "./song_resource.js";

async function songUrl(id, quality = "lossless", cookie = ""){
    const response = await songResource(id, quality, cookie);
    return response.data[0].url;
}

export { songUrl };