const express = require('express');
const app = express();


const authorized = (validToken, req) => {
  const actualToken = req.headers.authorization || req.query.auth;
  const isAuthorized = actualToken === validToken;

  if (!isAuthorized) {
    res.statusCode = 401;
    res.send('Unauthorized');
  }

  return isAuthorized;
};


const start = ({
  port,
  authToken,
  sendMessage,
  onCashFloatReport,
}) => {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.text());

  app.get('/', (req, res) => {
    res.send('Hello World!');
  });

  app.post('/api/message', (req, res) => {
    if (!authorized(authToken, req)) return;

    const text = req.body;

    console.log('Sending message:', text);
    sendMessage(text);

    res.send('Message sent');
  });

  app.post('/api/salespoints/:id/cash-float/:amount', async (req, res) => {
    if (!authorized(authToken, req)) return;

    let { id, amount } = req.params;

    if (amount.length === 0) {
      res.statusCode = 400;
      res.send('Amount should not be empty');
    }

    amount = Number(amount);
    if (Number.isNaN(amount)) {
      res.statusCode = 400;
      res.send(`Amount should be a number, but "${req.params.amount}" provided`);
    }

    console.log(`Cash float was reported for salespoint ${id}`);

    try {
      await onCashFloatReport(id, amount);
      res.send('Cash float received');
    } catch (e) {
      res.statusCode = 500;
      res.send('Server error');
    }
  });

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
};

module.exports = start;
