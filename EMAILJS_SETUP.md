# EmailJS Setup Guide

This guide will help you set up EmailJS to enable email functionality in your travel booking form.

## Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com](https://www.emailjs.com)
2. Sign up for a free account
3. Verify your email address

## Step 2: Create Email Service

1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your chosen provider
5. Note down your **Service ID**

## Step 3: Create Email Templates

### Admin Notification Template

1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use this template content:

**Subject:** New Travel Booking Request

**Content:**
```
New travel booking request received!

Customer Details:
- Name: {{user_name}}
- Email: {{user_email}}
- Phone: {{user_phone}}

Travel Details:
- Destination: {{destination}}
- Travel Date: {{travel_date}}
- Number of Guests: {{number_of_guests}}
- Special Requests: {{special_requests}}

Please contact the customer to confirm their booking.
```

4. Save the template and note down the **Template ID**

### User Confirmation Template

1. Create another template for user confirmation
2. Use this template content:

**Subject:** Travel Booking Confirmation

**Content:**
```
Dear {{user_name}},

Thank you for booking with us! We have received your travel request and will contact you soon.

Booking Details:
- Destination: {{destination}}
- Travel Date: {{travel_date}}
- Number of Guests: {{number_of_guests}}
- Special Requests: {{special_requests}}

Best regards,
Travel Team
```

3. Save this template and note down its **Template ID**

## Step 4: Get Public Key

1. Go to "Account" in your EmailJS dashboard
2. Find your **Public Key** (also called User ID)

## Step 5: Update the Code

In `src/components/layouts/Form.js`, replace these placeholder values:

```javascript
// Line 68-71
const serviceId = 'YOUR_SERVICE_ID';           // Replace with your Service ID
const adminTemplateId = 'YOUR_ADMIN_TEMPLATE_ID';  // Replace with admin notification template ID
const userTemplateId = 'YOUR_USER_TEMPLATE_ID';    // Replace with user confirmation template ID
const publicKey = 'YOUR_PUBLIC_KEY';           // Replace with your Public Key

// Line 110
admin_email: 'admin@yourtravelagency.com', // Replace with actual admin email
```

## Step 6: Test the Form

1. Start your development server: `npm run dev`
2. Navigate to the form page
3. Fill out and submit the form
4. Check both your admin email and the user's email for the notifications

## Troubleshooting

- **Emails not sending**: Check your EmailJS service configuration
- **Template variables not working**: Ensure variable names match exactly
- **CORS errors**: Make sure your domain is added to EmailJS allowed origins
- **Rate limits**: Free accounts have sending limits

## Security Notes

- Never expose your private keys in client-side code
- Use environment variables for production
- Consider implementing server-side email sending for production use

## Free Account Limits

- 200 emails per month
- 2 email services
- 2 email templates

For higher limits, consider upgrading to a paid plan.
