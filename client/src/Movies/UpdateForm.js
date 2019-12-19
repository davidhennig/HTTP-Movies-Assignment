import React, { useState, useEffect } from "react";
import axios from "axios";

const initialItem = {
  title: "",
  director: "",
  metascore: "",
  stars: ""
};

const UpdateForm = props => {
  const [movie, setMovie] = useState(initialItem);
  useEffect(() => {
    const itemToEdit = props.movies.find(
      e => `${e.id}` === props.match.params.id
    );
    console.log(itemToEdit);
    if (itemToEdit) {
      setMovie(itemToEdit);
    }
  }, [props.movies, props.match.params.id]);

  const changeHandler = ev => {
    setMovie({
      ...movie,
      [ev.target.name]: ev.target.value
    });
  };

  const changeStars = e => {
    setMovie({
      ...movie,
      stars: e.target.value.split(",")
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
      .then(res => {
        props.history.push(`/movies/${movie.id}`);
        console.log(res);
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <h2>Update Movie</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={changeHandler}
          placeholder="title"
          value={movie.title}
        />
        <div className="baseline" />

        <input
          type="text"
          name="director"
          onChange={changeHandler}
          placeholder="director"
          value={movie.director}
        />
        <div className="baseline" />

        <input
          type="text"
          name="metascore"
          onChange={changeHandler}
          placeholder="metascore"
          value={movie.metascore}
        />
        <div className="baseline" />

        <input
          type="text"
          name="stars"
          onChange={changeStars}
          placeholder="stars"
          value={movie.stars}
        />
        <div className="baseline" />

        <button className="md-button form-button">Update</button>
      </form>
    </div>
  );
};

export default UpdateForm;
