const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password

}) => (
  <div>
    <h2>Log in</h2>
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          username
          <input type="text" value={username} name="Username" onChange={handleUsernameChange}/>
        </label>
      </div>
      <div>
        <label>
          password
          <input type="password" value={password} name="password" onChange={handlePasswordChange} />
        </label>
      </div>
      <button type="submit">login</button>
    </form>
  </div>
)

export default LoginForm