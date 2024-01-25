import { set } from "mongoose";
import Place from "../models/place.model.js";

export const getPlaces = async (req, res) => {
  const places = await Place.find();
  res.json(places);
};

export const createPlaces = async (req, res) => {
  try {
    const {
      nameplace,
      description,
      direction,
      price,
      maximumpeople,
      airconditioner,
      pool,
      rooms,
      garage,
      schedule,
      city,
      departament,
      web,
      category,
      realestate,
      kick,
      phone,
      name,
    } = req.body;

    console.log(req.body.image, "Antes de validar");

    const validation = validatePlace(
      nameplace,
      description,
      direction,
      price,
      maximumpeople,
      airconditioner,
      pool,
      rooms,
      garage,
      schedule,
      city,
      departament,
      web,
      category,
      realestate,
      kick,
      phone,
      name,
      req.file,
      "Y"
    );
    console.log(req.body.image, "despues de validar");

    if (validation.length === "" || validation.length === 0) {
      const newPlace = new Place({
        nameplace,
        description,
        direction,
        price,
        maximumpeople,
        airconditioner,
        pool,
        rooms,
        garage,
        schedule,
        city,
        departament,
        web,
        category,
        realestate,
        kick,
        phone,
        name,
        image: "/uploads/" + req.file.filename,
        user: req.user.id,
      });
      const savePlace = await newPlace.save();
      res
        .status(200)
        .json({ status: true, message: "Lugar Guardado", savePlace });
    } else {
      return res.status(400).json({ status: false, errors: validation });
    }
  } catch (error) {
    return res.status(500).json({ status: false, errors: [error.message] });
  }
};

export const getPlace = async (req, res) => {
  const place = await Place.findById(req.params.id);
  if (!place) return res.status(404).json({ message: "Lugar no encontrado" });
  res.json(place);
};

export const updatePlaces = async (req, res) => {
  const place = await Place.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!place) return res.status(404).json({ message: "Lugar no encontrado" });
  res.json(place);
};

export const deletePlaces = async (req, res) => {
  const place = await Place.findByIdAndDelete(req.params.id);
  if (!place) return res.status(404).json({ message: "Lugar no encontrado" });
  return res.sendStatus(204); //Elimnado correctamente
};

const validatePlace = (
  nameplace,
  description,
  direction,
  price,
  maximumpeople,
  airconditioner,
  pool,
  rooms,
  garage,
  schedule,
  city,
  departament,
  web,
  category,
  realestate,
  kick,
  phone,
  name,
  image,
  setValidate
) => {
  var errors = [];

  if (nameplace === undefined || nameplace.trim() === "") {
    errors.push("El nombre del lugar es obligatorio");
  }
  if (description === undefined || description.trim() === "") {
    errors.push("La descripción es obligatoria");
  }
  if (direction === undefined || direction.trim() === "") {
    errors.push("La dirección es obligatoria");
  }
  if (price === undefined || price.trim() === "" || price < 0) {
    errors.push("El precio es obligatorio");
  }
  if (
    maximumpeople === undefined ||
    maximumpeople.trim() === "" ||
    maximumpeople < 0
  ) {
    errors.push("El número máximo de personas es obligatorio");
  }
  if (airconditioner === undefined || airconditioner.trim() === "") {
    errors.push("El aire acondicionado es obligatorio");
  }
  if (pool === undefined || pool.trim() === "") {
    errors.push("La piscina es obligatoria");
  }
  if (rooms === undefined || rooms.trim() === "") {
    errors.push("El número de habitaciones es obligatorio");
  }
  if (garage === undefined || garage.trim() === "") {
    errors.push("El garaje es obligatorio");
  }
  if (schedule === undefined || schedule.trim() === "") {
    errors.push("El horario es obligatorio");
  }
  if (city === undefined || city.trim() === "") {
    errors.push("La ciudad es obligatoria");
  }
  if (departament === undefined || departament.trim() === "") {
    errors.push("El departamento es obligatorio");
  }
  if (web === undefined || web.trim() === "") {
    errors.push("La página web es obligatoria");
  }
  if (category === undefined || category.trim() === "") {
    errors.push("La categoría es obligatoria");
  }
  if (realestate === undefined || realestate.trim() === "") {
    errors.push("La inmobiliaria es obligatoria");
  }
  if (kick === undefined || kick.trim() === "") {
    errors.push("El desalojo es obligatorio");
  }
  if (phone === undefined || phone.trim() === "" || phone < 0) {
    errors.push("El teléfono es obligatorio");
  }
  if (name === undefined || name.trim() === "") {
    errors.push("El nombre del dueño es obligatorio");
  }
  if (image === undefined && setValidate === "Y") {
    errors.push("La imagen es obligatoria");
  } else {
    if (errors != "") {
      fs.unlinkSync("./public/uploads/" + image.filename); // Eliminar la imagen
    }
  }
  return errors;
};
