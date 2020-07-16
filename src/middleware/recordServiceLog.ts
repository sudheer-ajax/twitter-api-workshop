import ClientServiceLog from '../models/ClientServiceLog'

export const RecordServiceLog = (logInfo: any) => {
    const clientServiceLog = new ClientServiceLog(logInfo);
    clientServiceLog.save();
};