"use client"
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from '@/components/ui/textarea';
import { updateChurch } from '@/utils/actions/update-church';
import { updateChurchSchema } from '@/utils/types';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from 'sonner';
import { z } from "zod";
import { useRouter } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export default function ChurchFormSettings({ church, id }: { church: z.infer<typeof updateChurchSchema>, id: string }) {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(updateChurchSchema),
    defaultValues: {
      org_name: church?.org_name || "",
      org_site: church?.org_site || "",
      org_email: church?.org_email || "",
      org_logo: church?.org_logo || "",
      org_description: church?.org_description || "",
      org_address: church?.org_address || "",
      org_city: church?.org_city || "",
      org_state: church?.org_state || "",
      org_zip: church?.org_zip || "",
      org_country: church?.org_country || "",
      org_phone: church?.org_phone || "",
    }
  });

  async function onSubmit(data: z.infer<typeof updateChurchSchema>) {

    const result = {
      church_id: id,
      org_name: data.org_name,
      org_site: data.org_site,
      org_email: data.org_email,
      org_logo: data.org_logo,
      org_description: data.org_description,
      org_address: data.org_address,
      org_city: data.org_city,
      org_state: data.org_state,
      org_zip: data.org_zip,
      org_country: data.org_country,
      org_phone: data.org_phone,
    }
    try {
      const response = await updateChurch(result);

      toast.success("Your church has been updated.");
      router.push(`/dashboard/${id}`)
      return response;
    } catch (error) {
      toast.error("Failed to update church.");
      return error;
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-[600px] space-y-3 mt-[1rem]">
        <FormField
          control={form.control}
          name="org_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Organization Name</FormLabel>
              <FormControl>
                <Input {...field} defaultValue={church?.org_name} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="org_site"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Site URL</FormLabel>
              <FormControl>
                <Input {...field} defaultValue={church?.org_site} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="org_logo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Logo URL</FormLabel>
              <FormControl>
                <Input {...field} defaultValue={church?.org_logo} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2 w-full">
          <FormField
            control={form.control}
            name="org_email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} defaultValue={church?.org_email} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="org_phone"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input {...field} defaultValue={church?.org_phone} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="org_description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} defaultValue={church?.org_description!} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="org_address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input {...field} defaultValue={church?.org_address} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2 w-full">
          <FormField
            control={form.control}
            name="org_city"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input {...field} defaultValue={church?.org_city} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="org_state"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>State</FormLabel>
                <FormControl>
                  <Input {...field} defaultValue={church?.org_state} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-2 w-full">
          <FormField
            control={form.control}
            name="org_zip"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>ZIP Code</FormLabel>
                <FormControl>
                  <Input {...field} defaultValue={church?.org_zip} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="org_country"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input {...field} defaultValue={church?.org_country} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
