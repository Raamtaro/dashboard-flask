import { useState } from 'react'
import './App.css'
import Header from './Header'
import Sidebar from './Sidebar'
import Home from './Tabs/Home'
import Documents from './Tabs/Documents'

function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
  const [activeTab, setActiveTab] = useState('documents');

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  const switchTab = (tabName) => {
    setActiveTab(tabName); // Update active tab based on clicked sidebar item
  };

  return (
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar}/>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} switchTab={switchTab}/>
      {activeTab === 'documents' && <Documents />}
      {activeTab === 'home' && <Home />}

    </div>
  )
}

export default App
