import express from "express";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import placesRoutes from "./routes/places.routes.js";

const app = express();
app.use(morgan("dev")); // Mostrar solicitudes en consola
app.use(express.json()); // Para que entienda los datos que vienen en formato JSON
app.use(cookieParser()); // Para poder usar las cookies
app.use('/api', authRoutes); // Rutas de autenticación
app.use("/api", placesRoutes); // Rutas de lugares
app.use(express.static("public")); // Para poder acceder a la carpeta public


export default app;