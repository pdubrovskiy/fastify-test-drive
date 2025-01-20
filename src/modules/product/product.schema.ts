import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const productInput = {
  title: z.string(),
  price: z.number(),
  content: z.string().optional(),
};

const productGenerated = {
  id: z.number(),
  createdAt: z.date(),
  updatedAt: z.string(),
};

const createProductSchema = z.object({ ...productInput });
const productResponseSchema = z.object({
  ...productInput,
  ...productGenerated,
});

const productsResponseSchema = z.array(productResponseSchema);

export type CreateProductInput = z.infer<typeof productResponseSchema>;

export const { schemas: productSchemas, $ref } = buildJsonSchemas(
  {
    createProductSchema,
    productResponseSchema,
    productsResponseSchema,
  },
  {
    $id: "product",
  }
);
