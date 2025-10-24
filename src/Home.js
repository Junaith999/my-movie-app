import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // For linking between pages

function Home() {
  // 1. STATE
  // 'shows' will hold our list of TV shows from the API
  const [shows, setShows] = useState([]); 
  // 'query' will hold what the user is typing in the search bar
  const [query, setQuery] = useState(''); 

  // 2. EFFECT (This runs when the 'query' state changes)
  useEffect(() => {
    // If the search bar is empty, just clear the shows and stop.
    if (query.trim() === '') {
      setShows([]);
      return; 
    }

    // This is the API URL we will call
    const searchUrl = `https://api.tvmaze.com/search/shows?q=${query}`;

    // Use axios to get data
    axios.get(searchUrl)
      .then(response => {
        // The data from TVmaze is an array, save it in our 'shows' state
        setShows(response.data); 
      })
      .catch(error => {
        console.error("Error fetching data: ", error);
      });

  }, [query]); // This [query] means "re-run this code whenever 'query' changes"

  // A link to a placeholder image for shows that don't have one
  const placeholderImage = "https://via.placeholder.com/200x295.png?text=No+Image";

  // 3. JSX (This is the HTML that gets shown on the page)
  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)} // Update 'query' state as user types
        placeholder="Search for a TV show..."
      />
      <div className="movie-grid">
        {/* Loop over the 'shows' array and make a card for each one */}
        {shows.map(result => (
          <div key={result.show.id} className="movie-card">

            {/* This Link makes the card clickable */}
            <Link to={`/show/${result.show.id}`}> 
              <img
                // Use the show's image, OR the placeholder if image is null
                src={result.show.image ? result.show.image.medium : placeholderImage}
                alt={result.show.name}
              />
              <h3>{result.show.name}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;