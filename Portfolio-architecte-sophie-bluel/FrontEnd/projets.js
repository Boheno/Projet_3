const works = await fetch("http://localhost:5678/api/works")
  .then(works => 
    works.json())

  // Fonction génération des filtres catégories

function generateCategory(works) {
   //Nouveau tableau des catégories
    let worksCategory = []
    works.forEach(projet => {
      worksCategory.push(projet["categoryId"])
    })
    let worksCategoryNew =[...new Set (worksCategory)];
  console.log(worksCategoryNew)

  for (let i=0; i<works.length; i++){
    let categoryElements = document.createElement ("div");
    let categoryButton = document.createElement ("button");
    
//Récupération du tableau Category
    
    //Listener du bouton

//Integration HTML
    categoryButton.innerText = works[i].categoryId;
  
    categoryElements.appendChild (categoryButton);

    document.querySelectorAll(".gallery").innerHTML=categoryElements;
    document.querySelector(".gallery").appendChild (categoryElements);
  }
}
generateCategory (works);

  // Fonction génération des projets 

function generateWorks(works){
  for (let i=0; i<works.length; i++){
    let worksElement = document.createElement ("figure");
    let imageWorks = document.createElement ("img");
    let captionWorks = document.createElement ("figcaption");

    imageWorks.src = works[i].imageUrl;
    captionWorks.innerText = works[i].title;

    worksElement.appendChild (imageWorks);
    worksElement.appendChild (captionWorks);
    
    document.querySelectorAll(".gallery").innerHTML=worksElement;
    document.querySelector(".gallery").appendChild (worksElement);
  }
}
generateWorks (works);

