const works = await fetch("http://localhost:5678/api/works")
  .then(works => 
    works.json())

generateWorks(works);
generateCategory(works);

  /* Ajout d'un nouveau projet pour tester */
//   works.push(
//       {
//     "id": 12,
//     "title": "Test de catégorie",
//     "imageUrl": "",
//     "categoryId": 4,
//     "userId": 1,
//     "category": {
//       "id": 4,
//       "name": "Test nouvelle catégorie"
//     }
//   }
// )

function generateCategory(works) {

  /**
   * Qu'est ce qui peut être extrait de cette fonction
   * 
   * Premièrement, elle créé un array contenant les catégories (Peut-être mis dans une fonction à part)
   * Ensuite, elle parcourt ces catégories pour crééer un bouton par catégorie.   
   */

// Bouton "Tous"
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
    }
// Autres boutons

  //Création de 2 tableaux vides
  let setCategorieUnique      = new Set(); //stockage catégories
  let arrayCategoriesUniques  = []; //tableau sans doublons

  // Récupération des catégories des projets
  let worksCategory = []
    works.forEach(projet => {
      worksCategory.push(projet["category"])
    })

  // Pour chaque catégorie récupérée
  worksCategory.forEach(categorie => {
    // On vérifie que l'id de la catégorie n'est pas déjà présent dans le SET
    if (!setCategorieUnique.has(categorie.id)) {
      // S'il n'est pas présent dans le SET : On l'ajoute dans le SET
      setCategorieUnique.add(categorie.id);
      // Et on ajoute l'objet JSON categorie dans un array qui ne contient
      // contient pas de doublons
      arrayCategoriesUniques.push(categorie);
    }
  })

  //boucle parcourant le nouveau tableau avec les 3 catégories
  for (let i = 0; i < arrayCategoriesUniques.length; i++) {
    let categoryElements = document.createElement ("div");
    let categoryButton = document.createElement ("button");

    // Habillage des boutons (classes ou direct CSS)
    /* Pour tes boutons, n'oublie pas d'ajouter un effet sur le bouton pour indiquer quel filtre est actif */
    categoryButton.name = arrayCategoriesUniques[i]["name"];
    categoryButton.setAttribute("data-id-categorie", arrayCategoriesUniques[i]["id"])
    categoryButton.type = "button";
    categoryButton.setAttribute("class", "btnStyle");

    // Listener
    // => Récupération de tous les élements HTML qui contiennent les projets (<figure>) dans une variable
    let figures = document.querySelectorAll(".projet");
    
    // Si l'attribut de la figure ne correspond pas à l'attribut du bouton, alors on cache le projet
    categoryButton.onclick = () => {
        // On créé deux variables, l'une qui contient les élements à afficher et l'autre les élements à cacher
        let figuresACacher = Array.from(figures).filter(figure => figure.getAttribute("data-categorie") !== categoryButton.getAttribute("data-id-categorie"))
        let figuresAAfficher = Array.from(figures).filter(figure => figure.getAttribute("data-categorie") === categoryButton.getAttribute("data-id-categorie"))
        figuresACacher.forEach(figure => figure.style.display = "none");
        figuresAAfficher.forEach(figure => figure.style.display = "block");
      }

    //Integration HTML
    categoryButton.innerText = arrayCategoriesUniques[i].name;
  
    categoryElements.appendChild(categoryButton);

    // document.querySelectorAll(".gallery").innerHTML = categoryElements;
    document.querySelector("#divBoutons").appendChild(categoryElements);
  }
}

// Fonction génération des projets 
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
//}



