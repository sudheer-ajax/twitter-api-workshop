
import twitterService from '../client-gateway/twitter-services'

export const getClient = (source:string) => {
    if(source === 'twitter') {
        return twitterService
    }

    return twitterService
}