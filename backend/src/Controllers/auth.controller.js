import { setCookie } from "../Lib/manageCookies.js";
import userModel from "../Models/userModel.js";
import bcrypt from 'bcryptjs'
const signup = async (req,res) => {
    try {
        const {name,email,number,password} = req.body;
        if(!name || !email || !number || !password){
            return res.status(400).json({error:'All Fields Are Required'});
        }
        const existingEmail = await userModel.findOne({email});
        if(existingEmail){
           return res.status(400).json({error:'Email Already Exists'});
        }
        const existingNumber = await userModel.findOne({number});
        if(existingNumber){
            return res.status(400).json({error:'Number Already Exists'});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPasssword = await bcrypt.hash(password,salt);
        const user = await userModel.create({
            name,
            email,
            number,
            password:hashedPasssword
        });
        if(!user){
            return res.status(400).json({error:'Failed to Create Account'});
        }
        res.status(200).json({message:'Account Created Successfully'})
    } catch (error) {
        res.status(500).json({error:`Internal Server Error`});
        console.log(`Error in User Controller ${error}`);  
    }
}
const login = async (req,res) => {
    try {
        const {email,number,password} = req.body;
        if(!password || (!email && !number) ){
            return res.status(400).json({error:'All Fields Are Required'})
        }
        const user = await userModel.findOne({$or:[{email},{number}]});
        if(!user){
            return res.status(400).json({error:'Invalid Credentails'})
        }
        const verifyPassword = await bcrypt.compare(password,user.password);
        if(!verifyPassword){
            return res.status(400).json({error:'Invalid Credentails'})
        }
        setCookie(user._id,7,res);
        res.status(200).json({message:"Login Successfully"})
    } catch (error) {
        res.status(500).json({error:`Internal Server Error`});
        console.log(`Error in User Controller ${error}`);  
    }
}

const logout = async (req,res) => {
    try {
        setCookie("",0,res);
        res.status(200).json({message:"Logout Successfully"})  
    } catch (error) {
         res.status(500).json({error:`Internal Server Error`});
         console.log(`Error in User Controller ${error}`);  
    }
}

export {signup , login , logout}