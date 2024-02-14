import { Router } from "express";
import cartManager from "../dao/db/cart-manager-db.js";

const router = Router();
const cart = new cartManager();

//agregar carrito
router.post("/", async (req, res) => {
  res.send(await cart.addCart());
});
//leer carrito
router.get("/", async (req, res) => {
  res.send(await cart.readCart());
});

//buscar carrito por id
router.get("/:cId", async (req, res) => {
  const cId = req.params.cId;
  res.send(await cart.getCarritoById(cId));
});

router.post("/:cId/products/:pId", async (req, res) => {
  const idCart = req.params.cId;
  const idProduct = req.params.pId;
  res.send(await cart.addToCart(idCart, idProduct));
});

export default router;
