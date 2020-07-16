/**
 * Created by sudheer on 15/07/2020.
 */

import { RequestHandler } from 'express';
import Joi from '@hapi/joi';
import requestMiddleware from '../../middleware/request-middleware';
import { getClient } from '../../middleware/getClient';

export const requestTokenSchema = Joi.object().keys({
  source: Joi.string().required()
});

const requestToken: RequestHandler = async (req, res) => {
  const { source } = req.body;

  const client = await getClient(source);
  const response = await client.getAccessToken();

  res.send(response);
};

export default requestMiddleware(requestToken, { validation: { body: requestTokenSchema } });
