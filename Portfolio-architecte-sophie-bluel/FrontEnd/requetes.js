//Fonction de suppression de travaux, la page ne doit pas être rechargée pour voir la modif
export async function suppressionProjets(id) {
    const token = localStorage.getItem("token");
    let response = await fetch(`http://localhost:5678/api/works/${id}`, {
        method: "DELETE",
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
}

//Methode POST d'un projet
export async function ajoutProjet (FormData) { 
    console.log(FormData)
    let envoieProjetForm = await fetch("http://localhost:5678/api/works", {
    method:"POST",
    headers:{
        "Authorization": `Bearer ${localStorage.getItem("token")}`},
    body: FormData
    })
//.then(event.preventDefault)
.then(response =>response.json())
//.then (alert("Nouveau projet ajouté !"))
}
//Fonction notification projet ajouté

// export async function afficherNotification(){
//     let notification = document.createElement("div");
//     notification.textContent = "Nouveau projet ajouté !";
//     notification.classList.add("notification");
//     document.querySelector("#titreProjets").appendChild(notification);

//     setTimeout(() => {
//         notification.remove();
//     }, 30000);
// }
