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

const createMessageRoute = (sendMessage: (token: string, message: string) => void) => (
  req: MessageRequest & AuthorizedRequest,
  res: MessageResponse,
) => {
  const token = getToken(req);
  const text = req.query.text || req.body;

  console.log('Sending message:', text);
  sendMessage(token, text);

  res.send('Message sent');
};

export default createMessageRoute;
