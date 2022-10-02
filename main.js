

/**
 * 
 *    USE THE MEDIA API TO GET AN IMAGE AND FIND BARCODE
 * 
 */
var streamBarcode = document.getElementById('startStream');
streamBarcode.addEventListener('click', function () {
  document.getElementById('fileStream').style.display = 'none';

  Quagga.init({
    inputStream: {
      name: "Live",
      type: "LiveStream",
      // target: document.querySelector('#interactive_kings')    // Or '#yourElement' (optional)
    },
    decoder: {
      readers: ["upc_reader",
        "upc_e_reader",]
    },
    debug: {
      drawBoundingBox: true,
      showFrequency: false,
      drawScanline: true,
      showPattern: false
    },
    multiple: false,
    locate: true,
  }, function (err) {
    if (err) {
      console.log(err);
      return
    }
    console.log("Initialization finished. Ready to start");
    Quagga.start();
  });


  Quagga.onDetected(function (result) {
    if(result){
      document.getElementById('message').innerHTML = result.codeResult.code;
      console.log('barcode detected');
      console.log(result);
    }
  });

});

document.getElementById('endStream').addEventListener('click', function(){
  Quagga.stop();
})

/**
 * 
 *   USE UPLOADED FILE TO SCAN FOR BARCODE
 * 
 */
var imageForScanning = document.getElementById('imageBarcode');
imageForScanning.addEventListener('change', function (e) {
  var image = document.getElementById('output');
  image.src = URL.createObjectURL(e.target.files[0]);
  Quagga.decodeSingle({
    decoder: {
      readers: [ "ean_reader", "ean_8_reader", "code_39_reader", "code_39_vin_reader", "codabar_reader", "upc_reader",
        "upc_e_reader"] // List of active readers
    },
    locate: true, // try to locate the barcode in the image
    src: image.src // or 'data:image/jpg;base64,' + data
  }, function (result) {
    if (result) {
      console.log("result", result.codeResult);
      document.getElementById('message').textContent = result.codeResult.code;
      // document.getElementById('output').style.display = 'none';
    } else {
      console.log("not detected");
    }
  });

})