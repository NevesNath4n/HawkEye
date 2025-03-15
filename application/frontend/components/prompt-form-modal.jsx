"use client";
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"

const promptSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters" })
    .max(50, { message: "Title must not exceed 50 characters" }),
  description: z
    .string()
    .min(5, { message: "Description must be at least 5 characters" })
    .max(200, { message: "Description must not exceed 200 characters" }),
  content: z
    .string()
    .min(10, { message: "Prompt content must be at least 10 characters" })
    .max(5000, { message: "Prompt content must not exceed 5000 characters" }),
  isActive: z.boolean().default(true),
})

export function PromptFormModal({
  prompt,
  open,
  onOpenChange,
  onSubmit,
  title
}) {
  const [contentLength, setContentLength] = useState(prompt?.content.length || 0)

  const form = useForm({
    resolver: zodResolver(promptSchema),
    defaultValues: {
      title: prompt?.title || "",
      description: prompt?.description || "",
      content: prompt?.content || "",
      isActive: prompt?.isActive ?? true,
    },
  })

  const handleSubmit = (values) => {
    onSubmit(values)
  }

  return (
    (<Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {prompt
              ? "Edit the prompt details below. Click save when you're done."
              : "Fill in the details below to create a new prompt."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prompt Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter a title for this prompt" {...field} />
                  </FormControl>
                  <FormDescription>
                    A short, descriptive title for the prompt (e.g., "Code Style Review")
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )} />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter a brief description" {...field} />
                  </FormControl>
                  <FormDescription>A brief description of what this prompt does</FormDescription>
                  <FormMessage />
                </FormItem>
              )} />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prompt Content</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter the prompt content..."
                      className="min-h-[200px] font-mono"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e)
                        setContentLength(e.target.value.length)
                      }} />
                  </FormControl>
                  <FormDescription>
                    The actual prompt that will be sent to the AI model. You can use variables like {"{code}"},{" "}
                    {"{language}"}, or {"{repo_name}"}.
                    <div className="text-xs text-muted-foreground mt-1">{contentLength}/5000 characters</div>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )} />

            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem
                  className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Active Status</FormLabel>
                    <FormDescription>Enable or disable this prompt for code reviews</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )} />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">{prompt ? "Update Prompt" : "Create Prompt"}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>)
  );
}

