const SHA256 = require('crypto-js/sha256')

class Block {
  // Class de los bloques de la cadena
  constructor (index, data, previouHash = '') {
    this.index = index
    this.date = new Date()
    this.data = data
    this.previousHash = previouHash
    this.hash = this.createHash()
  }

  createHash () {
    // Método que crea el hash del bloque
    return SHA256(this.index, this.data, this.date, this.previouHash).toString()
  }
}

class BlockChain {
  // clase que define la estructura de la cadena de bloques
  constructor (genesis) {
    this.chain = [this.createFirstBlock(genesis)]
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
    this.chain.push(block)
  }
}
const funcion = () => {}
funcion()
const block = new Block(0, 'prueba')
console.log(block)

const proyectCoin = new BlockChain('prueba de génesis')
proyectCoin.addBlock('nuevo bloque datos')
proyectCoin.addBlock('oootro bloque más :D')
console.log(JSON.stringify(proyectCoin, null, 2))
