# Gmail SMTP Setup Guide for DrukVista

This guide will help you set up email functionality using Google Gmail to receive inquiry submissions.

## Step 1: Enable 2-Factor Authentication (Required)

1. Go to [https://myaccount.google.com](https://myaccount.google.com)
2. Click **Security** in the left sidebar
3. Scroll down to **How you sign in to Google**
4. Enable **2-Step Verification** if not already enabled
5. Follow Google's prompts to verify your phone number

## Step 2: Generate an App-Specific Password

1. Go back to Google Account settings
2. Click **Security** in the left sidebar
3. Under **How you sign in to Google**, find **App passwords** (only visible if 2FA is enabled)
4. Select **Mail** and **Other (custom name)**
5. Type "DrukVista" as the app name
6. Google will generate a 16-character password
7. **Copy this password** - you'll need it in the next step

## Step 3: Add Environment Variables

### For Local Development:

1. Create/Update `.env.local` file in your project root:
   \`\`\`
   GMAIL_EMAIL=your-gmail@gmail.com
   GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx
   DRUKVISTA_EMAIL=where-inquiries-go@example.com
   \`\`\`

2. Replace:
   - `your-gmail@gmail.com` with your Gmail address
   - `xxxx xxxx xxxx xxxx` with the app password from Step 2 (keep spaces)
   - `where-inquiries-go@example.com` with the email that should receive inquiries (can be the same Gmail or different)

### For Vercel Deployment:

1. Go to your Vercel project dashboard
2. Click **Settings** → **Environment Variables**
3. Add three variables:
   - `GMAIL_EMAIL` = your Gmail address
   - `GMAIL_APP_PASSWORD` = the 16-character password (with spaces)
   - `DRUKVISTA_EMAIL` = email to receive inquiries
4. Click **Save**
5. Redeploy your project (it will auto-redeploy)

## Step 4: Test the Form

1. Run your website locally: `npm run dev`
2. Go to `/inquiry` page
3. Fill out and submit the form
4. Check your inbox (specified in `DRUKVISTA_EMAIL`) for the inquiry

**Note:** The first time you use a new app password, Gmail may ask for verification.

## Important Notes

- **App Password**: This is different from your regular Gmail password. It's specifically for applications.
- **Reply-To**: Emails sent to you will have the customer's email in the reply-to field, so you can reply directly to them.
- **From Address**: Emails will come from your Gmail address
- **Security**: Keep your app password safe! Don't commit `.env.local` to Git.

## Troubleshooting

**Not receiving emails?**
- Verify 2-Factor Authentication is enabled
- Check that you've created an app-specific password (not your regular password)
- Check your spam/junk folder
- Verify environment variables are set correctly
- Restart your dev server after updating `.env.local`

**"Invalid login" error?**
- Double-check your Gmail address spelling
- Ensure you're using the app-specific password (16 characters), not your Gmail password
- Make sure the app password includes the spaces

**Still having issues?**
- Gmail blocks some app access by default. Visit [https://myaccount.google.com/lesssecureapps](https://myaccount.google.com/security) to check security settings
- Try creating a new app password

## Support

- Google Account Help: [https://support.google.com/accounts](https://support.google.com/accounts)
- Gmail SMTP Settings: [https://support.google.com/accounts/answer/185833](https://support.google.com/accounts/answer/185833)
