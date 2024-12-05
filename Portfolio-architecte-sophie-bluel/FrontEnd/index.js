import {modale} from "./modales.js";
import { recupererProjets } from "./requetes.js";
import { recupererCategories } from "./requetes.js";

let works = {};
let categories = {};

works = await recupererProjets();
categories = await recupererCategories();

pageLogin();
generateWorks(works);
generateCategory(categories);

//Fonction génération des boutons
function generateCategory(categories) {

  // Création bouton "Tous"
  let btnTousElement = document.createElement ("div");
  let btnTous = document.createElement("button");
  btnTous.type = "button";
  btnTous.setAttribute("class", "btnStyle");

  btnTous.innerText = "Tous";
  btnTousElement.appendChild(btnTous);
  document.querySelector("#divBoutons").appendChild(btnTousElement);

  btnTous.onclick = () => {
    let figures = document.querySelectorAll(".projet");
    let afficherFigures = Array.from(figures);
    afficherFigures.forEach (figure => figure.style.display = "block");
    activeBtn(btnTous);
  }
  
// Création des autres boutons

  //boucle parcourant le nouveau tableau avec les 3 catégories
  for (let i = 0; i < categories.length; i++) {
    let categoryElements = document.createElement ("div");
    let categoryButton = document.createElement ("button");

    // Habillage des boutons (classes ou direct CSS)
    categoryButton.name = categories[i]["name"];
    categoryButton.setAttribute("data-id-categorie", categories[i]["id"])
    categoryButton.type = "button";
    categoryButton.setAttribute("class", "btnStyle");

    let figures = document.querySelectorAll(".projet");
    
    // Si l'attribut de la figure ne correspond pas à l'attribut du bouton, alors on cache le projet
    categoryButton.onclick = () => {
        let figuresACacher = Array.from(figures).filter(figure => figure.getAttribute("data-categorie") !== categoryButton.getAttribute("data-id-categorie"))
        let figuresAAfficher = Array.from(figures).filter(figure => figure.getAttribute("data-categorie") === categoryButton.getAttribute("data-id-categorie"))
        figuresACacher.forEach(figure => figure.style.display = "none");
        figuresAAfficher.forEach(figure => figure.style.display = "block");
        categoryButton.classList.add("active");
      
        activeBtn(categoryButton);
      }

  //Integration HTML
    categoryButton.innerText = categories[i].name;
    categoryElements.appendChild(categoryButton);
    document.querySelector("#divBoutons").appendChild(categoryElements);
  }
  // Fonction pour activation des boutons
  function activeBtn (bouton){
    document.querySelectorAll(".btnStyle").forEach(btn => btn.classList.remove("active"));
    bouton.classList.add("active");
  }
}

// Fonction génération des projets 
export function generateWorks(works) {

  works.forEach(work => {
    let worksElement  = document.createElement("figure");
    let imageWorks    = document.createElement("img");
    let captionWorks  = document.createElement("figcaption");

    imageWorks.src          = work.imageUrl;
    captionWorks.innerText  = work.title;
    worksElement.setAttribute("data-categorie", work.categoryId)
    worksElement.id = `projet-${work.id}`;
    worksElement.classList.add("projet");

    worksElement.appendChild(imageWorks);
    worksElement.appendChild(captionWorks);
    
    document.querySelectorAll(".gallery").innerHTML = worksElement;
    document.querySelector(".gallery").appendChild(worksElement);
  }) 
  
}

/**
 * Fonction qui permet de générer le projet nouvellement ajouté
@param  id
 */
export async function generateWork(id) {
    let worksElement  = document.createElement("figure");
    let imageWorks    = document.createElement("img");
    let captionWorks  = document.createElement("figcaption");

    // Rechargement de la liste des projets pour qu'elle soit à jour
    const works = await recupererProjets();

    works.forEach(work => {
      if (work.id === id) {
        imageWorks.src          = work.imageUrl;
        captionWorks.innerText  = work.title;
        worksElement.id = `projet-${work.id}`;
        worksElement.setAttribute("data-categorie", work.categoryId)
        worksElement.classList.add("projet");

        worksElement.appendChild(imageWorks);
        worksElement.appendChild(captionWorks);
    
        document.querySelectorAll(".gallery").innerHTML = worksElement;
        document.querySelector(".gallery").appendChild(worksElement);
      }
    });
}

export async function supprimerProjetPage(id) {
  let projetASupprimer = document.querySelector(`#projet-${id}`);

  if (projetASupprimer) {
      projetASupprimer.remove();
  }
}

export function afficherNotification(message) {
  let notification = document.createElement("div");
  notification.textContent = message;
  notification.classList.add("notification");
  document.querySelector("#titreProjets").insertAdjacentElement("afterend", notification);

  setTimeout(() => {
      notification.remove();
  }, 5000);
}

function pageLogin(){
  if (localStorage.getItem("token")){
  document.querySelectorAll("#divBoutons");
  divBoutons.style.display = "none";

  // Bouton modifier
  let btnModifier = document.createElement("button");
  btnModifier.setAttribute("id", "btn-modifier");
  btnModifier.innerText = "Modifier";
  btnModifier.onclick = () => modale();
  let btnIcone = document.createElement("i");
  btnIcone.classList.add("fa-regular", "fa-pen-to-square");
  btnModifier.prepend(btnIcone)
  document.querySelector("#titreProjets").appendChild(btnModifier);

  //Bandeau Header
  let bandeauHeader = document.createElement("div");
  let bandeauIcone = document.createElement ("i");
  let bandeauText = document.createElement ("p");

  bandeauHeader.classList.add("bandeau-header");
  bandeauIcone.classList.add("fa-regular", "fa-pen-to-square");
  bandeauText.innerText = "Mode édition";

  bandeauHeader.appendChild(bandeauIcone);
  bandeauHeader.appendChild(bandeauText);

  document.body.prepend(bandeauHeader);

  // Bouton "Logout"
    let loginBtn = document.querySelector(".navBtn");
    loginBtn.style.display = "block";
    loginBtn.innerText = "logout";

    loginBtn.onclick = () =>{
    localStorage.removeItem("token");
    window.location.href = "index.html";
    }
  } else{ 
  let loginBtn = document.querySelector(".navBtn");
  loginBtn.onclick = () =>{
  window.location.href = "login.html";
  }
}
}