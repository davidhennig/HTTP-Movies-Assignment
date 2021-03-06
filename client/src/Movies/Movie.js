import React from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import UpdateForm from "./UpdateForm";
export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
  }

  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => this.setState({ movie: res.data }))
      .catch(err => console.log(err.response));
  };

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };

  editMovie = () => {
    // e.preventDefault();
    this.props.history.push(`/update-movie/${this.state.movie.id}`);
    console.log();
  };

  deleteMovie = e => {
    e.preventDefault();
    axios
      .delete(`http://localhost:5000/api/movies/${this.state.movie.id}`)
      .then(res => {
        // props.updateMovie(res.data);
        // props.history.push("/movie-list");
        console.log(res);
      })
      .catch(err => console.log(err));
  };

  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }

    return (
      <div className="save-wrapper">
        <MovieCard movie={this.state.movie} />
        <div className="save-button" onClick={this.saveMovie}>
          Save
        </div>
        <button className="md-button" onClick={this.editMovie}>
          Edit
        </button>
        <button className="md-button" onClick={this.deleteMovie}>
          Delete
        </button>
      </div>
    );
  }
}
