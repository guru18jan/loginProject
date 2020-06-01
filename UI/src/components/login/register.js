import React, { Component } from "react";

export class Register extends Component {
  userData;

  constructor(props) {
    super(props);

    this.onChangerole = this.onChangerole.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      role: '' || 'A',
      name: '',
      email: '',
      phone: '',
      password: ''
    };
  }

  // Form Events
  onChangerole(e) {
    this.setState({ role: e.target.value });
  }
  onChangeName(e) {
    this.setState({ name: e.target.value });
  }

  onChangeEmail(e) {
    this.setState({ email: e.target.value });
  }

  onChangePhone(e) {
    this.setState({ phone: e.target.value });
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
    const response = await fetch('/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state),
    });
    const body = await response.json();
    console.log(`body => `, body)

    if (body.statusCode === 200) {
      alert("Your record register successfully.");
    }
    else {
      alert(body.message);
      this.setState({ responseToPost: body });
    }
  };

  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Register</div>
        <div className="content">
          <form onSubmit={this.handleSubmit}>
            <div className="form">
              <div className="form-group">
                <label htmlFor="selectuser">SelectUser</label>
                <select value={this.state.role} onChange={this.onChangerole}  >
                  <option value="A">Admin</option>
                  <option value="U">User</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input type="text" name="username" placeholder="username" value={this.state.username} onChange={this.onChangeName} required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="text" name="email" placeholder="email" value={this.state.email} onChange={this.onChangeEmail} required />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Contact No.</label>
                <input type="number" name="phone" placeholder="phone" value={this.state.phone} onChange={this.onChangePhone} required />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" placeholder="password" value={this.state.password} onChange={this.onChangePassword} required />
              </div>
            </div>
            <div className="footer">
              <button type="submit" className="btn">
                Register
          </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}