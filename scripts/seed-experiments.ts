#!/usr/bin/env tsx
import { createClient } from '@supabase/supabase-js';
import * as path from 'path';
import * as fs from 'fs';

// Manually load env vars from .env.local
const envPath = path.join(__dirname, '../.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach((line: string) => {
    const match = line.match(/^([^=:#]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      const value = match[2].trim().replace(/^["']|["']$/g, '');
      if (!process.env[key]) {
        process.env[key] = value;
      }
    }
  });
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing environment variables:');
  console.error('  NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✓' : '✗');
  console.error('  SUPABASE_SERVICE_ROLE_KEY:', supabaseKey ? '✓' : '✗');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seedExperiments() {
  console.log('Checking for existing experiments...');
  
  const { data: existing, error: fetchError } = await supabase
    .from('experiments')
    .select('id');
  
  if (fetchError) {
    console.error('Error fetching experiments:', fetchError);
    process.exit(1);
  }
  
  if (existing && existing.length > 0) {
    console.log(`✅ Found ${existing.length} existing experiments. Skipping seed.`);
    return;
  }
  
  console.log('Seeding experiments...');
  
  const experiments = [
    {
      title: 'Ministry of Trivial Achievements',
      description: 'Issue absurd certificates for tiny wins.',
      status: 'testing',
      demo_url: null,
      github_url: 'https://github.com/eltahawyomar001-eng/Omar-Creates',
      stack: ['Next.js', 'TypeScript', 'Supabase'],
    },
    {
      title: 'Micro Feedback Widget',
      description: 'One-click feedback for any website.',
      status: 'ideating',
      stack: ['React', 'WebComponents'],
    },
    {
      title: 'Quick Poll Creator',
      description: 'Create and share polls in seconds.',
      status: 'shipped',
      demo_url: 'https://polls.omarcreates.com',
      stack: ['Next.js', 'Redis'],
    },
  ];
  
  const { data, error } = await supabase
    .from('experiments')
    .insert(experiments)
    .select();
  
  if (error) {
    console.error('Error seeding experiments:', error);
    process.exit(1);
  }
  
  console.log(`✅ Seeded ${data?.length} experiments`);
  data?.forEach((exp) => {
    console.log(`  - ${exp.title} (${exp.status})`);
  });
}

seedExperiments().catch(console.error);
