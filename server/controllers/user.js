import Users from "../models/userModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import path from "path"
import fs from "fs"


const error = new Error()


//start *********************
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await Users.findAll({});
    res.status(200).json({ users })
  } catch (err) {
    next(error)
  }
}
//End *********************

//Start ****************************** 
export const registerUser = async (req, res, next) => {

  const { name, email, password, confPassword, isAdmin } = req.body;

  if (password !== confPassword) {
    error.statusCode = 406
    error.message = "پسورد و تکرارآن برابر نیست !!"
    return next(error)
  }

  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt)

  try {
    const found = await Users.findOne({ where: { email: email } });
    if (found) {
      error.statusCode = 406
      error.message = "ایمیل تکراری است!"
      return next(error)
    }
    await Users.create({
      name: name,
      email: email,
      password: hashPassword,
      isAdmin: isAdmin,
    })
    res.status(200).json({ message: "ثبت نام موفقیت آمیز بود " })

  } catch (err) {
    next(err)
  }
}
//End ************************************* 

//Start *********************************
export const loginUser = async (req, res, next) => {


  try {
    const user = await Users.findAll({
      where: {
        email: req.body.email
      }
    })


    if (!user.length) {
      error.message = "ایمیل نامعتبر است !"
      error.statusCode = 401
      return next(error)
    }

    const match = await bcrypt.compare(req.body.password, user[0].password)
    if (!match) {
      error.message = "رمز عبور اشتباه است !"
      error.statusCode = 401
      return next(error)
    }

    const { id, name, email, isAdmin } = user[0];
    const accessToken = await jwt.sign(
      { id, name, email, isAdmin },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "5m"
      });

    const refreshToken = await jwt.sign(
      { id, name, email, isAdmin },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1d"
      })

    await Users.update(
      { refresh_token: refreshToken },
      { where: { id: id } })

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000
    })

    return res.status(200).json(
      {
        user: { id, name, email, isAdmin, accessToken },
        message: "ورود با موفقیت انجام شد !"
      })

  } catch (err) {
    next(err)
  }
}
//End ************************************


//Start ***********************************
export const logOutUser = async (req, res, next) => {

  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      error.statusCode = 403
      error.message = "درخواست نامعتبر است !"
      return next(error)
    }

    const user = await Users.findOne({ refresh_token: refreshToken })
    if (!user) {
      error.message = "کاربر یافت نشد !"
      error.statusCode = 404
      return next(error)
    }

    const clr = null;
    await Users.update({
      refresh_token: clr
    }, {
      where: {
        id: user.id
      }
    })
    res.clearCookie("refreshToken")
    res.status(200).json({ message: "خروج موفقیت آمیز بود !" })
  } catch (err) {
    next(err)
  }
}
//End ******************************************* 

//Start ************************************ 
export const deleteUser = async (req, res, next) => {

  const user = await Users.findOne({
    where: {
      id: req.params.id
    }
  })

  if (!user) {
    error.statusCode = 404
    error.message = "کاربری یافت نشد !"
    return next(error)
  }

  try {
    await Users.destroy({
      where: {
        id: req.params.id
      }
    })
    res.status(200).json({ message: "کاربر با موفقیت حذف شد" })
  } catch (err) {
    next(err)
  }
}
//End **************************************


//start **************************************
export const updateUser = async (req, res, next) => {

  const { name, email, password, confPassword, isAdmin } = req.body

  const user = await Users.findOne({
    where: {
      id: req.params.id
    }
  })
  if (!user) {
    error.statusCode = 404
    error.message = "کاربری یافت نشد !"
    return next(error)
  }

  if (password !== confPassword) {
    error.message = "مقادیر پسوردوتکرار برابر نیست !!"
    error.statusCode = 406
    return next(error)
  }

  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);

  try {
    await Users.update({
      name: name,
      email: email,
      password: hashPassword,
      isAdmin: isAdmin
    }, {
      where: {
        id: req.params.id
      }
    })

    res.status(201).json({ message: "ویرایش موفقیت آمیزبود!" })
  } catch (err) {
    next(err)
  }
}
//End **************************************

//start **************************************
export const updateProfile = async (req, res, next) => {
  const avatar = await Users.findOne({
    where: {
      id: req.params.id
    }
  })

  if (!avatar) {
    error.statusCode = 404
    error.message = "کاربری پیدا نشد"
    return next(error)
  }

  const { name, password, confPassword } = req.body;
  if (password !== confPassword) {
    error.message = "پسوورد و تکرار آن با هم برابر نیست"
    error.statusCode = 406
    return next(error)
  }

  let fileName = null;
  let url = null
  if (req.files === null) {
    fileName = avatar.image
    url = avatar.url
  } else {
    const file = req.files.file
    const fileSize = file.data.length;
    const ext = path.extname(file.name)
    let dateNow = Math.round(Date.now());
    fileName = dateNow + ext
    url = `${req.protocol}://${req.get("host")}/avatars/${fileName}`
    const allowedType = ['.png', '.jpg', '.jpeg'];

    if (!allowedType.includes(ext.toLowerCase())) {
      error.message = "jpeg jpg png عکس معتبر نیست * فرمت های مجاز "
      error.statusCode = 406
      return next(error)
    }

    if (fileSize > 1000000) {
      error.message = "حجم عکس نباید بیشتر از 1 مگابایت باشد"
      error.statusCode = 406
      return next(error)
    }

    file.mv(`./public/avatars/${fileName}`, (err) => {
      if (err) {
        error.message = err
        error.statusCode = 501
        return next(error)
      }
    })

    if (avatar.image) {
      try {
        const filePath = `./public/avatars/${avatar.image}`
        fs.unlinkSync(filePath)
      } catch (err) {
        next(err)
      }
    }

  }

  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt)
  try {
    await Users.update({ name: name, password: hashPassword, image: fileName, url: url }, {
      where: {
        id: req.params.id
      }
    })
    res.json({ msg: "کاربر با موفقیت ویرایش شد" })
  } catch (error) {
    console.log(error);
  }
}
// End **************************************************

//start **************************************
export const getProfile = async (req, res, next) => {

  try {
    const id = req.userId
    const user = await Users.findByPk(id)
    if (!user) {
      error.message = "کاربر یافت نشد"
      error.statusCode = 404
      return next(error)
    }
    res.json({ user: { id: user.id, name: user.name, url: user.url, email: user.email } })
  } catch (err) {
    next(err)
  }
}
// End **************************************************