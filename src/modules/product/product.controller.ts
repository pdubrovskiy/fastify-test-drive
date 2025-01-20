import { FastifyRequest } from "fastify";
import { CreateProductInput } from "./product.schema";
import { createProduct, getProducts } from "./product.service";
import { Product } from "@prisma/client";

export async function createProductHandler(
  request: FastifyRequest<{ Body: CreateProductInput }>
): Promise<Product> {
  return createProduct({
    ...request.body,
    ownerId: request.user.id,
  });
}

export async function getProductsHandler(): Promise<Array<Partial<Product>>> {
  return getProducts();
}
