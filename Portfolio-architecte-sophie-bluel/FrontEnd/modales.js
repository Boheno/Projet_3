import { afficherNotification } from "./index.js";
import {suppressionProjets} from "./requetes.js";
import {ajoutProjet} from "./requetes.js";
import { recupererCategories } from "./requetes.js";
import { recupererProjets } from "./requetes.js";
import { generateWork } from "./index.js";
import { supprimerProjetPage } from "./index.js";

let formDataCreationWork = new FormData();
let categories = await recupererCategories();

//Fonctions pour les modales
let isModalCreated = false;

//Fonction pour réinitialiser l'écran de la modale à son ouverture
export function resetModalContent() {

    let initialElement = document.querySelectorAll(".modal");
    initialElement.forEach(element =>{
        element.style.display ="block";
    })

    let newElement = document.querySelectorAll(".ajoutPhoto");
    newElement.forEach(element =>{
        element.style.display = "none";
    })

    let inputsAjouts = document.querySelectorAll(".ajoutPhoto input, .ajoutPhoto select");
    inputsAjouts.forEach(input => {
            input.value = "";
    })

    // Rétablissement de l'icone de la photo et suppression de l'image
    document.querySelector(".fenetre-ajout").removeChild(document.querySelector(".new-img"));
    document.querySelector(".ajout-formulaire").style.display = "block";
    document.querySelector(".condition-photo").style.display = "block";
    document.querySelector("#iconeAjoutPhoto").style.display = "block";
}

