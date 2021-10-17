import Express from "express";
import {
  createSale,
  deleteSale,
  findOneSale,
  queryAllSales,
  updateSale,
} from "../../controllers/ventas/controller.js";

const rutasVentas = Express.Router();

const genericCallback = (res) => (err, result) => {
  if (err) {
    res.status(500).send(err);
  } else {
    res.json(result);
  }
};

rutasVentas.route("/ventas").get((req, res) => {
  console.log("peticion get a /ventas");
  queryAllSales(genericCallback(res));
});
rutasVentas.route("/ventas/:id").get((req, res) => {
  console.log(`peticion get de ${req.params.id}`);
  findOneSale(req.params.id, genericCallback(res));
});

rutasVentas.route("/ventas/nuevo").post((req, res) => {
  console.log("peticion post");
  createSale(req.body, genericCallback(res));
});

rutasVentas.route("/ventas/:id").patch((req, res) => {
  console.log("peticion patch");
  updateSale(req.params.id, req.body, genericCallback(res));
});
rutasVentas.route("/ventas/:id").delete((req, res) => {
  console.log("peticion delete");
  deleteSale(req.params.id, genericCallback(res));
});


export default rutasVentas;
