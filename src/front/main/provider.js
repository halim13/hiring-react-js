export const MContext = React.createContext() //exporting context object
class provider extends Component {
  state = { login: '' }
  render () {
    return (
      <MContext.Provider
        value={{
          state: this.state,
          setLogin: value =>
            this.setState({
              login: value
            })
        }}
      >
        {this.props.children}
      </MContext.Provider>
    )
  }
}
