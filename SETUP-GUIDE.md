# 🎯 STEP-BY-STEP SETUP GUIDE

## ✅ Step 1: Environment Variables (DONE!)

Your `.env.local` file is already configured with:
- ✅ Supabase URL
- ✅ Anon Key
- ✅ Service Role Key

**No action needed** - you're all set!

---

## 📝 Step 2: Run the Database Migration

### Follow these steps EXACTLY:

1. **Click this link to open Supabase SQL Editor:**
   
   👉 https://app.supabase.com/project/dqrypkhdiyqgmbsnklek/sql/new

2. **You'll see a page with a big text box that says "New query"**

3. **Scroll up in your terminal** and copy EVERYTHING from:
   - Starting at `-- Migration: 0001_initial_schema`
   - Ending at `GRANT ALL ON public.experiments TO authenticated;`
   
   (It's the big block of SQL code that the `npm run print-sql` command just showed you)

4. **Paste it into the SQL Editor text box** (delete any placeholder text first)

5. **Click the "RUN" button** (bottom right, looks like a play button ▶️)

6. **You should see:**
   - ✅ "Success. No rows returned"
   - OR some green checkmarks

---

## 🎉 Step 3: Verify It Worked

### Check your tables:

1. **Click on "Table Editor" in the left sidebar** (icon looks like a table grid)

2. **You should see 3 new tables:**
   - ✅ `waitlist`
   - ✅ `messages`
   - ✅ `experiments`

3. **Click on the `experiments` table**
   - You should see 1 row with "Ministry of Trivial Achievements" 🎉

---

## 🚀 Step 4: Test Your Website

1. **Go to:** http://localhost:3000

2. **Click "Join Waitlist" button**

3. **Enter your email** (any email)

4. **Click "Join Waitlist" in the dialog**

5. **You should see:**
   - ✅ Green success message at top
   - ✅ Dialog closes automatically

6. **Go back to Supabase Table Editor > waitlist table**
   - You should see your email there! 🎊

7. **Try submitting the SAME email again**
   - You should see: "You're already on the list!"

---

## 🆘 Troubleshooting

### If you see "Could not find the table" error:
- The SQL migration didn't run
- Go back to Step 2 and make sure you clicked RUN

### If the waitlist button doesn't work:
- Make sure the dev server is running: `npm run dev`
- Check the terminal for errors

### If emails aren't saving:
- Check the service role key is correct in `.env.local`
- Restart the dev server: Stop it (Ctrl+C) then run `npm run dev` again

---

## ✨ What You Get

After completing these steps:
- 📧 Working waitlist form
- 🔒 Database with proper security (RLS)
- 🧪 "Ministry of Trivial Achievements" experiment visible on homepage
- 🎯 Rate limiting (3 emails per minute)
- 🤖 Bot protection (honeypot)
- ✅ Duplicate email detection

---

## 🎯 Quick Command Reference

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# View the SQL migration
npm run print-sql
```

**Homepage:** http://localhost:3000  
**Supabase Dashboard:** https://app.supabase.com/project/dqrypkhdiyqgmbsnklek

---

Need help? All your keys are already in `.env.local` - you just need to run that SQL! 🚀
