import './index.css'
import {Component} from 'react'
import {v4 as uuid} from 'uuid'
import PasswordItem from '../PasswordItem'

class PasswordManager extends Component {
  state = {
    website: '',
    username: '',
    password: '',
    passwordList: [],
    searchInput: '',
    isShowPassword: false,
  }

  onChangeWebsite = event => {
    this.setState({website: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onToggleShow = () => {
    this.setState(prevState => ({isShowPassword: !prevState.isShowPassword}))
  }

  onDeletePassword = id => {
    const {passwordList} = this.state
    const filteredResults = passwordList.filter(each => each.id !== id)
    this.setState({passwordList: filteredResults})
  }

  onCreatePasswordStorage = event => {
    event.preventDefault()
    const {passwordList, website, username, password} = this.state
    const newUserPassword = {
      id: uuid(),
      website,
      username,
      password,
    }
    this.setState(prevState => ({
      passwordList: [...prevState.passwordList, newUserPassword],
      website: '',
      username: '',
      password: '',
    }))
  }

  render() {
    const {
      passwordList,
      website,
      username,
      password,
      isShowPassword,
      searchInput,
    } = this.state
    const searchResultsList = passwordList.filter(each =>
      each.website.toLowerCase().includes(searchInput.toLowerCase()),
    )
    const listLength = searchResultsList.length

    return (
      <div className="bg-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="logo-img"
        />
        <div className="add-new-password-container">
          <div className="add-new-input-container">
            <form
              className="form-container"
              onSubmit={this.onCreatePasswordStorage}
            >
              <h1 className="add-new-pas-heading">Add New Password</h1>
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                  className="input-img"
                />
                <hr className="seperator" />
                <input
                  value={website}
                  type="text"
                  className="input"
                  placeholder="Enter Website"
                  onChange={this.onChangeWebsite}
                />
              </div>
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                  className="input-img"
                />
                <hr className="seperator" />
                <input
                  value={username}
                  type="text"
                  className="input"
                  placeholder="Enter Username"
                  onChange={this.onChangeUsername}
                />
              </div>
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                  className="input-img"
                />
                <hr className="seperator" />
                <input
                  value={password}
                  type="password"
                  className="input"
                  placeholder="Enter Password"
                  onChange={this.onChangePassword}
                />
              </div>
              <button className="add-btn" type="submit">
                Add
              </button>
            </form>
          </div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
            className="manager-logo"
          />
        </div>
        <div className="add-password-container">
          <div className="your-passowrd-container">
            <div className="passwords-count-container">
              <h1 className="your-passwords">Your Passwords</h1>
              <div className="count-container">
                <p className="count">{listLength}</p>
              </div>
            </div>
            <div className="search-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="search-img"
              />
              <hr className="seperator" />
              <input
                type="search"
                className="input"
                placeholder="Enter Website"
                onChange={this.onSearchInput}
              />
            </div>
          </div>
          <hr className="seperator-2" />
          <div className="show-password-container">
            <input
              type="checkbox"
              id="showPassword"
              onClick={this.onToggleShow}
            />
            <label className="show-password" htmlFor="showPassword">
              Show Passwords
            </label>
          </div>
          {listLength >= 1 ? (
            <ul className="row-container">
              {searchResultsList.map(each => (
                <PasswordItem
                  passwordList={each}
                  key={each.id}
                  isShowPassword={isShowPassword}
                  onDeletePassword={this.onDeletePassword}
                />
              ))}
            </ul>
          ) : (
            <div className="no-passwords">
              <img
                className="no-pass-img"
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
              />
              <p className="passwords-no">No Passwords</p>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default PasswordManager
