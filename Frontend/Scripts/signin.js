const btn_page_cadastro = document.querySelector("#btn_login_sigin").addEventListener("click",()=>{
    window.location.href = "/login"
})

const senhaInput = document.getElementById('senha')
const repSenhaInput = document.getElementById('repSenha')
const toggleOlho = document.getElementById('toggleSenha')
const toggleOlho2 = document.getElementById('toggleSenha2')

// Eventos para exibir a senha nos campos do tipo password.
toggleOlho.addEventListener('click', () => {
    if (senhaInput.type === 'password') {
        senhaInput.type = 'text'
        toggleOlho.innerHTML = '🙉' // muda cor pra indicar ativo
        senhaInput.focus()
    }else {
        senhaInput.type = 'password'
        toggleOlho.innerHTML = '🙈' // cor normal
        senhaInput.focus()
    }    
})

toggleOlho2.addEventListener("click",()=>{
    if(repSenhaInput.type === 'password'){
        repSenhaInput.type = 'text'
        toggleOlho2.innerHTML= '🙉'
        repSenhaInput.focus()
    }else{
        repSenhaInput.type = 'password'
        toggleOlho2.innerHTML = '🙈'
        repSenhaInput.focus()
    }
})

// Evento de cadastro ao clicar no botão.
document.getElementById('form_login').addEventListener('submit', async function(e){
    e.preventDefault()
        
    const name = e.target.name.value
    const email = e.target.email.value
    const senha = e.target.senha.value
    const repSenha = e.target.repSenha.value
        
    try{
        const res = await fetch('/cadastro', {
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({ name, email, senha, repSenha })
        })

        const data = await res.json()

        if(res.ok){
            window.location.href = '/login'
        }else{
            const emailInput = document.querySelector('input[name="email"]')
            const senhaInput = document.querySelector('input[name="repSenha"')

            const errorActions = {
                'Já existe um usuário com esse email!': () => {
                    emailInput.value = ""
                    emailInput.focus()
                    emailInput.style.outline = '2px solid red'
                },
                'Senha incorreta, tente novamente!':() => {
                    senhaInput.value = ''
                    senhaInput.style.outline= '2px solid red'
                    senhaInput.focus()
                },
                'Erro ao cadastrar usuário': () => {
                    showAlert(data.msg)
                    setTimeout(()=>{
                        window.location.href = '/'
                    },2000)
                },
                'Erro interno': () => {
                    showAlert(data.msg)
                    setTimeout(()=>{
                        window.location.href = '/'
                    },2000)
                }
            }
            
            const actions = errorActions[data.msg]
            if(actions) actions() 

            showAlert(data.msg) 
            monitorInput(emailInput)
            monitorInput(senhaInput)

        }
    }catch(err){
        console.error(err)
        showAlert('Erro ao relizar o cadastro')
    }
    
})

// Função para exibição de mensagens de erros na tela.
function showAlert (msg){
    const alert = document.querySelector('.div_msg')
    alert.innerHTML = msg
    alert.classList.add('show')
}

//Função para remoção de mensagens de erros.
function clearAlert(){
    const alert = document.querySelector('.div_msg')
    alert.innerHTML = ''
    alert.classList.remove('show')
}

// Função para mudar o estilo do input ao digitar.
function monitorInput(input){
    input.addEventListener('input', () => {
        if(input.value.length >= 1){
            input.style.outline = 'none'
            clearAlert()
        }
    })
}

