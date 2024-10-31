const works = await fetch("http://localhost:5678/api/works")
  .then(works => works.json())
    console.log("ça marche")

function generateWorks(works){
  for (let i=0; i<works.length; i++){
    const worksElement = document.createElement ("figure");
    const imageWorks = document.createElement ("img");
    const captionWorks = document.createElement ("figcaption");

    imageWorks.src = works[i].imageUrl;
    captionWorks.src = works[i].title;
    console.log(captionWorks)

    worksElement.appendChild (imageWorks);
    worksElement.appendChild (captionWorks);
    
    document.querySelectorAll(".gallery").innerHTML=worksElement;
    document.querySelector(".gallery").appendChild (worksElement);
  }
}
generateWorks (works);