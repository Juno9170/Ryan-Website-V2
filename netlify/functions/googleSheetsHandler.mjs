import { google } from 'googleapis';
import { resolveMx, resolve } from 'dns/promises';
const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;
const SHEET_NAME = 'Sheet1';
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
  const { fullName, emailAddress, message } = body;

  if (!fullName || !emailAddress || !message) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing required fields' }),
    };
  }
  const domain = emailAddress.split('@')[1];
  
  try {
    // Step 1: Check for MX records
    const mxRecords = await resolveMx(domain);
    if (mxRecords.length <= 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid Email Domain: No MX Records' }),
      };
    }

    // Step 2: Check for A (IPv4) or AAAA (IPv6) records
    let ipv4Addresses = [];
    let ipv6Addresses = [];

    try {
      ipv4Addresses = await resolve(domain, 'A');
      } catch (err) {
        console.warn(`No A (IPv4) records found for ${domain}`);
      }

      try {
        ipv6Addresses = await resolve(domain, 'AAAA');
      } catch (err) {
        console.warn(`No AAAA (IPv6) records found for ${domain}`);
      }

      // If no A or AAAA records found, return an error
      if (ipv4Addresses.length === 0 && ipv6Addresses.length === 0) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: 'Invalid Email Domain: No A or AAAA Records' }),
        };
      }

    } catch (err) {
      // Step 3: Handle specific DNS-related errors
      if (err.code === 'ENOTFOUND' || err.code === 'ENODATA') {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: `Invalid Email Domain: ${domain} not found` }),
        };
      }
      console.error(`Error validating domain ${domain}:`, err);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Internal Server Error' }),
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
      range: `${SHEET_NAME}!A2`, // Adjust based on your sheet structure
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      resource: {
        values: [[fullName, emailAddress, message]], // Data to append
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
