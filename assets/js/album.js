import { apiKey } from "./apiKey.js";

const parameters = new URLSearchParams(window.location.search);
const idAlbum = parameters.get("idAlbum");
const apiUrl = "https://deezerdevs-deezer.p.rapidapi.com/album/" + idAlbum;
let duration = 0;

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
    showArtist(data);
  } catch (error) {
    console.error("Si è verificato un errore:", error.message);
  }
}

const showArtist = (data) => {
  const titolo = document.getElementById("nomeArtista");
  const cover = document.getElementById("cover");
  const descriptionArtist = document.getElementById("descriptionArtist");
  console.log("cose");
  console.log(data);
  cover.innerHTML = `<img src="${data.cover_medium}">`;
  titolo.innerText = data.title;
  descriptionArtist.innerHTML = `
  <img src="${data.artist.picture_small}" class="rounded-pill" width="30px">
  <span class="h6">${data.artist.name} ° ${data.release_date} ° ${data.nb_tracks} brani °  durata ${new Date(
    duration * 1000
  ).toLocaleString("it-IT", { hour: "2-digit", minute: "2-digit", second: "2-digit" })} </span>`;
};

window.addEventListener("DOMContentLoaded", () => {
  const allSearchIcons = document.querySelectorAll(".searchButtonMenu");
  allSearchIcons.forEach((searchIcon) => {
    searchIcon.addEventListener("click", () => {
      localStorage.setItem("setSearchbar", "true");
      window.location.assign("./index.html");
    });
  });
  getArtist();
});

const generateCardList = (obj) => {
  const cardContainer = document.getElementById("Salvatore");
  const tracks = obj.tracks.data;
  cardContainer.innerHTML = "";
  console.log(tracks);
  for (let i = 0; i < tracks.length; i++) {
    let card = createCard(tracks[i], i + 1);
    cardContainer.appendChild(card);
    console.log(tracks[i]);
    duration += tracks[i].duration;
  }
  console.log(duration);
};

const createCard = (obj, index) => {
  console.log(obj);
  const card = document.createElement("div");
  card.className = "row";

  const col8 = document.createElement("div");
  col8.className = "col text-light my-2";

  const flexContainer = document.createElement("div");
  flexContainer.className = "d-flex gap-2 align-items-center";

  const indexParagraph = document.createElement("p");
  indexParagraph.style.minWidth = "25px";
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
  col2Rank.className = "col-md-2 text-light";

  const rankParagraph = document.createElement("p");
  rankParagraph.textContent = obj.rank.toLocaleString();
  rankParagraph.className = "d-none d-md-block";

  col2Rank.appendChild(rankParagraph);

  const col2Duration = document.createElement("div");
  col2Duration.className = "col-md-2 text-light";

  const durationParagraph = document.createElement("p");
  durationParagraph.textContent = new Date(obj.duration * 1000).toLocaleString("it-IT", {
    minute: "2-digit",
    second: "2-digit",
  });
  durationParagraph.className = "d-none d-md-block";

  col2Duration.appendChild(durationParagraph);

  card.appendChild(col8);
  card.appendChild(col2Rank);
  card.appendChild(col2Duration);

  return card;
};
