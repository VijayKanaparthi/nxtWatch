import NxtWatchContext from '../../context/NxtWatchContext'
import './index.css'

const FailureView = props => {
  const {retry} = props
  return (
    <NxtWatchContext>
      {value => {
        const {isDarkTheme} = value
        const failureViewModes = isDarkTheme
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
        const retryClicked = () => {
          retry()
        }
        return (
          <div className="failure-container">
            <img
              src={failureViewModes}
              alt="failure view"
              className="failure-image"
            />
            <p className="failure-text">Oops! Something Went Wrong</p>
            <p>
              We are having some trouble to complete your request. Please try
              again.
            </p>
            <button
              type="button"
              className="Retry-button"
              onClick={retryClicked}
            >
              Retry
            </button>
          </div>
        )
      }}
    </NxtWatchContext>
  )
}
export default FailureView
