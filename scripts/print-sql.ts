import { readFileSync } from 'fs';
import { join } from 'path';

/**
 * Print SQL migration to console for easy copy-paste to Supabase UI
 * 
 * Usage:
 *   npm run print-sql
 * 
 * Then copy the output and paste it into Supabase SQL Editor
 */
function printSQL() {
  const migrationPath = join(
    process.cwd(),
    'supabase',
    'migrations',
    '0001_initial_schema.sql'
  );

  try {
    const sql = readFileSync(migrationPath, 'utf-8');
    
    console.log('\n' + '='.repeat(80));
    console.log('📋 COPY THE SQL BELOW TO SUPABASE SQL EDITOR');
    console.log('='.repeat(80) + '\n');
    console.log(sql);
    console.log('\n' + '='.repeat(80));
    console.log('✅ Copy complete! Paste this into:');
    console.log('   https://app.supabase.com/project/_/sql/new');
    console.log('='.repeat(80) + '\n');
  } catch (error) {
    console.error('❌ Error reading migration file:', error);
    process.exit(1);
  }
}

// Run the script
printSQL();
