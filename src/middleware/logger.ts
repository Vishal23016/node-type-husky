import { Request, Response } from 'express'

const loggerMiddleware = (req: Request, resp: Response, next) => {    
    if (req.method != "OPTIONS"){
        req['starttime'] = Date.now();
        console.log('Request logged:', req.method, req.path);
        req.on("end", function () {
            let t: number = (Date.now() - req['starttime'])/1000;
            // console.log("enddd::", t);            
            if (t >= 2 && t <= 5) {
                console.warn('\x1b[33m', req.method, req.url, 'response time: ', t + 's\x1b[0m');
            } else if (t > 5) {
                console.error('\x1b[35m', req.method, req.url, 'response time: ', t + 's\x1b[0m');
            }else{
                console.log(req.method, req.url, 'response time: ', t + 's');
            }
        })
    }    
    next()
}

export default loggerMiddleware