
function mostrarResultados(results) {
    const contenedorEl = document.querySelector("#resultados")
    const templateEl = document.querySelector("#template")

    for(const r of results){

        const imgEl = templateEl.content.querySelector(".img")
        imgEl.src = r.thumbnail

        const titleEl = templateEl.content.querySelector(".title-prod")
        titleEl.textContent = r.title

        const descripEl = templateEl.content.querySelector(".descrip-prod")
        if(r.condition == "not_specified"){
            descripEl.textContent = "Desconocido"
        }else{
            const firstLetter = r.condition[0].toUpperCase();
            const rest = r.condition.slice(1)
            const theCondition = firstLetter + rest
            descripEl.textContent = theCondition
        }

        const priceEl = templateEl.content.querySelector(".precio-prod")
        priceEl.textContent = "$ " + r.price

        const clone = document.importNode(templateEl.content, true)
        contenedorEl.appendChild(clone)
    }
}

function main(){
    const formEl = document.querySelector("#buscador")
    formEl.addEventListener("submit", (e) =>{
        e.preventDefault();
        const palabra = e.target.palabra.value;
        fetch("https://api.mercadolibre.com/sites/MLA/search?q=" + palabra)
        .then((response) => response.json())
        .then((data) => mostrarResultados(data.results))
    })
}

main()