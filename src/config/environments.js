import Constants from 'expo-constants';

const ENVIRONMENTS = {
  local: {
    environment: 'local',
    base_api_url: 'https://a03d49ea30bd.ngrok-free.app/',
  },
  development: {
    environment: 'development',
    base_api_url: 'https://a03d49ea30bd.ngrok-free.app/',
  },
  qa: {
    environment: 'qa',
    base_api_url: '',
  },
  production: {
    environment: 'production',
    base_api_url: '',
  },
};

function getEnv() {
  const appEnv = Constants?.expoConfig?.extra?.appEnv;

  if (__DEV__) return ENVIRONMENTS.local;

  return ENVIRONMENTS[appEnv] ?? ENVIRONMENTS.development;
}

export const env = getEnv();
