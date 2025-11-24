import 'dotenv/config';

const allowedEnvs = ['local', 'development', 'qa', 'production'];

export default ({ config }) => {
  const appEnv = process.env.APP_ENV || 'development';

  // Validate APP_ENV value
  if (!allowedEnvs.includes(appEnv)) {
    throw new Error(`[app.config.js] Invalid APP_ENV: "${appEnv}". Must be one of: ${allowedEnvs.join(', ')}`);
  }

  return {
    ...config,
    extra: {
      appEnv,
    },
  };
};
