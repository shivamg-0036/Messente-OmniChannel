import './App.css';
import { useState, useEffect } from 'react';
import Navbar from './Components/Navbar';
import './Pages/CSS/Bootstrap/bootstrap-extended.css'
import './Pages/CSS/Bootstrap/bootstrap.css'
import './Pages/CSS/Bootstrap/bootstrap.min.css'
import './Pages/CSS/Bootstrap/colors.css'
import './Pages/CSS/Bootstrap/components.css'
import './Pages/CSS/Bootstrap/vertical-content-menu.css'
import './Pages/CSS/Bootstrap/vertical-content-menu.min.css'
import Sidebar from './Components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Client_Creation from './Components/Client_Creation';
import User_Creation from './Components/User_Creation';
import CampaignPage from './Components/CampaignPage';
import DLTManagement from './Components/DLTManagement';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 767);

  // Listen to window resize
  useEffect(() => {
    const handleResize = () => {
      setSidebarOpen(window.innerWidth > 768);
    };

    window.addEventListener('resize', handleResize);

    // Initial check
    handleResize();

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="App-container">
      <div className='App-outermost-container'>
        <div className='Navbar-container'>
          <Navbar toggleSidebar={() => setSidebarOpen(prev => !prev)} />
        </div>

        <div className='content-div'>
          <div className={`Sidebar-container ${sidebarOpen ? 'open-side' : 'close-side'}`} style={{ width: window.innerWidth < 768 ? '100%' : undefined }}>
            <Sidebar isSidebarOpen={sidebarOpen} />

          </div>

          <div className={`Main-content-div ${sidebarOpen ? 'open-side' : 'close-side'}`}>
            <Routes>
              <Route path='/' element={<Client_Creation sidebarOpen={sidebarOpen} />} />
              <Route path='/usercreation' element={<User_Creation sidebarOpen={sidebarOpen} />} />
              <Route path='/campaignmgt' element={<CampaignPage sidebarOpen={sidebarOpen} />}/>
              <Route path='/templatemgt' element={<DLTManagement sidebarOpen={sidebarOpen} />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
