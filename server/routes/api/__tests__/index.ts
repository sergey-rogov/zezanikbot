import createIndexRoute from '../index';

describe('Routes', () => {
  describe('/api/', () => {
    it('sends "Hello world!"', () => {
      const res = {
        send: jest.fn(),
      };

      const route = createIndexRoute();
      route(undefined, res);

      expect(res.send.mock.calls[0]).toEqual(['Hello world!']);
    });
  });
});
