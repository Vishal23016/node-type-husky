import * as express from 'express';
import { Request, Response, NextFunction } from 'express';
import { IMain } from './../interfaces/main.interface'
import IControllerBase from 'interfaces/IControllerBase.interface';

// import checkJwt from './../middleware/jwt';
// import checkRole from './../middleware/checkRole';
// import cors from './../middleware/cors';

import checkJwt from './../../../core/middleware/jwt';
import checkRole from './../../../core/middleware/checkRole';
import cors from './../../../core/middleware/cors';

const resOk = require('./../../../core/middleware/ok');
import allSchemas from './../schemas/index';
import validate from './../middleware/validate';

import CommonCoreService from '../../../core/services/commonCore.service';
import EmailService from './../../../core/services/email.service';
import ConveretHtmlToPdf from './../../../core/services/converthtmltopdf.service';
import UploadFile from './../../../core/services/uploadfile.service'

import ElasticService from './../../../core/services/elastic.service';
import CouchbaseService from './../../../core/services/couchbase.service';
import CommonMessageService from './../services/commonmsg.service';
// const ElasticService = require('./../../../core/services/elastic.service');
// const CouchbaseService = require('./../../../core/services/couchbase.service');

class MainController implements IControllerBase {
    public path = '/main';
    public router = express.Router();
    private _commonCoreService = new CommonCoreService();
    private _emailService = new EmailService();
    private _couchbaseService = new CouchbaseService();
    private _elasticService = new ElasticService();
    private _convertHtmlToPdf = new ConveretHtmlToPdf();
    private _uploadImage = new UploadFile();
    private _commonMessageService = new CommonMessageService();

    constructor(private _commonService: any) {
        // console.log("allSchemas::", allSchemas['mainModel'].findAll);
        this.router.use(cors);
        this.initRoutes();
    }   

    public async initRoutes() {
        // this._commonCoreService.coreMethod();
        // await this._commonCoreService.coreAsyncMethod();
        let mainModel = allSchemas['mainModel'];
        this.router.get(this.path, [validate(mainModel.findAll),checkJwt], this.findAll);
        // this.router.get(this.path, [checkJwt, checkRole(["Admin"])], this.findAll);
        this.router.get(`${this.path}/:id`, [validate(mainModel.getDetail),checkJwt,checkRole(["Admin"])], this.getDetail);
        this.router.post(`${this.path}`, [checkJwt], this.create);
        this.router.put(`${this.path}/:id`, [checkJwt], this.update);
        this.router.delete(`${this.path}/:id`, [checkJwt], this.delete);
        this.router.post(`${this.path}/createpdf`, [], this.createPdf);
        this.router.post(`${this.path}/imageupload`, [], this.uploadImage);
        this.router.post(`${this.path}/createcsvfile`, [], this.createCSV);
    }
 
    public findAll = async (req: Request, res: any) => {
        try{

            this._emailService.sendMail(["nitin@adit.com"],"2 HandleBar Test Mail","tt",{});
            
            let query = `SELECT b.* FROM \`${globalThis.CBAppBucket}\` b USE KEYS ["user|nitin","user|malav"]`;
            let response = await this._couchbaseService.searchByQuery(query);
            console.log("response::", response);
            let resp = await this._elasticService.searchRecord("sms",{});
            // console.log("resp::", resp);
            if (resp.status){
                // let resp = await globalThis.esClient.search({ index: "sms", body: {} })
                // console.log("resp::", resp);
                // let info = this._commonService.getString();
                // let coreMethod = this._commonCoreService.coreMethod();
                const mainData: IMain[] = [
                    {
                        id: 1,
                        name: 'Nitin'
                    },
                    {
                        id: 2,
                        name: 'Can'
                    },
                    {
                        id: 3,
                        name: 'Ahmet'
                    }
                ]
                
                let response = {
                    status: true,
                    message: "findAll",
                    // data: resp.data,
                    data: mainData,
                    error:{}
                };                    
                // res.json(response)
                resOk.responseSanitize(res,response, allSchemas['mainModel'].findAll)
            }else{
                // res.json({
                //     status: false,
                //     message: "findAll"
                // })   
                resOk.responseSanitize(res, {status:false,message:"in error",data:[],error:{}}, allSchemas['mainModel'].findAll)
            }
               
        }catch(error){
            console.log("herer:::", error)
            // res.json({
            //     status: false,
            //     message: "findAll",                
            // })   
            resOk.responseSanitize(res, { status: false, message: "in catch", data: [], error: {} }, allSchemas['mainModel'].findAll)
        }
    }

