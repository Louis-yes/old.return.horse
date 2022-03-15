fetch("/comics.json")
  .then(response => response.json())
  .then(cc => {window.comics = cc})
fetch("/site.json")
  .then(response => response.json())
  .then(ss => {window.site = ss})

const rr = document.querySelector("#random")
rr.addEventListener("mouseover", (e)=>{
  if(rr && window.comics && window.site){
    let rn = Math.floor(window.comics.length * Math.random())
    rr.href = `${window.site.url}/${window.comics[rn].path}`
  }
})
