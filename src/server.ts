import express from 'express';
import { checkDbConnection } from './db/index.js';
import app from './app.js';
import { env } from './config/env.js';
const PORT = env.PORT;


async function startServer() {
  const isConnected = await checkDbConnection();
  
  if (isConnected) {
    app.listen(PORT, () => {
      console.log(`🚀 Server is flying at http://localhost:${PORT}`);
    });
  } else {
    console.error('🛑 Server failed to start due to database connection issues.');
    process.exit(1); // Stop the process with an error code
  }
}

startServer();