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

window.addEventListener("DOMContentLoaded", () => {
  const searchBar = document.getElementById("searchBar");
  let timer;

  /*   searchBar.addEventListener("input", () => {
    const valueSearched = searchBar.value;

    clearTimeout(timer);

    timer = setTimeout(() => {
      getPlaylists(valueSearched, "buonPomeriggio", "small");
    }, 1000);
  }); */
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
    card.className = "col-4";

    const innerDiv1 = document.createElement("div");
    innerDiv1.className = "card mb-3 customCard";

    const innerDiv2 = document.createElement("div");
    innerDiv2.className = "row g-0";

    const imgDiv = document.createElement("div");
    imgDiv.className = "col-2";

    const img = document.createElement("img");
    img.src = obj.album.cover;
    img.className = "img-fluid fix-h-80 fix-w-80 rounded-start";
    img.alt = "...";

    const playImg = document.createElement("img");
    playImg.src = "./assets/imgs/play-fill.svg";
    playImg.className = "position-absolute positionCustom";

    playImg.addEventListener("click", () => {
      refreshPlayer(obj);
    });

    const textDiv = document.createElement("div");
    textDiv.className = "col-10";

    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    const cardTitle = document.createElement("h6");
    cardTitle.className = "card-title m-0";
    cardTitle.textContent = obj.album.title;

    // Assemble the nodes
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
    // Create the outer div
    const card = document.createElement("div");
    card.className = "col-2 pb-2";

    // Create the inner card div
    const innerCard = document.createElement("div");
    innerCard.className = "card customCard";

    // Create the d-flex container div
    const dFlexContainer = document.createElement("div");
    dFlexContainer.className = "d-flex justify-content-center align-item-center position-relative";

    // Create the album cover image
    const imgAlbumCover = document.createElement("img");
    imgAlbumCover.src = obj.album.cover;
    imgAlbumCover.className = "card-img-top max-h-180 max-w-180 object-fit-cover mx-2 mt-2 rounded";
    imgAlbumCover.alt = "...";

    // Create the play icon image
    const playImg = document.createElement("img");
    playImg.src = "./assets/imgs/play-fill.svg";
    playImg.className = "position-absolute positionCustom";
    playImg.addEventListener("click", () => {
      refreshPlayer(obj);
    });

    // Append album cover and play icon to the d-flex container
    dFlexContainer.appendChild(imgAlbumCover);
    dFlexContainer.appendChild(playImg);

    // Create the card body div
    const cardBody = document.createElement("div");
    cardBody.className = "card-body fix-h-100";

    // Create the card title h6 element
    const cardTitle = document.createElement("h6");
    cardTitle.className = "card-title overflowCustom max-h-50 fs-6";

    // Create the album title link
    const titleLink = document.createElement("a");
    titleLink.href = `./album.html?idAlbum=${obj.album.id}`;
    titleLink.className = "customColorA";
    titleLink.textContent = obj.album.title;

    // Append album title link to the card title
    cardTitle.appendChild(titleLink);

    // Create the card text p element
    const cardText = document.createElement("p");
    cardText.className = "card-text fs-8";

    // Create the artist name link
    const artistLink = document.createElement("a");
    artistLink.href = `./artist.html?idArtist=${obj.artist.name}&idAlbum=${obj.album.id}`;
    artistLink.className = "customColorA";
    artistLink.textContent = obj.artist.name;

    // Append artist name link to the card text
    cardText.appendChild(artistLink);

    // Append card title and card text to the card body
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);

    // Append d-flex container and card body to the inner card
    innerCard.appendChild(dFlexContainer);
    innerCard.appendChild(cardBody);

    // Append inner card to the outer card
    card.appendChild(innerCard);

    // Return the final card DOM node
    return card;
  }
};

function refreshPlayer(obj) {
  // Assuming you have an existing parent element with the id "audioPlayer"
  const audioPlayerContainer = document.getElementById("audioPlayer");
  audioPlayerContainer.innerHTML = "";

  // Create an audio element
  const audioElement = document.createElement("audio");
  audioElement.controls = true;
  audioElement.autoplay = true;
  audioElement.volume = 0.5;

  // Create a source element
  const sourceElement = document.createElement("source");
  sourceElement.src = obj.preview;
  sourceElement.type = "audio/mpeg";

  // Append source element to audio element
  audioElement.appendChild(sourceElement);

  // Append audio element to the container
  audioPlayerContainer.appendChild(audioElement);
}
