# Google Sheets Waitlist Setup

## Step 1: Create Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "Sei IDE Waitlist"
4. In the first row, add headers:
   - A1: `Name`
   - B1: `Email`
   - C1: `Timestamp`

## Step 2: Create Google Apps Script

1. In your Google Sheet, click **Extensions** → **Apps Script**
2. Delete any existing code
3. Paste this code:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    sheet.appendRow([
      data.name,
      data.email,
      data.timestamp
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. Click **Save** (disk icon)
5. Name your project "Sei Waitlist API"

## Step 3: Deploy the Script

1. Click **Deploy** → **New deployment**
2. Click the gear icon ⚙️ next to "Select type"
3. Choose **Web app**
4. Configure:
   - **Description**: Sei Waitlist API
   - **Execute as**: Me
   - **Who has access**: Anyone
5. Click **Deploy**
6. Click **Authorize access**
7. Choose your Google account
8. Click **Advanced** → **Go to [Project Name] (unsafe)**
9. Click **Allow**
10. **Copy the Web app URL** (looks like: `https://script.google.com/macros/s/...../exec`)

## Step 4: Update Your Code

1. Open `components/Waitlist.tsx`
2. Find this line:
   ```typescript
   const scriptURL = 'YOUR_GOOGLE_SCRIPT_URL_HERE';
   ```
3. Replace with your copied URL:
   ```typescript
   const scriptURL = 'https://script.google.com/macros/s/YOUR_ACTUAL_URL/exec';
   ```

## Step 5: Test

1. Run your app: `npm run dev`
2. Fill out the waitlist form
3. Check your Google Sheet - the data should appear!

## Troubleshooting

**Data not appearing?**
- Make sure you deployed as "Anyone" can access
- Check the Apps Script URL is correct
- Open browser console (F12) to see any errors

**Need to update the script?**
- Make changes in Apps Script
- Click **Deploy** → **Manage deployments**
- Click **Edit** (pencil icon)
- Change version to **New version**
- Click **Deploy**

## View Your Waitlist

Your Google Sheet will automatically update with:
- Name
- Email
- Timestamp (when they joined)

You can export this data anytime or set up email notifications!
