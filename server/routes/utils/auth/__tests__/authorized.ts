import authorized from '../authorized';

describe('Utils', () => {
  describe('Auth', () => {
    describe('authorized', () => {
      describe('via headers', () => {
        it('returns true if token in headers is correct', () => {
          const result = authorized('valid-token', {
            headers: {
              authorization: 'valid-token',
            },
            query: {},
          }, {
            statusCode: 0,
            send: () => undefined,
          });

          expect(result).toBe(true);
        });

        it('returns false if token in headers is incorrect', () => {
          const result = authorized('valid-token', {
            headers: {
              authorization: 'invalid-token',
            },
            query: {},
          }, {
            statusCode: 0,
            send: () => undefined,
          });

          expect(result).toBe(false);
        });
      });

      describe('via query params', () => {
        it('returns true if token in query is correct', () => {
          const result = authorized('valid-token', {
            headers: {},
            query: {
              auth: 'valid-token',
            },
          }, {
            statusCode: 0,
            send: () => undefined,
          });

          expect(result).toBe(true);
        });

        it('returns false if token in query is incorrect', () => {
          const result = authorized('valid-token', {
            headers: {},
            query: {
              auth: 'invalid-token',
            },
          }, {
            statusCode: 0,
            send: () => undefined,
          });

          expect(result).toBe(false);
        });
      });
    });
  });
});
