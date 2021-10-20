import Express from "express";
import { createUser, deleteUser, findOneUser, queryAllUsers, updateUser, findOrCreateUser } from "../../controllers/usuarios/controller.js";


const rutasUsuarios = Express.Router();

const genericCallback = (res) => (err, result) => {
  if (err) {
    res.status(500).send(err);
  } else {
    res.json(result);
  }
};


rutasUsuarios.route("/usuarios").get((req, res) => {
  console.log("peticion get a /usuarios");
  queryAllUsers(genericCallback(res));
});

rutasUsuarios.route("/usuarios/self").get((req, res) => {
  console.log(`peticion get ruta self` );
  findOrCreateUser(req, genericCallback(res))
});

rutasUsuarios.route("/usuarios/:id").get((req, res) => {
  console.log(`peticion get de ${req.params.id}` );
  findOneUser(req.params.id, genericCallback(res))
});

rutasUsuarios.route('/usuarios/nuevo').post((req, res) => {
  console.log('peticion post')
    createUser(req.body, genericCallback(res));
  });

rutasUsuarios.route("/usuarios/:id").patch((req, res) => {
  console.log("peticion patch")
 updateUser(req.params.id, req.body, genericCallback(res))
});
rutasUsuarios.route("/usuarios/:id").delete((req, res) => {
  console.log('peticion delete')
  deleteUser(req.params.id, genericCallback(res))
});

export default rutasUsuarios;
