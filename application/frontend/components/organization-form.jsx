import React from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";



export default function OrganizationForm() {
    return (
        <div className="space-y-4">
            <div className="grid w-full max-w-sm items-center gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" type="text" />
            </div>
            <div className="grid w-full max-w-sm items-center gap-2">
                <Label htmlFor="key">Slug</Label>
                <Input id="key" name="slug" type="text" />
            </div>
            <div className="grid w-full max-w-sm items-center gap-2">
                <Label htmlFor="apiKey">Api Key</Label>
                <Input id="apiKey" name="apiKey" type="password" />
            </div>
            <div className="grid w-full max-w-sm items-center gap-2">
                <Label htmlFor="url">URL</Label>
                <Input id="url" name="url" type="text" />
            </div>
            <Input type="hidden" name="source_type" value="org"></Input>
        </div>
    )
}