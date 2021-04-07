const { Router } = require('express');
const Player = require('../models/Player');

module.exports = Router()
    .post('/', async (req, res, next) => {
        try {
            const player = await Player.insert(req.body);
            res.send(player);
        } catch (err) {
            next(err);
        }
    })

    .get('/', async (req, res, next) => {
        try {
            const players = await Player.selectAll();
            res.send(players);
        } catch (err) {
            next(err);
        }
    })

    .get('/:id', async (req, res, next) => {
        try {
            const player = await Player.selectID(req.params.id);
            res.send(player);
        } catch (err) {
            next(err);
        }
    })

    .put('/:id', async (req, res, next) => {
        try {
            const player = await Player.updateId(req.params.id, req.body);
            res.send(player);
        } catch (err) {
            next(err);
        }
    })

    .delete('/:id', async (req, res, next) => {
        try {
            const player = await Player.deleteId(req.params.id);
            res.send(player);
        } catch (err) {
            next(err);
        }
    })