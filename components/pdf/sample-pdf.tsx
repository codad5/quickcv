import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";


const SAMPLE_PDF = `
**Chineye Igwe**  
*Fashion Designer*  
📍 **Nigeria** | 🌐 [chigwe.com](http://chigwe.com) | ✉️ **hello@chigwe.com**

### **About**  
Creative fashion designer with 5+ years of experience in creating bespoke and ready-to-wear pieces. Skilled in trend analysis, pattern-making, and working with diverse fabrics. Passionate about sustainability and crafting inclusive designs for all body types.

### **Experience**  
**Lead Designer**  
*House of Elegance | Jan 2021 – Present*  
- Led a team of 5 designers in creating seasonal collections, increasing sales by 20%.  
- Developed a sustainable line that utilized eco-friendly materials, receiving local industry awards.  
- Collaborated with fashion photographers and stylists to design editorial campaigns for Vogue Nigeria.

**Junior Designer**  
*La Belle Couture | Aug 2018 – Dec 2020*  
- Assisted in developing sketches for over 30+ client events, including weddings and galas.  
- Sourced unique fabrics from international suppliers, reducing project delays by 15%.

---

### **Education**  
**B.A. in Fashion Design**  
Lagos State University, 2017  

---

### **Skills**  
- Pattern Making & Sewing  
- Adobe Illustrator & Photoshop  
- Trend Forecasting & Research  
- Project Management  

---

### **References**  
Available upon request

---

### **3. Final Suggestions**
- **Consistent Layout:** Make sure all sections are well-aligned, and don't forget about small visual cues like dividers, icons (like email icons), or subtle separators between fields.
- **White Space:** Try adding a bit more padding in the preview section to give each section room to breathe.
- **Color Ideas:** If you want to make your design more engaging, consider using **section headers in light blue** and keeping text dark for better readability.


`;

export default function SamplePDF() {
    return (
      <div className="pdf-sample w-[760px] max-w-full mx-auto h-[590px] max-h-1/2 bg-white px-6 py-10">
        <Markdown
          remarkPlugins={[remarkGfm]}
          className="prose prose-lg prose-zinc w-full max-w-none"
        >
          {SAMPLE_PDF}
        </Markdown>
      </div>
    );
}