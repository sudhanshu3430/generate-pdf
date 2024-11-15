var fonts = {
  Roboto: {
    normal: 'fonts/DejaVuSans.ttf',
    bold: 'fonts/DejaVuSans-Bold.ttf',
    italics: 'fonts/DejaVuSans.ttf',
    bolditalics: 'fonts/DejaVuSans.ttf'
  }
};

var PdfPrinter = require('pdfmake');
var printer = new PdfPrinter(fonts);
var fs = require('fs');

// reading parameters from the command line
var params = process.argv;

// Ensure that required params are passed
if (params.length < 6) {
  console.log('Error: Not enough parameters. Please provide invoice number, buyer address, item, price, and other necessary fields.');
  process.exit(1);
}

var data = {
  invoicenumber: params[2],
  buyeraddress: params[3],
  item: params[4],
  price: params[5],
  invoicedata: new Date().toLocaleDateString(), // Using current date for invoicedata
  buyerinfo: params[6] || 'Default Buyer Info', // Use the 6th param or a default value
  hash: params[7] || 'defaultHash' // Use the 7th param or a default value
};

// json with invoice layout 
var docDefinition = {
  content: [
    {
      fontSize: 11,
      table: {
        widths: ['50%', '50%'],
        body: [
          [{text: 'Status: unpaid', border: [false, false, false, true], margin: [-5, 0, 0, 10]},
           {text: 'Invoice# ' + data.invoicenumber, alignment: 'right', border: [false, false, false, true], margin: [0, 0, 0, 10]}]
        ]
      }
    },
    {
      layout: 'noBorders',
      fontSize: 11,
      table: {
        widths: ['50%', '50%'],
        body: [
          [{text: 'Website.com', margin: [0, 10, 0, 0]}, {text: 'Invoice date: ' + data.invoicedata, alignment: 'right', margin: [0, 10, 0, 0]}],
          ['...', ''],
          ['...', ''],
          ['...', '']
        ]
      }
    },
    {
      fontSize: 11,
      table: {
        widths: ['50%', '50%'],
        body: [
          [{text: ' ', border: [false, false, false, true], margin: [0, 0, 0, 10]},
           {text: 'Payment amount: $' + data.price, alignment: 'right', border: [false, false, false, true], margin: [0, 0, 0, 10]}]
        ]
      }
    },
    {
      layout: 'noBorders',
      fontSize: 11,
      table: {
        widths: ['100%'],
        body: [
          [{text: 'User account for payment:', margin: [0, 10, 0, 0]}],
          [data.buyerinfo],
          [data.buyeraddress],
          ['Payment link:'],
          [{text: 'https://website.com/shopcart/invoices_view.php?hash=' + data.hash, margin: [0, 0, 0, 10], fontSize: 10}]
        ]
      }
    },
    {
      fontSize: 11,
      table: {
        widths: ['5%', '56%', '13%', '13%', '13%'],
        body: [
          [{text: 'Pos', border: [false, true, false, true]},
           {text: 'Item', border: [false, true, false, true]},
           {text: 'Price', border: [false, true, false, true]},
           {text: 'Quantity', alignment: 'center', border: [false, true, false, true]},
           {text: 'Total', border: [false, true, false, true]}],
          [{text: '1', border: [false, true, false, true]},
           {text: data.item, border: [false, true, false, true]},
           {text: "$" + data.price, border: [false, true, false, true]},
           {text: '1', alignment: 'center', border: [false, true, false, true]},
           {text: "$" + data.price, border: [false, true, false, true]}]
        ]
      }
    },
    {
      layout: 'noBorders',
      fontSize: 11,
      margin: [0, 0, 5, 0],
      table: {
        widths: ['88%', '12%'],
        body: [
          [{text: 'Subtotal:', alignment: 'right', margin: [0, 5, 0, 0]}, {text: '$' + data.price, margin: [0, 5, 0, 0]}],
          [{text: 'Tax %:', alignment: 'right'}, '$0.00'],
        ]
      }
    },
    {
      fontSize: 11,
      table: {
        widths: ['88%', '12%'],
        body: [
          [{text: 'Total:', alignment: 'right', border: [false, false, false, true], margin: [0, 0, 0, 10]},
           {text: '$' + data.price, border: [false, false, false, true], margin: [0, 0, 0, 10]}]
        ]
      }
    },
    {
      layout: 'noBorders',
      fontSize: 11,
      alignment: 'center',
      table: {
        widths: ['100%'],
        body: [
          [{text: 'Wire transfer info:', margin: [0, 10, 0, 0]}],
          ['SWIFT: ...'],
          ['Account number: ...'],
          ['Company name: ...'],
          [' '],
          ['Company address:'],
          ['...']
        ]
      }
    }
  ]
};

var options = {};

// create invoice and save it to invoices_pdf folder
var pdfDoc = printer.createPdfKitDocument(docDefinition, options);
pdfDoc.pipe(fs.createWriteStream( data.invoicenumber + '.pdf'));
pdfDoc.end();
