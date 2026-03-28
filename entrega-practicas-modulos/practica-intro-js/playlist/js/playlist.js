/**
 * @typedef {Object} Song
 * @property {string} title - The title of the song.
 * @property {string} artist - The artist of the song.
 * @property {string} genre - The genre of the song.
 * @property {number} duration - The duration of the song in seconds.
 * @property {boolean} favorite - Whether the song is marked as a favorite.
 */
// Example: { title: 'Song Title', artist: 'Song Artist', genre: 'Song Genre', duration: 180, favorite: false }

/**
 * @typedef {Object} Playlist
 * @property {string} name - The name of the playlist.
 * @property {Song[]} songs - The list of songs in the playlist.
 */
// Example: { name: 'Playlist Name', songs: [{ title: 'Song Title', artist: 'Song Artist', genre: 'Song Genre', duration: 180, favorite: false }] }

const musicCatalog = () => {
  /**
   * Array of totalPlaylist in the catalog.
   * @type {Playlist[]}
  */
  let playlists = [];
  // Creamos helper para no repetir codigo en los distintos metodos que buscaran el indice de la lista .
  /**
   * Helper: Finds a playlist's index or throws an error if not found.
   * @param {string} name - The name of the playlist.
   * @returns {number} The index of the playlist.
   * @throws {Error} If the playlist is not found.
   */
  const _getPlaylistIndex = (name) => {
    const index = playlists.findIndex(playlist => playlist.name === name);
    if (index === -1) {
      throw new Error(`Playlist ${name} not found.`);
    }
    return index
  };

  /**
   * Adds a new playlist to the catalog.
   * @param {string} playlistName - The name of the new playlist.
   */
  const createPlaylist = (playlistName) => {
    if (playlists.some(p => p.name === playlistName)) {
      throw new Error(`Playlist "${playlistName}" already exists`);
    }
    const newPlaylist = {
      name: playlistName,
      songs: []
    };

    playlists = [...playlists, newPlaylist]
  };

  /**
   * Gets all playlists in the catalog.
   * @returns {playlists[]} The list of all playlists.
   */
  const getAllPlaylists = () => {
    // StructuredClone for deep copy and prevent external manipulation
    return structuredClone(playlists);
  };

  /**
   * Removes a playlist from the catalog.
   * @param {string} playlistName - The name of the playlist to remove.
   */
  const removePlaylist = (playlistName) => {
    _getPlaylistIndex(playlistName)

    const updatedPlaylist = playlists.filter(playlist => playlist.name !== playlistName)
    playlists = updatedPlaylist;
  };

  /**
   * Adds a song to a specific playlist.
   * @param {string} playlistName - The name of the playlist to add the song to.
   * @param {{ title: string, artist: string, genre: string, duration: number }} song - The song to add to the playlist.
   * @throws {Error} If the playlist is not found.
   */
  const addSongToPlaylist = (playlistName, song) => {

    const playlistIndex = _getPlaylistIndex(playlistName);

    const newSong = {
      ...song,
      favorite: false,
    };

    playlists = playlists.map((playlist, index) => {
      if (index === playlistIndex) {
        return {
          ...playlist,
          songs: [...playlist.songs, newSong],
        }
      }
      return playlist
    });
  };

  /**
   * Removes a song from a specific playlist.
   * @param {string} playlistName - The name of the playlist to remove the song from.
   * @param {string} title - The title of the song to remove.
   * @throws {Error} If the playlist or song is not found.
  */
  const removeSongFromPlaylist = (playlistName, title) => {
    const playlistIndex = _getPlaylistIndex(playlistName);
    const playlist = playlists[playlistIndex];

    const songExists = playlist.songs.some(song => song.title === title);
    if (!songExists) {
      throw new Error(`Song "${title}" not found in playlist "${playlistName}"`);
    }

    playlists = playlists.map((playlist, index) => {
      if (index !== playlistIndex)
        return playlist;
      return {
        ...playlist,
        songs: playlist.songs.filter(song => song.title !== title)
      };
    });
  };

  /**
   * Marks a song as a favorite or removes the favorite status.
   * @param {string} playlistName - The name of the playlist containing the song.
   * @param {string} title - The title of the song to mark as a favorite.
   * @returns {void}
  */
  const favoriteSong = (playlistName, title) => {
    const playlistIndex = _getPlaylistIndex(playlistName);

    const playlist = playlists[playlistIndex];
    if (!playlist.songs.some(s => s.title === title)) {
      throw new Error(`Song "${title}" not found in playlist ${playlistName}`);
    }

    playlists = playlists.map((playlist, index) => {
      if (index !== playlistIndex) {
        return playlist
      }

      const updatedSongs = playlist.songs.map(song => {
        if (song.title !== title) {
          return song
        }
        return {
          ...song,
          favorite: !song.favorite
        };
      });
      return {
        ...playlist,
        songs: updatedSongs
      };
    });
  };

  /**
   * Sorts songs in a specific playlist by a given criterion (title, artist, or duration).
   * @param {string} playlistName - The name of the playlist to sort songs in.
   * @param {'title' | 'artist' | 'duration'} criterion - The criterion to sort by.
   * @returns {void}
   * @throws {Error} If the playlist is not found or the criterion is invalid.
  */
  const sortSongs = (playlistName, criterion) => {
    const playlistIndex = _getPlaylistIndex(playlistName);

    const sortByCriterion = ['title', 'artist', 'duration']
    if (!sortByCriterion.includes(criterion)) {
      throw new Error(`Invalid criterion shoulb be one of ${sortByCriterion.join(', ')}`);
    }

    playlists = playlists.map((playlist, index) => {
      if (index !== playlistIndex) return playlist;
      const sortedSongs = playlist.songs.toSorted((a, b) => {
        console.log('en el sorted')
        if (criterion === 'duration') {
          return a.duration - b.duration
        }
        return a[criterion].localeCompare(b[criterion]);
      });

      return { ...playlist, songs: sortedSongs }
    });
  };
  return { createPlaylist, addSongToPlaylist, removeSongFromPlaylist, sortSongs, getAllPlaylists, removePlaylist, favoriteSong };
};

export default musicCatalog;
