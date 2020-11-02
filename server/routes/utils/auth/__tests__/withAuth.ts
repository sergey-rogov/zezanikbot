import withAuth from '../withAuth';

let authorizedReturnValue: boolean;
let authorizedMock: jest.Mock;
jest.mock('../authorized.ts', () => {
  authorizedMock = jest.fn(() => authorizedReturnValue);
  return authorizedMock;
});

describe('Utils', () => {
  describe('Auth', () => {
    describe('withAuth', () => {
      beforeEach(() => {
        jest.clearAllMocks();
      });

      it('runs route if authorized', () => {
        const route = jest.fn();
        const routeWithAuth = withAuth('valid-token', route);

        authorizedReturnValue = true;

        routeWithAuth({}, {});

        expect(route.mock.calls.length).toBe(1);
      });

      it('doesnt run route if not authorized', () => {
        const route = jest.fn();
        const routeWithAuth = withAuth('valid-token', route);

        authorizedReturnValue = false;

        routeWithAuth({}, {});

        expect(route.mock.calls.length).toBe(0);
      });
    });
  });
});
