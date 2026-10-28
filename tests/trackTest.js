import { songDetail } from "../src/api/song_detail.js";
import { playlistDetail } from "../src/api/playlist_detail.js";
import { playlistTrack } from "../src/api/playlist_track.js";

const playlist = 4974517819;

playlistTrack(playlist, {limit:15, offset:15}).then((res)=> {
    const names = res.songs.map(song => song.name)
    console.log(names)
});

fetch("https://music.eternity0.xyz/api/playlist/track?id=4974517819&limit=15&offset=15").then(res => res.json()).then(data => {
    const names = data.songs.map((song) => song.name);
    console.log(names)
});