import * as express from 'express'
import { Application, Request, Response, NextFunction } from 'express'

import IEnv from './../../core/interfaces/enviorement.interface';

import CouchbaseService from './../../core/services/couchbase.service';
import ElasticService from './../../core/services/elastic.service';

// const CouchbaseService = require('./../../core/services/couchbase.service');
// const ElasticService = require('./../../core/services/elastic.service');


class App {
    public app: Application;
    public port: number;
    private _envObj: IEnv;
    public router = express.Router();
    private _couchbaseService = new CouchbaseService();
    private _elasticService = new ElasticService();
    
    
    constructor(appInit: { port: number; enviorements: any; middleWares: any; services?: any;controllers: any; }) {
        // need to set interface of the env variable
        this._envObj = this.enviorementManage(appInit.enviorements)    
        this.app = express()
        this.port = this._envObj.port
        this.middlewares(appInit.middleWares)
        this.routes(appInit.controllers)        
        
    }

    private middlewares(middleWares: { forEach: (arg0: (middleWare: any) => void) => void; }) {
        middleWares.forEach(middleWare => {
            this.app.use(middleWare)
        })
    }    

    private routes(controllers: { forEach: (arg0: (controller: any) => void) => void; }) {
        controllers.forEach(controller => {
            this.app.use('/', controller.router)
        })
    }
    
    private enviorementManage(enviorements: { forEach: (arg0: (enviorement: any) => void) => void; }): IEnv{
        // need to set interface of the env variable
        const args:any = {};
        process.argv
            .slice(2, process.argv.length)
            .forEach(arg => {
                if (arg.slice(0, 2) === '--') {
                    const longArg = arg.split('=')
                    args[longArg[0].slice(2, longArg[0].length)] = longArg[1]
                }
                else if (arg[0] === '-') {
                    const flags = arg.slice(1, arg.length).split('')
                    flags.forEach(flag => {
                        args[flag] = true
                    })
                }
            })
        
        var envFileName = (args.env || "local");

        let envObj;
        enviorements.forEach(enviorement => {
            if (enviorement.name == envFileName){
                for(let key in enviorement){
                    process.env[key] = enviorement[key];
                }
                envObj = enviorement;
                
            }
        })    
        // console.log("envObj::", envObj);
        return envObj;
    }

    public async dbConnect(): Promise<boolean>{
        let cbConnect = await this._cbConnect();
        
        // console.log("cbConnect::", cbConnect);
        // console.log("esConnect::", esConnect);
        if (cbConnect.status) {
            let esConnect = await this._esConnect();
            if (esConnect.status){
                return true;
            }else{
                return false;    
            }            
        } else {
            return false;
        }
        // return new Promise(async (resolve)=>{
            

        // })
    }

    private async _cbConnect(): Promise<{status:boolean,error?:object}> {
        return new Promise(async (resolve) => {
            let cbConn = await this._couchbaseService.cbConnect();
            // let cbConn = await CouchbaseService.cbConnect();
            if (cbConn.status) {
                resolve({ status: true });
            } else {
                resolve({ status: false });
            }
        })
    }

    private _esConnect(): Promise<{ status: boolean, error?: object }>{
        return new Promise(async (resolve) => {
            let esConn = await this._elasticService.esConnect(); 
            if (esConn.status){
                resolve({ status: true });
            }else{
                resolve({ status: false });
            }
            
        })
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the http://localhost:${this.port}`)
        })
    }
    
}

export default App