import { Router } from "https://deno.land/x/opine@2.1.1/mod.ts";
import SessionStore from '../classes/SessionStore.ts';
import { checkTokenAndCreateSession } from '../middlewares/auth.ts';

const router = Router();

//get a list of all repositorys of the user
router.get("/repos", checkTokenAndCreateSession, async (req, res) => {
  const token = req.headers.get('token');
  const user = SessionStore.getInstance().get(token as string);

  const reposResponse = await fetch("https://api.github.com/users/" + user.login + "/repos", {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });

  const repos = await reposResponse.json();

  res.json(repos.filter((repo: { permissions: { admin: boolean } }) => repo.permissions.admin));
});

//get info about a single repositorys main branch
router.get('/repo', checkTokenAndCreateSession, async (req, res) => {
  if(!req.query.branch || !req.query.repo) {
    res.status = 400;
    res.json({"message": "repo does not exist" });
    return;
  }

  const token = req.headers.get("token");
  const user = SessionStore.getInstance().get(token as string);

  //build url from parameters and session data
  const repoUrl = `https://api.github.com/repos/${user.login }/${req.query.repo}/branches/${req.query.branch}`;

  const repoResponse = await fetch(repoUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });

  const repo = await repoResponse.json();

  const repoContentsResponse = await fetch(repo?.commit?.url, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });

  const content = await repoContentsResponse.json()

  res.json(content);
});

/*
router.get('/repo/file', checkTokenAndCreateSession, (req, res)=>{

});
*/

export default router