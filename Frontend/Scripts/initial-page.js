const planos = document.querySelector("#Planos")

function criarElemento(){
    const j_modal=document.createElement("div")
    const modal = document.createElement("div")
    j_modal.id='janela-modal'
    j_modal.classList.add('janela-modal')   
    modal.classList.add('modal')
    j_modal.appendChild(modal)
    return j_modal
}

a_planos_modal=[
    ()=>{
        const plano_anual = criarElemento()
        plano_anual.firstElementChild.innerHTML=
        `<h1>Plano Anual</h1>
        <hr>
        <h2>12 meses de acesso com o  melhor custo-benefício para a gestão do seu agronegócio.</h2>
        <div id="">
            <span class="moeda">R$</span>
            <span class="valor">40,00</span>
            <span class="data">/mês</span>
        </div>
        <button class="btn_modal">Assinar Plano Anual</button>
        <p> ✔️ Maior economia em relação ao plano mensal<br>
            ✔️ Ferramentas completas para otimizar sua safra<br>
            ✔️ Relatórios detalhados e suporte premium
        </p> `

        return plano_anual
    },
    ()=>{
        const plano_semestral = criarElemento()
        plano_semestral.firstElementChild.innerHTML=
        `<h1>Plano Semestral</h1>
        <hr>
        <h2>6 meses de acesso com um desconto especial em relação ao plano mensal.</h2>
        <div id="">
            <span class="moeda">R$</span>
            <span class="valor">60,00</span>
            <span class="data">/mês</span>
        </div>
        <button class="btn_modal">Assinar Plano Semestral</button>
        <p> ✔️ Todas as funcionalidades do plano mensal<br>
         ✔️ Relatórios avançados para planejamento da safra<br>
          ✔️ Suporte técnico priorizado
        </p> `

        return plano_semestral
    },
    ()=>{
        const j_modal=document.createElement("div")
        const modal = document.createElement("div")
        j_modal.id='janela-modal'
        j_modal.classList.add('janela-modal')   
        modal.classList.add('modal')
        j_modal.appendChild(modal)
        planos.appendChild(j_modal)
        modal.innerHTML=
        `<h1>Plano Mensal</h1>
        <hr>
        <h2>Acesso imediato a todas as ferramentas do nosso software de gestão agrícola!</h2>
        <div id="">
            <span class="moeda">R$</span>
            <span class="valor">80,00</span>
            <span class="data">/mês</span>
        </div>
        <button class="btn_modal">Assinar Plano Mensal</button>
        <p> ✔️ Monitoramento em tempo real das suas lavouras <br>
            ✔️ Relatórios e insights para melhorar a produtividade <br>
            ✔️ Cadastro e controle de insumos, maquinário e mão de obra
        </p> `
        return j_modal
    }
]

const btn_anual = document.querySelector("#Anual-plan")
const btn_semestral = document.querySelector("#Semestral-plan")
const btn_mensal = document.querySelector("#Mensal-plan")

btn_anual.addEventListener("click",(e)=>{
    const anual = a_planos_modal[0]()
    planos.appendChild(anual)
    
    anual.addEventListener("click",(e)=>{
        if(e.target.id == 'fechar' || e.target.id == 'janela-modal'){
            anual.remove()
        }
    })
})

btn_semestral.addEventListener("click",(e)=>{
    const semestral = a_planos_modal[1]()
    planos.appendChild(semestral)

    semestral.addEventListener("click",(e)=>{
        if(e.target.id == 'fechar' || e.target.id == 'janela-modal'){
            semestral.remove()
        }
    })

})

btn_mensal.addEventListener("click",(e)=>{
    const mensal = a_planos_modal[2]()
    planos.appendChild(mensal)

    mensal.addEventListener("click",(e)=>{
        if(e.target.id == 'fechar' || e.target.id == 'janela-modal'){
            mensal.remove()
        }
    })
})

const btn_card_1 = document.querySelector("#btn-card1").addEventListener("click", ()=>{
    window.location.href = '/sigin'
})