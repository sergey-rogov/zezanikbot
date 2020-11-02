import createMessageRoute from '../message';

describe('Routes', () => {
  describe('/api/message', () => {
    it('sends "Message sent"', () => {
      const req = {
        query: {},
      }
      const res = {
        send: jest.fn(),
      };

      const route = createMessageRoute(() => undefined);
      route(req, res);

      expect(res.send.mock.calls[0]).toEqual(['Message sent']);
    });

    it('sends message from query parameter `req.query.text`', () => {
      const req = {
        query: {
          text: 'query message text',
        },
      };
      const res = {
        send: jest.fn(),
      };

      const sendMessage = jest.fn();

      const route = createMessageRoute(sendMessage);
      route(req, res);

      expect(sendMessage.mock.calls[0]).toEqual(['query message text']);
    });

    it('sends message from query parameter `req.body`', () => {
      const req = {
        query: {},
        body: 'body message text',
      };
      const res = {
        send: jest.fn(),
      };

      const sendMessage = jest.fn();

      const route = createMessageRoute(sendMessage);
      route(req, res);

      expect(sendMessage.mock.calls[0]).toEqual(['body message text']);
    });
  });
});
