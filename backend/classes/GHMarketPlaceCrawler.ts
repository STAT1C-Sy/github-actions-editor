import { DOMParser } from 'https://deno.land/x/deno_dom@v0.1.21-alpha/deno-dom-wasm.ts';
import { decode } from "https://deno.land/std@0.126.0/encoding/base64.ts";
import { parse } from "https://deno.land/std@0.126.0/encoding/yaml.ts";


interface IParsedActionYAML {
    name: string,
    author: string,
    description: string,
    inputs?: { 
        [key: string]: {
            description: string,
            required: boolean,
            default?: string,
            deprecationMessage?: string,
        } 
    } 
}

/*
* Class to help with crawling GH Marketplace
*/
export default class GHMarketPlaceCrawler {
    private url: string;

    constructor(url: string) {
        this.url = url;
    }

    /**
     * Method to get search results for actions for GH Markeitplace
     * @param search - search value
     * @param pageIndex - page index
     * @returns search results
     */
    public async getActions(search: string, pageIndex?: number) {
        let fetchUrl = `${this.url}?type=actions&query=${search}`;

        if(pageIndex) {
            fetchUrl += `&page=${pageIndex}`;
        }

        //fetch github search page
        const page = await fetch(fetchUrl);
        const htmlText = await page.text();

        const dom = new DOMParser().parseFromString(htmlText, "text/html");

        if(!dom) {
            throw new Error("Something went wrong while parsing the API DOM");
        }

        //filter all nodes that represent links to actions
        const actionsElementList = dom?.getElementsByTagName("a").filter(element => element.attributes.getNamedItem("href").value?.includes("/marketplace/actions/"));

        if(!actionsElementList) {
            throw new Error("Error while filtering DOM")
        }

        //build return
        return actionsElementList.map(element => {
            let name, author, description, stars, path;

            //get data from dom
            name = element.getElementsByTagName("h3")[0].innerHTML;
            author = element.getElementsByTagName("p").filter(ele => ele.attributes.getNamedItem("class").value == "color-fg-muted text-small lh-condensed mb-1")[0].firstElementChild?.innerHTML;
            description = element.getElementsByTagName("p").filter(ele => ele.attributes.getNamedItem("class").value == "color-fg-muted lh-condensed wb-break-word mb-0")[0].innerHTML;

            try {
                stars = element.getElementsByTagName("span").filter(ele => ele.attributes.getNamedItem("class").value == "text-small color-fg-muted text-bold")[0].innerHTML;
            } catch(_e) {
                //handle action has no stars
                stars = "0";
            }
            
            path = element.attributes.getNamedItem("href").value;

            return {
                name: name,
                author: author,
                description: description.trim(),
                stars: parseInt(stars.replace(" stars", "")),
                path: path.replace("/marketplace", "")
            }
        });

    }

    /**
     * Parses the detail page of an action
     * @param actionPath path to an action
     */
    public async getSingleAction(actionPath: string) {
        const fetchUrl = `${this.url}${actionPath}`;

        const page = await fetch(fetchUrl);
        const htmlText = await page.text();

        const dom = new DOMParser().parseFromString(htmlText, "text/html");

        if(!dom) {
            throw new Error("Something went wrong while parsing the API DOM");
        }

        //parse links section
        const linksSetion = dom.getElementsByTagName("aside")[0].getElementsByTagName("div").filter(element => element.getAttribute("class") == "py-3 border-bottom color-border-muted");
    
        const repoUrl = linksSetion[0].getElementsByTagName("a")[0].getAttribute("href");

        if(!repoUrl) {
            throw new Error("Error while parsing links section");
        }

        //check if repo has action.yml -> parse parameters if possible
        const actionFetchUrl = `https://api.github.com/repos${repoUrl?.replace("https://github.com", "")}/contents/action.yml` 

        const actionFileRequest = await fetch(actionFetchUrl);

        let parameters;

        if(actionFileRequest.status == 404) {
            parameters = null;
        } else {
            //parse yaml from request
            const b64 = (await actionFileRequest.json())['content'];

            if(!b64) {
                throw new Error("Error Parsing actions.yml from GitHub");
            }

            const yaml = new TextDecoder().decode(decode(b64));

            parameters = (<IParsedActionYAML>parse(yaml))['inputs'];
        }

        return {
            pageUrl: fetchUrl,
            repoUrl: repoUrl,
            parameters: parameters
        }
    }
}