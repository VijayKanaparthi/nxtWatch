import {Component} from 'react'
import {SiYoutubegaming} from 'react-icons/si'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'

import Navbar from '../Navbar'
import Navigation from '../Navigation'
import NxtWatchContext from '../../context/NxtWatchContext'
import FailureView from '../FailureView'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  progress: 'PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Gaming extends Component {
  state = {gamingVideos: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getGamingVideos()
  }

  getGamingVideos = async () => {
    this.setState({apiStatus: apiStatusConstants.progress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/videos/gaming'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const responseData = data.videos.map(each => ({
        id: each.id,
        thumbnailUrl: each.thumbnail_url,
        title: each.title,
        viewCount: each.view_count,
      }))
      this.setState({
        gamingVideos: responseData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderProgress = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="ThreeDots" color=" #4f46e5" width={80} height={80} />
    </div>
  )

  renderSuccess = () => {
    const {gamingVideos} = this.state
    return (
      <ul className="gaming-videos-container">
        {gamingVideos.map(each => (
          <Link to={`/videos/${each.id}`} className="link">
            <li key={each.id}>
              <div>
                <img
                  src={each.thumbnailUrl}
                  alt="video thumbnail"
                  className="gaming-image"
                />
              </div>
              <div>
                <p className="gaming-text">{each.title}</p>
                <p>{each.viewCount} Watching Wolrdwide</p>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    )
  }

  onRetry = () => this.getGamingVideos()

  renderFailure = () => <FailureView retry={this.onRetry} />

  renderViews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.progress:
        return this.renderProgress()
      case apiStatusConstants.success:
        return this.renderSuccess()
      case apiStatusConstants.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          const gamingModes = isDarkTheme
            ? 'content-container-gaming-dark-theme'
            : 'content-container-gaming'
          const gamingCardModes = isDarkTheme
            ? 'gaming-card-container-dark-theme'
            : 'gaming-card-container'
          return (
            <>
              <div className="gaming-container">
                <Navbar />
                <div data-testid="gaming" className="dividing-two-parts">
                  <div className="navigation-part-gaming">
                    <Navigation />
                  </div>
                  <div className={gamingModes}>
                    <div className={gamingCardModes}>
                      <div>
                        <SiYoutubegaming
                          color="#ff0000"
                          size={50}
                          aria-label="close"
                        />
                      </div>
                      <div>
                        <p className="gaming-text">Gaming</p>
                      </div>
                    </div>
                    {this.renderViews()}
                  </div>
                </div>
              </div>
            </>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }
}
export default Gaming
