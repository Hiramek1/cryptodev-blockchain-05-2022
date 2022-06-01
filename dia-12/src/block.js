const utils = require('./utils')

class Block {

  constructor({index, previousHash, data = []}) {
    this.index = index
    this.previousHash = previousHash
    this.data = data
    this.timestamp = new Date().getTime()
    this.nounce = 0
    this.hash = ''
  }

  compute() {
    return utils.hashGenerator(
        this.index, 
        this.previousHash, 
        this.timestamp,
        JSON.stringify(this.data),
        this.nounce
    )
  }

  mine(difficult) {

    const zeros = Array(difficult+1).join('0')
    while(this.hash.substring(0, difficult) !== zeros ){ 
      this.nounce++
      this.hash = this.compute()
    }

    console.log(`Block mined, nounce:  ${this.nounce}, hash: ${this.hash} `)
    return true

  }

}
module.exports = Block