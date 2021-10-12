import { getDB } from "../../db/db.js";
import { ObjectId } from "mongodb";

const queryAllUsers = async (callback) => {
  let conexion = getDB();
  await conexion.collection("usuarios").find({}).toArray(callback);
};

const createUser = async (datosUsuario, callback) => {
  let conexion = getDB();
  console.log("llaves: ", Object.keys(datosUsuario));
  if (
    Object.keys(datosUsuario).includes("correo") &&
    Object.keys(datosUsuario).includes("nombre")
  ) {
    await conexion.collection("usuarios").insertOne(datosUsuario, callback);
  } else {
    return { err: "conditions not met", result: "" };
  }
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
export { queryAllUsers, createUser, updateUser, deleteUser, findOneUser };
