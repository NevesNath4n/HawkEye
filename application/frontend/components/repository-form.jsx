import React from "react"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import MultiSelectTags from "./multi-select-tag"
import { useEffect,useState } from "react"
import axios from "@/lib/axios";
import { useRouter } from "next/navigation"
export default function RepositoryForm({ onSubmit,repositoryId}) {
    
    const [formItems,setFormItems] = useState({
        name:"",
        slug:"",
        apiKey:"",
        url:"",
        sourceType:"repo",
        ignore:[]
    })

    async function loadFormItems(repositoryId){
      
      const response = await axios.get(`/repository/get/${repositoryId}`)
      if(response.status == 200){
        let formItems = response.data;
        formItems.ignore = formItems.ignore.split(",")
        setFormItems(formItems)
      }


    }

    
    useEffect(()=>{
      if(repositoryId){
        loadFormItems(repositoryId)
      }
    },[])

    const handleFormInputChange = (e) => {
        const { name, value } = e.target;
        setFormItems((prevState) => ({
          ...prevState,
          [name]: value,
        }));
    };


  const handleMultiSelectChange = (selectedItems) => {
    setFormItems((prevState) => ({
      ...prevState,
      ignore: selectedItems.map((item) => item.value),
    }));
  };



    return (
        <div className="space-y-4">
          <div className="grid w-full gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name"  onChange={handleFormInputChange} value={formItems.name} type="text" placeholder="Enter name" />
          </div>
          <div className="grid w-full gap-2">
            <Label htmlFor="slug">Slug</Label>
            <Input id="slug" type="text" name="slug" value={formItems.slug} onChange={handleFormInputChange} placeholder="Enter slug" />
          </div>
          <div className="grid w-full gap-2">
            <Label htmlFor="apiKey">API Key</Label>
            <Input id="apiKey" type="password" name="apiKey" value={formItems.apiKey} onChange={handleFormInputChange} placeholder="Enter API Key" />
          </div>
          <div className="grid w-full gap-2">
            <Label htmlFor="url">URL</Label>
            <Input id="url" type="text" name="url" placeholder="Enter URL" value={formItems.url} onChange={handleFormInputChange} />
          </div>
          <div className="grid w-full gap-2">
            <Label htmlFor="ignore-list">Ignore List</Label>
            <MultiSelectTags items={[]} name="ignore" onChange={handleMultiSelectChange} selectedItems={formItems.ignore.map((item) => ({ value: item, label: item }))} />
          </div>
          <Input type="hidden" name="source_type" value="repo"></Input>
          <Input type="hidden" name="ignore" value={formItems.ignore.join(",")}></Input>
        </div>

    )
}