const GameType = {
  ARTIST: `artist`,
  GENRE: `genre`
};

const ROUTER_BASENAME = `/`;

const ROUTE_PREFIX = ROUTER_BASENAME === `/` ? `` : ROUTER_BASENAME;

const AppRoute = {
  LOGIN: `${ROUTE_PREFIX}/login`,
  LOSE: `${ROUTE_PREFIX}/lose`,
  RESULT: `${ROUTE_PREFIX}/result`,
  ROOT: ROUTER_BASENAME,
};

export {GameType, AppRoute};