//Fonction création de la modale et son contenu
export async function modale () {

    const works = await recupererProjets();

    if (isModalCreated) {
        document.querySelector(".modal").remove();
        document.querySelector(".ajoutPhoto").remove();
        isModalCreated = false;
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

    // Contenu de la modale
    //Titre modale
    let titreModal = document.createElement("h3");
    titreModal.classList.add("titre-modale");
    titreModal.innerHTML = "Galerie photo";
    modal.appendChild(titreModal);
    
    //Images
    let container = document.createElement("div");
    container.classList.add("image-container");
    modal.appendChild(container);

    works.forEach(work => {
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
    
        iconeTrash.onclick = () => {
            suppressionProjets(iconeTrash.id).then(response => {
                fermetureModale(modal),
                fermetureModale(backGroundModal),
                fermetureModale(document.querySelector(".ajoutPhoto"))
                supprimerProjetPage(response)
                afficherNotification("Projet supprimé.")
                }
            );
    }

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
    btnAjoutPhoto.onclick = function() {
    let modalAjout = document.querySelector(".ajoutPhoto");

    if(!modalAjout) {
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

        // Formulaire pour l'ajout d'un projet
        let formulaireAjoutProjet = document.createElement("form");

        //Fenêtre ajout de projet
        let fenetreAjout = document.createElement("div");
        let iconeFenetre = document.createElement("i");
        let ajoutFormulaire = document.createElement("button");
        let conditionPhoto = document.createElement("p");
        let inputPhoto = document.createElement("input");
        
        conditionPhoto.innerHTML = "jpg, png: 4mo max";
        ajoutFormulaire.innerHTML = "+ Ajouter photo";
        ajoutFormulaire.type = "button";
        conditionPhoto.classList.add("condition-photo");
        ajoutFormulaire.classList.add("ajout-formulaire");
        iconeFenetre.classList.add("fa-regular", "fa-image");
        iconeFenetre.id = "iconeAjoutPhoto";
        fenetreAjout.classList.add("fenetre-ajout");
        inputPhoto.type = "file";
        inputPhoto.id = "inputPhoto"
        inputPhoto.style.display = "none";
        
        fenetreAjout.appendChild(iconeFenetre);
        fenetreAjout.appendChild(ajoutFormulaire);
        fenetreAjout.appendChild(conditionPhoto);
        fenetreAjout.appendChild(inputPhoto);
        formulaireAjoutProjet.appendChild(fenetreAjout);

        ajoutFormulaire.onclick = () => { inputPhoto.click();};
        inputPhoto.addEventListener("change", (event)=>{
            let file = event.target.files[0];
            if (file){
                let reader = new FileReader();
                reader.onload = (e) => {
                    let newImage = document.createElement("img");
                    newImage.src = e.target.result;
                    newImage.classList.add("new-img");
                    iconeFenetre.style.display = "none"
                    fenetreAjout.appendChild(newImage);
                    ajoutFormulaire.style.display = "none";
                    conditionPhoto.style.display = "none";
                };
                formDataCreationWork.append("image", file)
                reader.readAsDataURL(file);
            }
        })

        //Formulaire Titre et Catégorie

        /***************/
        /* Input Titre */
        /***************/
        let divForm = document.createElement("div");
        divForm.classList.add("div-form");
        let ajoutTitreProjet = document.createElement("fdivorm");
        let labelProjet = document.createElement("label");
        let inputProjet = document.createElement("input");

        labelProjet.textContent = "Titre";
        labelProjet.setAttribute("for", "inputTitre");
        inputProjet.setAttribute("type", "text");
        inputProjet.id = "inputTitre";

        ajoutTitreProjet.appendChild(labelProjet);
        ajoutTitreProjet.appendChild(inputProjet);
        divForm.appendChild(ajoutTitreProjet);

        inputProjet.addEventListener("input", function() {
            verifierChamps();
            if (!formDataCreationWork.has("title")) {
                formDataCreationWork.append("title", inputProjet.value);
            } else {
                formDataCreationWork.set("title", inputProjet.value)
            }
        })

        /*********************/
        /*  Select Catégorie */
        /*********************/
        let ajoutCategoryProjet = document.createElement("div");
        let labelCategory = document.createElement("label");
        let inputCategory = document.createElement("select");

        labelCategory.textContent = "Catégorie";
        labelCategory.setAttribute("for", "category-select");
        inputCategory.setAttribute("type", "text");
        inputCategory.id = "category-select";

        ajoutCategoryProjet.appendChild(labelCategory);
        ajoutCategoryProjet.appendChild(inputCategory);
        divForm.appendChild(ajoutCategoryProjet);

        // Création d'une option vide ajoutée dans le select
        let blanckCategory = document.createElement("option");
        blanckCategory.textContent = "";
        blanckCategory.value = "0";
        inputCategory.appendChild(blanckCategory);

        // Boucle sur les catégories de la base de données pour créer des options au select
        for (let i = 0; i < categories.length; i++) {

            let newCategory = document.createElement("option");

            newCategory.textContent = categories[i]["name"];
            newCategory.value = categories[i]["id"];
            newCategory.classList.add("list-category");
            inputCategory.appendChild(newCategory);

            formulaireAjoutProjet.appendChild(divForm);
        }

        inputCategory.addEventListener("input", function() {
            // Appel de la fonction de vérification de la saisie
            verifierChamps();
            if (!formDataCreationWork.has("category")) {
                formDataCreationWork.append("category", inputCategory.value);
            } else {
                formDataCreationWork.set("category", inputCategory.value)
            }   
        })

        //Barre séparation
        let barreModaleAjout = document.createElement("hr");
        barreModaleAjout.classList.add("barre-modale");
        formulaireAjoutProjet.appendChild(barreModaleAjout);

        //Bouton valider
        let divBtn = document.createElement("div");
        let btnAjoutValide = document.createElement("button");

        divBtn.classList.add("div-btn");
        btnAjoutValide.classList.add("btn-connection");
        btnAjoutValide.id = "valider";
        btnAjoutValide.type = "button";
        btnAjoutValide.innerHTML ="Valider";

        divBtn.appendChild(btnAjoutValide);
        formulaireAjoutProjet.appendChild(divBtn);
        modalAjout.appendChild(formulaireAjoutProjet);

        /**
         * Fonction vérification champs remplis
         **/
        function verifierChamps(){
           
            let champImage          = document.querySelector("#inputPhoto")
            let champTitre          = document.querySelector("#inputTitre")
            let champCategorie      = document.querySelector("#category-select")

            if (champImage.value !== "" && champTitre.value !== "" && champCategorie.value !== "0") {
                btnAjoutValide.classList.add("active");
                btnAjoutValide.disabled = false;
            } else {
                btnAjoutValide.classList.remove("active");
                btnAjoutValide.disabled = true;
            }
        }

        // Envoi de la requête FETCH au click sur le bouton "valider"
        btnAjoutValide.addEventListener("click",  () => {
            ajoutProjet(formDataCreationWork).then( reponse => {
                generateWork(reponse.id);
                fermetureModale(modal);
                fermetureModale(backGroundModal);
                fermetureModale(document.querySelector(".ajoutPhoto"));        
                afficherNotification("Projet Ajouté!")
                }
            );
        });

        formulaireAjoutProjet.addEventListener("submit", async (event) => {
            event.preventDefault();
        })
        
        document.body.appendChild(modalAjout);

        document.querySelector("#inputPhoto").onchange = () => {
            verifierChamps();
        }

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
    function fermetureModale(element) {
        if (element) {
            element.remove();
            isModalCreated = false;
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