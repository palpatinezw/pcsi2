import { JSDOM } from "jsdom";
import { ColleDoc, DocType, Subj } from "../config/types.js";
import links from "../links.js";

const getHtml = (url: string) => {
    return fetch(url).then((res) => {
        return res.text();
    });
};

function extractLinks(html: string): ColleDoc[] {
  const dom = new JSDOM(html);
  const document = dom.window.document;

  const results: ColleDoc[] = [];

  const anchors = document.querySelectorAll("li > a[href]");
  anchors.forEach(a => {
    const link = a.getAttribute("href");
    const title = a.textContent?.trim();

    if (link && title) {
      results.push({ link, title });
    }
  });
  return results;
}

const getDoc = (link:string, subject:Subj, type:DocType):Promise<ColleDoc[]> => {
    return getHtml(link).then((res) => {
        let mathlist = extractLinks(res)
        for (let colledoc of mathlist) {
            colledoc.subject = subject
            colledoc.type = type
            colledoc.link = link.substring(0, link.lastIndexOf("/") + 1) + colledoc.link
            colledoc.dateCreated = new Date()
        }
        return mathlist
    })
}

export const getDocs = ():Promise<ColleDoc[]> => {
    const extractors = [
        getDoc(links.mathCollesLink, "math", "colle"),
        getDoc(links.chemCollesLink, "chem", "colle"),
        getDoc(links.mathOthersLink, "math", "other"),
        getDoc(links.chemOthersLink, "chem", "other"),
    ]
    return Promise.all(extractors).then((res) => res.flat())
}