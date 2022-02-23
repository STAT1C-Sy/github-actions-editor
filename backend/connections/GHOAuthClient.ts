import "https://deno.land/x/dotenv@v3.2.0/load.ts"; //load env
import { OAuth2Client } from "https://deno.land/x/oauth2_client@v0.2.1/mod.ts";

export default new OAuth2Client({
    clientId: Deno.env.get("GH_CLIENT_ID") as string,
    clientSecret: Deno.env.get("GH_CLIENT_SECRET") as string,
    authorizationEndpointUri: "https://github.com/login/oauth/authorize",
    tokenUri: "https://github.com/login/oauth/access_token",
    redirectUri: "http://localhost:3002/api/v1/oauth2/callback",
    defaults: {
      scope: "read:user, repo",
    },
  });