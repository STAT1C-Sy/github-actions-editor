import { Router } from "https://deno.land/x/opine@2.1.1/mod.ts";
import OAuth2Client from '../connections/GHOAuthClient.ts';
import "https://deno.land/x/dotenv@v3.2.0/load.ts"; //load env

const router = Router();

router.get("/login", (_req, res) => {
    res.redirect(
      OAuth2Client.code.getAuthorizationUri().toString(),
    );
  });

  
  router.get("/oauth2/callback", async (req, res) => {
    // Exchange the authorization code for an access token
    const tokens = await OAuth2Client.code.getToken(req.originalUrl);
  
    res.redirect(`${Deno.env.get("FRONTEND_URL")}/dashboard?token=${tokens.accessToken}`);
  });

export default router;