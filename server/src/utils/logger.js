/**
 * Simple logger utility
 * In production, replace with Winston or Pino
 */

const levels = { error: 0, warn: 1, info: 2, debug: 3 };
const currentLevel = process.env.NODE_ENV === 'production' ? 'warn' : 'debug';

const timestamp = () => new Date().toISOString();

const logger = {
  error: (msg, meta = '') => {
    if (levels[currentLevel] >= levels.error)
      console.error(`[${timestamp()}] ERROR: ${msg}`, meta);
  },
  warn: (msg, meta = '') => {
    if (levels[currentLevel] >= levels.warn)
      console.warn(`[${timestamp()}] WARN: ${msg}`, meta);
  },
  info: (msg, meta = '') => {
    if (levels[currentLevel] >= levels.info)
      console.log(`[${timestamp()}] INFO: ${msg}`, meta);
  },
  debug: (msg, meta = '') => {
    if (levels[currentLevel] >= levels.debug)
      console.log(`[${timestamp()}] DEBUG: ${msg}`, meta);
  },
};

module.exports = logger;
