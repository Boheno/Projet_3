async function seConnecter(){
    let nomUtilisateur = document.getElementById("userEmail").value;
    let motDePasse = document.getElementById("password").value;

    let donnees = {
        userEmail: nomUtilisateur,
        password: motDePasse
    };

let loginRecuperation = await fetch("http://localhost:5678/api/users/login",{ 
    method:"post",
    headers:{"Content-type":"application/json"},
    body: {
        "qqchose": JSON.stringify(donnees)
    }
})
.then(response => response.json())
.then(data => {
    if (data.success){
        console.log("bravo");//Renvoyer vers la page d'accueil
    } else {
        console.log("nope");//indiquer Email ou mdp incorrect
    }
 })
}
// + sauvegarde du token pour l'ajout ou supp de projets

//Fonction de listenner du bouton se connecter, importer via html le bouton, submit avec event.preventDefault()
function btnConnecter (){
    let btnSeConnecter = document.querySelector(".btn-connection");

    btnSeConnecter.onclick = () => {
        console.log("cliqué")
    }
    
}
btnConnecter()
seConnecter()