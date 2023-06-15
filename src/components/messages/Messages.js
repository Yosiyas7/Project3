import React, { Component } from 'react';

export default class Messages extends Component {
  constructor(props) {
    super(props);

    // Bind the scrollDown method to the component instance
    this.scrollDown = this.scrollDown.bind(this);
  }

  // Method to scroll the message container to the bottom
  scrollDown() {
    const { container } = this.refs;
    container.scrollTop = container.scrollHeight;
  }

  // Scroll down the message container when the component mounts
  componentDidMount() {
    this.scrollDown();
  }

  // Scroll down the message container when the component updates
  componentDidUpdate(prevProps, prevState) {
    this.scrollDown();
  }

  render() {
    // Destructure messages, user and typingUsers from props
    const { messages, user, typingUsers } = this.props;

    return (
      <div ref="container" className="thread-container">
        <div className="thread">
          {/* Map over messages and render each message */}
          {messages.map((mes) => {
            console.log("mes.time: ", mes.time);
            return (
              <div
                key={mes.id}
                className={`message-container ${mes.sender === user.name && "right"}`}
              >
                <div className="time">{mes.time}</div>
                <div className="data">
                  <div className="message">{mes.message}</div>
                  <div className="name">{mes.sender}</div>
                </div>
              </div>
            );
          })}
          {/* Map over typingUsers and render a "typing" message for each */}
          {typingUsers.map((name) => {
            return (
              <div key={name} className="typing-user">
                {`${name} is typing ...`}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
