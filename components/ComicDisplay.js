function next(comic, comics){
    let i = comics.findIndex(cc => cc.date === comic.date)
    if(i > 0){
        let path = comics[i-1].path
        return `
        <a href="/${path}" class="next">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
        </a>`
    } else {
        return '<div class="empty"></div>'
    }
}

function previous(comic, comics){
    let i = comics.findIndex(cc => cc.date === comic.date)
    if(i < comics.length -1){
        let path = comics[i+1].path
        return `
        <a href="/${path}" class="previous">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
            </svg>
        </a>`
    } else {
        return '<div class="empty"></div>'
    }
}

export default function comicDisplay(comic, comics){
    return  `
    <main class="main transition-fade">
        <header id="header" class="header">
            ${comic.title}
        </header>
        <div id="comic" class="comic">
            ${comic.data.panels.map(p => {
                return `<img src="/${comic.path}/${p.img}" alt="${p.alt}, the text reads ${p.text}" title="${p.hovertext}"/>` }
            ).join("")}
        </div>
        <nav id="comic-nav" class="comic-nav" aria-label="comic navigation">
        ${previous(comic, comics)}
        ${next(comic, comics)}
        </nav>
    </main>`
}
