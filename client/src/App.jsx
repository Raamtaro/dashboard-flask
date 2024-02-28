import { useState } from 'react'
import './App.css'
import Header from './Layout/Header/Header'
import Sidebar from './Layout/Sidebar/Sidebar'
import Home from './Tabs/Dashboard/Home'
import Documents from './Tabs/Documents/Documents'
import Reports from './Tabs/Reports/Reports'

function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
  const [activeTab, setActiveTab] = useState('reports');

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
      {activeTab === 'reports' && <Reports />}

    </div>
  )
}

export default App
