Quagga.init({
  inputStream : {
    name : "Live",
    type : "LiveStream",
    // target: document.querySelector('#yourElement')    // Or '#yourElement' (optional)
  },
  decoder : {
    readers : ["code_128_reader"]
  }
}, function(err) {
    if (err) {
        console.log(err);
        return
    }
    console.log("Initialization finished. Ready to start");
    Quagga.start();
});

Quagga.onDetected(function(result){
  document.getElementById('message').textContent = result.codeResult.code;
})