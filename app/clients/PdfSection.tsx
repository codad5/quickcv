"use client";
import { PrintableComponent } from "@/components/forms/pdf/viewer";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

export function PdfSection() {
    const Printable = useRef(null)
    const handlePrint = useReactToPrint({
        content: () => Printable.current,
    });


    return <div className="w-1/2 p-1 h-full text-green" >
        <PrintableComponent ref={Printable} className='w-full bg-white p-4 h-full text-green'>
        Hell0 James
      </PrintableComponent>
      <button onClick={handlePrint} className="bg-green-500 text-white p-2 rounded">Print</button>
    </div>
}