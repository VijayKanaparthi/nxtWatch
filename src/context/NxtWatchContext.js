import React from 'react'

const NxtWatchContext = React.createContext({
  isDarkTheme: false,
  activeTab: 'Home',
  bannerClose: false,
  savedVideos: [],
})

export default NxtWatchContext
