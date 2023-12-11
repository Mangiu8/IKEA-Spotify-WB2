const apiKey = "60fc16b2f6msh26170c1b15559b6p1f55e6jsncebe1a252dfe"; // Sostituisci con la tua chiave API Deezer

// Funzione per ottenere la lista di playlist
async function getPlaylists() {
  const apiUrl = "https://deezerdevs-deezer.p.rapidapi.com/search?q=a";

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

    // Puoi elaborare ulteriormente i dati qui
  } catch (error) {
    console.error("Si è verificato un errore:", error.message);
  }
}

// Chiamare la funzione per ottenere la lista di playlist
getPlaylists();
