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
      readers: ["ean_reader", "ean_reader", "ean_8_reader", "code_39_reader", "code_39_vin_reader", "codabar_reader", "upc_reader",
        "upc_e_reader", "code_93_reader"
      ] // List of active readers
    },
    debug: {
      drawBoundingBox: true,
      showFrequency: false,
      drawScanline: true,
      showPattern: false
    },
    multiple: false,
    patchSize : "small",
    locate: true, // try to locate the barcode in the image
    src: image.src // or 'data:image/jpg;base64,' + data
  }, function (result) {
    if (result) {
      console.log("result", result);
      document.getElementById('message').textContent = result.codeResult.code;
      // document.getElementById('output').style.display = 'none';
    } else {
      console.log("not detected");
    }
  });

})