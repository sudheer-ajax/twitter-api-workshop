import {obtainOauthRequestToken, obtainOauthAccessToken, obtainTweets} from './oauth1'

import { RecordServiceLog } from '../../middleware/recordServiceLog'

class twitterServices {
    private consumerKey : string;
    private consumerSecret: string;
    private callbackURL: string;
    private method: string;
    private apiURL: string;
    private source = 'twitter';
    constructor() {
        this.consumerKey = process.env['APP.SECURITY.CONSUMER.KEY'] || 'JAXaXGkBBDOauRCc9AwpmcRWf';
        this.consumerSecret = process.env['APP.SECURITY.CONSUMER.SECRET'] || 'A50fNVe1wzual955LeyG2vXvcE8Zqzh4GvYAEjEtLbkBPgNMp8';
        this.callbackURL = process.env.CALLBACK_URL || 'http://localhost:3000/oauth/receiver';
        this.method = 'POST';
        this.apiURL = process.env.API_URL || "https://api.twitter.com"

    }

    public async getAccessToken() {
        const url = `${this.apiURL}/oauth/request_token`;
        RecordServiceLog({
            source : this.source,
            requestURL: url,
            timeStamp: new Date().toString()
        });
        return await obtainOauthRequestToken({
            consumerKey : this.consumerKey,
            consumerSecret: this.consumerSecret,
            callbackUrl: this.callbackURL,
            method: this.method,
            apiUrl: url
        })
    }

    public async getTweets(oauthToken: string, oauthVerifier: string) {
        const authUrl = `${this.apiURL}/oauth/access_token`;
        RecordServiceLog({
            source : this.source,
            requestURL: authUrl,
            timeStamp: new Date().toString()
        });

        let oauthTokens = await obtainOauthAccessToken({
            consumerKey : this.consumerKey,
            consumerSecret: this.consumerSecret,
            method: this.method,
            apiUrl: authUrl,
            oauthToken: oauthToken,
            oauthVerifier: oauthVerifier
        });

        const tweetsUrl = `${this.apiURL}/1.1/search/tweets.json?q=twitterdev&result_type=mixed&count=2`;
        RecordServiceLog({
            source : this.source,
            requestURL: tweetsUrl,
            timeStamp: new Date().toString()
        });

        return obtainTweets({
            consumerKey : this.consumerKey,
            consumerSecret: this.consumerSecret,
            method: this.method,
            apiUrl: tweetsUrl,
            oauthToken: oauthTokens.oauth_token
        }).then( response => {
            return response
        });
    }
}

export default new twitterServices()
