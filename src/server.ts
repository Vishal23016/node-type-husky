// https://dev.to/aligoren/developing-an-express-application-using-typescript-3b1
// https://github.com/aligoren/express-typescript-test
// https://medium.com/@sunnystatue/setup-nodejs-express-typescript-project-enabled-live-edit-when-debugging-4fea0f51dbb3
import App from './app'

import * as bodyParser from 'body-parser';

import loggerMiddleware from './../../core/middleware/logger';

import MainController from './controllers/main.controller';
import AuthController from './controllers/auth.controller';

import CommonCore from '../../core/services/commonCore.service';
import CommonService from './services/common.service';

import BetaEnvironment from './../../core/config/env.beta';
import LiveEnvironment from './../../core//config/env.live';
import LocalEnvironment from './../../core/config/env.local';

// import BetaEnvironment from './config/env.beta';
// import LiveEnvironment from './config/env.live';
// import LocalEnvironment from './config/env.local';

globalThis.app = "aditapp-api";

const app = new App({
    port: 5000,
    enviorements: [
        BetaEnvironment, LiveEnvironment, LocalEnvironment
    ],
    middleWares: [
        bodyParser.json({ limit: '50mb' }),
        bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }),
        // bodyParser.urlencoded({ extended: true }),
        loggerMiddleware,
        // responseOk,
    ],
    controllers: [
        new MainController(new CommonService()),
        new AuthController()
    ],
})


async function startApp(){
    let dbConn = await app.dbConnect();
    if (dbConn){
        app.listen()
    }else{
        console.log("app is not started!!!")
        process.exit(0);
    }
}

startApp();
// http://rousseau-alexandre.fr/en/programming/2019/06/19/express-typescript.html
// https://wanago.io/2018/12/03/typescript-express-tutorial-routing-controllers-middleware/
// https://www.tutorialsteacher.com/typescript