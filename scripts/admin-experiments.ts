#!/usr/bin/env tsx
/**
 * Admin CLI for managing experiments
 * Usage:
 *   npm run admin:experiments list
 *   npm run admin:experiments add
 *   npm run admin:experiments delete <id>
 */

import { createClient } from '@supabase/supabase-js';
import * as readline from 'readline';

// Load environment variables
const envPath = require('path').join(__dirname, '../.env.local');
if (require('fs').existsSync(envPath)) {
  const envContent = require('fs').readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach((line: string) => {
    const match = line.match(/^([^=:#]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      const value = match[2].trim().replace(/^["']|["']$/g, '');
      process.env[key] = value;
    }
  });
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(query: string): Promise<string> {
  return new Promise((resolve) => rl.question(query, resolve));
}

async function listExperiments() {
  console.log('\n📋 Fetching experiments...\n');
  
  const { data, error } = await supabase
    .from('experiments')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('❌ Error:', error.message);
    return;
  }
  
  if (!data || data.length === 0) {
    console.log('No experiments found.\n');
    return;
  }
  
  console.log(`Found ${data.length} experiments:\n`);
  data.forEach((exp, i) => {
    console.log(`${i + 1}. ${exp.title}`);
    console.log(`   ID: ${exp.id}`);
    console.log(`   Status: ${exp.status}`);
    console.log(`   Description: ${exp.description}`);
    if (exp.demo_url) console.log(`   Demo: ${exp.demo_url}`);
    if (exp.github_url) console.log(`   GitHub: ${exp.github_url}`);
    console.log('');
  });
}

async function addExperiment() {
  console.log('\n✨ Add New Experiment\n');
  
  const title = await question('Title: ');
  const description = await question('Description: ');
  const status = await question('Status (testing/ideating/shipped/killed): ');
  const demoUrl = await question('Demo URL (optional): ');
  const githubUrl = await question('GitHub URL (optional): ');
  const stackInput = await question('Tech stack (comma-separated, optional): ');
  
  const stack = stackInput
    ? stackInput.split(',').map((s) => s.trim()).filter(Boolean)
    : null;
  
  const experiment = {
    title,
    description,
    status,
    demo_url: demoUrl || null,
    github_url: githubUrl || null,
    stack,
  };
  
  const { data, error } = await supabase
    .from('experiments')
    .insert(experiment)
    .select()
    .single();
  
  if (error) {
    console.error('\n❌ Error:', error.message);
    return;
  }
  
  console.log('\n✅ Experiment created successfully!');
  console.log(`   ID: ${data.id}`);
  console.log(`   Title: ${data.title}\n`);
}

async function deleteExperiment(id: string) {
  if (!id) {
    console.error('❌ Please provide an experiment ID');
    process.exit(1);
  }
  
  // First, fetch the experiment to show what will be deleted
  const { data: experiment } = await supabase
    .from('experiments')
    .select('*')
    .eq('id', id)
    .single();
  
  if (!experiment) {
    console.error(`❌ Experiment with ID "${id}" not found`);
    return;
  }
  
  console.log(`\n⚠️  You are about to delete:\n`);
  console.log(`   Title: ${experiment.title}`);
  console.log(`   Status: ${experiment.status}`);
  
  const confirm = await question('\nType "yes" to confirm deletion: ');
  
  if (confirm.toLowerCase() !== 'yes') {
    console.log('\n❌ Deletion cancelled\n');
    return;
  }
  
  const { error } = await supabase
    .from('experiments')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('\n❌ Error:', error.message);
    return;
  }
  
  console.log('\n✅ Experiment deleted successfully\n');
}

async function main() {
  const command = process.argv[2];
  const arg = process.argv[3];
  
  switch (command) {
    case 'list':
      await listExperiments();
      break;
    case 'add':
      await addExperiment();
      break;
    case 'delete':
      await deleteExperiment(arg);
      break;
    default:
      console.log('\n📝 Omar Creates - Experiments Admin\n');
      console.log('Usage:');
      console.log('  npm run admin:experiments list');
      console.log('  npm run admin:experiments add');
      console.log('  npm run admin:experiments delete <id>\n');
      break;
  }
  
  rl.close();
}

main().catch((error) => {
  console.error('❌ Error:', error);
  rl.close();
  process.exit(1);
});
