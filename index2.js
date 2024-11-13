const fs = require('fs');
const { PDFDocument } = require('pdf-lib');

async function fillPdfTemplate(templatePath, outputPath, formData) {
  // Load the existing PDF template
  const templateBytes = fs.readFileSync(templatePath);
  const pdfDoc = await PDFDocument.load(templateBytes);

  // Get the form from the template PDF
  const form = pdfDoc.getForm();

  // Fill the form fields with data
  for (const [fieldName, value] of Object.entries(formData)) {
    const field = form.getTextField(fieldName);
    field.setText(value);  // Set the text for each form field
  }

  // Serialize the PDF to bytes
  const pdfBytes = await pdfDoc.save();

  // Save the filled PDF to the file system
  fs.writeFileSync(outputPath, pdfBytes);

  console.log('PDF created successfully!');
}

// Example usage
const templatePath = 'newform.pdf';  // Path to the PDF template
const outputPath = 'filled_output.pdf'; // Path to save the filled PDF
const formData = {
  'customer_name': "Sudhanshu",
  'invoice_number': "1234",
  'invoice_date': "11/12/2024",
  'item1_name': "iphone",
  'item1_quantity':"1",
  'item1_price':"70,000",
  'item1_total':"70,000",
  'total_amount':"70,000"
    

};

// Fill the template with data
fillPdfTemplate(templatePath, outputPath, formData);
