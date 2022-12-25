import React from 'react';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Cloud Storage',
    };
  }

  render() {
    const { title } = this.state;
    return (
      <header className="header">
        <h1 className="title">{title}</h1>
      </header>
    );
  }
}

export default Header;
