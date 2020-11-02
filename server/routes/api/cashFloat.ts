interface CashFloatRequest {
  params: {
    id?: string;
    amount?: string;
  };
}
interface CashFloatResponse {
  statusCode?: number;
  send: (response: string) => void;
}

const createCashFloatRoute = (
  onCashFloatReport: (id: string, amount: string) => Promise<void>,
) => async (
  req: CashFloatRequest,
  res: CashFloatResponse,
) => {
  const { id, amount } = req.params;

  if (typeof id !== 'string' || id.length === 0) {
    res.statusCode = 400;
    res.send('Id should not be empty');
    return;
  }

  if (typeof amount !== 'string' || amount.length === 0) {
    res.statusCode = 400;
    res.send('Amount should not be empty');
    return;
  }

  const amountValue = Number(amount);

  if (Number.isNaN(amountValue)) {
    res.statusCode = 400;
    res.send(`Amount should be a number, but "${amount}" provided`);
    return;
  }

  console.log(`Cash float was reported for salespoint ${id}`);

  try {
    await onCashFloatReport(id, amount);
    res.send('Cash float received');
    return;
  } catch (e) {
    res.statusCode = 500;
    res.send('Server error');
    return;
  }
};

export default createCashFloatRoute;
