import { playlistDetail } from './playlist_detail.js';
import { songDetail } from './song_detail.js';

async function getSelectedSongs(idList, limit, offset) {    
    const selectedIds = idList.slice(offset, offset + limit);
    if (selectedIds.length === 0) {
        return [];
    }
    const songData = await songDetail(selectedIds);
    return songData;
}

/**
 * Fetches detailed track information from a playlist.
 * 
 * @param {number|string} playlistId - Playlist ID.
 * @param {{limit?: number, offset?: number}} [options] - Pagination options.
 * @returns {Promise<Object[]>} Track details.
 */
async function playlistTrack(playlistId, options = {}) {
    if (options.limit !== undefined && (options.limit > 300 || options.limit < 1 || !Number.isInteger(options.limit))) {
        throw new Error("Limit should be an integer between 1 and 300.");
    }
    if (options.offset !== undefined && (options.offset < 0 || !Number.isInteger(options.offset))) {
        throw new Error("Offset should be a non-negative integer.");
    }

    const playlistData = await playlistDetail(playlistId);
    const idList = playlistData.playlist.trackIds.map((track) => track.id);
    const totalTracks = idList.length;

    if (options.limit === undefined && options.offset === undefined) {
        const batchSize = 300;
        const concurrency = 3;

        const songs = [];
        for (let firstIndexOfRequest = 0; firstIndexOfRequest < totalTracks; firstIndexOfRequest += batchSize * concurrency) {
            const batches = [];
            for (let eachOffset = firstIndexOfRequest; eachOffset < Math.min(firstIndexOfRequest + batchSize * concurrency, totalTracks); eachOffset += batchSize) {
                const batchPromise = getSelectedSongs(idList, batchSize, eachOffset);
                batches.push(batchPromise);
            }
            const batchResults = await Promise.all(batches);
            songs.push(...batchResults.flat());
        }
        return songs;
    }else {
        const limit = options.limit ?? 300;
        const offset = options.offset ?? 0;
        const songs = await getSelectedSongs(idList, limit, offset);
        return songs;
    }
}

export { playlistTrack };