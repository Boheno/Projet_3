//import {generateWorks} from "./projets.js";


// Récupération des projets
const works = await fetch("http://localhost:5678/api/works")
  .then(reponse => {
    if (reponse.ok) {
      return reponse.json();
    } 
  })
  generateWorks(works);


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
let isModalCreated = false;

async function modale (){
    if(isModalCreated){
        document.querySelector(".modal").style.display ="block";
        document.querySelector(".modal-backGround").style.display ="block";
        return;
    }

    let backGroundModal = document.createElement("div");
    backGroundModal.classList.add("modal-backGround");

    let modal        = document.createElement("div");
    let modalContent = document.createElement("div");
    let closeBtn     = document.createElement("button");

    modal.classList.add("modal");
    modalContent.classList.add("modal-content");
    closeBtn.classList.add("close");
    closeBtn.innerHTML ="&times;";

    modalContent.appendChild(closeBtn);
    modal.appendChild(modalContent);

    // Contenu de la modale: autre fonction?
        //Titre modale
        let titreModal = document.createElement("h3");
        titreModal.classList.add("titre-modale");
        titreModal.innerHTML = "Galerie photo";
        modal.appendChild(titreModal);
    
        //Images
    
        //Bouton ajout photo
        let btnAjoutPhoto = document.createElement("button");
        btnAjoutPhoto.classList.add("btn-connection");
        btnAjoutPhoto.innerHTML = "Ajouter une photo";
        modal.appendChild(btnAjoutPhoto);

    document.body.appendChild(backGroundModal);
    document.body.appendChild(modal);

    backGroundModal.style.display = "block";
    modal.style.display           = "block";

    isModalCreated = true;



    //Fermeture de la modale
    closeBtn.onclick = function (){
            modal.style.display           = "none";
            backGroundModal.style.display ="none";
    }
    backGroundModal.onclick = function (event){
        if (event.target === backGroundModal){
            modal.style.display           = "none";
            backGroundModal.style.display = "none";
        }
    }
}

//Ouverture modale
let openModalBtn = document.querySelector("button");
openModalBtn.onclick = () => modale();
