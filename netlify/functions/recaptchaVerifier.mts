import fetch from 'node-fetch'; 

// Define an interface for the reCAPTCHA response
interface RecaptchaResponse {
  success: boolean;
  challenge_ts?: string; // optional for both v2 and v3
  hostname?: string; // optional for both v2 and v3
  score?: number; // optional, only for v3
  'error-codes'?: string[]; // optional for both versions
}

// Define the expected shape of the request body
interface RequestBody {
  token: string; // Use 'token' instead of 'v2Token'
  version: 'v2' | 'v3'; // must be either v2 or v3
}

// Define the shape of the serverless function's response
export const handler = async (event: { body: string }): Promise<{ statusCode: number; body: string }> => {
  // Parse and validate the request body
  let requestBody: RequestBody;
  try {
    requestBody = JSON.parse(event.body) as RequestBody;
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Invalid request body format' }),
    };
  }

  const { token, version } = requestBody;
  const secretKey = version === 'v3' ? process.env.RECAPTCHA_SECRET_KEY as string : process.env.CHALLENGE_SECRET_KEY as string; 

  // Verify the token with Google reCAPTCHA
  const response = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`,
    { method: 'POST' }
  );

  // Parse the response from Google's verification API
  const data = (await response.json()) as RecaptchaResponse;

  // Handle success and failure based on reCAPTCHA version
  if (data.success) {
    if (version === 'v3') {
      // v3 specific handling (including score)
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Success!', score: data.score, challenge: data.challenge_ts }),
      };
    } else if (version === 'v2') {
      // v2 handling (no score, just success)
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Success!', challenge: data.challenge_ts, success: true }),
      };
    }
  } else {
    // If verification failed, return error codes (common for both v2 and v3)
    return {
      statusCode: 403,
      body: JSON.stringify({ message: 'Failed verification!', error: data['error-codes'], debug: data }),
    };
  }

  // Fallback for any unexpected issues
  return {
    statusCode: 400,
    body: JSON.stringify({ message: 'Unexpected error occurred' }),
  };
};
