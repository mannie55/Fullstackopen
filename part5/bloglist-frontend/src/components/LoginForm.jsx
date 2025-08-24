 const loginForm = ({
    handleLogin,
    
 }) => (
      <form onSubmit={handleLogin}>
        <div>
          username
          <input type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)}/>
        </div>
        <div>
          password
          <input type="password" value={password} name="password" onChange={({ target }) => setPassword(target.value)} />
        </div>
        <button type="submit">login</button>
      </form>
  )