    public getDetail = async (req: Request, res: Response) =>{
        console.log("getDetail");
        let findDataFromCB = await this._couchbaseService.getDetailByKey(`user|malav`);
        // console.log("findDataFromCB::", findDataFromCB);
        // let template = await this._commonCoreService.readTemplateFile();
        // console.log("template:::", template);
        let response = {
            status: true,
            message: "getDetail",
            data:{
                "id":1,
                "name":"nitin",
                "Test":"tere"
            },
            error:{}
        }        
        resOk.responseSanitize(res, response, allSchemas['mainModel'].getDetail)
    }
    
    public create = async (req: Request, res: Response) =>{
        var userDoc = {
            name: "kishansongangggggg",
            password: "12345678",
            flights: []
        };
        var userDocKey = 'user|' + userDoc.name;
        let recordAdded = await this._couchbaseService.insertRecord(userDocKey, userDoc);           
        if (recordAdded.status){
            res.json({
                status: true,
                message: "create",
                userDocKey: userDocKey,
                userDoc: userDoc
            })
        }else{
            res.json({
                status: false,
                message: "error in create Document!"
            })
        }
            
    }
    
    public update = async (req: Request, res: Response) =>{
        console.log("update");
        let findDataFromCB = await this._couchbaseService.getDetailByKey(`user|malav`);
        var userDoc = {
            name:"malav",
            password: "new password changed",
            flights: ["finalflightnumber"]
        };
        var userDocKey = 'user|malav';
        let recordAdded = await this._couchbaseService.updateRecord(userDocKey, userDoc); 
        res.json({
            status: true,
            message: "update",
        })    
    }

    public delete = async (req: Request, res: Response) => {
        console.log("delete");
        let query = `DELETE FROM \`${globalThis.CBAppBucket}\` b USE KEYS ["user|kishansongangggggg"]`;
        let response = await this._couchbaseService.deleteRecords(query);
        res.json({
            status: true,
            message: "delete",
        })
    }

    public createPdf = async (req: Request, res: Response)=> {
        try {
            let data = {
                _id:123,
                name:"Vishal Patel",
                email:"vishal@adit.com",
                phone:"7854854220",
                education:[{
                    standard:"MCA",
                    clgName:"Patel Group Ins.",
                    percentage:"70%",
                    university:"GTU"
                },{
                    standard:"BCA",
                    clgName:"Patel Group Ins.",
                    percentage:"72%",
                    university:"HNGU"
                }]
            }
            await this._convertHtmlToPdf.generatePDFFile('welcome',data,'pdfGenerate');
            res.json({
                status: true,
                message: this._commonMessageService.common.success.success
            })
        } catch (error) {
            res.json({
                status: false,
                message: error.message || this._commonMessageService.common.error.someThingWentWrong,
            })
        }
    }
    
    public uploadImage = async (req: Request, res: Response)=> {
        try {
            /* let result = await this._uploadImage.base64ImageUpload(req.body,'upload'); */
            
            /* let result = await this._uploadImage.imageFileUpload(req, 'upload'); */

            console.log('generate uuid::::',this._commonCoreService.generateUuid())
            res.json({
                status: true,
                message: this._commonMessageService.common.success.success,
                file: []
            })
        } catch (error) {
            res.json({
                status: false,
                message: error.message || this._commonMessageService.common.error.someThingWentWrong,
            })
        }
    }

    public createCSV = async (req: Request, res: Response)=> {
        try {
            let headerData = [{id: 'name', title: 'NAME'}, {id: 'lang', title: 'LANGUAGE'}];
            let data = [{name: 'Bob',  lang: 'French, English'}, {name: 'Mary', lang: 'English'}];
            let filename = 'demo';
            let response = await this._convertHtmlToPdf.generateCSVFile(headerData, data , filename, 'upload');
            res.json({
                status: true,
                message: this._commonMessageService.common.success.success,
                file: []
            })
        } catch (error) {
            res.json({
                status: false,
                message: error.message || this._commonMessageService.common.error.someThingWentWrong,
            })
        }
    }
}

export default MainController