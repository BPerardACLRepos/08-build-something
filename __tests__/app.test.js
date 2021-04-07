const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('08-build-something routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('adds player to db and responds with player', () => {
    const player = {
      name: 'Dude',
      team: 'Dudebros',
      position: 'hype',
      region: 3,
    }

    const res = await request(app)
      .post('/api/v1/players')
      .send(player)

    expect(res.body).toEqual({
      id: 1,
      ...player
    })
  });
});
