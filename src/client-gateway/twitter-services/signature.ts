import { HmacSHA1, enc } from 'crypto-js';

const makeSignature = (
  params: any,
  method: string,
  apiUrl: string,
  consumerSecret: string
) => {
  const paramsBaseString = Object.keys(params)
    .sort()
    .reduce((prev: string, el: any) => (prev += `&${el}=${params[el]}`), '')
    .substr(1);

  const signatureBaseString = `${method.toUpperCase()}&${encodeURIComponent(
    apiUrl
  )}&${encodeURIComponent(paramsBaseString)}`;

  const signingKey = `${encodeURIComponent(consumerSecret)}&`;

  const oauthSignature = enc.Base64.stringify(
    HmacSHA1(signatureBaseString, signingKey)
  );

  const paramsWithSignature = {
    ...params,
    oauth_signature: encodeURIComponent(oauthSignature)
  };

  return Object.keys(paramsWithSignature)
    .sort()
    .reduce((prev: string, el: any) => (prev += `,${el}="${paramsWithSignature[el]}"`), '')
    .substr(1);
};

export const requestTokenSignature = ({
  method,
  apiUrl,
  callbackUrl,
  consumerKey,
  consumerSecret
}: {
    method: string;
    apiUrl: string;
    callbackUrl: string;
    consumerKey: string;
    consumerSecret: string;
}) => {
  const params = {
    oauth_consumer_key: consumerKey,
    oauth_version: '1.0',
    oauth_signature_method: 'HMAC-SHA1',
    oauth_timestamp: (Date.now() / 1000).toFixed(),
    oauth_nonce: Math.random()
      .toString(36)
      .replace(/[^a-z]/, '')
      .substr(2)
  };

  return makeSignature(params, method, apiUrl, consumerSecret);
};

export const accessTokenSignature = ({
  consumerKey,
  consumerSecret,
  oauthToken,
  oauthVerifier,
  method,
  apiUrl
}: {
    method: string;
    apiUrl: string;
    consumerKey: string;
    consumerSecret: string;
    oauthToken: string;
    oauthVerifier: string;
}) => {
  const params = {
    oauth_consumer_key: consumerKey,
    oauth_version: '1.0',
    oauth_signature_method: 'HMAC-SHA1',
    oauth_token: oauthToken,
    oauth_verifier: oauthVerifier,
    oauth_timestamp: (Date.now() / 1000).toFixed(),
    oauth_nonce: Math.random()
      .toString(36)
      .replace(/[^a-z]/, '')
      .substr(2)
  };

  return makeSignature(params, method, apiUrl, consumerSecret);
};

export const accessAuthorizedSignature = ({
  consumerKey,
  consumerSecret,
  oauthToken,
  method,
  apiUrl,
  oauthVerifier
}: {
    method: string;
    apiUrl: string;
    consumerKey: string;
    consumerSecret: string;
    oauthToken: string;
    oauthVerifier: string;
}) => {
  const params = {
    oauth_consumer_key: consumerKey,
    oauth_version: '1.0',
    oauth_signature_method: 'HMAC-SHA1',
    oauth_token: oauthToken,
    oauth_timestamp: (Date.now() / 1000).toFixed(),
    oauth_nonce: Math.random()
      .toString(36)
      .replace(/[^a-z]/, '')
      .substr(2)
  };

  return makeSignature(params, method, apiUrl, consumerSecret);
};
