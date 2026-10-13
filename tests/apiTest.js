import { songDetail } from '../src/api/song_detail.js';
import { playlistDetail } from '../src/api/playlist_detail.js';
import { playlistTrack } from '../src/api/playlist_track.js';

// songDetail([1454169010]).then((response) => {
//   console.log(JSON.stringify(response));
// });

// playlistDetail(4974517819).then((response) => {
//   console.log(JSON.stringify(response));
// });

playlistTrack(4974517819).then((response) => {
  console.log(JSON.stringify(response));
});

// example of the json data
const each = {
  name: "#1f1e33",
  mainTitle: null,
  additionalTitle: null,
  id: 1454169010,
  pst: 0,
  t: 0,
  ar: [{ id: 999238, name: "かめりあ", tns: [], alias: [] }],
  alia: [],
  pop: 90,
  st: 0,
  rt: "",
  fee: 8,
  v: 48,
  crbt: null,
  cf: "",
  al: {
    id: 90598757,
    name: "#1f1e33",
    picUrl:
      "https://p2.music.126.net/OqG4_H0iwJ-wp91Ep3WuBw==/109951165777242162.jpg",
    tns: [],
    pic_str: "109951165777242162",
    pic: 109951165777242160,
  },
  dt: 169244,
  h: { br: 320000, fid: 0, size: 6772027, vd: -108256, sr: 44100 },
  m: { br: 192000, fid: 0, size: 4063234, vd: -105855, sr: 44100 },
  l: { br: 128000, fid: 0, size: 2708837, vd: -104534, sr: 44100 },
  sq: { br: 1855917, fid: 0, size: 39263083, vd: -108333, sr: 44100 },
  hr: null,
  a: null,
  cd: "01",
  no: 1,
  rtUrl: null,
  ftype: 0,
  rtUrls: [],
  djId: 0,
  copyright: 0,
  s_id: 0,
  mark: 17180008448,
  originCoverType: 1,
  originSongSimpleData: null,
  tagPicList: null,
  resourceState: true,
  version: 14,
  songJumpInfo: null,
  entertainmentTags: null,
  awardTags: null,
  displayTags: null,
  artistClassics: false,
  markTags: [],
  songFeature: null,
  single: 0,
  noCopyrightRcmd: null,
  mv: 0,
  rtype: 0,
  rurl: null,
  mst: 9,
  cp: 1418220,
  publishTime: 0,
};