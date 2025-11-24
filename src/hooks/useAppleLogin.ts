import { useEffect, useState } from 'react';
import { makeRedirectUri, useAuthRequest, DiscoveryDocument, AuthRequestConfig, AuthSessionResult } from 'expo-auth-session';
import Constants from 'expo-constants';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

const discovery: DiscoveryDocument = {
  authorizationEndpoint: 'https://appleid.apple.com/auth/authorize',
  tokenEndpoint: 'https://appleid.apple.com/auth/token',
};

const useAppleLogin = () => {
  const isUsingProxy = Constants.executionEnvironment === 'storeClient';

  const redirectUri = isUsingProxy ? makeRedirectUri({}) : makeRedirectUri({ scheme: 'myapp' });

  const [responseResult, setResponseResult] = useState<AuthSessionResult | null>(null);
  const [error, setError] = useState<unknown>(null);

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: Constants.expoConfig?.extra?.clientIds?.apple ?? '',
      redirectUri,
      responseType: 'code',
      scopes: ['email', 'name'],
      extraParams: {
        response_mode: 'query',
      },
    } as AuthRequestConfig,
    discovery,
  );

  useEffect(() => {
    if (response) {
      setResponseResult(response);
      if (response.type === 'error') {
        setError(response.error);
      }
    }
  }, [response]);

  return {
    // @ts-expect-error - Currently for expo go, remove when real testing
    loginWithApple: () => promptAsync({ useProxy: isUsingProxy }),
    responseResult,
    error,
    loading: !request,
  };
};

export default useAppleLogin;
