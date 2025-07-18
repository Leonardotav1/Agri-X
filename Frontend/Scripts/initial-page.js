const planos = document.querySelector("#Planos")
const anual = document.getElementById("anual-plan")
const janela_modal = document.getElementById("janela_modal")
const modal = document.getElementById("modal")
const btns_planos = [...document.querySelectorAll(".valores")]
const janelas_planos = [...document.querySelectorAll(".janela_planos")]

// Evento de clique para os cards com os planos
btns_planos.forEach((el, i) => {
    // Evento de clique responsável por exibir a janela modal
    el.addEventListener("click", () => {
        const plano = janelas_planos[i]
        janela_modal.style.display = 'flex '
        plano.style.display = 'flex'
        janela_modal.appendChild(plano)

        // Evento de clique responsável por fechar a janela modal.
        janela_modal.addEventListener("click", (e)=>{
            if(e.target.id == 'janela_modal'){
                janela_modal.style.display = 'none'
                janela_modal.firstElementChild.remove() 
            }
        })
    })
})
