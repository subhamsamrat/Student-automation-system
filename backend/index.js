import express from 'express';
import dotenv from 'dotenv'
import connectDB from './src/DB/connectDB.js';
import addstudent from './src/Routes/admin.route.js'
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import { v2 as cloudinary } from 'cloudinary'

dotenv.config({
    path:'./env'
})

const app=express();
const PORT= process.env.PORT ;

app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));


//configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//cloudinary configuration
 cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key:process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

connectDB();

//admin
app.use('/api/v1/admin',addstudent);

app.listen(PORT,()=>{
    console.log('Server running on port',PORT);
} )