// Récupération des projets
export const recupererProjets = async () => {
    let response = await fetch("http://localhost:5678/api/works", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    if (response.ok) {
        const result = await response.json();
        return result;
    }
}

// Récupération des catégories
export const recupererCategories = async () => {
    let response = await fetch("http://localhost:5678/api/categories", {
        method: "GET"
    })
    if (response.ok) {
        const result = await response.json();
        return result;
    }
}

//Suppression d'un projet
export async function suppressionProjets(id) {
    const token = localStorage.getItem("token");
    let response = await fetch(`http://localhost:5678/api/works/${id}`, {
        method: "DELETE",
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {
        console.log("Impossible de supprimer le projet");
    } else {
        return id;
    }
}

//Ajout d'un projet
export async function ajoutProjet (FormData) {
    let response = await fetch("http://localhost:5678/api/works", {
    method:"POST",
    headers:{
        "Authorization": `Bearer ${localStorage.getItem("token")}`
    },
    body: FormData
    });
    if (response.ok) {
        const result = await response.json();
        return result;
    } else {
        console.log("Une erreur est survenue lors de l'ajout de votre projet.")
    }
}