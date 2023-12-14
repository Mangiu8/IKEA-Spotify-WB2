import { apiKey } from "./apiKey.js";

const parameters = new URLSearchParams(window.location.search);
const nomeArtist = parameters.get("idArtist");
const apiUrl = "https://deezerdevs-deezer.p.rapidapi.com/search?q=" + nomeArtist;
const idAlbum = parameters.get("idAlbum");
const apiUrlAlbum = "https://deezerdevs-deezer.p.rapidapi.com/album/" + idAlbum;

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
    console.log("Lista di playlist:", data);
    generateCardList(data);
  } catch (error) {
    console.error("Si è verificato un errore:", error.message);
  }
}
// Funzione per ottenere la lista di playlist
async function getAlbum() {
  try {
    const response = await fetch(apiUrlAlbum, {
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
    console.log("Lista di playlist:", data);
    showArtist(data);
  } catch (error) {
    console.error("Si è verificato un errore:", error.message);
  }
}

const showArtist = (data) => {
  const titolo = document.getElementById("nomeArtista");
  const banner = document.getElementById("sfondoArtista");
  const fans = document.getElementById("fans");
  console.log("cose");
  console.log(data);
  fans.innerHTML = `Ascoltatori mensili ${data.fans}`;
  banner.style.backgroundImage = "url(" + data.artist.picture_xl + ")";
  titolo.innerText = data.artist.name;
};

window.addEventListener("DOMContentLoaded", () => {
  const allSearchIcons = document.querySelectorAll(".searchButtonMenu");
  allSearchIcons.forEach((searchIcon) => {
    searchIcon.addEventListener("click", () => {
      localStorage.setItem("setSearchbar", "true");
      window.location.assign("./index.html");
    });
  });
  getAlbum();
  getArtist();
});

const generateCardList = (obj) => {
  const cardContainer = document.getElementById("Salvatore");
  const tracks = obj.data;
  cardContainer.innerHTML = "";
  console.log(tracks);
  for (let i = 0; i < 7; i++) {
    let card = createCard(tracks[i], i + 1);
    cardContainer.appendChild(card);
    console.log(tracks[i]);
  }
};

const createCard = (obj, index) => {
  console.log(obj);
  const card = document.createElement("div");
  card.className = "row";

  const col8 = document.createElement("div");
  col8.className = "col-8 text-light my-2";

  const flexContainer = document.createElement("div");
  flexContainer.className = "d-flex gap-2 align-items-center";

  const indexParagraph = document.createElement("p");
  indexParagraph.className = "mx-1";
  indexParagraph.textContent = index;

  const img = document.createElement("img");
  img.setAttribute("aria-hidden", "false");
  img.setAttribute("draggable", "false");
  img.setAttribute("loading", "eager");
  img.src = obj.album.cover_small;
  img.alt = "";
  img.className = "mMx2LUixlnN_Fu45JpFB rkw8BWQi3miXqtlJhKg0 Yn2Ei5QZn19gria6LjZj";
  img.width = "40";
  img.height = "40";
  img.style.borderRadius = "4px";

  const titleParagraph = document.createElement("p");
  titleParagraph.textContent = obj.title;

  flexContainer.appendChild(indexParagraph);
  flexContainer.appendChild(img);
  flexContainer.appendChild(titleParagraph);

  col8.appendChild(flexContainer);

  const col2Rank = document.createElement("div");
  col2Rank.className = "col-2 text-light";

  const rankParagraph = document.createElement("p");
  rankParagraph.textContent = obj.rank.toLocaleString();

  col2Rank.appendChild(rankParagraph);

  const col2Duration = document.createElement("div");
  col2Duration.className = "col-2 text-light";

  const durationParagraph = document.createElement("p");
  durationParagraph.textContent = new Date(obj.duration * 1000).toLocaleString("it-IT", {
    minute: "2-digit",
    second: "2-digit",
  });

  col2Duration.appendChild(durationParagraph);

  card.appendChild(col8);
  card.appendChild(col2Rank);
  card.appendChild(col2Duration);

  return card;
};
