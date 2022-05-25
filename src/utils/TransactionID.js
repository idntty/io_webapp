export var TransactionID = (function(){
  return function () {
    localStorage.setItem('transID', '7234ABC342342352345')
    return localStorage.getItem('transID')
  }
})
