import fs from 'fs';
import winston from 'winston';

const fsPromise = fs.promises;

// async function log(logData) {
//     try {
//         logData = `\n${new Date().toString()} - ${logData}`;
//         await fsPromise.appendFile('log.txt', logData);
//     } catch (err) {
//         console.log(err);
//     }
// }
const logger = winston.createLogger({
    level:'info',
    format: winston.format.json(),
    // defaultMeta: { service: 'request-logging' },
    timestamp: new Date().toString(),
    transports: [
        new winston.transports.File({
            filename: 'log.txt'
        })
    ]
})

const logMiddleware = async (req,res,next)=>{
    const reqBody = `${req.url} - ${JSON.stringify(req.body)}`
    // await log(reqBody);
    await logger.info(reqBody);
    next();
}

export default logMiddleware;