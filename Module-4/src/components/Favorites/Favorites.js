import React, { Component } from 'react';
import './Favorites.css';
import { connect } from 'react-redux';
import { removeMovieFromFavorites, postFavorites } from '../../redux/actions';
import { Link } from 'react-router-dom';

class Favorites extends Component {
    state = {
        listName: '',
        isClicked: false
    }
    listNameChangeHandler = (event) => {
        this.setState({ listName: event.target.value });
    }
    getImdbIDArray = () => {
        let favouritesIDArray = this.props.favorites.map((item) => {
            return item.imdbID;
        })
        return favouritesIDArray;
    }

    saveListHandler = () => {
        this.setState({ isClicked: true });
        this.props.postFavorites(this.state.listName, this.getImdbIDArray());
    }

    render() { 
        return (
            <div className="favorites">
                <input 
                    placeholder="Новый список" 
                    className="favorites__name"
                    disabled={this.state.isClicked}
                    onChange={this.listNameChangeHandler} 
                    />
                <ul className="favorites__list">
                    {this.props.favorites.map((item) => {
                        return <li key={item.imdbID}>
                            
                            {item.Title} ({item.Year})
                            <button 
                                className="favorites__delete"
                                onClick={() => this.props.removeMovieFromFavorites(item.imdbID)}>
                                    x
                            </button>
                            </li>;
                    })}
                </ul>
                {!this.state.isClicked ? <button type="button" className="favorites__save" onClick={this.saveListHandler} >Сохранить список</button> 
                : <Link to={'/list/' + this.props.listID} target="_blank">Перейти к выбранным фильмам</Link>}
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    removeMovieFromFavorites: (imdbID) => dispatch(removeMovieFromFavorites(imdbID)),
    postFavorites: (listName, favouritesIDArray) => dispatch(postFavorites(listName, favouritesIDArray))
  });
const mapStateToProps = (state) => {
    return {
        favorites: state.favorites,
        listID: state.listID
    }
  };
export default connect(mapStateToProps, mapDispatchToProps)(Favorites);