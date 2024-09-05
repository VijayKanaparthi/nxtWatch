import {Link} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {HiFire} from 'react-icons/hi'
import {SiYoutubegaming} from 'react-icons/si'
import {BiListPlus} from 'react-icons/bi'

import NxtWatchContext from '../../context/NxtWatchContext'

import './index.css'

const Navigation = () => (
  <NxtWatchContext.Consumer>
    {value => {
      const {isDarkTheme, activeTab, changeActiveTab} = value
      const modes = isDarkTheme
        ? 'navigation-dark-theme'
        : 'navigation-container'

      const homeClicked = () => {
        changeActiveTab('Home')
      }

      const trendingClicked = () => {
        changeActiveTab('Trending')
      }

      const gamingClicked = () => {
        changeActiveTab('Gaming')
      }

      const savedVideosClicked = () => {
        changeActiveTab('SavedVideos')
      }
      return (
        <>
          <div className={modes}>
            <ul className="navigation-lists-container">
              <Link to="/" className="link">
                <li className="navigation-lists" onClick={homeClicked}>
                  <div>
                    <AiFillHome
                      color={activeTab === 'Home' ? '#ff0000' : '#475569'}
                      size={35}
                      aria-label="close"
                    />
                  </div>
                  <div>
                    <p className="texts">Home</p>
                  </div>
                </li>
              </Link>
              <Link to="/trending" className="link">
                <li className="navigation-lists" onClick={trendingClicked}>
                  <div>
                    <HiFire
                      color={activeTab === 'Trending' ? '#ff0000' : '#475569'}
                      size={35}
                      aria-label="close"
                    />
                  </div>
                  <div>
                    <p className="texts">Trending</p>
                  </div>
                </li>
              </Link>
              <Link to="/gaming" className="link">
                <li className="navigation-lists" onClick={gamingClicked}>
                  <div>
                    <SiYoutubegaming
                      color={activeTab === 'Gaming' ? '#ff0000' : '#475569'}
                      aria-label="close"
                      size={35}
                    />
                  </div>
                  <div>
                    <p className="texts">Gaming</p>
                  </div>
                </li>
              </Link>
              <Link to="/saved-videos" className="link">
                <li className="navigation-lists" onClick={savedVideosClicked}>
                  <div>
                    <BiListPlus
                      color={
                        activeTab === 'SavedVideos' ? '#ff0000' : '#475569'
                      }
                      aria-label="close"
                      size={35}
                    />
                  </div>
                  <div>
                    <p className="texts">Saved videos</p>
                  </div>
                </li>
              </Link>
            </ul>
            <div className="contact-container">
              <p className="contact-us-text">CONTACT US</p>
              <ul className="social-medias-container">
                <li>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                    alt="facebook logo"
                    className="social-medias"
                  />
                </li>
                <li>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                    alt="twitter logo"
                    className="social-medias"
                  />
                </li>
                <li>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                    alt="linked in logo"
                    className="social-medias"
                  />
                </li>
              </ul>
              <p className="text">
                Enjoy! Now to see your channels and recommendations!
              </p>
            </div>
          </div>
        </>
      )
    }}
  </NxtWatchContext.Consumer>
)
export default Navigation
