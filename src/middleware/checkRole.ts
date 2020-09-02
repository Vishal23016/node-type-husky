import { Request, Response, NextFunction } from "express";


// const checkRole = (req: Request, res: Response, next: NextFunction) => {
//     console.log("checkRole");
//     try {

//     } catch (error) {
//         console.log("checkRole error::::", error);
//     }
 
//     next();
// }

const checkRole = (roles: Array<string>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        //Get the user ID from previous midleware
        // console.log("functional checkRole:: ")
        next();
    };
};

export default checkRole;