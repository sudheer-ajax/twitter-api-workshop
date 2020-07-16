import TwitterService from '../client-gateway/twitter-services';

export const getClient = (source:string) => {
  if (source === 'twitter') {
    return TwitterService;
  }

  return TwitterService;
};
