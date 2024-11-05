function playSong(trackId) {
    const player = document.getElementById('player');
    const spotifyPlayer = document.getElementById('spotifyPlayer');
    
    spotifyPlayer.src = `https://open.spotify.com/embed/track/${trackId}`;
    player.classList.remove('hidden');
}