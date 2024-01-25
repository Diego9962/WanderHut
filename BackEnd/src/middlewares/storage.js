import multer from "multer";

const save = multer.diskStorage({ // Almacenar archivos
  destination: (req, file, cb) => {
    cb(null, "./public/uploads"); // Destino de los archivos
  },
  filename: (req, file, cb) => { // Nombre de los archivos
    if (file.mimetype === "image/png") {
      const ext = file.originalname.split(".").pop(); // Obtener la extensión del archivo
      cb(null, Date.now() + "." + ext);
    } 
  },
});

const filter = (req, file, cb) => { // Filtrar archivos
    if(file && file.mimetype === "image/png"  || file.mimetype === "image/jpeg" || file.mimetype === "image/jpg") {
        cb(null, true);
    } else {
        cb(null, false);
    }
};    

export const uploadImages = multer({ storage: save, fileFilter: filter }); // Exportar el middleware