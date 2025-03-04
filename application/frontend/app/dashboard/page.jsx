"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import OrganizationPage from "./organization-page"
import RepositoryListPage from "./repositories-page"
import { TeamContext } from "./layout"
import { useContext } from "react"




export const useTeam = () => useContext(TeamContext)

export default function Page(){

    const {currentTeam, setCurrentTeam} = useTeam()
    
    return(
        <div>
            <Tabs defaultValue="account" className="w-full">
            <TabsList>
                <TabsTrigger value="repositories">Repositories</TabsTrigger>
                <TabsTrigger value="organizations">Organizations</TabsTrigger>
            </TabsList>
            <TabsContent value="repositories">
                <RepositoryListPage currentTeam={currentTeam}/>  
            </TabsContent>
            <TabsContent value="organizations">
                <OrganizationPage/>
            </TabsContent>
            </Tabs>        
        </div>
    )   
}