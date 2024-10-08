import { z } from "zod";

export const churchSchema = z.object({
  userId: z.string(),
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
})

export const getChurchSchema = z.object({
  id: z.string(),
  church_id: z.string(),
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
})