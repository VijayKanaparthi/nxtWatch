import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'

import Login from './components/Login'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import NxtWatchContext from './context/NxtWatchContext'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import SavedVideos from './components/SavedVideos'
import VideosDetails from './components/VideosDetails'
import NotFound from './components/NotFound'

import './App.css'

// Replace your code here

class App extends Component {
  state = {
    isDarkTheme: true,
    activeTab: 'Home',
    bannerClose: false,
    savedVideos: [],
  }

  closeBanner = () => this.setState({bannerClose: true})

  changeActiveTab = tab => this.setState({activeTab: tab})

  changeMode = () =>
    this.setState(preState => ({isDarkTheme: !preState.isDarkTheme}))

  addVideo = video => {
    const {savedVideos} = this.state
    const index = savedVideos.findIndex(each => each.id === video.id)
    if (index === -1) {
      this.setState({savedVideos: [...savedVideos, video]})
    }
  }

  render() {
    const {isDarkTheme, activeTab, bannerClose, savedVideos} = this.state
    return (
      <NxtWatchContext.Provider
        value={{
          closeBanner: this.closeBanner,
          changeMode: this.changeMode,
          changeActiveTab: this.changeActiveTab,
          addVideo: this.addVideo,
          isDarkTheme,
          activeTab,
          bannerClose,
          savedVideos,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/trending" component={Trending} />
          <ProtectedRoute exact path="/gaming" component={Gaming} />
          <ProtectedRoute exact path="/saved-videos" component={SavedVideos} />
          <ProtectedRoute exact path="/videos/:id" component={VideosDetails} />
          <Route component={NotFound} />
        </Switch>
      </NxtWatchContext.Provider>
    )
  }
}

export default App
