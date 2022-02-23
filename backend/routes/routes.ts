import { Router } from "https://deno.land/x/opine@2.1.1/mod.ts";

import ActionsRouter from './actions.ts';
import AccountRouter from './account.ts';

const router = Router();

router.use('/', ActionsRouter);
router.use('/', AccountRouter);

export default router;