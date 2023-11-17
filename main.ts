import cheerio from "npm:cheerio"
var comicNumber: number
var pageUrl = ``
if (Deno.args[0] === "random") {
  pageUrl = `https://c.xkcd.com/random/comic/`;
} else if (Deno.args[0] === 'latest') {
  pageUrl = `https://xkcd.com`
} else if (Deno.args[0] === 'number') {
  comicNumber = Number(Deno.args[1])
  if (comicNumber == undefined) {
    console.error("You did not enter a valid number.")
    Deno.exit(1)
  }
  pageUrl = `https://xkcd.com/${comicNumber}`
} else {
  pageUrl = `https://xkcd.com`
}
const pageResponse = await fetch(pageUrl);
if (!pageResponse.ok) {
  console.error(`xkcd.com returned a non-2xx status code.`);
  Deno.exit(2)
}
const pageText = await pageResponse.text();
const $ = cheerio.load(pageText);
const permalink = $('#middleContainer > a:first').attr('href')
const cTitle = $('#ctitle').text();
const imageUrl = $('#middleContainer > a:last').attr('href')

console.log(cTitle)
console.log(permalink)