# 🇪🇬 APEX Theme - Egyptian Payment System Setup Guide

## Overview

This payment system allows Egyptian customers to purchase the APEX theme using local payment methods:
- **Vodafone Cash**
- **InstaPay**
- **Telda**

The system includes:
1. ✅ Beautiful checkout page with payment instructions
2. ✅ Screenshot upload for payment verification
3. ✅ Admin dashboard to approve/reject orders
4. ✅ Automatic email with download link on approval
5. ✅ **Watermarking** - Customer email embedded in theme files
6. ✅ **Expiring links** - 48 hours, max 3 downloads

---

## 🚀 Setup Steps

### Step 1: Configure Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.local.example .env.local
   ```

2. Edit `.env.local` with your actual values:

   ```env
   # Supabase (get from your Supabase project settings)
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

   # Resend (get from resend.com dashboard)
   RESEND_API_KEY=re_xxxxxxxxxxxx

   # Vercel Blob (get from Vercel dashboard > Storage > Blob)
   BLOB_READ_WRITE_TOKEN=vercel_blob_xxxxxxxxxxxx

   # Admin password (choose a secure password)
   ADMIN_PASSWORD=YourSecurePassword123!

   # Your website URL
   NEXT_PUBLIC_APP_URL=https://yourdomain.com

   # Your wallet numbers (customers will send money here)
   NEXT_PUBLIC_VODAFONE_CASH_NUMBER=01XXXXXXXXX
   NEXT_PUBLIC_INSTAPAY_NUMBER=01XXXXXXXXX
   NEXT_PUBLIC_TELDA_NUMBER=01XXXXXXXXX

   # URL to your original theme ZIP file (upload first, then put URL here)
   ORIGINAL_THEME_URL=https://your-blob-url/apex-theme.zip
   ```

---

### Step 2: Set Up Supabase Database

1. Go to your Supabase project
2. Click **SQL Editor**
3. Open the file `supabase-schema.sql` in this project
4. Copy the entire contents and run it in SQL Editor
5. This creates the `orders` table with all necessary columns

---

### Step 3: Configure Resend Email

1. Go to [resend.com](https://resend.com)
2. Add and verify your domain (or use resend's test domain)
3. Get your API key
4. Update the email sender in `src/lib/email.ts`:
   ```typescript
   from: 'APEX Theme <noreply@yourdomain.com>',
   ```

---

### Step 4: Set Up Vercel Blob Storage

1. Go to your Vercel dashboard
2. Click **Storage** → **Create Database** → **Blob**
3. Copy the `BLOB_READ_WRITE_TOKEN` to your `.env.local`
4. **Upload your theme ZIP file** to Vercel Blob:
   - You can do this via the Vercel dashboard or programmatically
   - Get the URL and add it to `ORIGINAL_THEME_URL` in `.env.local`

---

### Step 5: Update Wallet Numbers

Edit `.env.local` and change these to your real wallet numbers:

```env
NEXT_PUBLIC_VODAFONE_CASH_NUMBER=010XXXXXXXX
NEXT_PUBLIC_INSTAPAY_NUMBER=010XXXXXXXX
NEXT_PUBLIC_TELDA_NUMBER=010XXXXXXXX
```

---

## 📍 How It Works

### Customer Flow:
1. Customer clicks **"Get APEX Now"** on homepage
2. Selects payment method (Vodafone Cash, InstaPay, or Telda)
3. Sees your wallet number to send money to
4. Makes payment in their wallet app
5. Takes screenshot of successful transaction
6. Uploads screenshot + enters their details
7. Submits order → Sees success message

### Admin Flow:
1. Go to `/admin`
2. Enter your admin password
3. See all pending orders with screenshots
4. Click on an order to view details
5. Verify the screenshot shows real payment
6. Click **Approve** → Customer gets email with download link
7. Or click **Reject** if payment looks fake

### Watermarking:
When you approve an order, the system:
1. Takes your original theme ZIP
2. Adds a LICENSE.txt with customer's email, name, phone
3. Injects watermark comments into theme.js, theme.css, theme.liquid
4. Generates a unique watermarked ZIP
5. Sends this watermarked version to the customer

If someone shares the theme online, you can trace it back to them!

---

## 🔗 Important URLs

| Page | URL |
|------|-----|
| Homepage | `/` |
| Checkout | `/checkout` |
| Admin Dashboard | `/admin` |
| Download (auto) | `/api/download?token=xxx` |

---

## 🔒 Security Features

1. **Expiring Download Links**
   - Links expire after 48 hours
   - Maximum 3 downloads per purchase

2. **Watermarking**
   - Customer info embedded in theme files
   - Traceable if illegally shared

3. **Admin Authentication**
   - Password-protected dashboard
   - Session-based login

---

## 🧪 Testing Locally

1. Set up all environment variables
2. Run `npm run dev`
3. Go to `http://localhost:3000/checkout` to test the flow
4. Go to `http://localhost:3000/admin` to test the dashboard

---

## 📧 Email Template

The download email includes:
- Customer's name
- Download button
- Expiry date and download limit info
- Installation instructions
- Beautiful HTML design matching APEX branding

---

## 🚨 Important Notes

1. **Always verify screenshots carefully** - Make sure the transaction amount and date are correct
2. **Keep your admin password secure** - Change it regularly
3. **Monitor for suspicious orders** - Multiple orders with same phone but different emails might be fraud
4. **Back up your original theme** - Keep a clean copy that's not watermarked

---

## 📞 Support

If you have issues:
1. Check browser console for errors
2. Check Vercel logs for API errors
3. Verify all environment variables are set correctly
4. Make sure Supabase schema was created properly

---

Happy selling! 🎉🇪🇬
