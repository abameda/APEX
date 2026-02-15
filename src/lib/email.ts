import { Resend } from 'resend';

const getResend = () => new Resend(process.env.RESEND_API_KEY);

interface SendDownloadEmailParams {
  to: string;
  customerName: string;
  downloadUrl: string;
  expiresAt: Date;
}

export async function sendDownloadEmail({
  to,
  customerName,
  downloadUrl,
  expiresAt,
}: SendDownloadEmailParams) {
  const formattedExpiry = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'full',
    timeStyle: 'short',
  }).format(expiresAt);

  const { data, error } = await getResend().emails.send({
    from: 'APEX Theme <onboarding@resend.dev>', // Using Resend test domain for reliable delivery
    replyTo: 'abdelhmeed.mohsen@gmail.com', // Replies go to your Gmail
    to: [to],
    subject: '🎉 Your APEX Theme is Ready!',
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0A0A0B;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    <!-- Header -->
    <div style="text-align: center; margin-bottom: 40px;">
      <h1 style="color: #D4AF37; font-size: 36px; margin: 0; letter-spacing: 3px;">APEX</h1>
      <p style="color: #666; margin: 10px 0 0 0;">Premium Shopify Theme</p>
    </div>
    
    <!-- Main Content -->
    <div style="background: linear-gradient(145deg, #1a1a1c 0%, #141416 100%); border: 1px solid rgba(212, 175, 55, 0.2); border-radius: 16px; padding: 40px; margin-bottom: 30px;">
      <h2 style="color: #fff; margin: 0 0 20px 0; font-size: 24px;">Hello ${customerName}! 👋</h2>
      
      <p style="color: #ccc; line-height: 1.8; margin: 0 0 25px 0;">
        Thank you for purchasing the APEX Theme! Your payment has been verified and your theme is ready for download.
      </p>
      
      <!-- Download Button -->
      <div style="text-align: center; margin: 35px 0;">
        <a href="${downloadUrl}" 
           style="display: inline-block; background: linear-gradient(135deg, #D4AF37 0%, #B8860B 100%); color: #0A0A0B; text-decoration: none; padding: 18px 45px; border-radius: 8px; font-weight: bold; font-size: 16px; letter-spacing: 1px;">
          📦 DOWNLOAD YOUR THEME
        </a>
      </div>
      
      <!-- Important Info -->
      <div style="background: rgba(212, 175, 55, 0.1); border-left: 4px solid #D4AF37; padding: 20px; margin: 30px 0; border-radius: 0 8px 8px 0;">
        <h3 style="color: #D4AF37; margin: 0 0 10px 0; font-size: 14px; text-transform: uppercase;">⚠️ Important</h3>
        <ul style="color: #ccc; margin: 0; padding-left: 20px; line-height: 1.8;">
          <li>Download link expires: <strong style="color: #fff;">${formattedExpiry}</strong></li>
          <li>Maximum downloads allowed: <strong style="color: #fff;">3</strong></li>
          <li>Save the file to a secure location after download</li>
        </ul>
      </div>
    </div>
    
    <!-- Installation Guide -->
    <div style="background: #1a1a1c; border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 30px; margin-bottom: 30px;">
      <h3 style="color: #D4AF37; margin: 0 0 20px 0;">📋 Quick Installation Guide</h3>
      <ol style="color: #ccc; line-height: 2; padding-left: 20px; margin: 0;">
        <li>Log in to your Shopify Admin</li>
        <li>Go to <strong style="color: #fff;">Online Store → Themes</strong></li>
        <li>Click <strong style="color: #fff;">Add theme → Upload zip file</strong></li>
        <li>Select the APEX theme zip file you downloaded</li>
        <li>Click <strong style="color: #fff;">Customize</strong> to start designing!</li>
      </ol>
    </div>
    
    <!-- Support -->
    <div style="text-align: center; padding: 30px 0; border-top: 1px solid rgba(255,255,255,0.1);">
      <p style="color: #666; margin: 0 0 15px 0;">Need help? We're here for you!</p>
      <a href="mailto:abdelhmeed.mohsen@gmail.com" style="color: #D4AF37; text-decoration: none;">abdelhmeed.mohsen@gmail.com</a>
    </div>
    
    <!-- Footer -->
    <div style="text-align: center; color: #444; font-size: 12px;">
      <p style="margin: 0;">© 2024 APEX Theme. All rights reserved.</p>
      <p style="margin: 10px 0 0 0;">This is a licensed copy for your personal/business use only.</p>
    </div>
  </div>
</body>
</html>
    `,
  });

  if (error) {
    console.error('Failed to send email:', error);
    throw new Error(`Failed to send email: ${error.message}`);
  }

  return data;
}
