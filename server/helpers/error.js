module.exports = (res, code, msg) => {
  res.status(code).json(msg)
}
