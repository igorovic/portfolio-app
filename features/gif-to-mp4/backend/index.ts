import { load } from "cheerio";
import axios from "axios";
import { parse, prettyPrint } from "recast";
import json5 from "json5";
import slugify from "slugify";
interface RecastToken {
  type: string;
  value: string;
  loc: any;
}

function isGiphyRender(data: string) {
  return data.match(/.*Giphy.renderDesktop.*/gi);
}

export async function RetrieveAndConvert(url: string) {
  const { data: html } = await axios.get(url);
  const $ = load(html);
  const scripts = $("script");
  let ast: any;
  let mediaUrls: URL[] = [];
  [...scripts].forEach((ele) => {
    if (ele.type === "script") {
      ele.children.forEach((child) => {
        if (child.type === "text" && isGiphyRender(child.data.slice(0, 100))) {
          ast = parse(child.data);
        }
      });
    }
  });
  if (ast) {
    const arg1 = ast.program.body[0].expression.arguments[1];
    const startToken = arg1.loc.start.token;
    const endToken = arg1.loc.end.token;
    const detailsString = (
      ast.tokens.slice(startToken, endToken) as RecastToken[]
    ).reduce((acc, curr) => (acc += curr.value), "");
    const details = json5.parse(detailsString);
    return {
      gif: details?.gif?.images?.original_mp4,
      filename: `${slugify(details?.gif?.title)}.mp4`,
    };
  }
}
