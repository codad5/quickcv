import {Input, TextArea} from '@/components/forms/inputs';
import { fields } from './fields';
import { LinkFields } from './clients/Extrafields';
import { PdfSection } from './clients/PdfSection';
import { useChat } from 'ai/react';



export default function Home() {
  return (
    <main className="flex min-h-[200svh] sm:min-h-screen  justify-start sm:justify-center px-4 py-20 gap-4  pb-4 flex-col sm:flex-row">
      <div className='w-full sm:w-1/2 h-full basis-2/5'>
        {/* a form that ask for name, gender date of birth , occupation, role, and social hanlde  */}
        <form className="flex flex-col items-center justify-center space-y-4 w-full">
          {
            fields.map((field, index) => {
              return field?.type !== 'textarea' ? <Input key={index} {...field} /> : <TextArea key={index} {...field} />
            })
          }
          <LinkFields />
          <Input type="submit" value="Submit" className="bg-green-500 text-white p-2 rounded" />
        </form>
      </div>
      {/* the output tab with bg color white */}
      <PdfSection className="w-full sm:w-1/2 h-svh">
        # Heading One (H1)
      </PdfSection>
      
    </main>
  );
}
