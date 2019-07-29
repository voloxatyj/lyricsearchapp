import React, {Component} from 'react';
import axios from 'axios';
import {Consumer} from '../../context';

class Search extends Component {
    state = {
        trackTitle: ''
    };
    findTrack = (dispatch, e) => {
        e.preventDefault();

        axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?q_track=${this.state.trackTitle}&page_size=3&page=1&s_track_rating=desc&f_has_lyrics=1&apikey=${process.env.REACT_APP_MY_KEY}`)
            .then(res => {
                dispatch({
                    type:'SEARCH_TRACKS',
                    payload: res.data.message.body.track_list
                });
                this.setState({
                    trackTitle:''
                });
            })
            .catch(err => console.log(err));
    }
    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    render() {
        return (
            <Consumer>
                {value => {
                    const {dispatch} = value;
                    return (
                        <div className="card card-body p-4 mb-4">
                            <h1 className="displa-4 text-center">
                                <i className="fas fa-music"/>Search For A Song</h1>
                            <p className="lead text-center">Get the lyrics for any song</p>
                            <form
                                onSubmit={this
                                .findTrack
                                .bind(this, dispatch)}>
                                <div className="form-group">
                                    <input
                                        className="form-control form-control-lg"
                                        type="text"
                                        value={this.state.trackTitle}
                                        name='trackTitle'
                                        placeholder='Song title....'
                                        onChange={this.onChange}/>
                                </div>
                                <button className="btn btn-primary btn-lg btn-block mb-5" type="submit">Get Track Lyrics</button>
                            </form>
                        </div>
                    )
                }}
            </Consumer>
        )
    }
}

export default Search;