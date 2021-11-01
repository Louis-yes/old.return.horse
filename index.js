/*
TODO
[x] make readme
[x] add archive page
[x] add random script
[ ] write site meta
[ ] make tool that works in ronin or somthing

*/
import fs from "fs-extra"
import markdown from "markdown"

import comicTemplate from "./templates/templateComics.js"
import pageTemplate from "./templates/templatePage.js"
import templateArchive from "./templates/templateArchive.js"

const env = process.argv[2] == "--production" ? "prod" : "dev"
build(env)

function build(env){
    let site = getSiteInfo()
    site.url = env === "prod" ? site.prodUrl : site.devUrl

    let comics = makeComicsList()

    // build html and populate directories
        // comic pages
    buildComicPages(site, comics, comicTemplate)
        // pages
    buildSitePages(site, pageTemplate, comics)
        // build archive
    buildArchivePage(site,comics, templateArchive)
        // home page
    fs.writeFile('./www/index.html', comicTemplate(site, comics[0], comics), () => { console.log(`created www/index.html`) })
    // move assets over
        // js
    fs.copySync(`./content/js`, `./www/js`, {overwrite: true})
        // css
    fs.copySync(`./content/css`, `./www/css`, {overwrite: true})

}

function getSiteInfo () {
    return JSON.parse(fs.readFileSync("site.json"))
}

function buildSitePages(site, template, comics){
    const pagesPath = './content/pages'
    const dir = fs.readdirSync(pagesPath, {withFileTypes: true})
    const pages = dir.map(ff => {
        if(ff.isDirectory){
            let path = `${pagesPath}/${ff.name}/index.md`
            let name = ff.name
            if(fs.existsSync(path)){
                let md = fs.readFileSync(path, {encoding: "utf8"})
                let page = makePage(site, md, template, comics)
                return {html: page, name: name}
            }
        }
    }).filter(Boolean)
    pages.forEach(pp => {
        fs.copySync(`${pagesPath}/${pp.name}`, `./www/${pp.name}`, {overwrite: true})
        fs.writeFileSync(`./www/${pp.name}/index.html`, pp.html)
    })
}

function makePage(site, md, template, comics){
    let content = ""
    let meta = {}

    let frontMatterSplit = md.split("---")
    if(frontMatterSplit.length > 1){
        meta = frontMatterSplit[0].split("\n").map(fm => {
            let data = fm.split(":")
            return { [data[0].toLowerCase()] : data[1]}
        }).reduce((pv, cv) => {
            return Object.assign(pv,cv)
        }, {})
        content = markdown.markdown.toHTML(frontMatterSplit[1])
    }

    return template(site, {meta: meta, content: content}, comics)
}

function  makeComicsList () {
    const postsPath = './content/posts'
    const dir = fs.readdirSync(postsPath, { withFileTypes: true })
    const comis = dir.map(ff => {
        if(ff.isDirectory()){
            let path = `${postsPath}/${ff.name}/comic.json`
            if(fs.existsSync(path)){
                return JSON.parse(fs.readFileSync(path, { encoding: "utf8" }))
            }
        }
    }).filter(Boolean).sort((a,b) => { return Date(a.date) > Date(b.date)})
    return comis
}

function buildComicPages(site, comics, template) {
    comics.forEach(comic => {
        let page = template(site, comic, comics)
        let path = `./www/${comic.path}`
        fs.copySync(`./content/posts/${comic.path}`, path, {overwrite: true})
        fs.writeFile(path + "/index.html", page, () => { console.log(`created ${path}`) })
    });
}

function buildArchivePage(site, comics, template) {
    let page = template(site, comics)
    let path = `./www/archive`
    if(!fs.existsSync(path)){ fs.mkdirSync(path) }
    fs.writeFile(path + "/index.html", page, () => { console.log(`created ${path}`) })
}
