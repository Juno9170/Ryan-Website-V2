import { google } from 'googleapis';
import { schedule } from '@netlify/functions';

// Retrieve environment variables
const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;
const SHEET_NAME = 'Form Submissions';
const CLIENT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'); // Handle escaped newlines

export const handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Only POST requests are allowed' }),
    };
  }

  const body = JSON.parse(event.body);
  const { name, email, message } = body;

  if (!name || !email || !message) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing required fields' }),
    };
  }

  try {
    // Set up the JWT client with the service account credentials from environment variables
    const auth = new google.auth.JWT(
      CLIENT_EMAIL,
      null,
      PRIVATE_KEY,
      ['https://www.googleapis.com/auth/spreadsheets']
    );

    // Set up the Google Sheets API client
    const sheets = google.sheets({ version: 'v4', auth });

    // Append the form data to the Google Sheet
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A1`, // Adjust based on your sheet structure
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      resource: {
        values: [[name, email, message]], // Data to append
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Form data submitted successfully!', response }),
    };
  } catch (error) {
    console.error('Error appending data to Google Sheets:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to submit form data' }),
    };
  }
};
