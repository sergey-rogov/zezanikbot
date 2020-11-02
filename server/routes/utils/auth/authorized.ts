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

const authorized = (validToken: string, req: AuthorizedRequest, res: AuthorizedResponse) => {
  const actualToken = req.headers.authorization || req.query.auth;
  const isAuthorized = actualToken === validToken;

  if (!isAuthorized) {
    res.statusCode = 401;
    res.send('Unauthorized');
  }

  return isAuthorized;
};

export default authorized;
