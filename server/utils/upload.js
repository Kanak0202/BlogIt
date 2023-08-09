import multer from 'multer';
import {GridFsStorage} from 'multer-gridfs-storage';
import dotenv from 'dotenv';
dotenv.config();
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
//tell where to store? --> pass mongoDB url
const storage = new GridFsStorage({
    url: `mongodb://${username}:${password}@ac-pssvxek-shard-00-00.pwspiwa.mongodb.net:27017,ac-pssvxek-shard-00-01.pwspiwa.mongodb.net:27017,ac-pssvxek-shard-00-02.pwspiwa.mongodb.net:27017/?ssl=true&replicaSet=atlas-wblbua-shard-0&authSource=admin&retryWrites=true&w=majority`,
    options: {useNewUrlParser:true},
    file:(request, file)=>{
        const match = ['image/png', "image/jpg", "image/jpeg"];
        if(match.indexOf(file.memeType) === -1){ //To check extension of file
            return `${Date.now()}-blog-${file.originalname}`;
        }
        return{
            bucketName: "photos",
            filename: `${Date.now()}-blog-${file.originalname}`,
        }
    }
});

export default multer({storage});