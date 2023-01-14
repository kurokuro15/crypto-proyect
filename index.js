const SHA256 = require('crypto-js/sha256')

class Block {
  // Class de los bloques de la cadena
  constructor (index, data, previouHash = '') {
    this.index = index
    this.date = new Date()
    this.data = data
    this.previousHash = previouHash
    this.hash = this.createHash()
    // 'dificultad'
    this.nonce = 0
  }

  createHash () {
    // Método que crea el hash del bloque
    return SHA256(this.index, this.data, this.date, this.previousHash, this.nonce).toString()
  }

  mine (difficulty) {
    while (!this.hash.startsWith(difficulty)) {
      this.nonce++
      this.hash = this.createHash()
    }
  }
}

class BlockChain {
  // clase que define la estructura de la cadena de bloques
  constructor (genesis, difficulty = '00') {
    this.chain = [this.createFirstBlock(genesis)]
    this.difficulty = difficulty
  }

  createFirstBlock (genesis) {
    // Crea el primer bloque de la cadena
    return new Block(0, genesis)
  }

  getLastBlock () {
    // Retorna el último elemento de la cadena
    return this.chain[this.chain.length - 1]
  }

  addBlock (data) {
    // Agrega un bloque a la cadena.
    // Se extrae el index y hash del bloque anterior.
    const { index, hash } = this.getLastBlock()
    const block = new Block(index + 1, data, hash)
    block.mine(this.difficulty)
    console.log(block.nonce)
    this.chain.push(block)
  }

  removeInvalidBlock (invalidBlock) {
    if (!this.isValid()) {
      this.chain.filter(block => block !== invalidBlock)
    }
  }

  isValid () {
    // recorre el arreglo desde el segundo bloque verificando que concuerden los hash
    this.chain.map((currBlock, i) => {
      const prevBlock = this.chain[i - 1]
      if (!this.verifyHash(prevBlock, currBlock)) {
        return false
      }
      return true
    }).flat()
  }

  verifyHash (prevBlock, currBlock) {
    if (currBlock !== prevBlock.previousHash) {
      return false
    }
    if (currBlock.createHash() !== currBlock.hash) {
      return false
    }
    return true
  }
}

const block = new Block(0, 'prueba')
console.log(block)
const proyectCoin = new BlockChain('prueba de génesis', '0')
proyectCoin.addBlock('nuevo bloque datos')
console.log(JSON.stringify(proyectCoin, null, 2))
