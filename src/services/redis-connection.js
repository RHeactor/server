import Promise from 'bluebird'
import redis from 'redis'
Promise.promisifyAll(redis.RedisClient.prototype)
Promise.promisifyAll(redis.Multi.prototype)

export class RedisConnection {
  constructor (host = '127.0.0.1', port = '6379', database = 0, password = false, tls = false) {
    this.host = host
    this.port = port
    this.database = database
    this.password = password
    this.tls = tls
  }

  connect () {
    return Promise.try(() => {
      const opts = {
        host: this.host,
        port: this.port
      }

      if (this.password) {
        opts.password = this.password
      }
      if (this.tls) {
        opts.tls = { checkServerIdentity: () => undefined }
      }

      this.client = redis.createClient(opts)
      if (!this.database) {
        return this.client
      }
      return this.client.selectAsync(this.database)
        .then(() => {
          return this.client
        })
    })
  }
}
