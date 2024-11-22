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
        let token = data.token;
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
        seConnecter()
    };
}
btnConnecter()