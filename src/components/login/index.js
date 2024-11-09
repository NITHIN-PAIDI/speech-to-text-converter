import React, { Component } from 'react';
import './index.css';
import { Navigate } from 'react-router-dom';

class Login extends Component {
  state = {
    email: '',
    password: '',
    redirect: false,
    showErrorMsg:false
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    
    this.setState({ [name]: value ,showErrorMsg:false});
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login submitted:', this.state);
    if(this.state.email === "nithin@speech.io" && this.state.password === "Nithin"){
      this.setState({ redirect: true });
    } else{
      this.setState({showErrorMsg:true})
    }
  };

  render() {
    if (this.state.redirect) {
      return <Navigate to="/speech-to-text" />;
    }

    const {showErrorMsg} = this.state;

    return (
      <div className="login-container">
        <div className="login-box">
          <h2>Welcome Back</h2>
          <form onSubmit={this.handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
                required
                placeholder="Enter your email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
                required
                placeholder="Enter your password"
              />
            </div>
            {this.state.showErrorMsg && 
            <p className="error-msg">Incorrect Email or Password</p>
          }   <button type="submit" className="login-button">Login</button>
          </form>
          <div className="login-footer">
           
           
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
