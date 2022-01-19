import app from './app'

const port = process.env.PORT || 3333

app.listen(port, (): void => {
  console.log('Server started in port ' + port)
})
