import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import './Sidebar.css';
import { useNavigate } from 'react-router-dom';
import addChatIcon from '../assets/add_note.png';
import awardIcon from '../assets/award.png';
import historyIcon from '../assets/history.png';
import logoutIcon from '../assets/logout.png';
import quizIcon from '../assets/quiz.png';
import settingIcon from '../assets/settings.png';
import usthLogo from '../assets/usthlogo.png';
import Setting from './SidebarItem/Setting';
import profileIcon from '../assets/profile.png';
import theoryIcon from '../assets/theory.png';


export default function Sidebar({ isOpen, toggleSidebar }) {
  const [showSettings, setShowSettings] = useState(false);
  const navigate = useNavigate();

  const mainMenuItems = [
    
    { text: 'Chat Bot', icon: addChatIcon },
    { text: 'Theories', icon: theoryIcon},
    { text: 'Excercise', icon: quizIcon },
    { text: 'Tests', icon: quizIcon },
    { text: 'Rankings', icon: awardIcon },
    { text: 'User', icon: profileIcon },
    { text: 'Setting', icon: settingIcon }
  ];

  const handleMainMenuClick = (menuItem) => {
    switch (menuItem) {
      
      case 'Chat Bot':
        toggleSidebar();
        navigate('/student-dashboard');
        break;
      case 'Theories':
        toggleSidebar();
        navigate('/theory');
        break;
      case 'Excercise':
        toggleSidebar();
        console.log('Excercise');
        break;
      case 'Tests':
        toggleSidebar();
        navigate('/quiz')
        break;
      case 'Rankings':
        toggleSidebar();
        navigate('/Ranking');
        break;
      case 'User':
        toggleSidebar();
        navigate('/user_profile');
        break;
      case 'Setting':
        toggleSidebar();
        handleSettings();
        break;
      default:
        break;
    }
  };


  const handleSettings = () => {
    setShowSettings(true);
  };

  const handleLogout = () => {
    console.log('Logging out...');
    localStorage.removeItem('user'); // Xóa thông tin người dùng khỏi localStorage
    const userAfterLogout = localStorage.getItem('user');
    console.log('Token after logout:', userAfterLogout); // Log token sau khi xóa (nên là null)
  
    toggleSidebar(); // Đóng Sidebar
    navigate('/login'); // Chuyển hướng về trang login
  }

  return (
    <>
      <Drawer open={isOpen} onClose={toggleSidebar} anchor="right">
        <Box className="sidebar-container" role="presentation">
          <List>
            <img src={usthLogo} alt="USTH Logo" className="usthlogo" />
          </List>

          <Divider className="divider" />

          {/* Main Menu Items */}
          <List>
            {mainMenuItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton onClick={() => handleMainMenuClick(item.text)}>
                  <ListItemIcon>
                    <img src={item.icon} alt={item.text} style={{ width: 24, height: 24 }} />
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Divider className="divider" />

          {/*Logout Section */}
          <div className="logout-section">
            <ListItem disablePadding>
              <ListItemButton onClick={handleLogout}>
                <ListItemIcon>
                  <img src={logoutIcon} alt="Logout" style={{ width: 24, height: 24 }} />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </div>
        </Box>
      </Drawer>

      {showSettings && <Setting closeSettings={() => setShowSettings(false)} />}
    </>
  );
}
