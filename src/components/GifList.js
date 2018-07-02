import React from 'react'
import PropTypes from 'prop-types'

const GifList = (props) => (
  <article className="container-article">
    {
      props.gifs.map((gif, index) => {
        return (
          <img
            key={index}
            className="gif"
            alt={gif.url}
            src={gif.url}
            width={gif.width}
            height={gif.height}
          />
        )
      })
    }
  </article>
)

GifList.protoTypes = {
  gifs: PropTypes.array
}

export default GifList