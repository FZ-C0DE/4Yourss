document.addEventListener('DOMContentLoaded', () => {
    const nameInput = document.getElementById('nameInput');
    const searchButton = document.getElementById('searchButton');
    const loadingText = document.getElementById('loadingText');
    const results = document.getElementById('results');
    const songsList = document.getElementById('songsList');

    searchButton.addEventListener('click', async () => {
        const name = nameInput.value.trim();
        if (!name) return;

        // Show loading
        loadingText.classList.remove('hidden');
        results.classList.add('hidden');
        
        try {
            // Get access token
            const token = await getSpotifyToken();
            
            // Search for songs based on name
            const songs = await searchSongsByName(token, name);
            
            // Display results
            displaySongs(songs);
        } catch (error) {
            console.error('Error:', error);
            alert('Terjadi kesalahan saat mencari lagu.');
        } finally {
            loadingText.classList.add('hidden');
        }
    });

    // Handle enter key press
    nameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchButton.click();
        }
    });
});

function displaySongs(songs) {
    const songsList = document.getElementById('songsList');
    const results = document.getElementById('results');
    
    songsList.innerHTML = '';
    results.classList.remove('hidden');

    songs.forEach(song => {
        const songCard = document.createElement('div');
        songCard.className = 'song-card';
        songCard.innerHTML = `
            <img src="${song.album.images[1].url}" alt="${song.name}">
            <div class="song-info">
                <div class="song-title">${song.name}</div>
                <div class="song-artist">${song.artists.map(artist => artist.name).join(', ')}</div>
            </div>
        `;

        songCard.addEventListener('click', () => {
            playSong(song.id);
        });

        songsList.appendChild(songCard);
    });
}