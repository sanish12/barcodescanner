var streamBarcode = document.getElementById('startStream');

streamBarcode.addEventListener('click', function () {
  Quagga.init({
    inputStream: {
      name: "Live",
      type: "LiveStream",
      // target: document.querySelector('#yourElement')    // Or '#yourElement' (optional)
    },
    decoder: {
      readers: ["code_128_reader", "ean_reader", "ean_8_reader", "code_39_reader", "code_39_vin_reader", "codabar_reader", "upc_reader",
        "upc_e_reader",
        "i2of5_reader",
        "2of5_reader",
        "code_93_reader"
      ]
    },
    debug: {
      drawBoundingBox: false,
      showFrequency: false,
      drawScanline: false,
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
    document.getElementById('message').innerHTML = result;
    console.log('barcode detected');
    console.log(result);
  })

});

var imageForScanning = document.getElementById('imageBarcode');
imageForScanning.addEventListener('change', function (e) {
  var image = document.getElementById('output');
  image.src = URL.createObjectURL(e.target.files[0]);
  Quagga.decodeSingle({
    decoder: {
      readers: ["code_128_reader", "ean_reader", "ean_8_reader", "code_39_reader", "code_39_vin_reader", "codabar_reader", "upc_reader",
        "upc_e_reader",
        "i2of5_reader",
        "2of5_reader",
        "code_93_reader"
      ] // List of active readers
    },
    locate: true, // try to locate the barcode in the image
    src: image.src // or 'data:image/jpg;base64,' + data
  }, function (result) {
    if (result) {
      console.log("result", result.codeResult.code);
      document.getElementById('message').textContent = result.codeResult.code;
    } else {
      console.log("not detected");
    }
  });

})