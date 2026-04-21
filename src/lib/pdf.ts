import { jsPDF } from "jspdf";

/**
 * Generates and downloads a PDF from a text string.
 * @param content The text content of the letter
 * @param fileName The name of the file to be downloaded
 */
export const downloadLetterPDF = (content: string, fileName: string = "reclamation.pdf") => {
  const doc = new jsPDF();
  
  // PDF Settings
  const margin = 20;
  const pageWidth = doc.internal.pageSize.getWidth();
  const maxLineWidth = pageWidth - (margin * 2);
  
  // Header Font
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("RECOURS-CLIC", margin, 15);
  doc.setFontSize(8);
  doc.text("Généré le " + new Date().toLocaleDateString('fr-FR'), margin, 20);

  // Body Font
  doc.setFont("times", "normal");
  doc.setFontSize(12);
  
  // Split text to fit page width
  const splitText = doc.splitTextToSize(content, maxLineWidth);
  
  // Add text to document
  doc.text(splitText, margin, 40);
  
  // Save PDF
  doc.save(fileName);
};
