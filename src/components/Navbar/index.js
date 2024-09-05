import {withRouter, Link} from 'react-router-dom'
import Popup from 'reactjs-popup'
import Cookies from 'js-cookie'
import {BsMoon, BsBrightnessHigh} from 'react-icons/bs'
import {GiHamburgerMenu} from 'react-icons/gi'
import {FiLogOut} from 'react-icons/fi'
import {AiFillHome, AiOutlineClose} from 'react-icons/ai'
import {HiFire} from 'react-icons/hi'
import {SiYoutubegaming} from 'react-icons/si'
import {BiListPlus} from 'react-icons/bi'

import NxtWatchContext from '../../context/NxtWatchContext'

import './index.css'

const Navbar = props => {
  const logout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <NxtWatchContext.Consumer>
      {value => {
        const {isDarkTheme, changeMode, changeActiveTab, activeTab} = value

        const shiftModes = () => changeMode()

        const savedVideosNavigation = () => {
          changeActiveTab('SavedVideos')
        }

        const gamingNavigation = () => {
          changeActiveTab('Gaming')
        }

        const trendingNavigation = () => {
          changeActiveTab('Trending')
        }

        const homeNavigation = () => {
          changeActiveTab('Home')
        }

        return (
          <>
            {isDarkTheme ? (
              <div className="navbar-container-dark-theme">
                <div>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png"
                    alt="website logo"
                    className="website-logo-navbar"
                  />
                </div>
                <ul className="navbar-un-order-list">
                  <li data-testid="theme" onClick={shiftModes}>
                    <BsBrightnessHigh
                      size={30}
                      aria-label="close"
                      color="#fff"
                    />
                  </li>
                  <li className="navbar-profile">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                      alt="profile"
                      className="profile-image"
                    />
                  </li>
                  <Popup
                    modal
                    trigger={
                      <li className="mobile-view-humburger">
                        <GiHamburgerMenu
                          color="#fff"
                          size={30}
                          aria-label="close"
                        />
                      </li>
                    }
                  >
                    {close => (
                      <div className="humburger-showing">
                        <div className="humburger-container-mobile">
                          <AiOutlineClose
                            color="#fff"
                            size={30}
                            onClick={() => close()}
                          />
                        </div>
                        <ul className="humburger-mobile-view-list">
                          <Link to="/" className="link">
                            <li
                              className="mobile-humburger-lists"
                              onClick={homeNavigation}
                            >
                              <div>
                                <AiFillHome
                                  size={50}
                                  color={
                                    activeTab === 'Home' ? '#ff0000' : '#fff'
                                  }
                                  aria-label="close"
                                />
                              </div>
                              <div>
                                <p className="humburger-texts">Home</p>
                              </div>
                            </li>
                          </Link>
                          <Link to="/trending" className="link">
                            <li
                              className="mobile-humburger-lists"
                              onClick={trendingNavigation}
                            >
                              <div>
                                <HiFire
                                  color={
                                    activeTab === 'Trending'
                                      ? '#ff0000'
                                      : '#fff'
                                  }
                                  size={50}
                                  aria-label="close"
                                />
                              </div>
                              <div>
                                <p className="humburger-texts">Trending</p>
                              </div>
                            </li>
                          </Link>
                          <Link to="/gaming" className="link">
                            <li
                              className="mobile-humburger-lists"
                              onClick={gamingNavigation}
                            >
                              <div>
                                <SiYoutubegaming
                                  color={
                                    activeTab === 'Gaming' ? '#ff0000' : '#fff'
                                  }
                                  aria-label="close"
                                  size={50}
                                />
                              </div>
                              <div>
                                <p className="humburger-texts">Gaming</p>
                              </div>
                            </li>
                          </Link>
                          <Link to="/saved-videos" className="link">
                            <li
                              className="mobile-humburger-lists"
                              onClick={savedVideosNavigation}
                            >
                              <div>
                                <BiListPlus
                                  color={
                                    activeTab === 'SavedVideos'
                                      ? '#ff0000'
                                      : '#fff'
                                  }
                                  aria-label="close"
                                  size={50}
                                />
                              </div>
                              <div>
                                <p className="humburger-texts">Saved videos</p>
                              </div>
                            </li>
                          </Link>
                        </ul>
                      </div>
                    )}
                  </Popup>
                  <li>
                    <button
                      type="button"
                      className="logout-button"
                      onClick={logout}
                    >
                      Logout
                    </button>
                  </li>
                  <li className="mobile-logout" onClick={logout}>
                    <FiLogOut color="#fff" size={30} aria-label="close" />
                  </li>
                </ul>
              </div>
            ) : (
              <div className="navbar-container">
                <div>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                    alt="website logo"
                    className="website-logo-navbar"
                  />
                </div>
                <ul className="navbar-un-order-list">
                  <li data-testid="theme" onClick={shiftModes}>
                    <BsMoon size={30} aria-label="close" />
                  </li>
                  <li>
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                      alt="profile"
                      className="navbar-profile"
                    />
                  </li>
                  <Popup
                    modal
                    trigger={
                      <li className="mobile-view-humburger">
                        <GiHamburgerMenu
                          color="#000000"
                          size={30}
                          aria-label="close"
                        />
                      </li>
                    }
                  >
                    {close => (
                      <div className="humburger-showing-light-theme">
                        <div className="humburger-container-mobile">
                          <AiOutlineClose
                            color="#000000"
                            size={30}
                            onClick={() => close()}
                          />
                        </div>
                        <ul className="humburger-mobile-view-list-dark-theme">
                          <Link to="/" className="link">
                            <li
                              className="mobile-humburger-lists"
                              onClick={homeNavigation}
                            >
                              <div>
                                <AiFillHome
                                  size={50}
                                  color={
                                    activeTab === 'Home' ? '#ff0000' : '#000000'
                                  }
                                  aria-label="close"
                                />
                              </div>
                              <div>
                                <p className="humburger-texts">Home</p>
                              </div>
                            </li>
                          </Link>
                          <Link to="/trending" className="link">
                            <li
                              className="mobile-humburger-lists"
                              onClick={trendingNavigation}
                            >
                              <div>
                                <HiFire
                                  color={
                                    activeTab === 'Trending'
                                      ? '#ff0000'
                                      : '#000000'
                                  }
                                  size={50}
                                  aria-label="close"
                                />
                              </div>
                              <div>
                                <p className="humburger-texts">Trending</p>
                              </div>
                            </li>
                          </Link>
                          <Link to="/gaming" className="link">
                            <li
                              className="mobile-humburger-lists"
                              onClick={gamingNavigation}
                            >
                              <div>
                                <SiYoutubegaming
                                  color={
                                    activeTab === 'Gaming'
                                      ? '#ff0000'
                                      : '#000000'
                                  }
                                  aria-label="close"
                                  size={50}
                                />
                              </div>
                              <div>
                                <p className="humburger-texts">Gaming</p>
                              </div>
                            </li>
                          </Link>
                          <Link to="/saved-videos" className="link">
                            <li
                              className="mobile-humburger-lists"
                              onClick={savedVideosNavigation}
                            >
                              <div>
                                <BiListPlus
                                  color={
                                    activeTab === 'SavedVideos'
                                      ? '#ff0000'
                                      : '#000000'
                                  }
                                  aria-label="close"
                                  size={50}
                                />
                              </div>
                              <div>
                                <p className="humburger-texts">Saved videos</p>
                              </div>
                            </li>
                          </Link>
                        </ul>
                      </div>
                    )}
                  </Popup>
                  <li>
                    <button
                      type="button"
                      className="logout-button"
                      onClick={logout}
                    >
                      Logout
                    </button>
                  </li>
                  <li className="mobile-logout" onClick={logout}>
                    <FiLogOut color="#000000" size={30} aria-label="close" />
                  </li>
                </ul>
              </div>
            )}
          </>
        )
      }}
    </NxtWatchContext.Consumer>
  )
}
export default withRouter(Navbar)
