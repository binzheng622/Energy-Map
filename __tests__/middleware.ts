import controller from '../server/controllers/powerController.js';

jest.setTimeout(60000); // 60 sec before timeout

describe('Middleware Tests', () => {
  const req: any = { params: { state: 'California' } };
  const res: any = { locals: {} };
  const next = jest.fn(); // Jest mock function

  describe('powerController middleware', () => {
    describe('loadState', () => {
      it('res.locals.stateData correctly fetched data', async () => {
        await controller.loadState(req, res, next);
        expect(req.params.state).toEqual('California');
        expect(next).toHaveBeenCalled();
      });
    });
  });
});
