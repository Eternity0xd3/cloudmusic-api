import { eapiRequest } from "../utils/request.js";

/**
 * Fetches the details of a playlist
 * 
 * @param {number} playlistId - ID of the playlist
 * @returns { Promise<{code: number, data: Object}> } - The HTTP status code and the playlist details as an object
 */
async function playlistDetail(playlistId) {
  const data = {
    id: playlistId
  };
  const url = "https://interfacepc.music.163.com/api/v6/playlist/detail";
  const response = await eapiRequest(url, data);
  return JSON.parse(response.responseBuffer.toString("utf8"));
}

export { playlistDetail };