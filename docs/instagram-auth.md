# Instagram Meta App Authorization

This document outlines the setup, renewal, and revocation process for the Senshac Instagram integration using the Meta Graph API.

## Current Setup

Senshac uses the **Instagram Graph API** (for Professional/Business accounts) to fetch tagged portfolio media and sync it to Cloudflare R2.
The required environment variables are stored as Cloudflare Pages secrets:
- `INSTAGRAM_ACCOUNT_ID`: The unique ID of the Senshac Instagram Professional account.
- `INSTAGRAM_ACCESS_TOKEN`: A long-lived user access token.

## Token Renewal (Every 60 Days)

The current long-lived access token is valid for **60 days**. When it expires, the sync script will fail to authenticate. You must manually generate a new token before or after expiration.

### Step-by-Step Renewal Guide:
1. Go to the [Meta Graph API Explorer](https://developers.facebook.com/tools/explorer/).
2. Select the Senshac **Meta App** from the dropdown.
3. Under "User or Page", select **Get User Token**. 
   - Ensure you grant the `instagram_basic` and `pages_read_engagement` scopes.
   - Click "Generate Access Token" and log into the Facebook account linked to the Senshac Instagram.
4. Click the small **(i)** info icon next to the generated short-lived token, then click **Open in Access Token Tool**.
5. Scroll down to the bottom and click **Extend Access Token** to convert it into a 60-day long-lived token.
6. Copy the new long-lived token.
7. Update the Cloudflare Pages secret via Wrangler:
   ```bash
   dx bunx wrangler pages secret put INSTAGRAM_ACCESS_TOKEN --project-name senshac
   ```
   *(Paste the new token when prompted)*

> **Tip for the future:** If you want to avoid renewing this every 60 days, you can create a **System User** in the Meta Business Manager. System User tokens can be configured to never expire.

## Token Revocation
If the token is ever compromised, or you need to revoke access:
1. Go to the [Facebook Business Integrations page](https://www.facebook.com/settings?tab=business_tools) of the authorizing user.
2. Find the Senshac Meta App.
3. Click **Remove** to instantly invalidate all access tokens associated with this app.
4. (Optional) You can also rotate the App Secret in the Meta App Dashboard to aggressively invalidate all tokens.
