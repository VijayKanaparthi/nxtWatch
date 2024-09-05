import {Component} from 'react'
import {HiFire} from 'react-icons/hi'
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

class Trending extends Component {
  state = {trendingVideos: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getTrendingVideos()
  }

  getTrendingVideos = async () => {
    this.setState({apiStatus: apiStatusConstants.progress})
    const apiUrl = 'https://apis.ccbp.in/videos/trending'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const responsetrendingData = data.videos.map(each => ({
        channelName: each.channel.name,
        profileImageUrl: each.channel.profile_image_url,
        id: each.id,
        publishedAt: each.published_at,
        thumbnailUrl: each.thumbnail_url,
        title: each.title,
        viewCount: each.view_count,
      }))
      this.setState({
        trendingVideos: responsetrendingData,
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
    const {trendingVideos} = this.state
    return (
      <ul className="trending-videos-container">
        {trendingVideos.map(each => (
          <Link to={`/videos/${each.id}`} className="link">
            <li key={each.id} className="treding-list">
              <div>
                <img
                  src={each.thumbnailUrl}
                  alt="video thumbnail"
                  className="trending-videos-image"
                />
              </div>
              <div>
                <p className="treding-text">{each.title}</p>
                <p>{each.channelName}</p>
                <p>
                  {each.viewCount}.{each.publishedAt}
                </p>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    )
  }

  retry = () => {
    this.getTrendingVideos()
  }

  renderFailure = () => <FailureView retry={this.retry} />

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
          const trendingModes = isDarkTheme
            ? 'dark-theme-trending-container'
            : 'treding-container'

          const trendingHeadingModes = isDarkTheme
            ? 'treding-card-drak-theme'
            : 'treding-card'
          return (
            <div className={trendingModes}>
              <Navbar />
              <div data-testid="trending" className="dividing-two-parts">
                <div className="navigation-part-Trending">
                  <Navigation />
                </div>
                <div className="content-container-trending">
                  <div className={trendingHeadingModes}>
                    <div>
                      <HiFire color="#ff0b37" size={80} aria-label="close" />
                    </div>
                    <p className="treding-text">Trending</p>
                  </div>

                  {this.renderViews()}
                </div>
              </div>
            </div>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }
}
export default Trending
