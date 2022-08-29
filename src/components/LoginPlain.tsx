import {login} from '../utils/login'
import useLogin from '../hooks/useLogin'
import React from 'react'

function LoginPlain() {

  const [state, dispatch] = useLogin()

  const {username, password, error, isLoggedIn, isLoading} = state

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    dispatch({type: 'login'})
    console.log('Logging In...')
    try {
      await login({username, password})
      dispatch({type: 'success'})
    } catch (error) {
      dispatch({type: 'error'})
    }
  }

  if (isLoggedIn) {
    return (
      <div>
        <h1>Hey {username}!</h1>
        <button onClick={() => dispatch({type: 'logout'})}>Log out</button>
      </div>
    )
  }
  
  return (
    <div>
      <div>
        <form onSubmit={onSubmit}>
          {error && <p>{error}</p>}
          <p>Login</p>
          <input
            type='text'
            placeholder='username'
            value={username}
            onChange={e => dispatch({type: 'field', fieldName: 'username', payload: e.currentTarget.value})}
          />
          <input
            type='password'
            placeholder='password'
            autoComplete='new-password'
            value={password}
            onChange={e => dispatch({
              type: 'field',
              fieldName: 'password',
              payload: e.currentTarget.value
            })}
          />
          <button type='submit' disabled={isLoading}>
            {isLoading ? 'Logging In...' : 'Log In'}
          </button>
        </form>
      </div>

    </div>
  )

}

export default LoginPlain
