import Express from "express";

import Cors from "cors";
import dotenv from "dotenv";
import { conectarDB } from "./db/db.js";
import rutasUsuarios from "./views/usuarios/rutas.js";

dotenv.config({ path: "./.env" });


const app = Express();
// para usar el formato json
app.use(Express.json());
app.use(Cors());
app.use(rutasUsuarios)

// encender servidor

const main = () => {
  return app.listen(process.env.PORT, () => {
    console.log("listening in port", process.env.PORT);
  });
};

conectarDB(main);
