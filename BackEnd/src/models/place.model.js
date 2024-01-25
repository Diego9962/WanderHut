import mongoose from "mongoose";

const placeSchema = new mongoose.Schema({
  nameplace: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  direction: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  maximumpeople: {
    type: Number,
    required: true,
  },
  airconditioner: {
    type: Boolean,
    required: true,
  },
  pool: {
    type: Boolean,
    required: true,
  },
  rooms: {
    type: Number,
    required: true,
  },
  garage: {
    type: Boolean,
    required: true,
  },
  schedule: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  departament: {
    type: String,
    required: true,
  },
  web: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  realestate: {
    type: String,
    required: true,
  },
  kick: {
    type: Boolean,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  user: { // Relación con el usuario
    type: mongoose.Schema.Types.ObjectId, // ID del usuario
    ref: "User",
    required: true,
  },
}, {
    timestamps: true
});

export default  mongoose.model("Place", placeSchema);