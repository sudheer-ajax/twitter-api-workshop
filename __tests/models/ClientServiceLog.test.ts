import request from 'supertest';
import mockingoose from 'mockingoose';
import app from '../../src/app';
import ClientServiceLog from '../../src/models/ClientServiceLog';

describe('test mongoose User model', () => {
  test('should return the doc with findById', () => {
    const returnValue = {
      _id: '507f191e810c19729de860ea',
      source: 'twitter',
      requestURL: 'requestURL',
      timeStamp: 'timeStamp'
    };

    mockingoose(ClientServiceLog).toReturn(returnValue, 'findOne');

    return ClientServiceLog.findById({ _id: '507f191e810c19729de860ea' }).then(doc => {
      expect(JSON.parse(JSON.stringify(doc))).toMatchObject(returnValue);
    });
  });

});