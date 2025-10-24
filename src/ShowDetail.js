import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'; // Import useParams
import axios from 'axios';

function ShowDetail() {
  // 1. 'useParams' reads the ':id' from the URL (e.g., "123")
  const { id } = useParams(); 

  // 2. STATE (to hold the details for *one* show)
  const [show, setShow] = useState(null); 

  // 3. EFFECT (This runs once when the component loads)
  useEffect(() => {
    // This is the API URL to get a *single* show by its ID
    const url = `https://api.tvmaze.com/shows/${id}`;

    axios.get(url)
      .then(response => {
        setShow(response.data); // Save the single show's data in our state
      })
      .catch(error => {
        console.error("Error fetching show details: ", error);
      });

  }, [id]); // This [id] means "re-run this if the id in the URL changes"

  // 4. Show a loading message until the 'show' data has arrived
  if (!show) {
    return <div>Loading...</div>;
  }

  // A placeholder image
  const placeholderImage = "https://via.placeholder.com/400x592.png?text=No+Image";

  // 5. JSX (Once we have the data, show this)
  return (
    <div className="movie-detail">
      <img
        src={show.image ? show.image.medium : placeholderImage}
        alt={show.name}
      />
      <div>
        <h1>{show.name}</h1>

        {/* The summary has HTML tags (like <p> <b>) in it.
            This line tells React to render them as real HTML. */}
        <div dangerouslySetInnerHTML={{ __html: show.summary }} />

        <p><strong>Rating:</strong> {show.rating.average ? `${show.rating.average} / 10` : 'N/A'}</p>
        <p><strong>Genres:</strong> {show.genres.join(', ')}</p>

        <Link to="/">← Back to Home</Link> {/* A link back to the homepage */}
      </div>
    </div>
  );
}

export default ShowDetail;