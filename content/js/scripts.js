const options = {
    containers: ["main"]
  };
const swup = new Swup(options);
document.body.addEventListener('load', (e) => {
  if(e.target.tagName == 'IMG'){ e.target.classList.add("loaded") }
}, true)

const rr = document.querySelector("#random")
rr.addEventListener("mouseover", (e)=>{
  if(rr && window.comics && window.site){
    let rn = Math.floor(window.comics.length * Math.random())
    rr.href = `${window.site.url}/${window.comics[rn].path}`
  }
})
