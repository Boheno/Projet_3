const works = await fetch("http://localhost:5678/api/works")
  .then(works => works.json())

  // Fonction génération des projets 

function generateWorks(works){
  for (let i=0; i<works.length; i++){
    const worksElement = document.createElement ("figure");
    const imageWorks = document.createElement ("img");
    const captionWorks = document.createElement ("figcaption");

    imageWorks.src = works[i].imageUrl;
    captionWorks.innerText = works[i].title;

    worksElement.appendChild (imageWorks);
    worksElement.appendChild (captionWorks);
    
    document.querySelectorAll(".gallery").innerHTML=worksElement;
    document.querySelector(".gallery").appendChild (worksElement);
  }
}
generateWorks (works);

// Fonction génération des filtres catégories

function generateCategory(works){
  for (let i=0; i<works.length; i++){
    const categoryElements = document.createElement ("div");
    const categoryButton = document.createElement ("button");

    //Listener du bouton

    categoryButton.innerText = works [i].name;

    categoryElements.appendChild (categoryButton);

    document.querySelectorAll(".gallery").innerHTML=categoryElements;
    document.querySelector(".gallery").appendChild (categoryElements);
  }
}
generateCategory (works);