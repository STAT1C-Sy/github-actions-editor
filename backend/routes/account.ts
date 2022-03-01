import { Router } from "https://deno.land/x/opine@2.1.1/mod.ts";
import OAuth2Client from '../connections/GHOAuthClient.ts';

const router = Router();

router.get("/login", (_req, res) => {
    res.redirect(
      OAuth2Client.code.getAuthorizationUri().toString(),
    );
  });

  
  router.get("/oauth2/callback", async (req, res) => {
    // Exchange the authorization code for an access token
    const tokens = await OAuth2Client.code.getToken(req.originalUrl);
  
    res.redirect(req.baseUrl + `/dashboard?token=${tokens.accessToken}`);
  });

export default router;