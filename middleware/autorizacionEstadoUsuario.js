import { getDB } from "../db/db.js";
import jwt_decode from 'jwt-decode';

const autorizacionEstadoUsuario = async (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split('Bearer ')[1];
    if (token){
      const usuario = jwt_decode(token)['http://localhost/userData'];
      const conexion = getDB();
      await conexion.collection('usuarios').findOne({ email: usuario.email }, async (err, response) => {
        if (response) {
          if (response.estado === 'no autorizado'){
            res.sendStatus(401);
            res.end();
          } else {
            console.log('habilitado');
            next();
          }
        } else {
          next();
        }
      });
    }
  }
};

export default autorizacionEstadoUsuario;