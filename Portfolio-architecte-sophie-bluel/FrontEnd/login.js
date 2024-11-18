async function seConnecter(){
    let nomUtilisateur = document.getElementById("userEmail").value;
    let motDePasse = document.getElementById("password").value;
    let errorMessage = document.getElementById("error-message");

    let donnees = {
        email: nomUtilisateur,
        password: motDePasse
    };

let loginRecuperation = await fetch("http://localhost:5678/api/users/login",{ 
    method:"POST",
    headers:{"Content-type":"application/json"},
    body: JSON.stringify(donnees)
    
})
.then(async response =>  {
    if (response.ok) {
        const data = await response.json();
        console.log(data.token)
        let token = data.token;
        console.log(token)
        localStorage.setItem("token", token);
        window.location.href = "index.html";
    } else {
        errorMessage.innerText = "Email ou mot de passe incorrect, veuillez essayer à nouveau";
    } 
})
}

//Fonction de listenner du bouton se connecter, importer via html le bouton, submit avec event.preventDefault()
function btnConnecter (){
    let btnSeConnecter = document.querySelector(".btn-connection");

    btnSeConnecter.onclick = () => {
        event.preventDefault();
        console.log("cliqué");
        seConnecter()
    };
}
btnConnecter()

//Fonction gestion d'erreurs identification
// let form = document.getElementById("form");

// function gestionErreurs(form){
// let champsInput = document.querySelectorAll(".input-form");
// champsInput.addEventListener ("submit",(event)=> {
//     event.preventDefault()
//     let inputEmail = document.getElementById("userEmail");
//     //let inputPassword = document.getElementById("password");
//     let valeurInput = inputEmail.value;

//     if (valeurInput === ""){
//         console.log("le champ est vide")
//     } else{
//         console.log ("le champ est rempli")
//     };
// })   
// }