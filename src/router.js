import { Router } from "express";
import * as api from './api/index.js';

const router = Router()

router.get('/playlist/detail', async (req,res) => {
    const id = req.query.id;
    if(!id){
        return res.status(400).json({ error: 'id missing'})
    }
    return res.json(await api.playlistDetail(id))
});

router.get('/playlist/track', async (req, res) => {
    const { id, limit, offset } = req.query;
    if(!id){
        return res.status(400).json({ error: 'id missing'})
    }
    return res.json(await api.playlistTrack(id, {
      limit: limit === undefined ? undefined : Number(limit),
      offset: offset === undefined ? undefined : Number(offset),
    }));
});

router.get('/song/detail', async (req, res) => {
    const songIds = req.body.ids;
    if (!songIds) {
      return res.status(400).json({ error: "ids missing, you need to add {'ids': [xxx,...]} in the request body!" });
    }
    return res.json(await api.songDetail(songIds));
});

router.get("/song/resource", async (req, res) => {
    const { id, level } = req.query;
    const cookie = req.headers.cookie;
    if (!id) {
        return res.status(400).json({error:"id missing"});
    }
    return res.json(await api.songResource(id, level, cookie));
});

router.get("/song/url", async (req, res) => {
    const { id, level } = req.query;
    const cookie = req.headers.cookie;
    if (!id) {
        return res.status(400).json({ error: "id missing" });
    }
    return res.json(await api.songUrl(id, level, cookie));
});

export default router;
