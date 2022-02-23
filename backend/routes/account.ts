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
  
    // Use the access token to make an authenticated API request
    const userResponse = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });
    const { name } = await userResponse.json();
  
    res.send(`Hello, ${name}!`);
  });

router.get('/account', ()=>{

});

export default router;