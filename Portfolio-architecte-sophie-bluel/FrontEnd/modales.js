import {suppressionProjets} from "./requetes.js";
import {ajoutProjet} from "./requetes.js";


// Récupération des projets
const works = await fetch("http://localhost:5678/api/works")
  .then(reponse => {
    if (reponse.ok) {
      return reponse.json();
    } 
  })
// Récupération des catégories
const categories = await fetch("http://localhost:5678/api/categories")
  .then(categories => 
    categories.json())

//Fonctions pour les modales
let isModalCreated = false;

//Fonction pour réinitialiser l'écran de la modale à son ouverture
export function resetModalContent(){
    let initialElement = document.querySelectorAll(".modal");
    initialElement.forEach(element =>{
        element.style.display ="block";
    })
    let newElement = document.querySelectorAll(".ajoutPhoto");
    newElement.forEach(element =>{
        element.style.display = "none";
       // element.value="";
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
    //Bouton fermeture
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
    modal.appendChild(container);

    works.forEach(work => {;
    let divimg = document.createElement("div");
    divimg.classList.add("div-img");
    let imageModal = document.createElement("img");
    imageModal.classList.add("img");
    imageModal.setAttribute("id", work["id"])
    imageModal.src = work.imageUrl;
    //Icone poubelle
    let iconeTrash = document.createElement("i");
    iconeTrash.classList.add("fa-solid", "fa-trash-can", "icone");
    iconeTrash.id = work["id"]
    
    iconeTrash.onclick = () => suppressionProjets(iconeTrash.id);

    divimg.appendChild(imageModal);
    divimg.appendChild(iconeTrash);
    container.appendChild(divimg);
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
   //Bouton fermeture
    let modalContentAjout = document.createElement("div");
    let closeBtnAjout     = document.createElement("button");
    
    modalContentAjout.classList.add("modal-content");
    closeBtnAjout.classList.add("close");
    closeBtnAjout.classList.add("ajout");
    closeBtnAjout.innerHTML ="&times;";
    
    modalContentAjout.appendChild(closeBtnAjout);
    modalAjout.appendChild(modalContentAjout);
    //Fermeture fenêtre
    closeBtnAjout.onclick = function(){
        fermetureModale(modal);
        fermetureModale(backGroundModal);
        fermetureModale(document.querySelector(".ajoutPhoto"));
    }
    //Flèche page précédente
    let pagePrecedente = document.createElement("button");
    let arrowPagePrecedente = document.createElement("i");
    pagePrecedente.classList.add("button-precedent");
    arrowPagePrecedente.classList.add("fa-solid", "fa-arrow-left");
    pagePrecedente.appendChild(arrowPagePrecedente);
    modalAjout.appendChild(pagePrecedente);

    pagePrecedente.onclick = () => {
        modal.style.display         ="block";
        modalAjout.style.display    ="none";
    }

    //Titre page
    let titreAjout = document.createElement("h3");
    titreAjout.classList.add("titre-modale");
    titreAjout.innerHTML = "Ajout photo";
    modalAjout.appendChild(titreAjout);

    //Ajout de projet: rectangle, logo img, btn ajouter photo, <p> jpg, png: 4mo max
    let fenetreAjout = document.createElement("div");
    let iconeFenetre = document.createElement("i");
    let ajoutFormulaire = document.createElement("button");
    let conditionPhoto = document.createElement("p");
    let inputPhoto = document.createElement("input");
    
    conditionPhoto.innerHTML = "jpg, png: 4mo max";
    ajoutFormulaire.innerHTML = "+ Ajouter photo";
    conditionPhoto.classList.add("condition-photo");
    ajoutFormulaire.classList.add("ajout-formulaire");
    iconeFenetre.classList.add("fa-regular", "fa-image");
    fenetreAjout.classList.add("fenetre-ajout");
    inputPhoto.type = "file";
    inputPhoto.style.display = "none";
    
    fenetreAjout.appendChild(iconeFenetre);
    fenetreAjout.appendChild(ajoutFormulaire);
    fenetreAjout.appendChild(conditionPhoto);
    fenetreAjout.appendChild(inputPhoto);
    modalAjout.appendChild(fenetreAjout);

    ajoutFormulaire.onclick = () => { inputPhoto.click();};
    inputPhoto.addEventListener("change", (event)=>{
        let file = event.target.files[0];
        if (file){
            let reader = new FileReader();
            reader.onload = (e) => {
                let newImage = document.createElement("img");
                newImage.src = e.target.result;
                newImage.classList.add("new-img");
                fenetreAjout.replaceChild(newImage, iconeFenetre);
                ajoutFormulaire.style.display = "none";
                conditionPhoto.style.display = "none";
            };
            reader.readAsDataURL(file);
        }
    })

    //Formulaire Titre et Catégorie
    //Titre
    let divForm = document.createElement("div");
    divForm.classList.add("div-form");
    let ajoutTitreProjet = document.createElement("form");
    let labelProjet = document.createElement("label");
    let inputProjet = document.createElement("input");

    labelProjet.textContent = "Titre";
    labelProjet.setAttribute("for", "form-ajout");
    inputProjet.setAttribute("type", "text");
    inputProjet.setAttribute("id", "form-ajout");

    ajoutTitreProjet.appendChild(labelProjet);
    ajoutTitreProjet.appendChild(inputProjet);
    divForm.appendChild(ajoutTitreProjet);
    //Catégories
    let ajoutCategoryProjet = document.createElement("form");
    let labelCategory = document.createElement("label");
    let inputCategory = document.createElement("select");

    labelCategory.textContent = "Catégorie";
    labelCategory.setAttribute("for", "category-select");
    inputCategory.setAttribute("type", "text");
    inputCategory.setAttribute("id", "category-select");

    ajoutCategoryProjet.appendChild(labelCategory);
    ajoutCategoryProjet.appendChild(inputCategory);
    divForm.appendChild(ajoutCategoryProjet);

    let blanckCategory = document.createElement("option");
    blanckCategory.textContent = "";
    inputCategory.appendChild(blanckCategory);

    for (let i = 0; i < categories.length; i++) {
        let newCategory = document.createElement("option");
        newCategory.textContent = categories[i]["name"];
        newCategory.setAttribute("data-id-categorie", categories[i]["id"]);
        newCategory.classList.add("list-category");
        inputCategory.appendChild(newCategory);

        modalAjout.appendChild(divForm);
    }

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

    // function verifierChamps(){
    // let champs = document.querySelectorAll("input, text");
    // //     //let champSelect = document.querySelector("select");
    // let champsRemplis = Array.from(champs).every((input) => input.value.trim() !=="");
    // //     //let chanmpsSelectRemplis = Array.from(champSelect).every((select) => select.value.trim() !=="");

    // if (champsRemplis){
    // btnAjoutValide.classList.add("active");
    // btnAjoutValide.disabled = false;
    // } else {
    // btnAjoutValide.classList.remove("active");
    // btnAjoutValide.disabled = true;
    // }
    // }
    // document.querySelectorAll("form-ajout").addEventListener("input", verifierChamps)

    btnAjoutValide.onclick = () => ajoutProjet();
    
    document.body.appendChild(modalAjout);
    modalAjout.style.display = "block";
}
    modalAjout.style.display = "block";
}

    document.querySelector("main").appendChild(backGroundModal);
    document.body.appendChild(modal);
    
    backGroundModal.style.display = "block";
    modal.style.display           = "block";
    
    isModalCreated = true;

//Fermeture de la modale
function fermetureModale(element){
    if (element){
        element.style.display = "none"
    }
}
closeBtn.onclick = function(){
    fermetureModale(modal);
    fermetureModale(backGroundModal);
    fermetureModale(document.querySelector(".ajoutPhoto"));
};
backGroundModal.onclick = function(){
    fermetureModale(modal);
    fermetureModale(backGroundModal);
    fermetureModale(document.querySelector(".ajoutPhoto"));
}
}