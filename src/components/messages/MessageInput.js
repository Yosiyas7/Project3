import React, { Component } from 'react';

export default class MessageInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: "",
            isTyping: false
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.sendMessage();
        this.setState({ message: "" });
    }
    
    // Send the message by calling the sendMessage function from props
    sendMessage = () => {
        this.props.sendMessage(this.state.message);
    }

    componentWillUnmount() {
        this.stopCheckingTyping();
    }

    // Send typing indicator to the server when user starts typing
    sendTyping = () => {
        this.lastUpdateTime = Date.now();
        if (!this.state.isTyping) {
            this.setState({ isTyping: true });
            this.props.sendTyping(true);
            this.startCheckingTyping();
        }
    }

    // Start checking if the user is typing after a certain interval
    startCheckingTyping = () => {
        console.log("Typing");
        this.typingInterval = setInterval(() => {
            if ((Date.now() - this.lastUpdateTime) > 300) {
                this.setState({ isTyping: false });
                this.stopCheckingTyping();
            }
        }, 300);
    }

    // Stop checking if the user is typing
    stopCheckingTyping = () => {
        console.log("Stop Typing");
        if (this.typingInterval) {
            clearInterval(this.typingInterval);
            this.props.sendTyping(false);
        }
    }

    render() {
        const { message } = this.state;
        console.log("message: ", message);
        
        return (
            <div className="message-input">
                <form onSubmit={this.handleSubmit} className="message-form">
                    <input
                        id="message"
                        ref={"messageinput"}
                        type="text"
                        className="form-control"
                        value={message}
                        autoComplete={"off"}
                        placeholder="Type something interesting"
                        onKeyUp={e => { e.keyCode !== 13 && this.sendTyping() }}
                        onChange={({ target }) => {
                            this.setState({ message: target.value });
                        }}
                    />
                    <button
                        disabled={message.length < 1}
                        type="submit"
                        className="send"
                    >
                        Send
                    </button>
                </form>
            </div>
        );
    }
}
