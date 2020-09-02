
/**
 * the middleware isRequired function
 * @returns {Function}
 * NOTE :: the file name must be the route name for ex 
 * EX :: route name :: getorganizationdetails then schema js method name :: getorganizationdetails
 * steps ::
 * 
 *need to add same name in index js 
 */
var AJV = require("ajv")
var ajv = new AJV({
    removeAdditional: true,
    allErrors: true,
    $data: true,
})
import { Request, Response, NextFunction } from "express";


const validate = (schema: {req:any}) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        if (typeof schema != "undefined") {
            var requestValidate = ajv.compile(schema.req)
            var finalParams = { ...req.body, ...req.params, ...req.query };
            // console.log("finalParams:::", finalParams);
            if (requestValidate(finalParams)) {
                return next();
            }
            // not valid
            res.json({
                status: false,
                error: requestValidate.errors[0]
            })
        } else {
            console.log('success....');
            return next()
        }
    };
};

export default validate;

