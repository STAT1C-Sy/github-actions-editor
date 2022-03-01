import { Router } from "https://deno.land/x/opine@2.1.1/mod.ts";

import ActionsRouter from './actions.ts';
import AccountRouter from './account.ts';
import GithubRouter from './github.ts';

const router = Router();

router.use('/', ActionsRouter);
router.use('/', AccountRouter);
router.use('/', GithubRouter);

export default router;