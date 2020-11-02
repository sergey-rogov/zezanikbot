import { response } from 'express';
import createCashFloatRoute from '../cashFloat';

describe('Routes', () => {
  describe('/api/salespoints/:id/cash-float/:amount', () => {
    it('calls onCashFloatReport and responds if arguments are ok', async () => {
      const onCashFloatReport = jest.fn();
      const request = {
        params: {
          id: 'salespoint-id',
          amount: '123',
        },
      };
      const response = {
        send: jest.fn(),
      };

      const route = createCashFloatRoute(onCashFloatReport);

      await route(request, response);

      expect(onCashFloatReport.mock.calls[0]).toEqual(['salespoint-id', '123']);
      expect(response.send.mock.calls[0]).toEqual(['Cash float received']);
    });

    it('returns 500 if callback fails', async () => {
      const onCashFloatReport = jest.fn(() => {
        throw new Error('something went wrong');
      });
      const request = {
        params: {
          id: 'salespoint-id',
          amount: '123',
        },
      };
      const response = {
        statusCode: -1,
        send: jest.fn(),
      };

      const route = createCashFloatRoute(onCashFloatReport);

      await route(request, response);

      expect(response.statusCode).toBe(500);
      expect(response.send.mock.calls[0]).toEqual(['Server error']);
    });

    it('returns 400 if amount is not a number', async () => {
      const request = {
        params: {
          id: 'salespoint-id',
          amount: 'asd',
        },
      };
      const response = {
        statusCode: -1,
        send: jest.fn(),
      };

      const route = createCashFloatRoute(() => undefined);

      await route(request, response);

      expect(response.statusCode).toBe(400);
      expect(response.send.mock.calls[0]).toEqual(['Amount should be a number, but "asd" provided']);
    });

    it('returns 400 if amount is empty', async () => {
      const request = {
        params: {
          id: 'salespoint-id',
        },
      };
      const response = {
        statusCode: -1,
        send: jest.fn(),
      };

      const route = createCashFloatRoute(() => undefined);

      await route(request, response);

      expect(response.statusCode).toBe(400);
      expect(response.send.mock.calls[0]).toEqual(['Amount should not be empty']);
    });

    it('returns 400 if id is empty', async () => {
      const request = {
        params: {
          amount: '123',
        },
      };
      const response = {
        statusCode: -1,
        send: jest.fn(),
      };

      const route = createCashFloatRoute(() => undefined);

      await route(request, response);

      expect(response.statusCode).toBe(400);
      expect(response.send.mock.calls[0]).toEqual(['Id should not be empty']);
    });
  });
});
