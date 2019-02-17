module.exports = (token, user) => {
  return {
    token: token,
    user: {
      id: user._id,
      name: user.name,
      picture: user.picture,
      email: user.email,
      loginVia: user.loginVia
    }
  }
}