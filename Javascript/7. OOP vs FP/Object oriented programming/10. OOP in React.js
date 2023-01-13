class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isToggledOn: true };

    // This binding is necessary to make `this` work in the callback
    // this should refer to Toggle class and not to button, so we need to bind it
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState((state) => ({
      isToggledOn: !state.isToggledOn,
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggledOn ? "ON" : "OFF"}
      </button>
    );
  }
}
