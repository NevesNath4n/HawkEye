import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import GitHubRepoCard from "./github-repo-card"
import RepositoryForm from "./repository-form"
import axios from "@/lib/axios"
import { toast } from "sonner"
import React from "react"
import { DialogClose } from "@radix-ui/react-dialog"
export default function  EditRepositoryDialog({children,repositoryId}) {
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    data.id = repositoryId;
    delete data.source_type;
    console.log(localStorage.getItem("token"));
    let response = await axios.put("/repository/update/"+data.id,data)
    toast.success("Repository updated successfully");
    setLoading(false);
  }


  return (
    <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit repository</DialogTitle>
            <DialogDescription>
              Make changes to your repository here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
              <RepositoryForm repositoryId={repositoryId}/>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save"}
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
