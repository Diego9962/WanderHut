import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken.js';
import { getPlaces, getPlace, deletePlaces, updatePlaces, createPlaces } from '../controllers/places.controller.js';
import { uploadImages } from '../middlewares/storage.js';



const router = Router();

router.get('/places',  authRequired, getPlaces); // Obtener todos los lugares
router.post("/places", authRequired, uploadImages.single('image'), createPlaces); // Crear un lugar
router.delete("/places/:id", authRequired, deletePlaces); // Eliminar un lugar
router.get("/places/:id", authRequired, getPlace); // Obtener un lugar
router.put("/places/:id", authRequired, uploadImages.single('image'), updatePlaces); // Actualizar un lugar


export default router;