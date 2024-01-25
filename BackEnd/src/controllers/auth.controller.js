import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import {createdAccesToken} from "../libs/jwt.js";

export const register = async (req, res) => {
    const { username, email, password } = req.body;

    try{
        const passwordHashs = await bcrypt.hash(password, 10); // Encriptando la contraseña
        const  newUser = new User({
            username,
            email,
            password: passwordHashs
        });
    
        const userSaved = await newUser.save(); // Guardando el usuario en la base de datos
        const token = await createdAccesToken({id: userSaved._id}); // Generando el token
        res.cookie("token", token);
        res.json({
          id: userSaved._id,
          username: userSaved.username,
          email: userSaved.email,
          createdAt: userSaved.createdAt,
          updateAt: userSaved.updatedAt,
        });
    } catch (error) {
        return res.status(500).json({message: error.message}); // Error al guardar el usuario
    }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {

    const userFound = await User.findOne({ email }); // Buscando el usuario en la base de datos

    if (!userFound) return res.status(400).json({ message: "Usuario no encontrado" }); // Si no existe el usuario
    const isMatch = await bcrypt.compare(password, userFound.password); // Comparando la contraseña, true o false

    if (!isMatch) return res.status(400).json({ message: "Contraseña incorrecta" }); // Si la contraseña es incorrecta

    const token = await createdAccesToken({ id: userFound._id }); // Generando el token
    res.cookie("token", token);
    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updateAt: userFound.updatedAt,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message }); // Error al logearse
  }
};

export const logout = (req, res) => {
  res.cookie("token", "", { 
  expires: new Date(0) // Eliminando la cookie
  });
  return res.sendStatus(200);
};

export  const profile = async (req, res) => {
  const UserFound = await User.findById(req.user.id); // Buscando el usuario en la base de datos
  if(!UserFound) return res.status(400).json({message: "Usuario no encontrado"});
  return res.json({
    id: UserFound._id,
    username: UserFound.username,
    email: UserFound.email,
    createdAt: UserFound.createdAt,
    updateAt: UserFound.updatedAt,
  })

  res.send("profile");
};