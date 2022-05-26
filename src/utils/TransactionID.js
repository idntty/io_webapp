export var TransactionID = (function(ID){
  return function () {
    if(ID) {
      localStorage.setItem('transID', ID)
    } else {
      localStorage.setItem('transID', '7234ABC342342352345')
    }
    return localStorage.getItem('transID')
  }
})()
