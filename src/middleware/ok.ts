var AJV = require("ajv")
// var ajv = new AJV()
var ajv = new AJV({
    removeAdditional: true,
    allErrors: true,
    $data: true,
})
/**
 * 
 * @param res : response object of Express
 * @param obj : response to be return to API
 * @param currentSchemaObj : Response validation object
 */
let responseSanitize = async (res,obj, currentSchemaObj)=>{
    console.log("responseSanitize");
    if (typeof currentSchemaObj != "undefined") {
        var requestValidate = ajv.compile(currentSchemaObj.res);
        if (requestValidate(obj)) {
            return res.json(obj);
        }
        // not valid
        res.json({
            status: false,
            error: requestValidate.errors[0]
        })
    } else {
        res.json({
            status: false,
            message: "Schema not found!",
            // message: appMessage.common.error.schemaNotFound,
            error: {}
        })
    }
}
export {
    responseSanitize
} 