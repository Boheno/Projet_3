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

generateWorks(works);
generateCategory(works