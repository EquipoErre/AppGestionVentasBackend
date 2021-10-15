import Express from "express";
import {
  createProduct,
  deleteProduct,
  findOneProduct,
  queryAllProducts,
  updateProduct,
} from "../../controllers/productos/controller.js";

const rutasProductos = Express.Router();

const genericCallback = (res) => (err, result) => {
  if (err) {
    res.status(500).send(err);
  } else {
    res.json(result);
  }
};

rutasProductos.route("/productos").get((req, res) => {
  console.log("peticion get a /productos");
  queryAllProducts(genericCallback(res));
});
rutasProductos.route("/productos/:id").get((req, res) => {
  console.log(`peticion get de ${req.params.id}`);
  findOneProduct(req.params.id, genericCallback(res));
});

rutasProductos.route("/productos/nuevo").post((req, res) => {
  console.log("peticion post");
  createProduct(req.body, genericCallback(res));
});

rutasProductos.route("/productos/:id").patch((req, res) => {
  console.log("peticion patch");
  updateProduct(req.params.id, req.body, genericCallback(res));
});
rutasProductos.route("/productos/:id").delete((req, res) => {
  console.log("peticion delete");
  deleteProduct(req.params.id, genericCallback(res));
});


export default rutasProductos;
