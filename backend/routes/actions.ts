import { Router } from "https://deno.land/x/opine@2.1.1/mod.ts";
import GHMarketPlaceCrawler from "./../classes/GHMarketPlaceCrawler.ts"

const router = Router();
const crawler = new GHMarketPlaceCrawler(Deno.env.get("BASE_URL") as string);

router.get("/actions", async (req, res)=>{
    //validate request parameters
    let search = req.query.search;

    if(!search) {
        search = "";
    }

    let pageIndex = parseInt(req.query.page);

    if(Number.isNaN(pageIndex)) {
        pageIndex = 1;
    }

    //send response
    const actions = await crawler.getActions(search, pageIndex);

    res.json(actions);
});

router.get("/actions/detail", async (req, res)=>{
    const path = req.query.path;

    if(!path) {
        res.status = 400;
        return res.json({ 'message': 'no path was provided' });
    }

    const action = await crawler.getSingleAction(path);

    res.json(action);
});

export default router;