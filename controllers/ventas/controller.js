import { getDB } from "../../db/db.js";
import { ObjectId } from "mongodb";

// usuarios
const queryAllSales = async (callback) => {
  let conexion = getDB();
  await conexion.collection("ventas").find({}).toArray(callback);
};

const createSale = async (datosVenta, callback) => {
  let conexion = getDB();
  await conexion.collection("ventas").insertOne(datosVenta, callback);
  return { err: "conditions not met", result: "" };
};

const updateSale = async (id, edicion, callback) => {
  let conexion = getDB();
  console.log(edicion);
  const filtroVenta = { _id: new ObjectId(id) };
  const operacion = { $set: edicion };

  await conexion
    .collection("ventas")
    .findOneAndUpdate(
      filtroVenta,
      operacion,
      { upsert: true, returnOriginal: false },
      callback
    );
};

const deleteSale = async (id, callback) => {
  let conexion = getDB();
  const filtroUsuario = { _id: new ObjectId(id) };
  await conexion.collection("ventas").deleteOne(filtroUsuario, callback);
};

const findOneSale = async (id, callback) => {
  let conexion = getDB();
  await conexion
    .collection("ventas")
    .findOne({ _id: new ObjectId(id) }, callback);
};

export { queryAllSales, createSale, updateSale, deleteSale, findOneSale };
