import express, { Request, Response } from "express";
import CreateProductUseCase from "../../../usecase/product/create/create.product.usecase";
import ProductRepository from "../../product/repository/sequelize/product.repository";
import ListProductUseCase from "../../../usecase/product/list/list.product.usecase";

export const productRoute = express.Router();

productRoute.post("/", async (req: Request, res: Response) => {
  const usecase = await new CreateProductUseCase(new ProductRepository());
  try {
    const productDto = {
        type: req.body.type,
        name: req.body.name,
        price: req.body.price
    };
    
    const output = await usecase.execute(productDto);
    res.send(output);
    
  } catch (err) {
    res.status(500).send(err);
  }
});

productRoute.get("/", async (req: Request, res: Response) => {
  const usecase = await new ListProductUseCase(new ProductRepository());
  const output = await usecase.execute({});
  
  res.send(output)
  //res.format({
  //  json: async () => res.send(output),
  //});
});
