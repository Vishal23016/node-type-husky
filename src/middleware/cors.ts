import { Request, Response, NextFunction } from "express";
// import * as cors from "cors";

const cors = (req: Request, res: Response, next: NextFunction) => {  
    // const options: cors.CorsOptions = {
    //     allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
    //     credentials: true,
    //     methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
    //     origin: ["http://localhost:4200"],
    //     preflightContinue: false
    // };
    //use cors middleware
    // this.router.use(cors(options));
    //enable pre-flight
    // this.router.options(`${req.headers.origin}`ors(options));
    let idx = (process.env.allowedOrigins).indexOf(`${req.headers.origin}`);
    // console.log("cors::", process.env.allowedOrigins, req.headers.origin,idx)   
    if (idx > -1) {
        res.setHeader('Access-Control-Allow-Origin', `${req.headers.origin}`);
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        // res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,authorization" );
        res.setHeader('Access-Control-Allow-Headers', '*');
        res.setHeader('Access-Control-Allow-Credentials', "true");
        next();
    } else {
        next();
        // res.json({ status: false, message: "Not allowed domain" });
    }
    
};

export default cors;