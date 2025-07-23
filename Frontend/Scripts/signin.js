const btn_page_cadastro = document.querySelector("#btn_login_sigin").addEventListener("click",()=>{
    window.location.href = "/login"
})

const senhaInput = document.getElementById('senha')
const repSenhaInput = document.getElementById('repSenha')
const toggleOlho = document.getElementById('toggleSenha')
const toggleOlho2 = document.getElementById('toggleSenha2')

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
            alert(data.msg) 
        }
    }catch(err){
        alert("Erro interno do servidor")
        console.log(err)
    }
    
})