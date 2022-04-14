if ('token' in response){
    swal("Success", response.message, "success",{
      buttons: false,
      timer:2000,
    })
    .then((value)=>{
      console.log(response)
      localStorage.setItem('token', response['token'])
      localStorage.setItem('user', JSON.stringify(response['email']))
      window.location.href ="/profile"
    })
 } else{
   swal("failed", response.message," error")
 }
}