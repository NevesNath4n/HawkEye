import React, { useContext } from "react"
import { SidebarMenuButton } from "./ui/sidebar"
import { SquarePlus,Plus } from "lucide-react"
import { Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger } from "./ui/dialog"
import { Tabs } from "./ui/tabs"
import { TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs"
import RepositoryForm from "./repository-form"
import { Button } from "./ui/button"
import OrganizationForm from "./organization-form"
import {z} from "zod"
import { toast } from "sonner"
import axios from "@/lib/axios"
import { TeamContext } from "@/app/dashboard/layout"

const repositorySchema = z.object({
    name: z.string().min(1, "Name is required"),
    slug: z.string().min(1, "Slug is required"),
    apiKey: z.string().min(1, "API Key is required"),
    url: z.string().url("Invalid URL"),
    source_type: z.literal("repo"),
    ignoreList: z.array(z.string()).optional(),
  });


export const useTeam = () => useContext(TeamContext)

export default function addSourceButton(){

    let {currentTeam,setCurrentTeam} = useTeam();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        console.log(data);  
        
        if(data.source_type == "repo"){
            try{
                repositorySchema.parse(data)
                delete data.source_type
                data.team_id = currentTeam.id;
                let response = await axios.post(process.env.NEXT_PUBLIC_BASE_API_URL+"/repository/create",data)
                if(response.status == 201){
                    toast.success("Repository added successfully, wait for status to be updated")
                }
            }catch(error){
                console.log(error)
                if(error instanceof z.ZodError){
                    const errorMessage = error.errors.map((error) => error.message).join("\n")
                    toast.error(errorMessage)
                }

            }
        }   
        
    
    }


    return (
        <Dialog>
            <DialogTrigger asChild>
                <SidebarMenuButton
                size="lg"
                className="w-full data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <Plus className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">Add Source</span>
                    <span className="truncate text-xs text-muted-foreground">Repository or Organization</span>
                </div>
                </SidebarMenuButton>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                <DialogTitle>Add New Source</DialogTitle>
                <DialogDescription>Add a new repository or organization as a source.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <Tabs defaultValue="repository" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="repository">Repository</TabsTrigger>
                        <TabsTrigger value="organization">Organization</TabsTrigger>
                    </TabsList>
                    <TabsContent value="repository">
                        <RepositoryForm  />
                    </TabsContent>
                    <TabsContent value="organization">
                        <OrganizationForm  />
                    </TabsContent>
                    </Tabs>
                    <DialogFooter>
                        <Button type="submit">
                            Add Source
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )


}