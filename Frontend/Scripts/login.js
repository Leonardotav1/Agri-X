document.querySelector("#btn_login_sigin").addEventListener("click", () => {
    window.location.href = '/sigin'
})

// Função responsável pelo login do usuário ao clicar no botão.
document.getElementById('form_login').addEventListener('submit', async function(e) {
    e.preventDefault()

    const email = e.target.email.value
    const senha = e.target.senha.value

    try{
        const res = await fetch('/connect', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, senha })
        })

        const data = await res.json()
        const token = data.token
            
        if(res.ok){
            localStorage.setItem('token', token)
            window.location.href = '/homePage'
        }else{
            const emailInput = document.querySelector('input[name="email"]')
            const senhaInput =  document.querySelector('input[name="senha"]')

            const errorActions = {
                'Senha incorreta!': () => {
                    senhaInput.value = ""
                    senhaInput.focus()
                    senhaInput.style.outline = '2px solid red'
                },
                'Usuário não encontrado':() => {
                    emailInput.value = ""
                    senhaInput.value = ""
                    emailInput.focus()
                    emailInput.style.outline = '2px solid red'
                },
                'Erro interno ao realizar o login': () => {
                    showAlert(data.msg)
                    setTimeout(()=>{
                        window.location.href = '/'
                    },2000)
                }
            }

            const action = errorActions[data.msg]
            if(action) action()

            showAlert(data.msg)
            monitorInput(emailInput)
            monitorInput(senhaInput)
            
        }

    } catch (err) {
        console.error(err)
        showAlert('Erro ao realizar o login')
    }
})

// Função para exibição de mensagens de erros.
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