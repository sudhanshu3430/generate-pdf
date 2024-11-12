const fs = require('fs');
const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');
const fontkit = require('@pdf-lib/fontkit');

// Function to create an invoice template with form fields
async function generateInvoiceWithFormFields(outputPath) {
  // Create a new PDF document
  const pdfDoc = await PDFDocument.create();

  // Add a page to the document
    const page = pdfDoc.addPage([595.28, 841.89]); // A4 size in points
    pdfDoc.registerFontkit(fontkit);

  // Embed a built-in font (Helvetica)
  const courierFont = await pdfDoc.embedFont(StandardFonts.Courier) // Correct font embedding

  // Add Invoice Title  
  page.setFont(courierFont); // Set font before specifying font size
  page.setFontSize(20); // Set font size
  page.drawText('Invoice', { x: 50, y: 800, size: 20, align: 'center' });

  // Customer Info Section
  page.setFontSize(12); // Set font size for subsequent text
  page.drawText('Customer Name:', { x: 50, y: 750 });
  
  // Create form fields
  const form = pdfDoc.getForm();
  const customerNameField = form.createTextField('customer_name');
  customerNameField.setText('');
  customerNameField.addToPage(page, { x: 150, y: 730, width: 300, height: 20 });
  
  page.drawText('Invoice Number:', { x: 50, y: 700 });
  const invoiceNumberField = form.createTextField('invoice_number');
  invoiceNumberField.setText('');
  invoiceNumberField.addToPage(page, { x: 150, y: 680, width: 150, height: 20 });

  page.drawText('Invoice Date:', { x: 50, y: 650 });
  const invoiceDateField = form.createTextField('invoice_date');
  invoiceDateField.setText('');
  invoiceDateField.addToPage(page, { x: 150, y: 630, width: 150, height: 20 });

  page.drawLine({
    start: { x: 50, y: 600 },
    end: { x: 550, y: 600 },
    thickness: 1,
    color: rgb(0, 0, 0), // Black color
  });


  // Table Header for Itemized List
  page.drawText('Item', { x: 50, y: 580, size: 12 });
  page.drawText('Quantity', { x: 150, y: 580, size: 12 });
  page.drawText('Price', { x: 250, y: 580, size: 12 });
  page.drawText('Total', { x: 350, y: 580, size: 12 });

  // Table Row for Item 1 (Editable fields)
  page.drawText('Item 1:', { x: 50, y: 550 });
  const item1Field = form.createTextField('item1_name');
  item1Field.setText('');
  item1Field.addToPage(page, { x: 100, y: 550, width: 200, height: 20 });
  
  page.drawText('Quantity:', { x: 350, y: 550 });
  const quantity1Field = form.createTextField('item1_quantity');
  quantity1Field.setText('');
  quantity1Field.addToPage(page, { x: 450, y: 550, width: 80, height: 20 });

  page.drawText('Price:', { x: 350, y: 520 });
  const price1Field = form.createTextField('item1_price');
  price1Field.setText('');
  price1Field.addToPage(page, { x: 450, y: 520, width: 80, height: 20 });

  page.drawText('Total:', { x: 350, y: 490 });
  const total1Field = form.createTextField('item1_total');
  total1Field.setText('');
  total1Field.addToPage(page, { x: 450, y: 490, width: 80, height: 20 });

  // Total Section (Editable field)
  page.drawText('Total Amount Due:', { x: 350, y: 450 });
  const totalAmountField = form.createTextField('total_amount');
  totalAmountField.setText('');
  totalAmountField.addToPage(page, { x: 450, y: 430, width: 150, height: 20 });

  // Footer Notes (e.g., payment terms)
  page.setFontSize(10);
  page.drawText('Payment Terms: Due upon receipt', { x: 200, y: 100, size: 10, align: 'center' });

  // Finalize the PDF
  const pdfBytes = await pdfDoc.save();

  // Write the PDF to a file
  fs.writeFileSync(outputPath, pdfBytes);
  console.log('Invoice with form fields created successfully!');
}

// Output file path
const outputPath = 'invoice_with_form_fields.pdf';

// Generate the invoice with form fields
generateInvoiceWithFormFields(outputPath);
