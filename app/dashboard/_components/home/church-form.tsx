"use client"
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from '@/components/ui/textarea';
import { createChurch } from '@/utils/actions/create-church';
import { createChurchSchema } from '@/utils/types';
import { zodResolver } from "@hookform/resolvers/zod";
import { revalidatePath } from 'next/cache';
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from 'sonner';
import { z } from "zod";

export default function ChurchForm({ userId }: { userId: string }) {
  const router = useRouter();
  const form = useForm<z.infer<typeof createChurchSchema>>({
    resolver: zodResolver(createChurchSchema),
    defaultValues: {
      org_name: "Tsega Bible Fellowship Church",
      org_site: "https://www.tsegabiblechurch.com",
      org_email: "tsegabiblechurch@gmail.com",
      org_phone: "(289) 946-1487",
      org_address: "65 Sunrise Ave.",
      org_city: "North York",
      org_state: "ON",
      org_zip: "M4A 1A9",
      org_country: "CA",
      org_description: "Grow in grace. Grow in knowledge.",
      org_logo: "https://www.tsegabiblechurch.com/_next/image?url=https%3A%2F%2Fvngdsgitgimaumyqaatn.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fimages%2FTBF.webp&w=128&q=75",
      userId: userId,
    }
  });
  async function onSubmit(data: z.infer<typeof createChurchSchema>) {
    try {
      const response = await createChurch(data);

      toast("Your church has been created.");
      revalidatePath("/dashboard");
      router.replace("/dashboard");

      return response;
    } catch (error) {
      return error;
    }
  }

  return (
    <div className="flex flex-col mb-[5rem] w-full p-4">
      <h1 className="text-3xl font-semibold tracking-tight">
        Create a donation page
      </h1>
      <p className="leading-7 text-sm dark:text-gray-400">
        Create a donation page for your church or organization.
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-[600px] space-y-3 mt-[1rem]">
          <FormField
            control={form.control}
            name="org_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Organization Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder='Grace Bible Fellowship Church' />
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
                  <Input {...field} placeholder='https://church.goshenpay.com' />
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
                  <Input {...field} placeholder='https://example.com/logo.png' />
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
                    <Input {...field} placeholder='info@goshenpay.com' />
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
                    <Input {...field} placeholder='(123) 456-7890' />
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
                  <Textarea {...field} placeholder='A brief description of your organization.' />
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
                  <Input {...field} placeholder='123 Church St.' />
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
                    <Input {...field} placeholder='Goshen' />
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
                    <Input {...field} placeholder='NY' />
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
                    <Input {...field} placeholder='12345' />
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
                    <Input {...field} placeholder='USA' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  )
}
