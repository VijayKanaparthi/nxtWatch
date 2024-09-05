import {Link} from 'react-router-dom'
import './index.css'

const VideoItem = props => {
  const {videos} = props
  const {
    id,
    channelName,
    profileImageUrl,
    publishedAt,
    thumbnailUrl,
    title,
    viewCount,
  } = videos

  return (
    <Link to={`/videos/${id}`} className="link">
      <li className="video-item-list">
        <img
          src={thumbnailUrl}
          alt="video thumbnail"
          className="thumbnail-url"
        />
        <div className="video-item-profile-title">
          <div>
            <img
              src={profileImageUrl}
              alt="channel logo"
              className="profile-image-url"
            />
          </div>
          <div>
            <p className="video-title">{title}</p>
            <p>{channelName}</p>
            <p>
              {viewCount}Views .{publishedAt}
            </p>
          </div>
        </div>
      </li>
    </Link>
  )
}
export default VideoItem
