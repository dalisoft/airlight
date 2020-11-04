import { default as fs } from 'fs-extra';
import readline from 'readline';
import { google } from 'googleapis';
import GSheetQL from '../src/_class';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const TOKEN_PATH = 'token.json';

async function getNewToken(oAuth2Client: any) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  return new Promise((resolve, reject) => {
    rl.question('Enter the code from that page here: ', (code) => {
      rl.close();
      oAuth2Client.getToken(code, async (err: Error, token: any) => {
        if (err) {
          return reject(err);
        }
        oAuth2Client.setCredentials(token);
        // Store the token to disk for later program executions
        await fs.writeFile(TOKEN_PATH, JSON.stringify(token));
        resolve(oAuth2Client);
      });
    });
  });
}

(async () => {
  const credentials = JSON.parse(await fs.readFile('credentials.json', 'utf8'));
  // Load client secrets from a local file.
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const auth = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );

  const token: any = await fs
    .readFile(TOKEN_PATH)
    .catch(() => getNewToken(auth));
  auth.setCredentials(JSON.parse(token));

  const sheets = google.sheets({ auth, version: 'v4' });
  const spreadsheetId = '---YOUR-SPREADSHEET-ID---';

  const gsheet = new GSheetQL(spreadsheetId, sheets, auth);

  const getRes = await gsheet.get(['Users', 'Messages'], true, [
    ['ID', 'Name', 'Age']
  ]);

  console.log(getRes);

  const updateResponse = await gsheet.update(
    'Users!A2:D4',
    ['ID', 'Name', 'Age'],
    null,
    true
  );

  console.log('log', updateResponse);
})();
