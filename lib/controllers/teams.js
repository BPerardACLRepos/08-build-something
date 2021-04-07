const { Router } = require('express');
const Team = require('../models/Team');

module.exports = Router()
    .post('/', async (req, res, next) => {
        try {
            const team = await Team.insert(req.body);
            res.send(team);
        } catch (err) {
            next(err);
        }
    })

    .get('/', async (req, res, next) => {
        try {
            const teams = await Team.selectAll();
            res.send(teams);
        } catch (err) {
            next(err);
        }
    })

    .get('/:id', async (req, res, next) => {
        try {
            const team = await Team.selectID(req.params.id);
            res.send(team);
        } catch (err) {
            next(err);
        }
    })

    .put('/:id', async (req, res, next) => {
        try {
            const team = await Team.updateId(req.params.id, req.body);
            res.send(team);
        } catch (err) {
            next(err);
        }
    })

    .delete('/:id', async (req, res, next) => {
        try {
            const team = await Team.deleteId(req.params.id);
            res.send(team);
        } catch (err) {
            next(err);
        }
    })