"use client"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import GithubOrgCard from '@/components/github-org-card';


export default function OrganizationPage(){
    const router = useRouter();
    const searchParams = useSearchParams();
    const [search, setSearch] = useState(searchParams.get('organization') || "");
    
    useEffect(() => {
        const params = new URLSearchParams(searchParams);
        if (search) {
            params.set('organization', search);
        } else {
            params.delete('organization');
        }
        router.push(`?${params.toString()}`, { scroll: false });
    }, [search, router, searchParams]);

    const loadOrganizations = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }
    return(
        <div>
            <div className="mt-8">
                <Input 
                    onChange={loadOrganizations} 
                    value={search} 
                    className="w-full h-12 text-lg rounded-lg" 
                    placeholder="Search Organizations" 
                />
            </div>
            <div className="mt-8">
               <GithubOrgCard
                    name="next.js"
                    description="The React Framework for the Web"
                    avatarUrl="https://avatars.githubusercontent.com/u/14985020?s=200&v=4"
 
               />
            </div>
        </div>
    )
}