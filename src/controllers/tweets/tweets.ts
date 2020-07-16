
import { RequestHandler } from 'express';
import Joi from '@hapi/joi';
import requestMiddleware from '../../middleware/request-middleware';
import { getClient }  from '../../middleware/getClient';

export const requestTokenSchema = Joi.object().keys({
    source: Joi.string().required(),
    oauthToken: Joi.string().required(),
    oauthVerifier: Joi.string().required()
});
const getTweets: RequestHandler = async (req, res) => {
    const { source, oauthToken, oauthVerifier } = req.body;

    const client = await getClient(source);
    let response = await client.getTweets(oauthToken, oauthVerifier);

    res.send(response);
};

export default requestMiddleware(getTweets,{ validation: { body: requestTokenSchema } });
