# return.horse
This repo contains my rudimentary webcomic static site builder for return.horse.

Package scripts are:
- build: Builds site to `/www`. `--production` flag to build for production.
- watch: Watches for changes and runs the build script without production flag
- serve: Uses a global browser-sync installation to start a hot reloading server in the `/www` dir and watches `/www/index.html` for changes

Static pages are kept in the `/content/pages` dir, as `index.md` which is parsed and built with the `/templates/templatePage` template
Comics are kept in the `/content/posts` dir, as comic.json and also any other assets they require, probably just jpgs.
They're built with the `/templates/templateComic` template.  

Comic.json looks like  
```js
{  
    "date" : "dd-mm-yyyy", // date to be published  
    "title" : "title", // title of comic  
    "path" : "path", // directory or url path to use (should be the same as the directory name in posts)  
    "desc" : "comic desc", // this is used for meta tags and other htings  
    "data" : { // not sure what else to include in data thats not panels, but we will see  
        "panels" : [  
            {  
                "img" : "img path", // path to panel img   
                "alt" : "alt text",   
                "text" : "text in comic", // this is used for extending alt text and for allowing searching and other data processing  
                "hovertext" : "text to display on hover" // many webcomics have extra throwaway jokes when you hover and it's a delightful addition to the form imo  
            }  
        ]  
    }  
}
```

A blank template for comic.json can be found at `/theforge/comicTemplate.json`
`/theforge` is where I'm keeping all the materials for the actual creation of a comic.
Currently it's an illustrator, I'd like to make a tool that just does it wih text input and can automatically create the `/posts/path` directory with the `comic.json` and images, but that's still in development

An archive page is generated from the comics and the `/templates/templateArchive`

Browser scripts and css are stored in the `/content/{js, css}` and copied to `/www` on build 

`/components/*` contains smaller, repeated tags or content that I want to use in various templates, or just things I want to abstract from the templates. Components can return anything, usually a chunk of html as a string, templates must return a full and correct html document as a string