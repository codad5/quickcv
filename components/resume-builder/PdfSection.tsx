"use client";

import { useEffect, useRef, useState, forwardRef } from "react";
import { PrintableComponent } from "@/components/pdf/viewer";
import { useReactToPrint } from "react-to-print";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Edit, Printer } from "iconsax-react";
import "@/styles/print.scss";

export const PdfSection = forwardRef<
  HTMLDivElement,
  {
    children: string;
    documentTitle?: string;
  } & React.HTMLAttributes<HTMLDivElement>
>(({ children, documentTitle, ...props }, ref) => {
  const [viewRaw, setViewRaw] = useState(false);
  const [rawContent, setRawContent] = useState(children);
  const printableRef = useRef(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // use effect for detecting change in children
  useEffect(() => {
    setRawContent(children);
  }, [children]);

  const handlePrint = useReactToPrint({
    content: () => printableRef.current,
    documentTitle,
    onBeforeGetContent: () => {
      setViewRaw(false);
      syncContent();
    },
  });

  const syncContent = () => {
    if (textareaRef.current) {
      setRawContent(textareaRef.current.value);
    }
  };

  const toggleViewRaw = () => {
    syncContent();
    setViewRaw(!viewRaw);
  };

  props.className = `w-1/2 p-1 text-green ${props.className}`;

  return (
    <div {...props} ref={ref}>
      <PrintableComponent
        ref={printableRef}
        className="w-full bg-white p-4 min-h-full h-auto printableComponent"
      >
        <div className="w-full h-full flex justify-center py-4 text-left">
          {viewRaw ? (
            <textarea
              ref={textareaRef}
              className="w-full border border-gray-300 rounded px-2 py-1 min-h-[80svh] h-fit"
              value={rawContent}
              onChange={syncContent}
            ></textarea>
          ) : (
            <Markdown
              remarkPlugins={[remarkGfm]}
              className="prose prose-sm prose-zinc w-full max-w-none"
            >
              {rawContent}
            </Markdown>
          )}
        </div>
      </PrintableComponent>
      <div className="w-full py-4 flex items-center justify-left space-x-4">
        <button
          onClick={handlePrint}
          className="bg-green-500 text-white p-2 rounded"
        >
          <Printer />
        </button>
        <button
          onClick={toggleViewRaw}
          className="bg-green-500 text-white p-2 rounded"
        >
          {viewRaw ? "View Formatted" : <Edit />}
        </button>
      </div>
    </div>
  );
});

PdfSection.displayName = "PdfSection";
