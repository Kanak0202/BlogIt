import { response } from "express";
import User from "../model/user.js";
import dotenv from 'dotenv';
import Token from "../database/token.js";

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

dotenv.config(); //initilaze .env

export const signupUser = async (request, response)=>{
    // console.log("Inside Signup");
    try{
        // const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(request.body.password, 10);
        const user = {username: request.body.username, name: request.body.name, password: hashedPassword};
        // console.log(typeof(user));
        const newUser = new User(user);
        // console.log(newUser);
        await newUser.save();
        console.log(newUser);
        return response.status(200).json({msg:"Signup successful"});
    }catch(error){
        return response.status(500).json({msg:"Error while signing up the user"});
    }
}

export const loginUser = async (request, response)=>{
    // console.log("Inside Login");
    let user = await User.findOne({username:request.body.username});
    if(!user){
        return response.status(400).json({msg:'Username does not match'});
    }
    try{
        let match = await bcrypt.compare(request.body.password, user.password);
        if(match){
            //access token --> not permanent
            //refresh token --> can be used to generate access token
            const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY,{expiresIn: '15m'});
            const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY);
            const newToken = new Token({token:refreshToken});
            await newToken.save();

            return response.status(200).json({accessToken: accessToken, refreshToken: refreshToken, name:user.name, username:user.username});
        }
        else{
            return response.status(400).json({msg:"Password does not match"});
        }
    }catch{
        return response.status(500).json({msg:"Error while logging in the user"});
    }
}