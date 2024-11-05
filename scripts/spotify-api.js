const CLIENT_ID = '98e14b7394344007be6b1c8e067a2f9d';
const CLIENT_SECRET = '6e61596b01774725a12b8d5d468a6064';

async function getSpotifyToken() {
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET)
        },
        body: 'grant_type=client_credentials'
    });

    const data = await response.json();
    return data.access_token;
}

async function searchSongsByName(token, name) {
    // Create a search query based on the name
    const searchQuery = encodeURIComponent(`${name} popular`);
    
    const response = await fetch(`https://api.spotify.com/v1/search?q=${searchQuery}&type=track&limit=10`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    const data = await response.json();
    return data.tracks.items;
}