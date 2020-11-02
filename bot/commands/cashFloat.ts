import type { TelegrafContext } from 'telegraf/typings/context';

import MESSAGES from '../../messages';
import { getCashFloat } from '../../cashFloat';

const createCashFloatCommand = () => async (ctx: TelegrafContext) => {
  const cashFloat = await getCashFloat();
  MESSAGES.cashFloatReport(cashFloat).forEach(message => ctx.reply(message));
};

export default createCashFloatCommand;
