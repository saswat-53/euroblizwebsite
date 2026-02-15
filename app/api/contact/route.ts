import nodemailer from "nodemailer";

export async function POST(request: Request) {
  //console.log("Received POST request");
  try {
    const data = await request.json();
    const { name, email, phone, message, recaptchaToken } = data;

    //console.log("Received request data:", data);

    // Validate required fields
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({
          error: "Missing required fields",
          details: { name, email, message },
        }),
        { status: 400 }
      );
    }

    // Verify reCAPTCHA token
    if (!recaptchaToken) {
      return new Response(
        JSON.stringify({ error: "reCAPTCHA verification required" }),
        { status: 400 }
      );
    }

    // Verify reCAPTCHA with Google
    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;

    if (!recaptchaSecret) {
      console.error("RECAPTCHA_SECRET_KEY is not set in environment variables");
      return new Response(
        JSON.stringify({ error: "Server configuration error. Please contact support." }),
        { status: 500 }
      );
    }

    const recaptchaResponse = await fetch(
      `https://www.google.com/recaptcha/api/siteverify`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `secret=${recaptchaSecret}&response=${recaptchaToken}`,
      }
    );

    const recaptchaResult = await recaptchaResponse.json();

    if (!recaptchaResult.success) {
      console.error("reCAPTCHA verification failed:", recaptchaResult);
      return new Response(
        JSON.stringify({
          error: "reCAPTCHA verification failed. Please try again.",
          details: recaptchaResult["error-codes"]
        }),
        { status: 400 }
      );
    }

    // Configure transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: process.env.EMAIL,
      subject: `New Message from ${name}`,
      text: `Name: ${name}\n\nEmail: ${email}\n\nPhone: ${phone}\n\nMessage: ${message}`,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return new Response(
      JSON.stringify({ message: "Email sent successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: "Error processing request" }), {
      status: 500,
    });
  }
}
