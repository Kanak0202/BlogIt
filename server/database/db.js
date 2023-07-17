import mongoose from "mongoose"


const Connection = async (username, password)=>{
    const URL = `mongodb://${username}:${password}@ac-pssvxek-shard-00-00.pwspiwa.mongodb.net:27017,ac-pssvxek-shard-00-01.pwspiwa.mongodb.net:27017,ac-pssvxek-shard-00-02.pwspiwa.mongodb.net:27017/?ssl=true&replicaSet=atlas-wblbua-shard-0&authSource=admin&retryWrites=true&w=majority`;
    try{
        await mongoose.connect(URL, {useNewUrlParser:true});
        console.log("Database connected successfully");
    }
    catch(error){
        console.log("Error while connecting database ", error);
    }
}

export default Connection;