const express = require('express');
const app = express();


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
    if (req.headers.authorization !== authToken && req.query.auth !== authToken) {
      res.statusCode = 401;
      res.send('Unauthorized');
      return;
    }

    const text = req.body;

    console.log('Sending message:', text);
    sendMessage(text);

    res.send('Message sent');
  });

  app.post('/api/salespoints/:id/cash-float/:amount', (req, res) => {
    if (req.headers.authorization !== authToken && req.query.auth !== authToken) {
      res.statusCode = 401;
      res.send('Unauthorized');
      return;
    }

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
    onCashFloatReport(id, amount);

    res.send('Cash float received');
  });

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
};

module.exports = start;
