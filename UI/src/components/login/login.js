import React, { Component } from "react";
import loginImg from "../../logo.svg";

import { Redirect } from "react-router-dom";

export class Login extends Component {
  constructor(props) {
    super(props);

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      email: '',
      password: '',
      redirect: null
    };
  }

  onChangeEmail(e) {
    this.setState({ email: e.target.value });
  }

  onChangePassword(e) {
    this.setState({ password: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    this.setState({
      role: '',
      name: '',
      email: '',
      phone: '',
      password: ''
    });
  }


  handleSubmit = async e => {
    e.preventDefault();
    console.log(`this.state.post =>`, this.state)
    const response = await fetch('/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state),
    });
    const res = await response.json();
    console.log(`res => `, res)
    if (res.statusCode === 200) {
      console.log(res.data)
      if(res.data.role === "A") this.setState({ redirect: '/dashboard' });
      else this.setState({ redirect: '/home' });
      alert("Login successfully.");
    }
    else {
      alert(res.message);
      this.setState({ responseToPost: res });
    }
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Login</div>
        <form onSubmit={this.handleSubmit}>
          <div className="content">
            <div className="image">
              <img src={loginImg} />
            </div>
            <div className="form">
              {/* <div className="form-group">
              <label htmlFor="selectuser">SelectUser</label>
              <select>
                <option>Admin</option>
                <option>User</option>
              </select>
            </div> */}
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="text" name="email" placeholder="email" value={this.state.email} onChange={this.onChangeEmail} required />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" placeholder="password" value={this.state.password} onChange={this.onChangePassword} required />
              </div>
            </div>
          </div>
          <div className="footer">
            <button type="submit" className="btn">
              Login
          </button>
          </div>
        </form>
      </div>
    );
  }
}
