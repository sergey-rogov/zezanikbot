import type { AuthorizedRequest, AuthorizedResponse } from './authorized';
import authorized from './authorized';

const withAuth = <TRouteRequest, TRouteResponse>(
  validAuthToken: string,
  route: (req: TRouteRequest, res: TRouteResponse) => void
) => (
  req: AuthorizedRequest & TRouteRequest,
  res: AuthorizedResponse & TRouteResponse,
) => {
  if (!authorized(validAuthToken, req, res)) return;

  route(req, res);
};

export default withAuth;
