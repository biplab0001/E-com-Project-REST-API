import UserModel from "../features/user/user.models.js";

const besicAuthorization = ( req , res , next ) =>{

    //check if authorization header is emply or not
    const authHeader = req.headers["authorization"];

    if(!authHeader){
        return res.status(401).send({ success: "false", "message": "no authorization details found"});
    }

    //extract credentials
    const baseCredentials = authHeader.replace('Basic ','');
    console.log(baseCredentials);

    //decode credentials

    const decodeCredentials = Buffer.from(baseCredentials, 'base64').toString('utf-8');
    console.log(decodeCredentials);

    const creds = decodeCredentials.split(":");

    const user = UserModel.getAll().find(u=> u.email===creds[0] && u.password===creds[1]);

    if(user){
        next();
    } else {
        res.status(401).send({ success: "false", message: "Incorrect credenticals"});
    }
    
}

export default besicAuthorization;