import { apiKey } from "./apiKey.js";

const parameters = new URLSearchParams(window.location.search);
const idAlbum = parameters.get("idAlbum");
const apiUrl = "https://deezerdevs-deezer.p.rapidapi.com/album/" + idAlbum;

// Funzione per ottenere la lista di playlist
async function getArtist() {
  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
        "X-RapidAPI-Key": apiKey,
      },
    });

    if (!response.ok) {
      throw new Error(`Errore nella richiesta: ${response.statusText}`);
    }

    const data = await response.json();
    //generateCardList(data);
    console.log("Lista di playlist:", data);
    showArtist(data);
  } catch (error) {
    console.error("Si è verificato un errore:", error.message);
  }
}

const showArtist = (data) => {
  const titolo = document.getElementById("nomeArtista");
  const banner = document.getElementById("sfondoArtista");
  banner.style.backgroundImage = "url(" + data.artist.picture_xl + ")";
  titolo.innerText = data.artist.name;
};

window.addEventListener("DOMContentLoaded", () => {
  getArtist();
});

const generateCardList = (obj) => {
  const cardContainer = document.getElementById(container);
  cardContainer.innerHTML = "";
  for (let i = 0; i < 6; i++) {
    let card = createCard(obj);
    cardContainer.appendChild(card);
  }
};

const createCard = (obj) => {
  const card = document.createElement("div");
  card.className = "col-4";
  // card.innerHTML = ;
  return card;
};
