import templatePage from "./templatePage.js";
export default function templateArchive(site, comics) {
    const list = `
    <ul class="archive">
        ${comics.map(cc => {
            return `<li><a href="${site.url}/${cc.path}">${cc.title}</a></li>`
        }).join("")}
    </ul>`
    return templatePage(site, { meta: {title: "Archive"}, content: list })
}