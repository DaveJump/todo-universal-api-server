import mongoose from 'mongoose'
import chalk from 'chalk'

export default function connectDB(): Promise<mongoose.Connection> {
  return new Promise(resolve => {
    mongoose.connect(
      'mongodb://127.0.0.1:27017/todos',
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
    const connection = mongoose.connection
    connection.on('error', () => {
      const msg = chalk.red('\nMongodb connection error')
      console.log(msg)
      process.exit(1)
    })
    connection.once('open', () => {
      const mg = chalk.green('\nMongodb connected')
      console.log(mg)
      resolve(connection)
    })
  })
}
