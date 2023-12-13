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
  <span class="h6">${data.artist.name} ° ${data.release_date} ° ${data.nb_tracks}, ${data.duration} minuti</span>`;
};

window.addEventListener("DOMContentLoaded", () => {
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
  }
};

const createCard = (obj, index) => {
  console.log(obj);
  const card = document.createElement("div");
  card.className = "row";
  card.innerHTML = ` 
  <div class="col-8 text-light my-2">
  <div class="d-flex gap-2 align-items-center">
    <p class="mx-1">${index}</p>
    <img
      aria-hidden="false"
      draggable="false"
      loading="eager"
      src="${obj.album.cover_small}"
      alt=""
      class="mMx2LUixlnN_Fu45JpFB rkw8BWQi3miXqtlJhKg0 Yn2Ei5QZn19gria6LjZj"
      width="40"
      height="40"
      style="border-radius: 4px"
    />
    <p>${obj.title}</p>
  </div>
</div>
<div class="col-2 text-light">
  <div>
    <p>${obj.rank}</p>
  </div>
</div>
<div class="col-2 text-light">
  <div>
    <p>${obj.duration}</p>
  </div>
</div>
`;
  return card;
};
