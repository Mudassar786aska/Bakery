import jsPDF from 'jspdf';
import { Order } from '../types';

export const generateInvoicePDF = (order: Order) => {
  const doc = new jsPDF();
  
  // Set font
  doc.setFont('helvetica');
  
  // Header
  doc.setFontSize(24);
  doc.setTextColor(210, 105, 30); // bakery-primary color
  doc.text('Mr Bakers', 20, 30);
  
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text('Premium Bakery - Fresh Baked Goods', 20, 40);
  doc.text('123 Bakery Street, City, Pakistan', 20, 48);
  doc.text('Phone: +92 300 1234567 | Email: info@mrbakers.com', 20, 56);
  
  // Invoice title
  doc.setFontSize(20);
  doc.text('INVOICE', 150, 30);
  
  // Invoice details
  doc.setFontSize(10);
  doc.text(`Invoice #: ${order.id}`, 150, 45);
  doc.text(`Date: ${order.createdAt.toLocaleDateString()}`, 150, 53);
  doc.text(`Status: ${order.status.toUpperCase()}`, 150, 61);
  
  // Line separator
  doc.line(20, 70, 190, 70);
  
  // Customer details
  doc.setFontSize(14);
  doc.text('Bill To:', 20, 85);
  doc.setFontSize(10);
  doc.text(order.shippingDetails.fullName, 20, 95);
  doc.text(order.shippingDetails.address, 20, 103);
  doc.text(order.shippingDetails.city, 20, 111);
  doc.text(`Phone: ${order.shippingDetails.phone}`, 20, 119);
  doc.text(`Email: ${order.shippingDetails.email}`, 20, 127);
  
  // Payment method
  if (order.bankDetails) {
    doc.setFontSize(14);
    doc.text('Payment Method:', 120, 85);
    doc.setFontSize(10);
    doc.text('Bank Transfer', 120, 95);
    doc.text(`Account Holder: ${order.bankDetails.accountHolder}`, 120, 103);
    doc.text(`Bank: ${order.bankDetails.bankName}`, 120, 111);
    doc.text(`Account: ${order.bankDetails.accountNumber}`, 120, 119);
  } else {
    doc.setFontSize(14);
    doc.text('Payment Method:', 120, 85);
    doc.setFontSize(10);
    doc.text('Cash on Delivery', 120, 95);
  }
  
  // Items table header
  let yPos = 150;
  doc.setFontSize(12);
  doc.setTextColor(255, 255, 255);
  doc.setFillColor(210, 105, 30); // bakery-primary
  doc.rect(20, yPos - 8, 170, 10, 'F');
  doc.text('Item', 25, yPos - 2);
  doc.text('Qty', 120, yPos - 2);
  doc.text('Price', 140, yPos - 2);
  doc.text('Total', 165, yPos - 2);
  
  // Items
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(10);
  yPos += 10;
  
  let subtotal = 0;
  order.items.forEach((item) => {
    const itemTotal = item.product.price * item.quantity;
    subtotal += itemTotal;
    
    doc.text(item.product.name, 25, yPos);
    doc.text(item.quantity.toString(), 125, yPos);
    doc.text(`PKR ${item.product.price.toLocaleString()}`, 140, yPos);
    doc.text(`PKR ${itemTotal.toLocaleString()}`, 165, yPos);
    yPos += 8;
  });
  
  // Totals
  yPos += 10;
  doc.line(20, yPos, 190, yPos);
  yPos += 10;
  
  doc.text('Subtotal:', 140, yPos);
  doc.text(`PKR ${subtotal.toLocaleString()}`, 165, yPos);
  yPos += 8;
  
  doc.text('Delivery Fee:', 140, yPos);
  doc.text('PKR 150', 165, yPos);
  yPos += 8;
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Total Amount:', 140, yPos);
  doc.text(`PKR ${order.total.toLocaleString()}`, 165, yPos);
  
  // Footer
  yPos += 30;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Thank you for choosing Mr Bakers!', 20, yPos);
  doc.text('For any queries, please contact us at info@mrbakers.com', 20, yPos + 8);
  
  // Owner signature
  yPos += 20;
  doc.text('Authorized by: Mudassar Ullah (Owner)', 20, yPos);
  
  // Save the PDF
  doc.save(`Mr-Bakers-Invoice-${order.id}.pdf`);
};