import { createClient } from "@supabase/supabase-js";
import dotenv from 'dotenv';
import path from 'path';
const envPath = path.resolve(process.cwd(), '.env');
dotenv.config({ path: envPath });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;// const client = createClient("https://oymrpukwwwbyjhhfijeo.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im95bXJwdWt3d3dieWpoaGZpamVvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNjI5MjY2NSwiZXhwIjoyMDUxODY4NjY1fQ.hHqrP6pYs4ySy26qptsclBayoDAmDrn9fWhDMf0bW0g");
//const client = createClient("http://192.168.1.79:8000","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyAgCiAgICAicm9sZSI6ICJzZXJ2aWNlX3JvbGUiLAogICAgImlzcyI6ICJzdXBhYmFzZS1kZW1vIiwKICAgICJpYXQiOiAxNjQxNzY5MjAwLAogICAgImV4cCI6IDE3OTk1MzU2MDAKfQ.DaYlNEoUrrEn2Ig7tqibS-PHK5vgusbcbo7X36XVt4Q");

const client = createClient(supabaseUrl,supabaseServiceKey);
export default client;