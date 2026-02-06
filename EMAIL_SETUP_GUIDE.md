# Email Setup Guide for DrukVista

This guide will help you set up email functionality to receive inquiry submissions from your website.

## Step 1: Sign up for Resend (Free)

1. Go to [https://resend.com](https://resend.com)
2. Sign up for a free account
3. Verify your email address

**Free Tier Benefits:**
- 100 emails per day
- 3,000 emails per month
- No credit card required

## Step 2: Get Your API Key

1. Log in to your Resend dashboard
2. Go to **API Keys** in the sidebar
3. Click **Create API Key**
4. Give it a name like "DrukVista Production"
5. Copy the API key (starts with `re_`)

## Step 3: Add Environment Variables

### For Local Development:

1. Create a `.env.local` file in your project root:
   \`\`\`bash
   RESEND_API_KEY=re_your_api_key_here
   DRUKVISTA_EMAIL=your-email@example.com
   \`\`\`

2. Replace `re_your_api_key_here` with your actual Resend API key
3. Replace `your-email@example.com` with your email address

### For Vercel Deployment:

1. Go to your project on Vercel
2. Click **Settings** → **Environment Variables**
3. Add two variables:
   - `RESEND_API_KEY` = your Resend API key
   - `DRUKVISTA_EMAIL` = your email address
4. Click **Save**
5. Redeploy your project

## Step 4: Verify Domain (Optional but Recommended)

For production use, verify your domain to send emails from your own domain:

1. In Resend dashboard, go to **Domains**
2. Click **Add Domain**
3. Enter your domain (e.g., `drukvista.com`)
4. Add the DNS records provided to your domain registrar
5. Wait for verification (usually takes a few minutes)

Once verified, update the `from` field in `app/actions/send-inquiry.ts`:
\`\`\`typescript
from: 'DrukVista <inquiries@drukvista.com>', // Use your verified domain
\`\`\`

## Step 5: Test the Form

1. Run your website locally: `npm run dev`
2. Go to `/inquiry` page
3. Fill out and submit the form
4. Check your email inbox for the inquiry

## What Happens When Someone Submits an Inquiry?

1. The form data is sent securely via a server action
2. An email is formatted with all the inquiry details
3. The email is sent to your specified email address via Resend
4. The customer sees a confirmation screen
5. You can reply directly to the customer from your email (reply-to is set to their email)

## Troubleshooting

**Not receiving emails?**
- Check your spam/junk folder
- Verify your API key is correct in environment variables
- Check browser console for errors
- Make sure you restarted your development server after adding environment variables

**Getting API errors?**
- Ensure your API key starts with `re_`
- Check you haven't exceeded the free tier limits (100/day)
- Verify your environment variables are loaded correctly

## Support

If you need help:
- Resend Documentation: [https://resend.com/docs](https://resend.com/docs)
- Resend Support: support@resend.com
