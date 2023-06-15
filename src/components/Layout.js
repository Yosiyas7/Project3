import React, { Component } from 'react';
import io from 'socket.io-client';
import { USER_CONNECTED, LOGOUT, VERIFY_USER } from '../Events';
import LoginForm from './LoginForm';
import ChatContainer from './chats/ChatContainer';

const socketUrl = "http://localhost:3231/";

export default class Layout extends Component {
    constructor(props) {
        super(props);

        this.state = {
            socket: null,
            user: null
        };
    }

    componentWillMount() {
        this.initSocket();
    }

    // Initialize the socket connection
    initSocket = () => {
        const socket = io(socketUrl);
        socket.on('connect', () => {
            console.log("Connected");
        });
        this.setState({ socket });
    }
    
    // Set the user in the state and emit USER_CONNECTED event to the server
    setUser = (user) => {
        const { socket } = this.state;
        console.log("user at layout: ", user);
        socket.emit(USER_CONNECTED, user);
        this.setState({ user });
    }

    // Handle the logout action by emitting LOGOUT event to the server and resetting the user in the state
    logout = () => {
        const { socket } = this.state;
        socket.emit(LOGOUT);
        this.setState({ user: null });
    }

    render() {
        const { title } = this.props;
        const { socket, user } = this.state;
        
        return (
            <div className="container">
                {
                    !user ?
                    <LoginForm socket={socket} setUser={this.setUser} />
                    :
                    <ChatContainer socket={socket} user={user} logout={this.logout} />
                }
            </div>
        );
    }
}
