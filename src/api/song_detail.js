import { eapiRequest } from "../utils/request.js";

/**
 * Fetches the details of songs
 * 
 * @param { number[] } songIds - IDs of the songs
 * @returns { Promise<Object> } - The complete upstream response, including songs and privileges.
 */
async function songDetail(songIds) {
    const listC = [];
    songIds.forEach((eachSong) => {
        listC.push({"id": `${eachSong}`, "v": 0});
    });
    const c = JSON.stringify(listC);
    const data = {
        c: c,
        trialMode: "-1",
    };
    const url = "https://interfacepc.music.163.com/api/v3/song/detail";
    const response = await eapiRequest(url, data);
    const resultData = JSON.parse(response.responseBuffer.toString("utf8"));
    return resultData;
}

export { songDetail };
