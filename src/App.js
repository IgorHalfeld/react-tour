import React, { Component } from 'react'
import axios from 'axios'
import GifList from './components/GifList'

const HTTPClient = axios.create({
  baseURL: 'https://api.giphy.com/v1/gifs',
  params: {
    api_key: 'Ullp11IXdNXpv3Y1lw6chNunQZcSvXch',
    rating: 'G'
  }
})

const parseGiphyResponse = ({ data }) =>
  data.map((currentGif) => currentGif.images.fixed_width)

class App extends Component {
  constructor () {
    super()
    this.state = {
      q: '',
      limit: 5,
      gifs: []
    }
    this.callGiphyAPI({ path: '/trending', params: { limit: this.state.limit } })
  }

  callGiphyAPI = async ({ path, params }) => {
    try {
      const { data: trendingReponse } = await HTTPClient.get(path, { params })
      const gifsFormated = parseGiphyResponse(trendingReponse)
      this.setState({ gifs: gifsFormated })
    } catch (responseError) {
      console.log('* Something happen..', responseError)
    }
  }

  handleSearch = (event) => {
    if (event.key === 'Enter') {
      this.callGiphyAPI({ path: '/search', params: { limit: this.state.limit, q: this.state.q } })
    }
  }

  changeValue = (event) =>
    this.setState({ [event.target.name]: event.target.value })

  render () {
    return (
    <section className="container">
      <h1 className="app-title">Caqui<span>Coders</span></h1>
      <header className="container-header">

        <div className="searchbar">
          <input
            placeholder="Search something stupid..."
            type="text"
            className="searchbar--input"
            name="q"
            onChange={this.changeValue}
            onKeyUp={this.handleSearch}
          />
          <button
            className="searchbar--button"
            onClick={this.callGiphyAPI.bind(this, { path: '/search', params: { limit: this.state.limit, q: this.state.q } })}
          >Search</button>
          <select className="searchbar--limit" name="limit" onChange={this.changeValue}>
            <option value="5">05 gifs</option>
            <option value="10">10 gifs</option>
            <option value="15">15 gifs</option>
            <option value="20">20 gifs</option>
          </select>
        </div>
      </header>
      
      <GifList gifs={this.state.gifs}/>
    </section>
    )
  }
}

export default App
