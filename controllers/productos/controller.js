import { getDB } from "../../db/db.js";
import { ObjectId } from "mongodb";

const queryAllProducts = async (callback) => {
  let conexion = getDB();
  await conexion.collection("productos").find({}).toArray(callback);
};

const createProduct = async (datosProducto, callback) => {
  let conexion = getDB();
  console.log("llaves: ", Object.keys(datosProducto));
  await conexion.collection("productos").insertOne(datosProducto, callback);
};

const updateProduct = async (id, edicion, callback) => {
  let conexion = getDB();
  console.log(edicion);
  const filtroProducto = { _id: new ObjectId(id) };
  const operacion = { $set: edicion };

  await conexion
    .collection("productos")
    .findOneAndUpdate(
      filtroProducto,
      operacion,
      { upsert: true, returnOriginal: false },
      callback
    );
};

const deleteProduct = async (id, callback) => {
  let conexion = getDB();
  const filtroProducto = { _id: new ObjectId(id) };
  await conexion.collection("productos").deleteOne(filtroProducto, callback);
};
const findOneProduct = async (id, callback) => {
  let conexion = getDB();
  await conexion
    .collection("productos")
    .findOne({ _id: new ObjectId(id) }, callback);
};
export { queryAllProducts, createProduct, updateProduct, deleteProduct, findOneProduct };
