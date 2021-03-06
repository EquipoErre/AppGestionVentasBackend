import Express from 'express';
import Cors from 'cors';
import dotenv from 'dotenv';
import { conectarDB } from "./db/db.js";
import jwt from 'express-jwt';
import jwks from 'jwks-rsa';

import autorizacionEstadoUsuario from './middleware/autorizacionEstadoUsuario.js';
import rutasUsuarios from "./views/usuarios/rutas.js";
import rutasVentas from "./views/ventas/rutas.js";
import rutasProductos from "./views/productos/rutas.js";

dotenv.config({ path: './.env' });

const port = process.env.PORT || 5000;

const app = Express();

app.use(Express.json());
app.use(Cors());

var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://equipoerre.us.auth0.com/.well-known/jwks.json',
  }),
  audience: 'api-autenticacion-equipoerre',
  issuer: 'https://equipoerre.us.auth0.com/',
  algorithms: ['RS256'],
});

app.use(jwtCheck); //Se debe habilitar cuando se este enviando el token
app.use(autorizacionEstadoUsuario);

app.use(rutasUsuarios);
app.use(rutasVentas);
app.use(rutasProductos);

// encender servidor

const main = () => {
  return app.listen(port, () => {
    console.log(`listening in port ${port}`);
  });
};

conectarDB(main);