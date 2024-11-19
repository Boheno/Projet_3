//import {generateWorks} from "./projets.js";


// Récupération des projets
const works = await fetch("http://localhost:5678/api/works")
  .then(reponse => {
    if (reponse.ok) {
      return reponse.json();
    } 
  })

//Fonctions pour les modales
let isModalCreated = false;

//Fonction pour réinitialiser l'écran de la modale à son ouverture
export function resetModalContent(){
    let initialElement = document.querySelectorAll(".titre-modale, .image-container, .close, .barre-modale, .btn-connection");
    initialElement.forEach(element =>{
        element.style.display ="block";
    })
    let newElement = document.querySelectorAll(".ajoutPhoto");
    newElement.forEach(element =>{
        element.style.display = "none";
    })
}

//Fonction création de la modale et son contenu
export function modale (){
    if(isModalCreated){
        document.querySelector(".modal").style.display ="block";
        document.querySelector(".modal-backGround").style.display ="block";
        resetModalContent();
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
    let modalAjout = document.querySelector(".ajoutPhoto");

    if(!modalAjout){
        modalAjout = document.createElement("div");
        modalAjout.classList.add("ajoutPhoto");
   
    let modalContentAjout = document.createElement("div");
    let closeBtnAjout     = document.createElement("button");
    
    modalContentAjout.classList.add("modal-content");
    closeBtnAjout.classList.add("close");
    closeBtnAjout.innerHTML ="&times;";
    
    modalContentAjout.appendChild(closeBtnAjout);
    modalAjout.appendChild(modalContentAjout);

    let pagePrecedente = document.createElement("button");
    let arrowPagePrecedente = document.createElement("i");
    pagePrecedente.classList.add("button-precedent");
    arrowPagePrecedente.classList.add("fa-solid", "fa-arrow-left");
    pagePrecedente.appendChild(arrowPagePrecedente);
    modalAjout.appendChild(pagePrecedente);

    //flèche précedent onclick à faire
    pagePrecedente.onclick = () => {
        modal.style.display         ="block";
        titreModal.style.display    ="block";
        container.style.display     ="block";
        modalContent.style.display  ="block";
        barreModale.style.display   ="block";
        btnAjoutPhoto.style.display ="block";
        modalAjout.style.display    ="none";
    }

    let titreAjout = document.createElement("h3");
    titreAjout.classList.add("titre-modale");
    titreAjout.innerHTML = "Ajout photo";
    modalAjout.appendChild(titreAjout);

    //Ajout de projet: rectangle, logo img, btn ajouter photo, <p> jpg, png: 4mo max
    let fenetreAjout = document.createElement("div");
    let iconeFenetre = document.createElement("i");
    let ajoutFormulaire = document.createElement("button");
    ajoutFormulaire.innerHTML = "+ Ajouter photo";
    let conditionPhoto = document.createElement("p");
    conditionPhoto.innerHTML = "jpg, png: 4mo max";

    conditionPhoto.classList.add("condition-photo");
    ajoutFormulaire.classList.add("ajout-formulaire");
    iconeFenetre.classList.add("fa-regular", "fa-image");
    fenetreAjout.classList.add("fenetre-ajout");
    
    fenetreAjout.appendChild(iconeFenetre);
    fenetreAjout.appendChild(ajoutFormulaire);
    fenetreAjout.appendChild(conditionPhoto);
    modalAjout.appendChild(fenetreAjout);

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
    modalAjout.appendChild(ajoutTitreProjet);

    let ajoutCategoryProjet = document.createElement("form");
    let labelCategory = document.createElement("label");
    let inputCategory = document.createElement("input");

    labelCategory.textContent = "Catégorie";
    labelCategory.setAttribute("for", "form-ajout");
    inputCategory.setAttribute("type", "text");
    inputCategory.setAttribute("id", "form-ajout");

    ajoutCategoryProjet.appendChild(labelCategory);
    ajoutCategoryProjet.appendChild(inputCategory);
    modalAjout.appendChild(ajoutCategoryProjet);


    //Barre séparation
    let barreModaleAjout = document.createElement("hr");
    barreModaleAjout.classList.add("barre-modale");
    modalAjout.appendChild(barreModaleAjout);

    //Bouton valider
    let divBtn = document.createElement("div");
    let btnAjoutValide = document.createElement("button");
    divBtn.classList.add("div-btn");
    btnAjoutValide.classList.add("btn-connection");
    btnAjoutValide.setAttribute("id", "valider");
    btnAjoutValide.innerHTML ="Valider";
    divBtn.appendChild(btnAjoutValide);
    modalAjout.appendChild(divBtn);
    //if champ remplis > clickable + changement background (gris > vert)
    
    document.body.appendChild(modalAjout);
    //modalAjout.style.display = "block";
}
    titreModal.style.display="none";
    container.style.display="none";
    modalContent.style.display="none";
    barreModale.style.display="none";
    btnAjoutPhoto.style.display="none";
    modal.style.display="none";

    modalAjout.style.display = "block";
}

    document.querySelector("main").appendChild(backGroundModal);
    document.body.appendChild(modal);
    
    backGroundModal.style.display = "block";
    modal.style.display           = "block";
    
    isModalCreated = true;

    //Fermeture de la modale
    closeBtn.onclick = function (){
            modal.style.display           = "none";
            backGroundModal.style.display = "none";

            let modalAjout = document.querySelector(".ajoutPhoto");
            if (modalAjout) {
                modalAjout.style.display = "none";
            }
    }
    backGroundModal.onclick = function (event){
        if (event.target === backGroundModal){
            modal.style.display           = "none";
            backGroundModal.style.display = "none";
        }
        let modalAjout = document.querySelector(".ajoutPhoto");
            if (modalAjout) {
                modalAjout.style.display = "none";
            }
    }
}