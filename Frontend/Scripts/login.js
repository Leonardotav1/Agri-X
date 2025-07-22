document.querySelector("#btn_login_sigin").addEventListener("click", () => {
        window.location.href = '/sigin'
    })

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

                const check = await fetch("/profile", {
                    method:'GET',
                    headers:{
                        'Authorization':`Bearer ${token}`
                    }
                })

                if(check.ok){
                    window.location.href = '/homePage'
                }
           
            }

        } catch (err) {
            console.log(err)
            alert('Erro ao tentar realizar login')
        }
    })