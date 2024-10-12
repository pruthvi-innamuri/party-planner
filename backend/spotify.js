// Spotify API URLs
const SPOTIFY_API_BASE_URL = 'https://api.spotify.com/v1';

// Function to search for songs
async function searchSongs(accessToken, query) {
    const response = await fetch(`${SPOTIFY_API_BASE_URL}/search?q=${encodeURIComponent(query)}&type=track&limit=5`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if (!response.ok) {
        const error = await response.json();
        console.error('Error searching songs:', error);
        throw new Error('Failed to search for songs');
    }

    const data = await response.json();
    return data.tracks.items;
}

// Function to add tracks to the existing playlist
async function addTracksToPlaylist(accessToken, playlistId, trackUris) {
    const response = await fetch(`${SPOTIFY_API_BASE_URL}/playlists/${playlistId}/tracks`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uris: trackUris }),
    });

    if (!response.ok) {
        const error = await response.json();
        console.error('Error adding tracks to playlist:', error);
        throw new Error('Failed to add tracks to playlist');
    }

    console.log('Tracks added to the playlist successfully');
}

// Main function to execute the flow
async function addToPlaylist(query) {
    const playlistId = '09komIV6F03qoUmhBAQGQ3'; // Replace with your existing playlist ID
    try {
        const accessToken = "BQCxR_-qjLCaBdo3CHbccvNBN3qtGM53VIecjp6PBN67bCCFxPGkzNOATPvgjn3dWBq35XPvFj3L09kvg6Dj56EvUU37AfE5Hq1eNTL70TLVKC3_ZDKvYOuKvuJo3se-JXXoQJ9hfvDCKfaTLA575UyDppghDxZ_N34lV2_KXFi0rkoe0JGa2Z-yMdlCs6UytMbu3p3hzYBW5YBFoxg4LbGsJJzC72MXboYrcj07wwPueuW1dkA7xDnwxlA";

        // Search for songs
        const songs = await searchSongs(accessToken, query);
        console.log('Songs found:', songs.map(song => ({ name: song.name, uri: song.uri })));

        // Prepare track URIs to add to the playlist
        const trackUris = songs.map(song => song.uri);
        
        // Add tracks to the existing playlist
        await addTracksToPlaylist(accessToken, playlistId, trackUris);

        console.log('Playlist updated with new tracks successfully.');
    } catch (error) {
        console.error('Error in main function:', error);
    }
}

// Execute the function with a sample query
addToPlaylist("rock");