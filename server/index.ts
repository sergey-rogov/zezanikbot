import express from 'express';

import withAuth from './routes/utils/auth/withAuth';

import createIndexRoute from './routes/api';
import createMessageRoute from './routes/api/message';
import createCashFloatRoute from './routes/api/cashFloat';

const app = express();

const start = ({
  port,
  authToken,
  sendMessage,
  onCashFloatReport,
}: {
  port: number;
  authToken: string;
  sendMessage: (message: string) => void;
  onCashFloatReport: (id: string, amount: string) => Promise<void>;
}) => {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.text());

  app.get('/', createIndexRoute());
  app.post('/api/message', withAuth(authToken, createMessageRoute(sendMessage)));
  app.post('/api/salespoints/:id/cash-float/:amount', withAuth(authToken, createCashFloatRoute(onCashFloatReport)));

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
};

export default start;
