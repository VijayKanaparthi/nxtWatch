import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiOutlineClose} from 'react-icons/ai'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'

import Navbar from '../Navbar'
import Navigation from '../Navigation'
import NxtWatchContext from '../../context/NxtWatchContext'
import VideoItem from '../VideoItem'
import FailureView from '../FailureView'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  progress: 'PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
  emptyList: 'EMPTYLIST',
}

class Home extends Component {
  state = {search: '', videosData: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getHomeVideos()
  }

  getHomeVideos = async () => {
    this.setState({apiStatus: apiStatusConstants.progress})
    const {search} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/videos/all?search=${search}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      if (data.videos.length > 0) {
        const responseData = data.videos.map(each => ({
          channelName: each.channel.name,
          profileImageUrl: each.channel.profile_image_url,
          id: each.id,
          publishedAt: each.published_at,
          thumbnailUrl: each.thumbnail_url,
          title: each.title,
          viewCount: each.view_count,
        }))
        this.setState({
          videosData: responseData,
          apiStatus: apiStatusConstants.success,
        })
      } else {
        this.setState({apiStatus: apiStatusConstants.emptyList})
      }
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  searching = event => {
    this.setState({search: event.target.value})
  }

  searchButtonClicked = event => {
    if (event.key === 'Enter') {
      this.getHomeVideos()
    }
  }

  retry = () => {
    this.setState(
      {
        search: '',
      },
      this.getHomeVideos,
    )
  }

  successView = () => {
    const {videosData} = this.state
    return (
      <ul className="home-videos">
        {videosData.map(each => (
          <VideoItem key={each.id} videos={each} />
        ))}
      </ul>
    )
  }

  renderLoader = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="ThreeDots" color="#0b69ff" width={80} height={80} />
    </div>
  )

  renderEmptyList = () => (
    <div className="empty-list-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
        alt="no videos"
        className="no-videos-image"
      />
      <p className="no-results-text">No Search results found</p>
      <p>Try different key words or remove search filter</p>
      <button type="button" className="Retry-button" onClick={this.retry}>
        Retry
      </button>
    </div>
  )

  failureView = () => <FailureView retry={this.retry} />

  renderViews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.progress:
        return this.renderLoader()
      case apiStatusConstants.success:
        return this.successView()
      case apiStatusConstants.failure:
        return this.failureView()
      case apiStatusConstants.emptyList:
        return this.renderEmptyList()
      default:
        return null
    }
  }

  render() {
    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {bannerClose, isDarkTheme, closeBanner} = value

          const displayBanner = bannerClose ? 'hide-banner' : 'banner-container'
          const bannerCloseButtonClicked = () => {
            closeBanner()
          }

          const {videosData, search} = this.state
          console.log(videosData)

          const searchInputModes = isDarkTheme
            ? 'dark-search-input'
            : 'search-input'
          const searchButtonModes = isDarkTheme
            ? 'dark-theme-search-button'
            : 'search-button'

          const videosModes = isDarkTheme
            ? 'dark-theme-home-container'
            : 'home-container'

          return (
            <>
              <div className={videosModes}>
                <Navbar />
                <div data-testid="home" className="dividing-two-parts">
                  <div className="navigation-part">
                    <Navigation />
                  </div>
                  <div className="content-part">
                    <div data-testid="banner" className={displayBanner}>
                      <div className="banner-content-container">
                        <img
                          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                          alt="nxt watch logo"
                          className="website-logo-banner"
                        />
                        <p>Buy Nxt Watch Premium Prepaind Plans with UPI</p>
                        <button type="button" className="banner-button">
                          GET IT NOW
                        </button>
                      </div>
                      <div>
                        <button
                          type="button"
                          className="banner-close-button"
                          onClick={bannerCloseButtonClicked}
                          data-testid="close"
                        >
                          <AiOutlineClose
                            color="#000000"
                            aria-label="close"
                            size={30}
                            data-testid="close"
                          />
                        </button>
                      </div>
                    </div>
                    <div className="home-videos-container">
                      <div className="search-container">
                        <input
                          type="search"
                          placeholder="Search"
                          className={searchInputModes}
                          onChange={this.searching}
                          onKeyDown={this.searchButtonClicked}
                          value={search}
                        />
                        <button
                          type="button"
                          className={searchButtonModes}
                          onClick={this.getHomeVideos}
                          data-testid="searchButton"
                        >
                          <BsSearch
                            size={30}
                            aria-label="close"
                            color={isDarkTheme ? '#475569' : '#000000'}
                          />
                        </button>
                      </div>
                      {this.renderViews()}
                    </div>
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
export default Home
