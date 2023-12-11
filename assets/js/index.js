const apiKey = "60fc16b2f6msh26170c1b15559b6p1f55e6jsncebe1a252dfe";

// Funzione per ottenere la lista di playlist
async function getPlaylists(value) {
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
      getPlaylists(valueSearched);
    }, 1000);
  });
});

const createCard = () => {
  const card = document.getElementById("ascoltatiRecente");
  card.innerHTML = `
  <div class="col-4">
  <div class="card mb-3" style="max-width: 400px">
    <div class="row g-0">
      <div class="col-md-4">
        <img
          src=""
          class="img-fluid rounded-start"
          alt="..."
        />
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
        </div>
      </div>
    </div>
  </div>
</div>
    `;
};
