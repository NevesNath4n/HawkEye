"use client";
import { GalleryVerticalEnd } from "lucide-react"
import { LoginForm } from "@/components/login-form"
import { supabase } from "@/lib/supabase/client";
import { toast } from "sonner"
import { useRouter } from 'next/navigation';
import { useEffect } from "react";


export default function LoginPage() {
  const router = useRouter();


  useEffect(()=>{
    const expiredDate = localStorage.getItem("expires_at");
    const now = new Date().getTime();

    if (!expiredDate) {
      return;
    }

    let expiresAt = Number(expiredDate)*1000;
    
    console.log(now);
    if (now < expiresAt) {
      console.log("Redirecting to dashboard");
      router.push("/dashboard");
    }
    
    

  },[])

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.target;
    console.log(form.email.value);
    console.log(form.password.value);
    let {data,error} = await supabase.auth.signInWithPassword({
      email: form.email.value,
      password: form.password.value
    });

    if(error){
      console.log(error);
      toast.error(error.message);
    }
    console.log(data);
    localStorage.setItem("token", data.session.access_token);
    localStorage.setItem("refresh_token", data.session.refresh_token);
    localStorage.setItem("expires_at", data.session.expires_at);
    router.push("/dashboard");
    
  }
  
  
  
  return (
    (<div
      className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div
            className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <GalleryVerticalEnd className="size-4" />
          </div>
          Acme Inc.
        </a>
        <LoginForm onSubmit={onSubmit} />
      </div>
    </div>)
  );
}
