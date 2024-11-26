import { afficherNotification } from "./index.js";

//Suppression d'un projet
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

//Ajout d'un projet
export async function ajoutProjet (FormData) { 
    console.log(FormData)
    let envoieProjetForm = await fetch("http://localhost:5678/api/works", {
    method:"POST",
    headers:{
        "Authorization": `Bearer ${localStorage.getItem("token")}`},
    body: FormData
    })
.then(response =>response.json())
}
if (ajoutProjet){
    afficherNotification();
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
