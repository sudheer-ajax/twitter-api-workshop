import axios from 'axios';

import { requestTokenSignature, accessTokenSignature, accessAuthorizedSignature } from './signature';

const tweets = require('./data/tweets.json');

interface RequestTokenResponse {
    oauth_token: string;
    oauth_token_secret: string;
    oauth_callback_confirmed?: string;
}

const parseOAuthRequestToken = (responseText: string) => responseText.split('&').reduce((prev, el) => {
  const [key, value] = el.split('=');
  return { ...prev, [key]: value };
}, {} as RequestTokenResponse);

export const obtainOauthRequestToken = async ({
  consumerKey,
  consumerSecret,
  callbackUrl,
  method,
  apiUrl
}: {
    method: string;
    apiUrl: string;
    callbackUrl: string;
    consumerKey: string;
    consumerSecret: string;
}) => {
  const oauthSignature = requestTokenSignature({
    method,
    apiUrl,
    callbackUrl,
    consumerKey,
    consumerSecret
  });

  const response = await axios(
    {
      url: `https://cors-anywhere.herokuapp.com/${apiUrl}`,
      method: 'post',
      headers: {
        origin: 'http://localhost:3000',
        Authorization: `OAuth ${oauthSignature}`
      }
    }
  );

  return parseOAuthRequestToken(response.data);
};

export const obtainOauthAccessToken = async ({
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
  const oauthSignature = accessTokenSignature({
    method,
    apiUrl,
    consumerKey,
    consumerSecret,
    oauthToken,
    oauthVerifier
  });
  const response = await axios(
    {
      url: `https://cors-anywhere.herokuapp.com/${apiUrl}`,
      method: 'post',
      headers: {
        origin: 'http://localhost:3000',
        Authorization: `OAuth ${oauthSignature}`
      }
    }
  );

  return parseOAuthRequestToken(response.data);
};

export const obtainTweets = ({
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
    oauthVerifier?: string
}) => {
  const oauthSignature = accessAuthorizedSignature({
    method,
    apiUrl,
    consumerKey,
    consumerSecret,
    oauthToken,
    oauthVerifier
  });
  return axios(
    {
      url: apiUrl,
      method: 'GET',
      headers: {
        origin: 'http://localhost:3000',
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `OAuth ${oauthSignature}`
      }
    }
  ).then(response => response.data).catch(error => tweets);
};
