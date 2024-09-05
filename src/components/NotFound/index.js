import './index.css'

import Navbar from '../Navbar'
import NxtWatchContext from '../../context/NxtWatchContext'
import Navigation from '../Navigation'

const NotFound = () => (
  <NxtWatchContext.Consumer>
    {value => {
      const {isDarkTheme} = value
      const backgroundColor = isDarkTheme
        ? 'content-container-dark-theme'
        : 'content-container'
      const textColor = isDarkTheme
        ? 'not-found-text-dark-theme'
        : 'not-found-text'
      return (
        <div className='not-found-container'>
          <Navbar />
          <div className='dividing-two-parts'>
            <div className='navigation-part'>
              <Navigation />
            </div>
            <div className={backgroundColor}>
              <img
                src='https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'
                alt='not found'
                className='not-found-image'
              />
              <p className={textColor}>Page Not Found</p>
              <p>We are sorry, the page you requested could not be found.</p>
            </div>
          </div>
        </div>
      )
    }}
  </NxtWatchContext.Consumer>
)

export default NotFound
