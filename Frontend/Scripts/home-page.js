document.addEventListener("DOMContentLoaded", async()=>{
    const token = localStorage.getItem('token')

    if(!token){
        window.location.href = '/login'
        return
    }

    try{
        const res = await fetch('/profile' , {
            method :'GET',
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })

        if(!res.ok){
            localStorage.removeItem('token')
            window.location.href = '/login'
        }

    }catch(err){
        console.error(err)
        window.location.href = '/login'
    }
})