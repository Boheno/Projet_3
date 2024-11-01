const works = await fetch("http://localhost:5678/api/works")
  .then(works => 
    works.json())

console.log(works)

  // Fonction génération des filtres catégories

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
    categoryButton.name = arrayCategoriesUniques[i]["name"]
    categoryButton.type = "button";
    categoryButton.style.background = "white";
    categoryButton.style.padding = "5px";
    //categoryButton.style.margin = "10px";
    //categoryButton.style.justifyContent = "space-around";
    categoryButton.style.borderRadius = "25px";
    categoryButton.style.borderColor= "#1D6154";
    categoryButton.style.color = "#1D6154";

    // Listener
  
    categoryButton.addEventListener ("click",()=>{
      let btnFilterCategory = arrayCategoriesUniques.filter(function(arrayCategoriesUniques){
        return btnFilterCategory;
      })
    })
    //Integration HTML
    categoryButton.innerText = arrayCategoriesUniques[i].name;
  
    categoryElements.appendChild(categoryButton);

    document.querySelectorAll(".gallery").innerHTML = categoryElements;
    document.querySelector(".gallery").appendChild(categoryElements);
  }
}
generateCategory(works);


  // Fonction génération des projets 

function generateWorks(works) {

  for (let i=0; i<works.length; i++) {

    let worksElement  = document.createElement("figure");
    let imageWorks    = document.createElement("img");
    let captionWorks  = document.createElement("figcaption");

    imageWorks.src          = works[i].imageUrl;
    captionWorks.innerText  = works[i].title;

    worksElement.appendChild(imageWorks);
    worksElement.appendChild(captionWorks);
    
    document.querySelectorAll(".gallery").innerHTML = worksElement;
    document.querySelector(".gallery").appendChild(worksElement);
  }
}
generateWorks (works);

