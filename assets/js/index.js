document.querySelector(".login-change-button").addEventListener("click", function(){
    if(document.getElementById("oldUsername") == username && document.getElementById("oldPassword") == password){
        var newUser = document.getElementById("newUsername")
        var newPass = document.getElementById("newPassword")
        
        window.location = `/admin/${newUser}/${newPass}`
    }
})