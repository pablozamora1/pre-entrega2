import productModel from "../models/product.model.js";

class ProductManager {
  async addProduct({
    title,
    description,
    price,
    img,
    code,
    stock,
    category,
    thumbnails: thumbnails,
  }) {
    try {
      if (!title || !description || !price || !code || !stock || !category) {
        console.log("Todos los campos son obligatorios");
        return;
      }

      //Acá tenemos que cambiar la validacion:
      const existeProducto = await productModel.findOne({ code: code });

      if (existeProducto) {
        console.log("El código debe ser único");
        return;
      }

      const newProduct = new productModel({
        title,
        description,
        price,
        img,
        code,
        stock,
        category,
        status: true,
        thumbnails: thumbnails || [],
      });

      await newProduct.save();
    } catch (error) {
      console.log("Error al agregar producto", error);
      throw error;
    }
  }

  async getProducts() {
    try {
      const productos = await productModel.find();
      return productos;
    } catch (error) {
      console.log("Error al obtener los productos", error);
    }
  }

  async getProductById(id) {
    try {
      const producto = await productModel.findById(id);

      if (!producto) {
        console.log("Producto no encontrado");
        return null;
      }

      console.log("Producto encontrado!");
      return producto;
    } catch (error) {
      console.log("Error al traer un producto por id");
    }
  }

  async updateProduct(id, productoActualizado) {
    try {
      const updateado = await productModel.findByIdAndUpdate(
        id,
        productoActualizado
      );

      if (!updateado) {
        console.log("No se encuentra el producto");
        return null;
      }

      console.log("Producto actualizado!");
      return updateado;
    } catch (error) {
      console.log("Error al actualizar el producto", error);
    }
  }

  async deleteProduct(id) {
    try {
      const deleteado = await productModel.findByIdAndDelete(id);

      if (!deleteado) {
        console.log(
          "No se encuentra el producto a eliminar, intente nuevamente"
        );
        return null;
      }

      console.log("Producto eliminado correctamente!");
    } catch (error) {
      console.log("Error al eliminar el producto", error);
      throw error;
    }
  }
}

export default ProductManager;
