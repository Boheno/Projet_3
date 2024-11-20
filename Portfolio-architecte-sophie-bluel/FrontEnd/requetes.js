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
export async function ajoutProjet (){ 
    let photo = document.querySelector(".new-img").value;
    let titre = document.getElementById("form-ajout").value;
    let categoriesAjout = document.getElementById("category-select").value;

    let donneesProjet = {
        Image: photo,
        title: titre,
        category: categoriesAjout
    }

    let envoieProjetForm = await fetch("http://localhost:5678/api/works", {
    method:"POST",
    headers:{
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
        "Content-type":"application/json"},
    body: JSON.stringify(donneesProjet)
    })
.then(response =>response.json())
//+ apparition du projet à gérer?
}