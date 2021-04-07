const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('08-build-something routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('POST player to db and responds with player', async () => {
    const player = {
      name: 'Dude',
      team: 'Dudebros',
      position: 'hype',
      region: '3',
    }

    const res = await request(app)
      .post('/api/v1/players')
      .send(player)

    expect(res.body).toEqual({
      id: '1',
      ...player
    })
  });

  it('GET responds with all players in db', async () => {
    const player1 = {
      name: 'Dude',
      team: 'Dudebros',
      position: 'hype',
      region: 3,
    }

    const player2 = {
      name: 'Short',
      team: 'Shorts',
      position: 'shortstop',
      region: 5,
    }

    await request(app)
      .post('/api/v1/players')
      .send(player1)

    await request(app)
      .post('/api/v1/players')
      .send(player2)

    // const posted = async (player) => {
    //   await request(app)
    //     .post('/api/v1/players')
    //     .send(player)
    // }

    // players.forEach(player => {
    //   posted(player);
    // })

    const res = await request(app)
      .get('/api/v1/players')

    expect(res.body).toEqual([{
      name: 'Dude',
      team: 'Dudebros',
      position: 'hype',
      region: '3',
      id: '1',
    },
    {
      name: 'Short',
      team: 'Shorts',
      position: 'shortstop',
      region: '5',
      id: '2',
    }]);

  });

  it('GET responds with player matching :id', async () => {
    const player = {
      name: 'Dude',
      team: 'Dudebros',
      position: 'hype',
      region: '3',
    }

    const posted = await request(app)
      .post('/api/v1/players')
      .send(player)

    const res = await request(app)
      .get('/api/v1/players/1')

    expect(res.body).toEqual(posted.body);
  });

  it('PUT responds with updated player matching :id', async () => {
    const player = {
      name: 'Dude',
      team: 'Dudebros',
      position: 'hype',
      region: '3',
    }

    const updatedPlayer = {
      name: 'Dude',
      team: 'Dudebros',
      position: 'sadness',
      region: '3',
    }

    await request(app)
      .post('/api/v1/players')
      .send(player)

    const res = await request(app)
      .put('/api/v1/players/1')
      .send(updatedPlayer)

    expect(res.body).toEqual({
      ...updatedPlayer,
      id: '1',
    })
  });

  it('DELETE responds with deleted player matching :id', async () => {
    const player = {
      name: 'Dude',
      team: 'Dudebros',
      position: 'hype',
      region: '3',
    }

    await request(app)
      .post('/api/v1/players')
      .send(player)

    const res = await request(app)
      .delete('/api/v1/players/1')

    expect(res.body).toEqual({
      ...player,
      id: '1',
    })
  });
});
