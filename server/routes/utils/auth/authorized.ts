export interface AuthorizedRequest {
  headers: {
    authorization?: string;
  };
  query: {
    auth?: string;
  };
}

export interface AuthorizedResponse {
  statusCode: number;
  send: (response: string) => void;
};

export const getToken = (req: AuthorizedRequest) => req.headers.authorization || req.query.auth;

const authorized = (validTokens: string[], req: AuthorizedRequest, res: AuthorizedResponse) => {
  const actualToken = getToken(req);
  const isAuthorized = validTokens.includes(actualToken);

  if (!isAuthorized) {
    res.statusCode = 401;
    res.send('Unauthorized');
  }

  return isAuthorized;
};

export default authorized;
