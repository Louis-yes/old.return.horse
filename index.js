/*
TODO
[ ] write site meta
[ ] make tool that works in ronin or somthing
[ ] only build new comics
[ ] deploy script - git subtree push --prefix www origin gh-pages
[ ] fix comic data list to be sideloaded
[ ] write correct description fro each panel
*/
import fs from "fs-extra"
import markdown from "markdown"

import comicTemplate from "./templates/templateComics.js"
import pageTemplate from "./templates/templatePage.js"
import templateArchive from "./templates/templateArchive.js"

const env = process.argv[2] == "--production" ? "prod" : "dev"
const buildPath = env === "prod" ? "./www" : "./dev"

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
    fs.writeFile(`${buildPath}/index.html`, comicTemplate(site, comics[0], comics), () => { console.log(`created ${buildPath}/index.html`) })
    // move assets over
        // js
    fs.copySync(`./content/js`, `${buildPath}/js`, {overwrite: true})
        // css
    fs.copySync(`./content/css`, `${buildPath}/css`, {overwrite: true})

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
        fs.copySync(`${pagesPath}/${pp.name}`, `${buildPath}/${pp.name}`, {overwrite: true})
        fs.writeFileSync(`${buildPath}/${pp.name}/index.html`, pp.html)
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
    }).filter(Boolean).filter((a) => {
        return new Date(a.date).getTime() < new Date().getTime()
    }).sort((a,b) => { 
        return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
    return comis
}

function buildComicPages(site, comics, template) {
    comics.forEach(comic => {
        let page = template(site, comic, comics)
        let path = `${buildPath}/${comic.path}`
        fs.copySync(`./content/posts/${comic.path}`, path, {overwrite: true})
        fs.writeFile(path + "/index.html", page, () => { console.log(`created ${path}`) })
    });
}

function buildArchivePage(site, comics, template) {
    let page = template(site, comics)
    let path = `${buildPath}/archive`
    if(!fs.existsSync(path)){ fs.mkdirSync(path) }
    fs.writeFile(path + "/index.html", page, () => { console.log(`created ${path}`) })
}
