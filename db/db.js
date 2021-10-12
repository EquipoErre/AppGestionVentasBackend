import { MongoClient } from "mongodb";

import dotenv from "dotenv";

dotenv.config({ path: "./.env" });
//instanciar clase

const stringConexion = process.env.DATABASE_URL;
const client = new MongoClient(stringConexion, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
let conexion;

const conectarDB = (callback) => {
  client.connect((err, db) => {
    if (err) {
      console.log("Error Conectando a la base de datos");
    }
    // creando conexion para trabajr con la base de datos
    conexion = db.db("appGestionVentas");
    console.log("conexion exitosa");
    return callback();
  });
};

const getDB = ()=>{
    return conexion
}

export { conectarDB, getDB };
