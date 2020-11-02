import iconv from 'iconv-lite';
import { AuthorizedRequest, getToken } from "../utils/auth/authorized";

interface MessageRequest {
  query: {
    text?: string;
  };
  body?: string;
}
interface MessageResponse {
  send: (response: string) => void;
}

const containsCyrillic = (input: string) => /[А-я]/i.test(input);

const fixCharset = (input: string) => {
  if (!containsCyrillic(input)) {
    console.log('Fixing charset...');
    const buf = iconv.encode(input, 'win1252');
    const output = iconv.decode(buf, 'utf8');

    if (containsCyrillic(output)) {
      console.log('Charset fixed');
      return output;
    }
    console.log('Charset not fixed');
  }
  return input;
};

const createMessageRoute = (sendMessage: (token: string, message: string) => void) => (
  req: MessageRequest & AuthorizedRequest,
  res: MessageResponse,
) => {
  const token = getToken(req);
  let text = req.query.text || req.body;

  text = fixCharset(text);

  console.log('Sending message:', text);
  sendMessage(token, text);

  res.send('Message sent');
};

export default createMessageRoute;
