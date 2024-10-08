"use client"
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  churchName: z.string(),
  churchSite: z.string(),
})


export default function Dashboard() {
  const queryParams = useSearchParams();
  const search = queryParams.get('search') || '';


  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      churchName: "",
      churchSite: "",
    }
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {


      form.reset()
      return
    } catch (error) {
      return error
    }
  }

  return (
    <main className="flex flex-col gap-2 lg:gap-2 min-h-[90vh] w-full">
      {search !== "create" ? <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-2xl font-bold tracking-tight">
            You have no donation page
          </h1>
          <p className="text-sm text-muted-foreground mb-3">
            To create a donation page, click the button below.
          </p>
          <Link href="/dashboard?search=create">
            <Button>Create Donation Page</Button>
          </Link>
        </div>
      </div> :
        <div className="flex flex-col mb-[5rem] w-full p-4">
          <h1 className=" text-3xl font-semibold tracking-tight">
            Create a donation page
          </h1>
          <p className="leading-7 text-sm dark:text-gray-400">
            Create a donation page for your church or organization.
          </p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-[600px] space-y-3 mt-[1rem]">
              <FormField
                control={form.control}
                name="churchName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Organization Name</FormLabel>
                    <FormControl>
                      <Input  {...field} placeholder='Grace Bible Fellowship Church' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="churchName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Site URL</FormLabel>
                    <FormControl>
                      <Input  {...field} placeholder='church.goshenpay.com' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit">Submit</Button>
            </form>
          </Form>

        </div>}
    </main>
  )
}
