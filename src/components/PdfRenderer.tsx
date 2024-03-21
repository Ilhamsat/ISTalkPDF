'use client'

import { Document, Page, pdfjs } from 'react-pdf';

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import {ChevronDown, ChevronUp, Loader2} from "lucide-react";
import {useToast} from "@/components/ui/use-toast";
import { useResizeDetector } from 'react-resize-detector';
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {useState} from "react";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface PdfRendererProps {
    url: string
}

const PdfRenderer = ({url}: PdfRendererProps) => {

    const {toast} = useToast()
    const { width, height, ref } = useResizeDetector();
    const [numPages, setNumPages] = useState<number>()

    return <div className='w-full bg-white rounded-md shadow flex flex-col items-center'>
        <div className='h-14 w-full border-b border-zinc-200 flex items-center justify-between px-2'>
            <div className='flex items-center gap-1.5'>
                <Button variant="ghost" aria-label='previous page'>
                    <ChevronDown className='h-4 w-4'/>
                </Button>

                <div className="flex items-center gap-1.5">
                    <Input className="w-12 h-8"/>
                    <p className="text-zinc-700 text-sm space-x-1">
                        <span>
                            /
                        </span>
                        <span>
                            {numPages ?? "0"}
                        </span>
                    </p>
                </div>

                <Button variant="ghost" aria-label='next page'>
                    <ChevronUp className='h-4 w-4'/>
                </Button>
            </div>
        </div>

        <div className='flex-1 w-full max-h-screen'>
            <div ref={ref}>
                <Document
                    loading={
                    <div className="flex justify-center">
                        <Loader2 className="my-24 h-6 w-6 animate-spin"/>
                    </div>}
                    file={url}
                    className='max-h-full'
                    onLoadError={(error) => {
                        console.error('Error while loading document:', error)
                        toast({
                            title: 'Error Loading PDF',
                            description: 'Please try again later',
                            variant: "destructive"
                        })
                    }}
                    onLoadSuccess={({numPages}) => setNumPages(numPages)}
                >
                    <Page
                        pageIndex={0}
                        width={width ? width : 1}
                    />
                </Document>
            </div>
        </div>
    </div>
}

export default PdfRenderer