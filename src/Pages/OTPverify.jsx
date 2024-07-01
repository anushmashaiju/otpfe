import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './otp.css';

function OTPverify() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    try {
      const response = await axios.post('http://localhost:8001/auth/send-otp', { phoneNumber });
      if (response.data.message.includes('OTP sent')) {
        setOtpSent(true);
        alert('OTP sent successfully!');
      } else {
        alert('Failed to send OTP.');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      alert('Error sending OTP.');
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post('http://localhost:8001/auth/verify-otp', { phoneNumber, otp });
      if (response.data.message === 'OTP verified successfully') {
        setIsVerified(true);
        alert('OTP verified successfully!');
       
      } else {
        alert('Invalid OTP.');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      alert('Error verifying OTP.');
    }
  };

  return (
    <div>
      <div style={{ marginTop: '20px' }}>
        <h3>Login with Mobile</h3>
        <input
          type="text"
          placeholder="Enter your mobile number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <button onClick={handleSendOtp} disabled={otpSent}>Send OTP</button>
      </div>

      {otpSent && (
        <div style={{ marginTop: '20px' }}>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={handleVerifyOtp}>Verify OTP</button>
        </div>
      )}

      {isVerified && <p>Phone number verified successfully!</p>}
    </div>
  );
}

export default OTPverify;
