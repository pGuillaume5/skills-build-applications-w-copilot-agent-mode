import express, { Express } from 'express';

const PORT = 8000;

/**
 * Get API URL with Codespaces support
 * 
 * In Codespaces: https://$CODESPACE_NAME-8000.app.github.dev
 * Localhost: http://localhost:8000
 */
export const getApiUrl = (): string => {
  const codespaceeName = process.env.CODESPACE_NAME;
  if (codespaceeName) {
    return `https://${codespaceeName}-${PORT}.app.github.dev`;
  }
  return `http://localhost:${PORT}`;
};

/**
 * Create and configure Express app
 */
export const createApp = (): Express => {
  const app = express();

  // Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  return app;
};

/**
 * Start the server
 */
export const startServer = (app: Express): void => {
  const apiUrl = getApiUrl();
  const mongoUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

  app.listen(PORT, () => {
    console.log(`\n🚀 OctoFit Tracker Backend`);
    console.log(`   API URL: ${apiUrl}`);
    console.log(`   MongoDB: ${mongoUrl}\n`);
  });
};

export { PORT };
