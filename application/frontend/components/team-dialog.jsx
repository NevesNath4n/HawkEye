import React, { useEffect } from "react";
import { Dialog, DialogHeader,DialogContent, DialogDescription, DialogTrigger, DialogFooter } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react";
import { Button } from "@/components/ui/button"
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { Delete, Plus,Trash2 } from "lucide-react";
import axios from "@/lib/axios";
import { Badge } from "@/components/ui/badge"
import TeamSchema from "../app/dashboard/schemas/TeamSchema";
import { toast } from "sonner";

export function TeamDialog({title,description,open,buttonLabel, onOpenChange,currentTeam}) {
    const [newMemberRole, setNewMemberRole] = useState("member")
    const [newMemberEmail, setNewMemberEmail] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [formItems,setFormItems] = useState({
        name:"",
        description:"",
        members:[]
    })

    useEffect(()=>{
      console.log(currentTeam)
      if(currentTeam == undefined || currentTeam == null){
        return
      }

      let fetchTeam = async () => {
        let response = await axios.get("/team/get/"+currentTeam.id)
        if(response.status == 200){
          let newFormItems = response.data;
          newFormItems.team_member = newFormItems.team_member.map(member => ({id:member.profiles.id,email:member.profiles.email,role:member.role}));
          setFormItems({name:newFormItems.name,description:newFormItems.description,members:newFormItems.team_member})
        }
        
      }
      console.log(1);
      console.log("batata");
      fetchTeam()
    },[currentTeam])



    
    const handleSubmit =  async (e) => {
        e.preventDefault();
        setIsLoading(true)
        let result = TeamSchema.safeParse(formItems);
        if(!result.success){
          let errors = result.error.issues.map(issue => issue.path.join(".")+": "+issue.message);
          for(let error of errors){
            toast.error(error)
          }
          setIsLoading(false)

          return
        }
  
        let response = await axios.post(process.env.NEXT_PUBLIC_BASE_API_URL+"/team/create",formItems,{headers:{"Authorization":`Bearer ${localStorage.getItem("token")}`}})
        if(response.status == 201){
          toast.success("Team created successfully")
          setIsLoading(false)
          onOpenChange(false)
        }
        
        setFormItems({name:"",description:"",members:{}})
    }

    const handleUpdate = async (e) => {
      try{
        e.preventDefault();
        setIsLoading(true)
        let result = TeamSchema.safeParse(formItems);
        if(!result.success){
          let errors = result.error.issues.map(issue => issue.path.join(".")+": "+issue.message);
          for(let error of errors){
            toast.error(error)
          }
          setIsLoading(false)

          return
        }
        
        let response = await axios.put(process.env.NEXT_PUBLIC_BASE_API_URL+"/team/update/"+currentTeam.id,formItems,{headers:{"Authorization":`Bearer ${localStorage.getItem("token")}`}})
        if(response.status == 200){
          toast.success("Team updated successfully")
          setIsLoading(false)
          onOpenChange(false)
        }
      }catch(e){
        setIsLoading(false)
        if(e.response.status == 403){
          toast.error("You are not allowed to perform this task")
        }
      }

    }

    const addMember = (e) => {
        e.preventDefault();
        if(newMemberEmail == ""){
          return
        }
        setFormItems({...formItems,members:[...formItems.members,{email:newMemberEmail,role:newMemberRole}]})
        setNewMemberEmail("")
        setNewMemberRole("member")  
    }

    const removeMember = (email) => {
      setFormItems((prevState) => ({
          ...prevState,
          members: prevState.members.filter((member) => member.email !== email)
      }));
    };
    
    return(
    
      <Dialog open={open} onOpenChange={onOpenChange}> 
        <DialogContent  className="max-w-2xl">
          <DialogHeader>{title}</DialogHeader>
          <DialogDescription>{description}</DialogDescription>
          <form onSubmit={currentTeam == undefined || currentTeam == null ? handleSubmit : handleUpdate}>
            <div className="flex-1  p-6">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="teamName" className="text-white">
                    Team Name
                  </Label>
                  <Input
                    id="teamName"
                    name="name"
                    value={formItems.name}
                    onChange={(e) => setFormItems({ ...formItems, name: e.target.value })}
                    placeholder="Enter team name"
                    className="border-gray-800 bg-black text-white placeholder:text-gray-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="teamDescription" className="text-white">
                    Team Description
                  </Label>
                  <Textarea
                    id="teamDescription"
                    name="description"
                    value={formItems.description}
                    onChange={(e) => setFormItems({ ...formItems, description: e.target.value })}
                    placeholder="What does your team do?"
                    className="min-h-[120px] border-gray-800 bg-black text-white placeholder:text-gray-500"
                  />
                </div>

                <div className="space-y-4">
                  <div>
                    <h2 className="text-lg font-medium text-white">Team Members</h2>
                    <p className="text-sm text-gray-400">Add people to your team and assign their roles.</p>
                  </div>

                  <div className="flex gap-3">
                    <Input
                      name="email"
                      value={newMemberEmail}
                      onChange={(e) => setNewMemberEmail(e.target.value)}
                      placeholder="Email address"
                      className="flex-1 border-gray-800 bg-black text-white placeholder:text-gray-500"
                    />
                    <Select value={newMemberRole} onValueChange={setNewMemberRole}>
                      <SelectTrigger className="w-[130px] border-gray-800 bg-black text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="border-gray-800 bg-black text-white">
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="member">Member</SelectItem>
                        <SelectItem value="viewer">Viewer</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button onClick={addMember} variant="outline" className="w-[100px] border-gray-800 bg-black text-white hover:bg-gray-900">
                      Add
                    </Button>
                  </div>
                  {formItems.members.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="text-sm font-medium text-gray-400">Current Members</h3>
                      <div className="space-y-2">
                        {formItems.members.map((member) => (
                          <div key={member.email} className="flex items-center justify-between rounded-md border border-gray-800 bg-gray-900 p-3">
                            <div className="flex items-center space-x-3">
                              <span className="text-sm text-white">{member.email}</span>
                              <Badge variant="outline" className="text-xs">
                                {member.role}
                              </Badge>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeMember(member.email)}
                              className="h-8 w-8 text-gray-400 hover:text-white"
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Remove member</span>
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button disabled={isLoading} type="submit">{buttonLabel}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
        
      </Dialog>

    )


}