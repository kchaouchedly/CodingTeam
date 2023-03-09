import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import authService from '../services/auth.service';

const ResetPasswordToken = () => {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { token } = useParams();

  const handleResetPassword = (e) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      setMessage('Passwords do not match');
      return;
    }

    setLoading(true);

    authService
      .posttoken(token, { code ,password })
      .then((response) => {
        setLoading(false);
        setMessage(response.data.message);
        setPassword('');
        setPasswordConfirm('');
        setTimeout(() => navigate('/login'), 3000);
      })
      .catch((error) => {
        setLoading(false);
        setMessage(
          (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString()
        );
      });
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <h4>Reset Password</h4>
        <form onSubmit={handleResetPassword}>
          <div className="form-group">
            <label htmlFor="password">New Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="passwordConfirm">Confirm New Password</label>
            <input
              type="password"
              className="form-control"
              id="passwordConfirm"
              required
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">code send in mail</label>
            <input
              type="password"
              className="form-control"
              id="password"
              required
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
          <div className="form-group">
            <button className="btn btn-primary btn-block" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Reset Password</span>
            </button>
          </div>

          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordToken;
