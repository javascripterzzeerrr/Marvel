import { Component } from 'react';
import './charList.scss';
import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";


class CharList extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        data: [],
        loading: true,
        error: false
    }

    marvelService = new MarvelService();

    onCharLoaded = (data) => {
        this.setState({
            data,
            loading: false
        })
    }

    onError = () => {
        this.setState({
            error: !this.state.error,
        })
    }

    updateItems = () => {
        this.marvelService
            .getAllCharacters()
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

    // lifecycle methods
    componentDidMount() {
        this.updateItems();
    }

    render() {

        const {data, loading, error} = this.state;
        const errorMsg = error ? <ErrorMessage /> : null;
        const spinner = (loading && !error) ? <Spinner /> : null;
        const content = !(loading || error) ? <Item char={data} onCharSelected={this.props.onCharSelected} /> : null;

        return (
            <div className="char__list">
                {errorMsg}
                {spinner}
                <ul className="char__grid">
                    {content}
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

const Item = ({char, onCharSelected}) => {
    let flag = false;

    return char.map(item => {
        const {thumbnail, name} = item;
        flag = false;
        if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
            flag = true;
        }

        return (
            <li
                className="char__item"
                key={item.id}
                onClick={() => onCharSelected(item.id)}>
                <img src={thumbnail} alt="abyss" style={flag ? {objectFit: 'contain'} : {objectFit: 'cover'}}/>
                <div className="char__name">{name}</div>
            </li>
        );
    })
}

export default CharList;