import {Component} from 'react'
import {BiListPlus} from 'react-icons/bi'
import {Link} from 'react-router-dom'

import Navbar from '../Navbar'
import Navigation from '../Navigation'
import NxtWatchContext from '../../context/NxtWatchContext'

import './index.css'

class SavedVideos extends Component {
  renderNoSavedVideos = () => (
    <NxtWatchContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        const noSavedVideosModes = isDarkTheme
          ? 'no-saved-videos-dark-theme'
          : 'no-saved-videos'
        return (
          <>
            <div className={noSavedVideosModes}>
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
                alt="no saved videos"
                className="no-saved-videos"
              />
              <p className="no-saved-videos-text">No saved videos found</p>
              <p>You can save your videos while watching them</p>
            </div>
          </>
        )
      }}
    </NxtWatchContext.Consumer>
  )

  renderSavedVideos = () => (
    <NxtWatchContext.Consumer>
      {value => {
        const {savedVideos, isDarkTheme} = value
        const noSavedVideosModes = isDarkTheme
          ? 'saved-videos-list-dark-theme'
          : 'saved-videos-list'
        const savedVideosCard = isDarkTheme
          ? 'saved-videos-card-dark-theme'
          : 'saved-videos-card'
        return (
          <>
            <div className={savedVideosCard}>
              <BiListPlus color="red" size={50} />
              <p className="saved-videos-text">Saved Videos</p>
            </div>
            <ul className={noSavedVideosModes}>
              {savedVideos.map(each => (
                <Link to={`/videos/${each.id}`} className="link">
                  <li key={each.id}>
                    <img
                      src={each.thumbnailUrl}
                      alt="video thumbnail"
                      className="video-thumbnail"
                    />
                    <p className="saved-videos-text">{each.title}</p>
                    <p>{each.channelName}</p>
                    <p>
                      {each.viewCount} views . {each.publishedAt}
                    </p>
                  </li>
                </Link>
              ))}
            </ul>
          </>
        )
      }}
    </NxtWatchContext.Consumer>
  )

  render() {
    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {savedVideos} = value
          console.log(savedVideos)
          const savedVideosModes =
            savedVideos.length > 0
              ? 'content-container-saved-videos'
              : 'content-container-no-saved-videos'
          return (
            <div className="saved-videos-container">
              <Navbar />
              <div data-testid="savedVideos" className="dividing-two-parts">
                <div className="navigation-part-saved-videos">
                  <Navigation />
                </div>
                <div className={savedVideosModes}>
                  {savedVideos.length > 0
                    ? this.renderSavedVideos()
                    : this.renderNoSavedVideos()}
                </div>
              </div>
            </div>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }
}
export default SavedVideos
