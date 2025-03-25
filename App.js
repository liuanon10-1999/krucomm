import React, { useState } from 'react';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [storedUsername, setStoredUsername] = useState('');
  const [storedPassword, setStoredPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [users, setUsers] = useState([]); // เก็บผู้ใช้ทั้งหมดที่สมัคร

  const [passwordVisible, setPasswordVisible] = useState(false);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Handle Login
  const handleLogin = () => {
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
      setIsLoggedIn(true);
      setMessage('');
    } else {
      setMessage('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
    }
  };

  // Handle Register
  const handleRegister = () => {
    if (!username || !password) {
      setMessage('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }

    // เช็คชื่อผู้ใช้ซ้ำ
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
      setMessage('ชื่อผู้ใช้มีอยู่แล้ว');
      return;
    }

    // สมัครสมาชิกใหม่
    const newUser = { username, password };
    setUsers([...users, newUser]);
    setIsRegistering(false); // กลับไปที่หน้าเข้าสู่ระบบ
    setMessage('สมัครสมาชิกสำเร็จ! คุณสามารถเข้าสู่ระบบได้');
  };

  // Handle Room Select
  const handleRoomSelect = (room) => {
    setSelectedRoom(room);
    alert(`คุณเลือกห้อง: ${room}`);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
    setMessage('');
  };

  return (
    <div className={`App ${isDarkMode ? 'dark-mode' : ''}`}>
      <header className="App-header">
        <h1>ระบบเข้าสู่ระบบ</h1>
      </header>

      <aside className="theme-toggle-container">
        <button className="theme-toggle" onClick={toggleDarkMode}>
          สลับธีม
        </button>
      </aside>

      <main>
        {!isLoggedIn ? (
          <div className="login-container">
            {!isRegistering ? (
              <>
                <h2>เข้าสู่ระบบ</h2>
                <input
                  type="text"
                  placeholder="ชื่อผู้ใช้"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <div className="password-input-container">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    placeholder="รหัสผ่าน"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span className="password-toggle-icon" onClick={() => setPasswordVisible(!passwordVisible)}>
                    {passwordVisible ? "👁️" : "👁️‍🗨️"}
                  </span>
                </div>
                <button onClick={handleLogin}>เข้าสู่ระบบ</button>
                {message && <p>{message}</p>}
                <button onClick={() => setIsRegistering(true)}>สมัครสมาชิก</button>
              </>
            ) : (
              <>
                <h2>สมัครสมาชิก</h2>
                <input
                  type="text"
                  placeholder="ชื่อผู้ใช้"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <div className="password-input-container">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    placeholder="รหัสผ่าน"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span className="password-toggle-icon" onClick={() => setPasswordVisible(!passwordVisible)}>
                    {passwordVisible ? "👁️" : "👁️‍🗨️"}
                  </span>
                </div>
                <button onClick={handleRegister}>สมัครสมาชิก</button>
                {message && <p>{message}</p>}
                <button onClick={() => setIsRegistering(false)}>กลับไปที่หน้าเข้าสู่ระบบ</button>
              </>
            )}
          </div>
        ) : (
          <div className="logged-in">
            <h2>ยินดีต้อนรับ, {username}</h2>
            <button onClick={handleLogout}>ออกจากระบบ</button>

            <div className="room-selection">
              <h3>เลือกห้องเรียน</h3>
              <div className="room-buttons">
                {['ป.1', 'ป.2', 'ป.3', 'ป.4', 'ป.5', 'ป.6'].map((room, index) => (
                  <button
                    key={index}
                    className="room-button"
                    onClick={() => handleRoomSelect(room)}
                  >
                    {room}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      <footer>
        <p>&copy; 2025 ระบบเข้าสู่ระบบ</p>
      </footer>
    </div>
  );
}

export default App;
