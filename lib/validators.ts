import { z } from "zod";
export const registerSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email().max(190),
  password: z.string().min(10).max(100),
  shopName: z.string().min(2).max(80),
  slug: z
    .string()
    .min(3)
    .max(50)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
});
export const productSchema = z.object({
  name: z.string().min(2).max(160),
  slug: z
    .string()
    .min(2)
    .max(180)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  description: z.string().max(10000).optional(),
  sku: z.string().max(80).optional(),
  barcode: z.string().max(100).optional(),
  price: z.coerce.number().min(0),
  compareAtPrice: z.union([z.coerce.number().min(0), z.literal("")]).optional(),
  stock: z.coerce.number().int().min(0),
  status: z.enum(["DRAFT", "ACTIVE", "ARCHIVED"]),
  imageUrl: z.union([z.string().url(), z.literal("")]).optional(),
});
