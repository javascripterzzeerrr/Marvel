/* Class for working with API */

class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'd8f03efc82f4708ffa25e355b24ccf2b';

    getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could' not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    }

    // Getting all characters from the server
    getAllCharacters = async () => {
        const url = `${this._apiBase}characters?limit=9&offset=210&apikey=${this._apiKey}`;
        const res = await this.getResource(url);
        return res.data.results.map(this._transformCharacter);
    }

    // Getting one character from the server
    getCharacter = async (id) => {
        const url = `${this._apiBase}characters/${id}?apikey=${this._apiKey}`;
        const res = await this.getResource(url);
        return this._transformCharacter(res.data.results[0]);
    }

    // transform data which comes from the server
    _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: (char.description) ? (char.description.slice(0,210) + '...') : "The content is empty",
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }
}

export default MarvelService;