import app from './app'

const port = process.env.PORT || 3333

app.listen(port, (): void => {
  console.log('Server start in port ' + port)
})
