'use client';
import { PrintableComponent } from "@/components/forms/pdf/Viewer";
import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import Markdown from "react-markdown";
import remarkGfm from 'remark-gfm'

export function PdfSection({ children }: { children: string }) {
    const [viewRaw, setViewRaw] = useState(false);
    const [rawContent, setRawContent] = useState(children);
    const printableRef = useRef(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handlePrint = useReactToPrint({
        content: () => printableRef.current,
        onBeforeGetContent: () => {
            setViewRaw(false);
        }
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

    return (
        <div className="w-1/2 p-1 text-green pt-6">
            <PrintableComponent ref={printableRef} className="w-full bg-white p-4 min-h-full h-full">
                {
                    viewRaw
                        ?  <textarea
                            ref={textareaRef}
                            className="w-full h-auto border border-gray-300 rounded px-2 py-1 min-h-full"
                            value={rawContent}
                            onChange={syncContent}
                        ></textarea> : <Markdown remarkPlugins={[remarkGfm]} className="prose lg:prose-prose prose-base prose-zinc sm:prose lg:prose-xs xl:prose-xs">{rawContent}</Markdown>
                }
            </PrintableComponent>
            <div className="w-full py-4 flex items-center justify-left space-x-4">
                <button onClick={handlePrint} className="bg-green-500 text-white p-2 rounded">Print</button>
                <button onClick={toggleViewRaw} className="bg-green-500 text-white p-2 rounded">
                    {viewRaw ? 'View Formatted' : 'View Raw'}
                </button>
            </div>
        </div>
    );
}
