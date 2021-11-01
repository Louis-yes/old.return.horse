export default function navMenu(site){
    return `
    <nav class="nav" aria-label="site navigation">
        <a class="nav-element link" href="${site.url}">home</a>
        <a class="nav-element link" href="${site.url}/archive">archive</a>
        <a class="nav-element link" href="${site.url}/manifesto">manifesto</a>
        <a class="nav-element link" id="random" href="">random</a>
    </nav>
    `
}
