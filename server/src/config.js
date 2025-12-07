import dotenv from 'dotenv';
dotenv.config();

const config = {
  PORT: process.env.PORT || 4000,
  MONGO_URI: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/final_project_plus',
  JWT_SECRET: process.env.JWT_SECRET || 'dev-secret'
};

export default config;
