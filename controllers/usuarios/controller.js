import { getDB } from "../../db/db.js";
import { ObjectId } from "mongodb";
import jwt_decode from 'jwt-decode';

const queryAllUsers = async (callback) => {
  let conexion = getDB();
  await conexion.collection("usuarios").find({}).limit(50).toArray(callback);
};

const createUser = async (datosUsuario, callback) => {
  let conexion = getDB();
  await conexion.collection("usuarios").insertOne(datosUsuario, callback);
};

const updateUser = async (id, edicion, callback) => {
  let conexion = getDB();
  console.log(edicion);
  const filtroUsuario = { _id: new ObjectId(id) };
  const operacion = { $set: edicion };

  await conexion
    .collection("usuarios")
    .findOneAndUpdate(
      filtroUsuario,
      operacion,
      { upsert: true, returnOriginal: false },
      callback
    );
};

const deleteUser = async (id, callback) => {
  let conexion = getDB();
  const filtroUsuario = { _id: new ObjectId(id) };
  await conexion.collection("usuarios").deleteOne(filtroUsuario, callback);
};
const findOneUser = async( id, callback) =>{
  let conexion = getDB();
  await conexion
    .collection("usuarios")
    .findOne({ _id: new ObjectId(id) }, callback);
}

const findOrCreateUser = async (req, callback) => {
    const token = req.headers.authorization.split('Bearer ')[1];
    const usuario = jwt_decode(token)['http://localhost/userData'];
    const conexion = getDB();
    await conexion.collection('usuarios').findOne({ email: usuario.email }, async (err, res) => {
      if (res) {
        callback(err, res);
      } else {
        usuario.auth0ID = usuario._id;
        delete usuario._id;
        usuario.rol = 'sin rol';
        usuario.estado = 'pendiente';
        await createUser(usuario, (err, res) => callback(err, usuario));
      }
    });
};

export { queryAllUsers, createUser, updateUser, deleteUser, findOneUser, findOrCreateUser };
