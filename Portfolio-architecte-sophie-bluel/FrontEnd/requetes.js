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
.then(response =>response.json())
//+ apparition du projet à gérer?
}