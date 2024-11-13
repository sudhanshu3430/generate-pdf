const fs = require('fs');
const { PDFDocument } = require('pdf-lib');

async function extractFormFieldNames(pdfPath) {
  // Load the PDF template
  const pdfBytes = fs.readFileSync(pdfPath);
  const pdfDoc = await PDFDocument.load(pdfBytes);

  // Get the form from the PDF
  const form = pdfDoc.getForm();

  // Get all the form field names
  const fieldNames = form.getFields().map(field => field.getName());

  // Log the field names
  console.log('Form field names:', fieldNames);
}

// Example usage: Replace with your PDF file path
const pdfPath = 'invoice_with_fillable_text.pdf';
extractFormFieldNames(pdfPath);
