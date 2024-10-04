import fetch from 'node-fetch';

// Define an interface for the reCAPTCHA response
interface RecaptchaResponse {
  success: boolean;
  challenge_ts?: string; // optional
  hostname?: string; // optional
  [key: string]: any; // allows for other properties that may exist
}

export const handler = async (event: { body: string }): Promise<{ statusCode: number; body: string }> => {
  const { token } = JSON.parse(event.body);
  const secretKey = process.env.RECAPTCHA_SECRET_KEY as string; // Assert that the secret key is a string

  // Verify the token with Google
  const response = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`,
    { method: 'POST' }
  );

  // Use a type assertion here
  const data = (await response.json()) as RecaptchaResponse;

  if (data.success) {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Success!', score: data.score }),
    };
  } else {
    return {
      statusCode: 403,
      body: JSON.stringify({ message: 'Failed verification!' }),
    };
  }
};
