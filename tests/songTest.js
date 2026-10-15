import { eapiRequest } from "../src/utils/request.js";
import { songResource } from "../src/api/song_resource.js";
import { songUrl } from "../src/api/song_url.js"

const response = await songUrl(2043164658);
console.log(response)
// const data = {
//   ids: '["2043164658"]',
//   level: "lossless",
//   encodeType: "flac",
// };

// const url = "https://interfacepc.music.163.com/api/song/enhance/player/url/v1";

// eapiRequest(url, data, {cookie: cookie}).then(({status, responseBuffer}) => {
//     const result = JSON.parse(responseBuffer.toString("utf8"));
//     console.log(result)
// })