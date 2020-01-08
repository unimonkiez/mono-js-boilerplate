import createApp from '../create-app';
import { connectToApp } from './schema/index';
import './globals.d';
import './json-module.d';

const app = createApp();
connectToApp(app);

export default {
  app,
  async connect() {
    // Connect to db
  },
  async disconnect() {
    // Disconnect from db
  },
};
