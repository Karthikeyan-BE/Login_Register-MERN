import jwt from 'jsonwebtoken';

const setCookie = async (data,day,res,)=>{

  try {
    const token = jwt.sign(
        {data} ,
        process.env.SECRET_KEY , 
        {expiresIn:`${day}d`})
    if(!token){
        return res.status(400).json({error:'Token Creation Failed'})
    }
    res.cookie('jwt',token,{
        maxAge:day*24*60*60*1000,
        httpOnly:true,   
    })
    return token
  } catch (error) {
    res.status(400).json({error:'Internal Server Error'})
    console.error(error);
  }
}

export {setCookie };