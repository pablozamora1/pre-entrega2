import { Router } from "express";
import ProductManager from "../dao/fs/productManager.js";

const product = new ProductManager();
const router = Router();

router.get("/", async (req, res) => {
  try {
    const allProducts = await product.getProducts();
    res.render("home", { products: allProducts });
  } catch (error) {
    console.error("Error al obtener productos", error);
    res.status(500).json({
      error: "Error interno del servidor",
    });
  }
});

router.get("/realtimeproducts", async (req, res) => {
  try {
    res.render("realtimeproducts");
  } catch (error) {
    res.status(500).json({
      error: "Error interno del servidor",
    });
  }
});

export default router;
