import mongoose from "mongoose";

export const connectDB = async () => {
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/wanderhutdb"); // Conectando a la base de datos
        console.log("Database connected"); // Conexión exitosa

    } catch (error) {
        console.log(error); //Error connecting to database
    }
};
