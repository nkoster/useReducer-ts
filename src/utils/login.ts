interface LoginUser {
  username: string
  password: string
}

export async function login({username, password}: LoginUser) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === 'niels' && password === 'aap') {
        resolve(null)
      } else {
        reject()
      }
    }, 1000)
  })
}
