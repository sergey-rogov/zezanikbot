const createIndexRoute = () => (req, res: { send: (response: string) => void }) => {
  res.send('Hello world!');
};

export default createIndexRoute;
