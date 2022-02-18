import { Router } from "https://deno.land/x/opine@2.1.1/mod.ts";

import ActionsRouter from './actions.ts';

const router = Router();

router.use('/', ActionsRouter);

export default router;