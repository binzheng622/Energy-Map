import request from 'supertest';
const server = 'http://localhost:3000';

describe('Server Endpoints', () => {
  //test response from unknown endpoint
  describe('/unknown', () => {
    describe('GET', () => {
      it('responds with 404 status', () => {
        return request(server)
          .get('/unknown')
          .expect('Content-Type', /text\/html/)
          .expect(404)
          .expect((res) => {
            if (!res.text.includes('Page Not Found')) {
              throw new Error(
                'Expected response body to contain: "Page Not Found"'
              );
            }
          });
      });
    });
  });

  //test response from fetch state data endpoint
  describe('/api/data/:state', () => {
    describe('POST', () => {
      it('responds with 200 status and JSON content type', () => {
        return request(server)
          .post('/api/data/California')
          .expect('Content-Type', /application\/json/)
          .expect(200);
      });
    });
  });
});
