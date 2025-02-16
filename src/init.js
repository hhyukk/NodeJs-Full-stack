import 'dotenv/config';
import './db.js';
import './models/Video';
import './models/User';
import './models/Comment';
import app from './server';

const PORT = 3000;

// const handleListening = () => console.log(`✅ Server listening on port http://localhost:${PORT} 🚀`);
const handleListening = () =>
  console.log(
    `✅ Server listening on port http://localhost:${PORT} 🚀 | AWS_KEY: ${process.env.AWS_KEY}, AWS_SECRET: ${process.env.AWS_SECRET}`
  );

app.listen(PORT, handleListening);
