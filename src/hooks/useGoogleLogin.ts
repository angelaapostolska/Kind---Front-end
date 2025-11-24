import { useEffect, useState } from 'react';
import { makeRedirectUri, useAuthRequest, DiscoveryDocument, AuthRequestConfig } from 'expo-auth-session';
import Constants from 'expo-constants';
import * as WebBrowser from 'expo-web-browser';
import { env } from '@/config/environments';

WebBrowser.maybeCompleteAuthSession();

const discovery: DiscoveryDocument = {
  authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
  tokenEndpoint: 'https://oauth2.googleapis.com/token',
  revocationEndpoint: 'https://oauth2.googleapis.com/revoke',
};

const useGoogleLogin = () => {
  const isUsingProxy = Constants.executionEnvironment === 'storeClient';

  const redirectUri = isUsingProxy ? makeRedirectUri({}) : makeRedirectUri({ scheme: 'myapp' });

  const [backendResponse, setBackendResponse] = useState(null);
  const [error, setError] = useState<unknown>(null);

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: Constants.expoConfig?.extra?.clientIds?.google ?? '',
      redirectUri,
      responseType: 'code',
      scopes: ['openid', 'profile', 'email'],
    } as AuthRequestConfig,
    discovery,
  );

  useEffect(() => {
    const handleGoogleResponse = async () => {
      if (response?.type === 'success') {
        try {
          const code = response.params.code;

          const res = await fetch(`${env.base_api_url}/auth/google`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code, redirectUri }),
          });

          const data = await res.json();
          setBackendResponse(data);
        } catch (err) {
          setError(err);
        }
      } else if (response?.type === 'error') {
        setError(response.error);
      }
    };

    handleGoogleResponse();
  }, [redirectUri, response]);

  return {
    // @ts-expect-error - Currently for expo go, remove when real testing
    loginWithGoogle: () => promptAsync({ useProxy: isUsingProxy }),
    backendResponse,
    error,
    loading: !request,
  };
};

export default useGoogleLogin;
