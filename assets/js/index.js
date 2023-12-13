import { apiKey } from "./apiKey.js";

// Funzione per ottenere la lista di playlist
async function getPlaylists(value, container, cardType) {
  const apiUrl = "https://deezerdevs-deezer.p.rapidapi.com/search?q=" + value;

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
    generateCardList(data, container, cardType);

    console.log("Lista di playlist:", data);
  } catch (error) {
    console.error("Si è verificato un errore:", error.message);
  }
}
let searchBarIsActive = false;
window.addEventListener("DOMContentLoaded", () => {
  let searchBarContainer = document.getElementById("searchBarContainer");
  let timer;
  const searchBar = document.getElementById("searchBar");
  searchBar.addEventListener("input", () => {
    let valueSearched = searchBar.value;
    if (searchBar.value == "") {
      getPlaylists("power wolf", "buonPomeriggio", "small");
      return;
    }
    clearTimeout(timer);

    timer = setTimeout(() => {
      getPlaylists(valueSearched, "buonPomeriggio", "small");
    }, 1000);
  });
  const searchButton = document.getElementById("searchButton");
  searchButton.addEventListener("click", () => {
    toggleSearchBar();
  });

  getPlaylists("power wolf", "buonPomeriggio", "small");
  getPlaylists("linkin park", "ascoltatiDiRecente", "large");
  getPlaylists("Saboton", "iTuoiMix", "large");
  getPlaylists("woodkid", "popolare", "large");
  getPlaylists("drake", "tendenze", "large");
});

const generateCardList = (arrayObj, container, cardType) => {
  const cardContainer = document.getElementById(container);
  cardContainer.innerHTML = "";
  for (let i = 0; i < 6; i++) {
    let card = createCard(arrayObj.data[i], cardType);
    cardContainer.appendChild(card);
  }
};

const createCard = (obj, cardType) => {
  if (cardType == "small") {
    const card = document.createElement("div");
    card.className = "col-12 col-sm-6 col-lg-4";

    const innerDiv1 = document.createElement("div");
    innerDiv1.className = "card mb-3 customCard";

    const innerDiv2 = document.createElement("div");
    innerDiv2.className = "row g-0";

    const imgDiv = document.createElement("div");
    imgDiv.className = "fix-h-80 fix-w-80";

    const img = document.createElement("img");
    img.src = obj.album.cover;
    img.className = "img-fluid rounded-start";
    img.alt = "...";

    const playImg = document.createElement("img");
    playImg.src = "./assets/imgs/play-fill.svg";
    playImg.className = "position-absolute positionCustom";

    playImg.addEventListener("click", () => {
      refreshPlayer(obj);
    });

    const textDiv = document.createElement("div");
    textDiv.className = "col bg-darkgray rounded";

    const cardBody = document.createElement("div");
    cardBody.className = "card-body ";

    const cardTitle = document.createElement("h6");
    cardTitle.className = "card-title m-0 max-h-40   overflow-hidden";

    const titleLink = document.createElement("a");
    titleLink.href = `./album.html?idAlbum=${obj.album.id}`;
    titleLink.className = "customColorA";
    titleLink.textContent = obj.album.title;

    cardTitle.appendChild(titleLink);

    imgDiv.appendChild(img);
    imgDiv.appendChild(playImg);

    textDiv.appendChild(cardBody);
    cardBody.appendChild(cardTitle);

    innerDiv2.appendChild(imgDiv);
    innerDiv2.appendChild(textDiv);

    innerDiv1.appendChild(innerDiv2);

    card.appendChild(innerDiv1);

    return card;
  } else if (cardType == "large") {
    const card = document.createElement("div");
    card.className = "col-6 col-sm-4 col-md-4 col-xxl-2 pb-2 ";

    const innerCard = document.createElement("div");
    innerCard.className = "card customCard bg-darkgray";

    const dFlexContainer = document.createElement("div");
    dFlexContainer.className = "d-flex justify-content-center align-item-center position-relative";

    const imgAlbumCover = document.createElement("img");
    imgAlbumCover.src = obj.album.cover;
    imgAlbumCover.className = "card-img-top max-h-180 object-fit-cover mx-2 mt-2 rounded";
    imgAlbumCover.alt = "...";

    const playImg = document.createElement("img");
    playImg.src = "./assets/imgs/play-fill.svg";
    playImg.className = "position-absolute positionCustom";
    playImg.addEventListener("click", () => {
      refreshPlayer(obj);
    });

    dFlexContainer.appendChild(imgAlbumCover);
    dFlexContainer.appendChild(playImg);

    const cardBody = document.createElement("div");
    cardBody.className = "card-body  fix-h-100";

    const cardTitle = document.createElement("h6");
    cardTitle.className = "card-title overflowCustom max-h-60 fs-6";

    const titleLink = document.createElement("a");
    titleLink.href = `./album.html?idAlbum=${obj.album.id}`;
    titleLink.className = "customColorA";
    titleLink.textContent = obj.album.title;

    cardTitle.appendChild(titleLink);

    const cardText = document.createElement("p");
    cardText.className = "card-text fs-8";

    const artistLink = document.createElement("a");
    artistLink.href = `./artist.html?idArtist=${obj.artist.name}&idAlbum=${obj.album.id}`;
    artistLink.className = "customColorA";
    artistLink.textContent = obj.artist.name;

    cardText.appendChild(artistLink);

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);

    innerCard.appendChild(dFlexContainer);
    innerCard.appendChild(cardBody);

    card.appendChild(innerCard);

    return card;
  }
};

function refreshPlayer(obj) {
  const audioPlayerContainer = document.getElementById("audioPlayer");
  audioPlayerContainer.innerHTML = "";

  const audioElement = document.createElement("audio");
  audioElement.controls = true;
  audioElement.autoplay = true;
  audioElement.volume = 0.5;

  const sourceElement = document.createElement("source");
  sourceElement.src = obj.preview;
  sourceElement.type = "audio/mpeg";

  audioElement.appendChild(sourceElement);

  audioPlayerContainer.appendChild(audioElement);
}
function toggleSearchBar() {
  const searchBar = document.getElementById("searchBar");
  searchBarIsActive = !searchBarIsActive;

  if (searchBarIsActive) {
    searchBar.classList.remove("d-none");
  } else {
    searchBar.classList.add("d-none");
  }
}
