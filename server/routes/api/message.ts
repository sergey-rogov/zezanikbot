interface MessageRequest {
  query: {
    text?: string;
  };
  body?: string;
}
interface MessageResponse {
  send: (response: string) => void;
}

const createMessageRoute = (sendMessage: (message: string) => void) => (
  req: MessageRequest,
  res: MessageResponse,
) => {
  const text = req.query.text || req.body;

  console.log('Sending message:', text);
  sendMessage(text);

  res.send('Message sent');
};

export default createMessageRoute;
