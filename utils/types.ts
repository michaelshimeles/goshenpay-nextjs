import { z } from "zod";

export const createChurchSchema = z.object({
  org_name: z.string(),
  org_site: z.string(),
  org_email: z.string(),
  org_phone: z.string(),
  org_address: z.string(),
  org_city: z.string(),
  org_state: z.string(),
  org_zip: z.string(),
  org_country: z.string(),
  org_description: z.string(),
  org_logo: z.string(),
  userId: z.string(),
});

export const updateChurchSchema = z.object({
  church_id: z.string().optional(),
  org_name: z.string(),
  org_site: z.string(),
  org_email: z.string(),
  org_logo: z.string(),
  org_description: z.string(),
  org_address: z.string(),
  org_city: z.string(),
  org_state: z.string(),
  org_zip: z.string(),
  org_country: z.string(),
  org_phone: z.string(),
});
