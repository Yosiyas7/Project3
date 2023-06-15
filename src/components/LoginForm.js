import React, { Component } from 'react';
import { VERIFY_USER } from '../Events';

export default class LoginForm extends Component {
    constructor(props) {
        super(props);

        // Initialize state with nickname and error
        this.state = {
            nickname: "",
            error: ""
        };
    }

    // Callback function to handle the user verification response
    setUser = ({ user, isUser }) => {
        console.log(user, isUser);
        if (isUser) {
            this.setError("User name taken");
        } else {
            this.setError("");
            this.props.setUser(user);
        }
    }

    // Event handler for form submission
    handleSubmit = (e) => {
        e.preventDefault();

        const { socket } = this.props;
        const { nickname } = this.state;
        socket.emit(VERIFY_USER, nickname, this.setUser);
    }

    // Event handler for input value change
    handleChange = (e) => {
        this.setState({ nickname: e.target.value });
    }

    // Set the error message in the state
    setError = (error) => {
        this.setState({ error });
    }

    render() {
        const { nickname, error } = this.state;
        return (
            <div className="wrapper">
                <form onSubmit={this.handleSubmit} className="login-form">
                    <label htmlFor="nickname">
                        <h1>WELCOME TO GRODT</h1>
                        <h2>PICK A USERNAME</h2>
                    </label>
                    <input
                        ref={(input) => { this.textInput = input; }}
                        type="text"
                        id="nickname"
                        value={nickname}
                        onChange={this.handleChange}
                        placeholder={'username'}
                    />
                    <div className="error">{error ? error : null}</div>
                </form>
            </div>
        );
    }
}
