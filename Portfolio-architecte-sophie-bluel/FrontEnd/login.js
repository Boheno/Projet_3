async function seConnecter(){
    let nomUtilisateur = document.getElementById("userEmail").value;
    let motDePasse = document.getElementById("password").value;

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
        window.location.href = "projets.html";
    } else {
        alert("Email ou mot de passe incorrect");
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
        //fonction erreur if
    };
}
btnConnecter()

//Fonction gestion d'erreurs identification
function verifierChamps(form){
    
}