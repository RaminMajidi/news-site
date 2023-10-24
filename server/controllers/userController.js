import Users from "../models/userModel.js"
import bcrypt from "bcrypt"
import jwt  from "jsonwebtoken";
import path from "path"


//Start function for get All Users
export const getAllUsers = async(req,res)=>{
    try{
        const users = await Users.findAll({});
        res.status(200).json({data:users,message:"دریافت اطلاعات موفقیت آمیز بود"})

    }catch(error){
        res.status(401).json({message:"خطا ! اطلاعات دریافت نشد"})
    }
}
//End function for get All Users

//Start function for registerUser 
export const registerUser = async(req,res)=>{
    const {name,email,password,confPassword,isAdmin} = req.body;
    if(password !== confPassword){
     return res.status(401).json("پسورد و تکرا آن برابر نیست !!")
    }
  const salt =await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password,salt)
    try{
      const found = await Users.findOne({where:{email:email}});
      if(found){
        return res.status(401).json({message:"ایمیل تکراری است!"})
      }
        await Users.create({
            name:name,
            email:email,
            password:hashPassword,
            isAdmin:isAdmin,
        })
        res.status(200).json({message:"ثبت نام موفقیت آمیز بود "})

  } catch(error){
    res.status(401).json({message:"خطا ! ثبت نام انجام نشد"})
  } 
}
//End function for registerUser 

//Start function for LogIn user 
export const logInUser = async(req,res)=>{

  try{
    const user = await Users.findAll({
      where:{
        email:req.body.email
      }
    })
    
    const match = await bcrypt.compare(req.body.password,user[0].password)
    if(!match){
      return res.status(401).json({message:"اطلاعات ورود نامعتبر است!"})
    }else{
      const {id ,name,email,isAdmin} = user[0];
      const accessToken = await jwt.sign({id,name,email,isAdmin},process.env.ACCESS_TOKEN_SECRET,{
        expiresIn:"5m"
      });

      const refreshToken = await jwt.sign({id,name,email,isAdmin},process.env.REFRESH_TOKEN_SECRET,{
        expiresIn:"1d"
      })

      await Users.update({refresh_token:refreshToken},{where:{id:id}})

      res.cookie("refreshToken",refreshToken,{
        httpOnly:true,
        maxAge:24*60*60*1000
      })

     return res.status(200).json({data:{id,name,email,isAdmin,accessToken},message:"ورود با موفقیت انجام شد !"})
    }
  }catch(error){
  res.status(403).json({error:"کاربر وجود ندارد !"})
  }
}
//End function for LogIn user 


//Start function for logOut user 
export const logOutUser = async(req,res)=>{

  try{
   const refreshToken = req.cookies.refreshToken;
   if(!refreshToken) return res.status(403).json({message:"توکن پیدا نشد !"})
   const user = await Users.findOne({refresh_token:refreshToken})
   if(!user) return res.status(401).json({message:"کاربر یافت نشد !"})
   const clr = null;
   await Users.update({
    refresh_token:clr
   },{where:{
    id:user.id
   }})
   res.clearCookie("refreshToken")
   res.status(200).json({message:"خروج موفقیت آمیز بود !"})
  }catch(err){
   res.status(401).json({message:"خروج انجام نشد !!!"})
  }
}
//End function for logOut user 

//Start function for delete user  
export const deleteUser = async(req,res)=>{

  const user = await Users.findOne({where:{
    id:req.params.id
  }})
  if(!user) return res.status(403).json({message:"کاربری یافت نشد !"})
try{
await Users.destroy({where:{
  id:req.params.id
}})
res.status(200).json({message:"کاربر با موفقیت حذف شد"})
}catch(err){
res.status(401).json({message:"خطا !! حذف انجام نشد"})
}
}
//End function for delete user 

export const updateUser = async (req,res)=>{
 
  const {name,email,password,confPassword,isAdmin} = req.body
  if(password !== confPassword){
    return res.status(401).json({message:"مقادیر پسوردوتکرار برابر نیست !!"})
  }
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password,salt);
 
  try{
    await Users.update({
      name:name,
      email:email,
      password:hashPassword,
      isAdmin:isAdmin
    },{
      where:{
        id:req.body.id
      }
    })
  
res.status(201).json({message:"ویرایش موفقیت آمیزبود!"})
  }catch(err){
res.status(401).json({error:"خطا!! بروزرسانی انجام نشد"})
  }
}

export const updateProfile = async(req,res)=>{
  const avatar = await Users.findOne({
    where:{
      id:req.params.id
    }
  })
  if(!avatar) return res.status(404).json({messgae:"کاربری یافت نشد !!"})
  let fileName = "";
  if(req.files === null){
   fileName = avatar.image
  }else{
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    let dateNow = Math.round(Date.now())
    const fileName = dateNow + ext;
    const allowedType = [".png",".jpg",".jpeg"]
    if(!allowedType.includes(ext.toLocaleLowerCase())){
      return res.json({message:"عکس معتبر نیست !! فرمت های مجاز jpeg png jpg"})
    }
    if(fileSize > 1000000) return res.json({message:"حداکثر سایز عکس باید 1 مگابایت باشد !!"})
    file.mv(`./public/avatars/${fileName}`,(err)=>{
     return res.json({message:err.message})
    })
  }
  const {name,password,confPassword} = req.body;
  if(password !== confPassword){
    return res.json({error:"پسورد و تکرا آن باهم برابر نیست !"})
  }
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password,salt)
  

}