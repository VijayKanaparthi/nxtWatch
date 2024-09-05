import {Component} from 'react'
import Cookies from 'js-cookie'
import ReactPlayer from 'react-player/youtube'
import Loader from 'react-loader-spinner'
import {BiLike, BiDislike, BiListPlus} from 'react-icons/bi'

import Navigation from '../Navigation'
import Navbar from '../Navbar'
import NxtWatchContext from '../../context/NxtWatchContext'
import FailureView from '../FailureView'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  progress: 'PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class VideoDetails extends Component {
  state = {
    videoDetails: [],
    apiStatus: apiStatusConstants.initial,
    isLiked: false,
    isDisLiked: false,
  }

  componentDidMount() {
    this.getVideoDetails()
  }

  getVideoDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.progress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/videos/${id}`
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
      const responseData = {
        id: data.video_details.id,
        channelName: data.video_details.channel.name,
        profileImageUrl: data.video_details.channel.profile_image_url,
        subscriberCount: data.video_details.channel.subscriber_count,
        description: data.video_details.description,
        publishedAt: data.video_details.published_at,
        thumbnailUrl: data.video_details.thumbnail_url,
        title: data.video_details.title,
        videoUrl: data.video_details.video_url,
        viewCount: data.video_details.view_count,
      }
      this.setState({
        videoDetails: responseData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  likeClicked = () => {
    this.setState(preState => ({isLiked: !preState.isLiked, isDisLiked: false}))
  }

  disLikeClicked = () => {
    this.setState(preState => ({
      isDisLiked: !preState.isDisLiked,
      isLiked: false,
    }))
  }

  renderProgress = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="ThreeDots" color="#0b69ff" width={80} height={80} />
    </div>
  )

  renderSuccess = () => (
    <NxtWatchContext.Consumer>
      {value => {
        const {isDarkTheme, addVideo} = value
        const {videoDetails, isLiked, isDisLiked} = this.state
        const like = isLiked ? 'like-clicked' : 'likes'

        const likesColors = isDarkTheme
          ? 'likes-container-dark-theme'
          : 'likes-container'

        const {
          videoUrl,
          title,
          publishedAt,
          viewCount,
          profileImageUrl,
          channelName,
          subscriberCount,
          description,
        } = videoDetails

        const saveClicked = () => {
          addVideo(videoDetails)
        }

        return (
          <>
            <div className="video-container">
              <ReactPlayer url={videoUrl} controls width="100%" height="100%" />
            </div>
            <p className="video-title-details">{title}</p>
            <div className="likes-container-counts">
              <div>
                <p>
                  {viewCount} views . {publishedAt}
                </p>
              </div>
              <div className={likesColors}>
                <button
                  type="button"
                  className={like}
                  onClick={this.likeClicked}
                >
                  <BiLike size={30} color={isLiked ? 'blue' : ''} />
                  <p>Like</p>
                </button>
                <button
                  type="button"
                  className="likes"
                  onClick={this.disLikeClicked}
                >
                  <BiDislike size={30} color={isDisLiked ? 'blue' : ''} />
                  <p>DisLike</p>
                </button>
                <button type="button" className="likes" onClick={saveClicked}>
                  <BiListPlus size={30} />
                  <p>Save</p>
                </button>
              </div>
            </div>
            <hr />
            <div className="channel-name-image-container">
              <img
                src={profileImageUrl}
                alt="channel logo"
                className="video-channel-image"
              />
              <div>
                <p>{channelName}</p>
                <p>{subscriberCount} subscribers</p>
              </div>
            </div>
            <p>{description}</p>
          </>
        )
      }}
    </NxtWatchContext.Consumer>
  )

  onRetry = () => {
    this.getVideoDetails()
  }

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
          const videoDetailsModes = isDarkTheme
            ? 'content-container-dark-theme'
            : 'content-container'
          return (
            <div className="video-details-container">
              <Navbar />
              <div
                data-testid="videoItemDetails"
                className="dividing-two-parts"
              >
                <div className="navigation-part">
                  <Navigation />
                </div>
                <div className={videoDetailsModes}>{this.renderViews()}</div>
              </div>
            </div>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }
}

export default VideoDetails
