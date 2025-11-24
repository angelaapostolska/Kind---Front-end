import Constants from 'expo-constants';

export type Environment = 'local' | 'development' | 'qa' | 'production';

export interface EnvironmentConfig {
  environment: Environment;
  base_api_url: string;
}

const ENVIRONMENTS: Record<Environment, EnvironmentConfig> = {
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

function getEnv(): EnvironmentConfig {
  const appEnv = Constants?.expoConfig?.extra?.appEnv as Environment;

  if (__DEV__) return ENVIRONMENTS.local;

  return ENVIRONMENTS[appEnv] ?? ENVIRONMENTS.development;
}

export const env = getEnv();
