import {
  Document, Model, Schema, model
} from 'mongoose';

export interface IClientServiceLog extends Document {
  /** Request Source */
  source: string;
  /** Request URL */
  requestURL: string;
  /** Request Time */
  timeStamp: string;
}

interface IClientServiceLogModel extends Model<IClientServiceLog> { }

const schema = new Schema({
  source: { type: String, required: true },
  requestURL: { type: String, required: true },
  timeStamp: { type: String, required: true }
});

const ClientServiceLog: IClientServiceLogModel = model<IClientServiceLog, IClientServiceLogModel>('ClientServiceLog', schema);

export default ClientServiceLog;
