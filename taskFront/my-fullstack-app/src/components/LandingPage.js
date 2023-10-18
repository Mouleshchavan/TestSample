import React, { useState } from 'react';

const LandingPage = () => {
  const [isSignUpOpen, setSignUpOpen] = useState(false);
  const [isLoginOpen, setLoginOpen] = useState(false);

  const openSignUp = () => setSignUpOpen(true);
  const closeSignUp = () => setSignUpOpen(false);

  const openLogin = () => setLoginOpen(true);
  const closeLogin = () => setLoginOpen(false);

  return (
    <div style={{ backgroundImage: 'url("path-to-your-background-image.jpg")', backgroundSize: 'cover', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ background: 'rgba(255, 255, 255, 0.8)', padding: '20px', borderRadius: '8px', maxWidth: '400px', textAlign: 'center' }}>
        <h1>Logo</h1>
        <h2>Company Name</h2>
        <div>
          <button onClick={openSignUp}>Sign Up</button>
          <button onClick={openLogin}>Login</button>
        </div>
      </div>

      {isSignUpOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'rgba(0, 0, 0, 0.5)' }}>
          <div style={{ background: 'white', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
            <h2>Sign Up</h2>
            {/* Sign-up form and functionality here */}
            <button onClick={closeSignUp}>Close</button>
          </div>
        </div>
      )}

      {isLoginOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'rgba(0, 0, 0, 0.5)' }}>
          <div style={{ background: 'white', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
            <h2>Login</h2>
            {/* Login form and functionality here */}
            <button onClick={closeLogin}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
