import { Router } from 'express';

import * as Authenticate from './controllers/authenticate';
import * as Tweets from './controllers/tweets';

const router = Router();

router.post('/oauth/request-token', Authenticate.requestToken);
router.post('/search/tweets', Tweets.getTweets);

export default router;
