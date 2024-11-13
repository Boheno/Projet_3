//import {generateWorks} from "./projets.js";


// Récupération des projets
const works = await fetch("http://localhost:5678/api/works")
  .then(reponse => {
    if (reponse.ok) {
      return reponse.json();
    } 
  })
  generateWorks(works);
// Récupération des catégories
// const categories = await fetch("http://localhost:5678/api/categories")
//   .then(categories => 
//     categories.json())

function generateWorks(works) {
    works.forEach(work => {;
    //for (let i=0; i<works.length; i++) {  => avec cette méthode, rajouter S à work et [i]
  
      let worksElement  = document.createElement("figure");
      let imageWorks    = document.createElement("img");
      let captionWorks  = document.createElement("figcaption");
  
      imageWorks.src          = work.imageUrl;
      captionWorks.innerText  = work.title;
      worksElement.setAttribute("data-categorie", work.categoryId)
      worksElement.classList.add("projet");
  
      worksElement.appendChild(imageWorks);
      worksElement.appendChild(captionWorks);
      
      document.querySelectorAll(".gallery").innerHTML = worksElement;
      document.querySelector(".gallery").appendChild(worksElement);
    }) 
  }



//Fonction création de la modale et son contenu
async function modale (){
    let modal = document.createElement("div");
    let modalContent = document.createElement("div");
    let closeBtn = document.createElement("span");

    modal.classList.add("modal");
    modalContent.classList.add("modal-content");
    closeBtn.classList.add("close");
    closeBtn.innerHTML ="&times;";

    modal.appendChild(modalContent);
    modal.appendChild(closeBtn);

    document.body.appendChild(modal);
    window.onclick = function (event){
        if (event.target === modal)
            modal.style.display = "none"
    }
}
//Gestion des contenus
//Bouton pour ouvrir la modale
//let btnModal = document.querySelector(".boutons-modifier");

let openModalBtn = document.querySelector("button");
//openModalBtn.textContent = "Modifier";
//openModalBtn.type = "button";
openModalBtn.onclick = () => modale();
//document.querySelector(".boutons-modifier").innerHTML=openModalBtn;
//document.querySelector(".projets-titre").appendChild(openModalBtn);
