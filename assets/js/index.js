const apiKey = "60fc16b2f6msh26170c1b15559b6p1f55e6jsncebe1a252dfe";

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

  searchBar.addEventListener("input", () => {
    const valueSearched = searchBar.value;

    clearTimeout(timer);

    timer = setTimeout(() => {
      getPlaylists(valueSearched, "ascoltatiRecente", "small");
    }, 1000);
  });
  getPlaylists("linkin park", "firstAlbum", "large");
  getPlaylists("Saboton", "secondAlbum", "large");
  getPlaylists("woodkid", "popolare-tra-chi-ascolta", "large");
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
    card.innerHTML = `
  <div class="card mb-3">
    <div class="row g-0">
      <div class="col-2">
        <img
          src="${obj.album.cover}"
          class="img-fluid fix-h-80 fix-w-80 rounded-start"
          alt="..."
        />
      </div>
      <div class="col-10">
        <div class="card-body">
          <h6 class="card-title m-0">${obj.album.title}</h6>
        </div>
      </div>
    </div>
  </div>
    `;
    return card;
  } else if (cardType == "large") {
    const card = document.createElement("div");
    card.className = "col-2 pb-2";
    card.innerHTML = `
    <div class="card">
    <div class="d-flex justify-content-center align-item-center position-relative">
    <img src="${obj.album.cover}" class="card-img-top max-h-180 max-w-180 object-fit-cover mt-2 rounded" alt="...">
    <i class="bi bi-play-circle-fill position-absolute positionCustom fs-1"></i>
    </div>
    <div class="card-body fix-h-100 ">
      <h6 class="card-title overflowCustom max-h-50 fs-7">${obj.album.title}</h6>
      <p class="card-text fs-8"><a href="#">${obj.artist.name}</a></p>
    </div>
  </div>`;
    return card;
  }
};
