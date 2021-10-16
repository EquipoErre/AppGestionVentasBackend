import Express from 'express';
import Cors from 'cors';
import dotenv from 'dotenv';
import { conectarBD } from './db/db.js';
import jwt from 'express-jwt';
import jwks from 'jwks-rsa';

import userMiddleware from './middleware/users.js';
import rutasUsuario from './views/usuarios/rutas.js';

dotenv.config({ path: './.env' });

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

app.use(jwtCheck);
app.use(userMiddleware);

app.use(rutasUsuario);

const main = () => {
  return app.listen(process.env.PORT, () => {
    console.log(`escuchando puerto ${process.env.PORT}`);
  });
};

conectarBD(main);