export default function Scripts(site, comics){
    return `
        ${comics ? `<script> window.comics = ${JSON.stringify(comics)}; </script>`: ""}
        ${site ? `<script> window.site = ${JSON.stringify(site)}; </script>` : ""} 
        <script src="${site.url}/js/scripts.js"></script>
    `
}