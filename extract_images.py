#!/usr/bin/env python3
"""
Extract images from the ORA_OAA.pdf file for use in the website
"""

import fitz  # PyMuPDF
import os

def extract_images_from_pdf():
    """Extract images from the PDF and save them as JPG files"""
    pdf_path = "ORA_OAA.pdf"
    output_dir = "."
    
    if not os.path.exists(pdf_path):
        print(f"PDF file {pdf_path} not found")
        return
    
    # Open the PDF
    doc = fitz.open(pdf_path)
    
    for page_num in range(len(doc)):
        page = doc[page_num]
        
        # Get the page as an image
        mat = fitz.Matrix(2.0, 2.0)  # Scale factor for better quality
        pix = page.get_pixmap(matrix=mat)
        
        # Save as JPG
        output_filename = f"experiment_setup_page_{page_num + 1}.jpg"
        output_path = os.path.join(output_dir, output_filename)
        pix.save(output_path)
        print(f"Saved: {output_path}")
    
    doc.close()
    
    # Create specific named images for the website
    if os.path.exists("experiment_setup_page_1.jpg"):
        import shutil
        shutil.copy("experiment_setup_page_1.jpg", "experiment_ora.jpg")
        shutil.copy("experiment_setup_page_1.jpg", "experiment_oaa.jpg")
        print("Created experiment_ora.jpg and experiment_oaa.jpg")

if __name__ == "__main__":
    extract_images_from_pdf()