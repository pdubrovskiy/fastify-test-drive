import { Product } from "@prisma/client";
import { prisma } from "../../utils/prisma";
import { CreateProductInput } from "./product.schema";

export async function createProduct(
  data: CreateProductInput & { ownerId: number }
): Promise<Product> {
  return prisma.product.create({
    data,
  });
}

export function getProducts() {
  return prisma.product.findMany({
    select: {
      id: true,
      content: true,
      title: true,
      price: true,
      createdAt: true,
      updatedAt: true,
      owner: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
}
