import React from 'react';
import { Tabs,TabsContent,TabsList,TabsTrigger} from '@/components/ui/tabs';
import ApiTokensPage from './api-tokens/api-tokens-page';
import PromptSettingsPage from './prompt-settings/prompt-settings-page';

export default function Page(){
    return(
        <Tabs>
            <TabsList>
                <TabsTrigger value="tokens">Api tokens</TabsTrigger>
                <TabsTrigger value="prompts">Prompts</TabsTrigger>
            </TabsList>
            <TabsContent value="tokens">
                <ApiTokensPage/>
            </TabsContent>
            <TabsContent value="prompts">
                <PromptSettingsPage/>
            </TabsContent>    
        </Tabs>
    )
}