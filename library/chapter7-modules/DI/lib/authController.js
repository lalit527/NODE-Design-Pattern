module.exports = (authService) => {
  const authController = {};
  authController.login(req.body.username, req.body.password, (err, result) => {
    authService.login(req.body.username, req.body.password, (err, result) => {
      // 
    }) 
  })

  authController.checkToken = (req, res, next) => {
    authService.checkToken(req.query.token, (err, result) => {
      // ..
    })
  }
}