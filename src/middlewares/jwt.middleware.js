import jwt from 'jsonwebtoken';

const jwtMiddileware = (req, res, next) => {
    const token = req.headers["authorization"];

    console.log(token);

    if(!token){
        return res.status(400).send('Unauthorized user')
    }

    try {
        const payload = jwt.verify(
            token,
            '2msNsI}T7vQ#D:Y'
        )
        console.log("Payload", payload)
        req.userId = payload.userID;
        
    } catch (error) {
        return res.status(400).send('Unauthorized user')
    }

    next();
}

export default jwtMiddileware;