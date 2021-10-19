import { getDB } from "../db/db.js";
import jwt_decode from 'jwt-decode';
const autorizacionEstadoUsuario = async (req, res, next) => {

  // if (req.headers.authorization) {
  //   const token = req.headers.authorization.split('Bearer ')[1];
  //   if (token){
  //     const usuario = jwt_decode(token)['http://localhost/userData'];
  //     console.log(usuario);
  //     if (usuario) {
  //       const conexion = getDB();
  //       await conexion.collection('usuarios').findOne({ correo: usuario.email }, async (err, res) => {
  //         if (res) {
  //           if (res.estado === 'rechazado'){
  //             return res.sendStatus(401);
  //           }
  //         }
  //       });
  //     }
  //   }
  // }
  next();
};

export default autorizacionEstadoUsuario;