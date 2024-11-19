//Fonction de suppression de travaux, la page ne doit pas être rechargée pour voir la modif
export async function suppressionProjets (){
    let works = await fetch("http://localhost:5678/api/works");
    let deleteProjet = document.getElementById(works["id"]);
    let response = await fetch("http://localhost:5678/api/works",{
        method: "DELETE",
    })
}

//Methode POST d'un projet
//let envoieProjetForm = fetch("https://", {
//method:"POST",
//body: lala,
//headers:{blabla}
//})
//.then(response =>response.json())