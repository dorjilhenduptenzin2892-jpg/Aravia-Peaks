"use server"

type InquiryData = {
  fullName: string
  email: string
  phone: string
  country: string
  packageType: string
  travelMonth: string
  groupSize: string
  duration: string
  message: string
}

function generateReferenceNumber(): string {
  const timestamp = Date.now().toString().slice(-6)
  const random = Math.random().toString(36).substring(2, 5).toUpperCase()
  return `DV${timestamp}${random}`
}

async function sendAutoReply(toEmail: string, fullName: string, referenceNumber: string) {
  const apiKey = "re_VFsGpfzm_KNuiPMJtgkhYatZVDv81dsrS"

  if (toEmail !== "bhutanaraviapeaks@gmail.com") {
    console.log("[v0] Skipping auto-reply in testing mode. Verify domain at resend.com to enable.")
    return
  }

  const autoReplyHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 0; background: white; }
          .header { background: linear-gradient(135deg, #8b5a3c 0%, #c9a961 100%); color: white; padding: 40px 30px; text-align: center; }
          .header h1 { margin: 0; font-size: 28px; font-weight: 700; }
          .content { padding: 40px 30px; background: #fafaf8; }
          .message-box { background: white; padding: 30px; border-radius: 8px; border-left: 5px solid #c9a961; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }
          .ref-box { background: #f8f6f3; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center; border: 2px dashed #c9a961; }
          .ref-box strong { font-size: 24px; color: #8b5a3c; display: block; margin-top: 8px; }
          .footer { text-align: center; padding: 30px; color: #696969; font-size: 12px; background: #e8e3de; }
          .highlight { color: #c9a961; font-weight: 600; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🏔️ Thank You for Your Inquiry</h1>
          </div>
          <div class="content">
            <div class="message-box">
              <h2 style="color: #8b5a3c; margin-top: 0;">Dear ${fullName},</h2>
              <p>Thank you for your travel inquiry with CloudKingdom! We are thrilled that you're interested in experiencing the Kingdom of Happiness.</p>
              <p>Our travel specialists have received your inquiry and will contact you within <span class="highlight">24 hours</span> with a customized itinerary and curated options.</p>
              <div class="ref-box">
                <div style="color: #8b5a3c; font-weight: 600;">Your Inquiry Reference</div>
                <strong>${referenceNumber}</strong>
              </div>
              <p>Please keep this reference number for your records. You can quote it in any future correspondence with us.</p>
              <p>In the meantime, feel free to explore more about Bhutan on our website or reach out if you have any immediate questions.</p>
              <p style="margin-top: 30px;">
                <strong>Warmest regards,</strong><br>
                The CloudKingdom Team
              </p>
            </div>
          </div>
          <div class="footer">
            <p><strong>CloudKingdom Travel Services</strong></p>
            <p>Email: bhutanaraviapeaks@gmail.com</p>
            <p style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #ddd;">Your Gateway to the Kingdom of Happiness</p>
          </div>
        </div>
      </body>
    </html>
  `

  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: "CloudKingdom Travel <onboarding@resend.dev>",
        to: [toEmail],
        subject: `Thank You for Your Inquiry - Ref: ${referenceNumber}`,
        html: autoReplyHtml,
      }),
    })
  } catch (error) {
    console.error("[v0] Error sending auto-reply:", error)
  }
}

export async function sendInquiryEmail(data: InquiryData) {
  try {
    const apiKey = "re_VFsGpfzm_KNuiPMJtgkhYatZVDv81dsrS"
    const toEmail = "bhutanaraviapeaks@gmail.com"

    const referenceNumber = generateReferenceNumber()

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 0; }
            .header { background: linear-gradient(135deg, #8b5a3c 0%, #c9a961 100%); color: white; padding: 40px 30px; text-align: center; }
            .header h1 { margin: 0; font-size: 28px; font-weight: 700; }
            .ref-number { background: rgba(255,255,255,0.15); padding: 15px; margin-top: 15px; border-radius: 8px; font-size: 14px; }
            .ref-number strong { font-size: 20px; display: block; margin-top: 8px; }
            .content { background: #fafaf8; padding: 30px; }
            .section { background: white; padding: 25px; margin: 15px 0; border-radius: 8px; border-left: 5px solid #c9a961; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }
            .section-title { color: #8b5a3c; font-weight: 700; margin-bottom: 15px; font-size: 16px; text-transform: uppercase; letter-spacing: 0.5px; }
            .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
            .info-row { margin: 10px 0; }
            .label { font-weight: 600; color: #8b5a3c; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; }
            .value { color: #333; margin-top: 4px; }
            .message-box { background: #f8f6f3; padding: 20px; border-radius: 8px; margin-top: 15px; border-left: 3px solid #c9a961; }
            .footer { text-align: center; padding: 30px 30px 20px; color: #696969; font-size: 12px; background: #e8e3de; border-top: 1px solid #ddd6ce; }
            .footer p { margin: 5px 0; }
            .highlight { color: #c9a961; font-weight: 600; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🏔️ CloudKingdom Travel Inquiry</h1>
              <div class="ref-number">
                Inquiry Reference Number
                <strong>${referenceNumber}</strong>
              </div>
            </div>
            <div class="content">
              <div class="section">
                <div class="section-title">✉️ Personal Information</div>
                <div class="info-grid">
                  <div class="info-row">
                    <div class="label">Full Name</div>
                    <div class="value">${data.fullName}</div>
                  </div>
                  <div class="info-row">
                    <div class="label">Email</div>
                    <div class="value">${data.email}</div>
                  </div>
                  <div class="info-row">
                    <div class="label">Phone</div>
                    <div class="value">${data.phone}</div>
                  </div>
                  <div class="info-row">
                    <div class="label">Country</div>
                    <div class="value">${data.country}</div>
                  </div>
                </div>
              </div>
              
              <div class="section">
                <div class="section-title">🗺️ Trip Details</div>
                <div class="info-grid">
                  <div class="info-row">
                    <div class="label">Package Type</div>
                    <div class="value">${data.packageType}</div>
                  </div>
                  <div class="info-row">
                    <div class="label">Travel Month</div>
                    <div class="value">${data.travelMonth}</div>
                  </div>
                  <div class="info-row">
                    <div class="label">Group Size</div>
                    <div class="value">${data.groupSize}</div>
                  </div>
                  <div class="info-row">
                    <div class="label">Duration</div>
                    <div class="value">${data.duration}</div>
                  </div>
                </div>
              </div>
              
              ${
                data.message
                  ? `
              <div class="section">
                <div class="section-title">💬 Additional Message</div>
                <div class="message-box">${data.message.replace(/\n/g, "<br>")}</div>
              </div>
              `
                  : ""
              }
            </div>
            <div class="footer">
              <p><strong>Reference: ${referenceNumber}</strong></p>
              <p>This inquiry was submitted through CloudKingdom.com</p>
              <p>Respond within 24 hours</p>
              <p style="margin-top: 10px; padding-top: 10px; border-top: 1px solid #ddd6ce;">Experience the Kingdom of Happiness with CloudKingdom</p>
            </div>
          </div>
        </body>
      </html>
    `

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: "CloudKingdom Travel <onboarding@resend.dev>",
        to: [toEmail],
        reply_to: data.email,
        subject: `New Travel Inquiry from ${data.fullName} - Ref: ${referenceNumber}`,
        html: emailHtml,
        headers: {
          "X-Priority": "1",
          "X-Entity-Ref-ID": referenceNumber,
        },
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("[v0] Resend API error:", errorData)
      throw new Error(`Email API error: ${response.status}`)
    }

    await sendAutoReply(data.email, data.fullName, referenceNumber)

    return {
      success: true,
      message: "Inquiry sent successfully",
      referenceNumber: referenceNumber,
    }
  } catch (error) {
    console.error("[v0] Error sending inquiry email:", error)
    return {
      success: false,
      message: "Failed to send inquiry. Please try again or contact us directly.",
    }
  }
}
