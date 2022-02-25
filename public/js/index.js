
const Name  = document.getElementById('form3Example1cg')
const emails =document.getElementById('form3Example3cg')
const passwords =document.getElementById('form3Example4cg')
const PasswordCofirms = document.getElementById('form3Example4cdg')
const nameError = document.getElementById('nameerror')
const passwordError =document.getElementById('passwordError')
const passwordChecking =document.getElementById('checkPassword')
const sucessFully =document.getElementById('suceessalert')
const form = document.getElementById('form')


form.addEventListener('submit',async(event)=>{
    event.preventDefault()
        const name=Name.value;
        const email=emails.value;
       const password =passwords.value;
       const  PasswordCofirm  =PasswordCofirms.value;
  
    if(name.length<3){
      nameError.innerHTML ='The name must be 3+ char long'
    }

    if(password.length<5){
        passwordError.innerHTML ="The Password must be 5+ char long"
    }
    
     if(password!=PasswordCofirm){ 
         alert(PasswordCofirm)
         passwordChecking.innerHTML='please fill password and cofirm Password will be Not save && please div the save password'
     }
  
      let data ={
                name :name,
                email: email,
                password: password,
                PasswordCofirm:PasswordCofirm
              }
      await fetch('/pages-register',{
          method: 'POST',
          headers:{
             'Content-Type':'application/json'
          },
          body:JSON.stringify(data)
          
      })
      .then((Response)=>{
          console.log(Response)
           if(Response.status==200){
              sucessFully.innerHTML='User Login SucessFully'
           }
           if(Response.status==400){
            sucessFully.innerHTML='User is Already exists'
           }
      })
      .catch((err)=>{
          if(err){
            sucessFully.innerHTML='InterNal server Error'
          }
      })
    

})


