import createApp from '../create-app';
import { connectToApp } from './schema/index';
import './globals.d';
import './json-module.d';
import './pem-module.d';

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
