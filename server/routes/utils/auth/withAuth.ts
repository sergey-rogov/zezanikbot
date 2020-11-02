import type { AuthorizedRequest, AuthorizedResponse } from './authorized';
import authorized from './authorized';

const withAuth = <TRouteRequest, TRouteResponse>(
  validAuthTokens: string[],
  route: (req: TRouteRequest, res: TRouteResponse) => void
) => (
  req: AuthorizedRequest & TRouteRequest,
  res: AuthorizedResponse & TRouteResponse,
) => {
  if (!authorized(validAuthTokens, req, res)) return;

  route(req, res);
};

export default withAuth;
