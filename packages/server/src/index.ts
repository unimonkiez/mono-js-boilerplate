import 'reflect-metadata';
import createApp from '../create-app';
import { connectToApp } from './schema/index';
import './globals.d';
import './json-module.d';

const app = createApp();

export default {
  app,
  async connect() {
    const ctx = {};
    await connectToApp(app, ctx);
    // Connect to db
  },
  async disconnect() {
    // Disconnect from db
  },
};
