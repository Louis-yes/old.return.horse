
import meta from "../components/Meta.js"
import styles from "../components/Styles.js"
import navMenu from "../components/NavMenu.js"
import Scripts from "../components/Scripts.js"

/**
 * 
 * @param {title, description, author, colours} site  
 * @param { {meta} , content} page 
 */
export default function templatePage(site, page) {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <script src="https://unpkg.com/swup@latest/dist/swup.min.js"></script>
        ${meta({title: page.meta.title + " | " + site.title})}
        ${styles(site)}
    </head>
        <body>
            <main class="transition-fade">
                <div class="page">
                    ${page.content}
                </div>
            </main>
            ${navMenu(site)}
            ${Scripts(site)}
            </body>
    </html>
    `
}