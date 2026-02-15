// app/api/captcha/route.js
const captchas: Map<string, number> = new Map() // Temporary store for CAPTCHA answers

// Generate a CAPTCHA question and store the answer
export async function GET() {
    const num1 = Math.floor(Math.random() * 10)
    const num2 = Math.floor(Math.random() * 10)
    const captchaId = `${Date.now()}-${Math.random()}`
    const answer = num1 + num2

    // Store the CAPTCHA answer
    captchas.set(captchaId, answer)

    // Return the CAPTCHA question and ID
    return new Response(
        JSON.stringify({
            id: captchaId,
            question: `What is ${num1} + ${num2}?`,
        }),
        { status: 200 }
    )
}

// Cleanup expired CAPTCHA or used data (optional)
export function cleanupCaptchas() {
    // Set a timeout or cleanup logic as needed
    setInterval(() => {
        captchas.clear() // Clear all CAPTCHA entries (for simplicity)
    }, 24 * 60 * 60 * 1000) // Clear once per day or as needed
}

export { captchas }
