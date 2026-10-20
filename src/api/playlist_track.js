import { playlistDetail } from './playlist_detail.js';
import { songDetail } from './song_detail.js';

async function getSelectedSongs(idList, limit, offset) {    
    const selectedIds = idList.slice(offset, offset + limit);
    if (selectedIds.length === 0) {
        return { code: 200, songs: [], privileges: [] };
    }
    const songData = await songDetail(selectedIds);
    return songData;
}

/**
 * Fetches detailed track information from a playlist.
 * 
 * @param {number|string} playlistId - Playlist ID.
 * @param {{limit?: number, offset?: number}} [options] - Pagination options.
 * @returns {Promise<Object>} Song detail response with songs and privileges merged across batches.
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

        let result = { code: 200, songs: [], privileges: [] };
        let hasResponse = false;
        for (let firstIndexOfRequest = 0; firstIndexOfRequest < totalTracks; firstIndexOfRequest += batchSize * concurrency) {
            const batches = [];
            for (let eachOffset = firstIndexOfRequest; eachOffset < Math.min(firstIndexOfRequest + batchSize * concurrency, totalTracks); eachOffset += batchSize) {
                const batchPromise = getSelectedSongs(idList, batchSize, eachOffset);
                batches.push(batchPromise);
            }
            const batchResults = await Promise.all(batches);
            for (const batch of batchResults) {
                if (batch.code !== 200) {
                    return batch;
                }
                if (!hasResponse) {
                    result = { ...batch, songs: [], privileges: [] };
                    hasResponse = true;
                }
                result.songs.push(...batch.songs);
                result.privileges.push(...(batch.privileges ?? []));
            }
        }
        return result;
    }else {
        const limit = options.limit ?? 300;
        const offset = options.offset ?? 0;
        return getSelectedSongs(idList, limit, offset);
    }
}

export { playlistTrack };
