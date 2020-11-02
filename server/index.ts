import express from 'express';

import withAuth from './routes/utils/auth/withAuth';

import createIndexRoute from './routes/api';
import createMessageRoute from './routes/api/message';
import createCashFloatRoute from './routes/api/cashFloat';

const app = express();

const start = ({
  port,
  authTokens,
  sendMessage,
  onCashFloatReport,
}: {
  port: number;
  authTokens: string[];
  sendMessage: (token: string, message: string) => void;
  onCashFloatReport: (id: string, amount: string) => Promise<void>;
}) => {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.text());

  app.get('/', createIndexRoute());
  app.post('/api/message', withAuth(authTokens, createMessageRoute(sendMessage)));
  app.post('/api/salespoints/:id/cash-float/:amount', withAuth(authTokens, createCashFloatRoute(onCashFloatReport)));

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
};

export default start;
