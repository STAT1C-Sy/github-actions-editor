import { OpineRequest, OpineResponse, NextFunction } from "https://deno.land/x/opine@2.1.1/mod.ts";
import SessionStore from '../classes/SessionStore.ts';

export async function checkTokenAndCreateSession(req: OpineRequest, res: OpineResponse, next: NextFunction) {
    const token = req.headers.get("token");

    if (!token) {
        res.status = 401;
        res.json({ "message": "Please provide token" });
        return;
    }

    const store = SessionStore.getInstance();

    const userData = store.get(token);

    if(!userData) {
        const userResponse = await fetch("https://api.github.com/user", {
            headers: {
                Authorization: `Bearer ${req.headers.get('token')}`,
            }
        });

        const user = await userResponse.json();

        store.set(token, user);
    }

    next();
}