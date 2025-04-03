import { MongoClient } from "mongodb";

const url = process.env.DB_URL;

let client;
export async function connectToMongoDb() {
    // const client = await MongoClient.connect(url);
    // if(client){
    //     console.log("MongoDb connected");
    // } else{
    //     console.log("Connection failed");
    // }
    try {
        const clientInstance = await MongoClient.connect(url);
        client = clientInstance;
        console.log("MongoDb connected");
        createCounter(client.db());
    } catch (error) {
        console.log(error);
    }
}

export const getClient = ()=>{
    return client;
}

export function getDb(){
    return client.db();
}

const createCounter = async(db) => {
    const existingCounter = await db.collection("counters").findOne({_id: 'cartItemid'});
    if(!existingCounter){
        await db.collection("counters").insertOne({_id: 'cartItemid', value:0});
    }
}