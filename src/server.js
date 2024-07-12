import express from 'express';
import morgan from 'morgan';

const PORT = 4000;

const app = express();
const loger = morgan('dev');

const home = (req, res) => {
  return res.send('I will respond');
};
const login = (req, res) => {
  return res.send('Welcome to the private lounge.');
};

app.use(loger);
app.get('/', home);
app.get('/login', login);

const handleListening = () => console.log(`✅ Server listening on port http://localhost:${PORT} 🚀`);

app.listen(PORT, handleListening);
