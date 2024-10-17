import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { getChurches } from "@/utils/data/church/get-churches";
import { auth } from "@clerk/nextjs/server";
import DeleteButton from "./_components/church-delete-button";
import ChurchFormSettings from "./_components/church-form-settings";

export default async function Settings() {
  const church = await getChurches();

  const { userId } = auth()


  const info = church?.result?.[0]

  return (
    <div className="flex flex-col mb-[5rem] w-full p-6">
      <h1 className="text-3xl font-semibold tracking-tight">
        Church Settings
      </h1>
      <p className="leading-7 text-sm dark:text-gray-400">
        Edit your church or organization settings.
      </p>
      <ChurchFormSettings church={info} id={info.church_id} />
      <Separator className="my-6 max-w-[600px]" />
      <div className="flex justify-between items-center w-full p-4 rounded border max-w-[600px]">
        <div className="flex flex-col">
          <h1 className="text-md font-medium">Delete this site</h1>
          <p className="text-xs dark:text-gray-300 text-gray-700">Once you delete a site, there is no going back. Please be certain</p>
        </div>
        <div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="destructive">Delete this site</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete your site
                  and remove your data from our servers.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DeleteButton info={info} userId={userId!} />
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  )
}
