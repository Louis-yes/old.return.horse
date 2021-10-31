export default function navMenu(site){
    return `
    <nav class="nav" aria-label="site navigation">
        <a class="nav-element link" href="${site.url}/archive">archive</a>
        <a class="nav-element link" href="${site.url}/manifesto">manifesto</a>
        <a class="nav-element link" href="#">random</a>
    </nav>
    `
}
