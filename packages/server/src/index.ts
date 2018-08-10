import createApp from '../create-app';
import { connectToApp } from './schema/index';

const app = createApp();
connectToApp(app);

module.exports = {
  app,
  async connect() {
    // Connect to db
  },
  async disconnect() {
    // Disconnect from db
  },
};
