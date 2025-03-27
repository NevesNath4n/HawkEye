"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import GitHubRepoCard from '@/components/github-repo-card';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from '@/lib/axios';
import { BookPlus } from 'lucide-react';
import { set } from 'zod';


export default function RepositoryListPage({currentTeam}) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [search, setSearch] = useState(searchParams.get('repository') || "");
    const [filteredRepositories, setFilteredRepositories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [repositories, setRepositories] = useState([]);


    const getRepositories = async () => {
        setLoading(true);
        let response = await axios.get(`/repository/${currentTeam.id}/get/`);
        setLoading(false);
        return response.data;
    }
    
    useEffect(()=>{
        getRepositories().then((data) => {
            setRepositories(data);
            setFilteredRepositories(data);
        }).catch(e=>{setLoading(false)});


    },[])


    useEffect(()=>{
        setRepositories([]);
        setFilteredRepositories([]);
        getRepositories().then(data => {
            setRepositories(data);
            setFilteredRepositories(data);
        }).catch(e=>setLoading(false));
    },[currentTeam])
   



    useEffect(() => {
        const params = new URLSearchParams(searchParams);
        if (search) {
            params.set('repository', search);
        } else {
            setFilteredRepositories(repositories);
            params.delete('repository');
        }
        setFilteredRepositories(repositories.filter((repo) => repo.name.toLowerCase().includes(search.toLowerCase())));
        router.push(`?${params.toString()}`, { scroll: false });
    }, [search, router, searchParams]);

    const loadRepositories = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }

    return (
        <div>
            <div className="mt-8">
                <Input 
                    onChange={loadRepositories} 
                    value={search} 
                    className="w-full h-12 text-lg rounded-lg" 
                    placeholder="Search Repositories" 
                />
            </div>
            <div className="mt-8 grid grid-cols-4 gap-4">
            {currentTeam === null && (
                <div className=" h-[70vh] col-span-4">
                    <Card className="h-full rounded-xl shadow-md border">
                        <CardContent className="flex flex-col justify-center items-center h-full gap-4 p-4">
                            <BookPlus className="w-10 h-10 text-muted-foreground" />
                            <p className="text-center text-xs text-muted-foreground">
                                Please select a team or create a new one to view repositories
                            </p>
                        
                        </CardContent>
                    </Card>
                </div>
            )}

            {loading && (
                <div className="col-span-4 flex h-[70vh] justify-center items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
                </div>
            )}

            {repositories.length === 0 && !loading && currentTeam !== null && (
                <div className=" h-[70vh] col-span-4">
                    <Card className="h-full rounded-xl shadow-md border">
                        <CardContent className="flex flex-col justify-center items-center h-full gap-4 p-4">
                            <BookPlus className="w-10 h-10 text-muted-foreground" />
                            <p className="text-center text-xs text-muted-foreground">
                                No repositories found
                            </p>
                        
                        </CardContent>
                    </Card>
                </div>)}

              {filteredRepositories.map((repo)=>(
                  <GitHubRepoCard
                    repository={repo}
                  />
              ))}
            </div>
        </div>
    );
}

