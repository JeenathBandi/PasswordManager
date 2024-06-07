import './index.css'

const PasswordItem = props => {
  const {passwordList, isShowPassword, onDeletePassword} = props
  const {id, website, username, password} = passwordList

  const clickDelete = () => onDeletePassword(id)

  return (
    <li className="password-item-ccontainer">
      <div className="round-container">
        <p className="letter">{username[0].toUpperCase()}</p>
      </div>
      <div className="password-storage-container">
        <p className="details">{website}</p>
        <p className="details">{username}</p>
        {isShowPassword ? (
          <p className="details">{password}</p>
        ) : (
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
            alt="stars"
            className="stars-img"
          />
        )}
      </div>
      <div className="delete-img-container">
        <button
          data-testid="delete"
          type="button"
          className="del-btn"
          onClick={clickDelete}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png "
            alt="delete"
            className="delete-img"
          />
        </button>
      </div>
    </li>
  )
}

export default PasswordItem
