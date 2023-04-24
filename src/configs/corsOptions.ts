import { CorsOptions } from 'cors';

const allowedOrigins = ['http://localhost:3000', 'https://react-typescript-todo-list.onrender.com']; // List of origins allowed to access resources on the server

const corsOptions: CorsOptions = {
  origin: allowedOrigins,
};

export default corsOptions;
