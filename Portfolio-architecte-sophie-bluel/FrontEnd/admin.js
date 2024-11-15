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
        //document.querySelector(".ajoutPhoto").style.display = "none";
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
        let container = document.createElement("div");
        container.classList.add("image-container");

        works.forEach(work => {;
        let imageModal = document.createElement("img");
        imageModal.classList.add("img");
        imageModal.src = work.imageUrl;
        container.appendChild(imageModal);

        let iconeTrash = document.createElement("i");
        iconeTrash.classList.add("fa-solid", "fa-trash-can");
        container.appendChild(iconeTrash);

        modal.appendChild(container);
        });
        
        //Barre séparation
        let barreModale = document.createElement("hr");
        barreModale.classList.add("barre-modale");
        modal.appendChild(barreModale);

        //Bouton ajout photo
        let btnAjoutPhoto = document.createElement("button");
        btnAjoutPhoto.classList.add("btn-connection");
        btnAjoutPhoto.innerHTML = "Ajouter une photo";
        modal.appendChild(btnAjoutPhoto);

//Ouverture de l'autre fenêtre modale
btnAjoutPhoto.onclick = function(){
let modalAjout = document.createElement("div")
modalAjout.classList.add("ajoutPhoto");

//flèche précedent <i class="fa-solid fa-arrow-left"></i>

let titreAjout = document.createElement("h3");
titreAjout.classList.add("titre-modale");
titreAjout.innerHTML = "Ajout photo";
modal.appendChild(titreAjout);

//Ajout de projet: rectangle, logo img, btn ajouter photo, <p> jpg, png: 4mo max

//Formulaire Titre et Catégorie
let ajoutTitreProjet = document.createElement("form");
let labelProjet = document.createElement("label");
let inputProjet = document.createElement("input");

labelProjet.textContent = "Titre";
labelProjet.setAttribute("for", "form-ajout");
inputProjet.setAttribute("type", "text");
inputProjet.setAttribute("id", "form-ajout");

ajoutTitreProjet.appendChild(labelProjet);
ajoutTitreProjet.appendChild(inputProjet);
modal.appendChild(ajoutTitreProjet);

let ajoutCategoryProjet = document.createElement("form");
let labelCategory = document.createElement("label");
let inputCategory = document.createElement("input");

labelCategory.textContent = "Catégorie";
labelCategory.setAttribute("for", "form-ajout");
inputCategory.setAttribute("type", "text");
inputCategory.setAttribute("id", "form-ajout");

ajoutCategoryProjet.appendChild(labelCategory);
ajoutCategoryProjet.appendChild(inputCategory);
modal.appendChild(ajoutCategoryProjet);


//Barre séparation
let barreModaleAjout = document.createElement("hr");
barreModaleAjout.classList.add("barre-modale");
modal.appendChild(barreModaleAjout);

//Bouton valider
let btnAjoutValide = document.createElement("button");
btnAjoutValide.classList.add("btn-connection");
btnAjoutValide.setAttribute("id", "valider");
btnAjoutValide.innerHTML ="Valider";
modal.appendChild(btnAjoutValide);
//if champ remplis > clickable + changement background (gris > vert)


    titreModal.style.display="none";
    container.style.display="none";
    barreModale.style.display="none";
    btnAjoutPhoto.style.display="none";
}

    document.querySelector("main").appendChild(backGroundModal);
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
