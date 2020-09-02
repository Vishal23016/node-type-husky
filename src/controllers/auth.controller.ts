// JWTSecretKey
import * as express from 'express';
import * as jwt from "jsonwebtoken";
import { Request, Response } from 'express';
import IControllerBase from 'interfaces/IControllerBase.interface';
import CipherService from './../../../core/services/cipher.service';

class AuthController implements IControllerBase {
    public path = '/auth';
    public router = express.Router();
    private _cipherService = new CipherService();
    constructor() {
        this.initRoutes();
    }

    public initRoutes() {
        this.router.post(`${this.path}/login`, [], this.login);        
    }

    public login = async (req: Request, res: Response) => {
        var token = jwt.sign(JSON.stringify({ id: 1, name: "nitin" }), process.env.JWTSecretKey);

        let encryptPassword = await this._cipherService.encryptPassword('12345678');
        console.log("encryptPassword::", encryptPassword);
        let decreptedPassword = await this._cipherService.decryptPassword('12345678', encryptPassword);
        console.log("decreptedPassword:::", decreptedPassword);

        res.json({
            status:true,
            message:"login",
            token: token
        })
    } 
}

export default AuthController