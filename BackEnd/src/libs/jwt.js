import jwt from "jsonwebtoken";
import {TOKEN_SECRET} from "../config.js";

export function createdAccesToken(payload) {
    return new Promise((resolve, reject) => {
        jwt.sign( // Generando el token
            payload,
            TOKEN_SECRET,
          {
            expiresIn: 86400, // 24 hours
          },
          (err, token) => {
            if (err) reject (err); // Si hay un error
            resolve(token); // Si no hay error
          }
        );
    });
}

