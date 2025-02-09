"use client";
import { MapPin, Globe, Mail } from "lucide-react";
import { useState, useEffect } from "react";

export default function HeroSamplePdf() {

    const [typedText, setTypedText] = useState("");
    const fullText = `Creative fashion designer with 5+ years of experience in creating bespoke and ready-to-wear pieces. Skilled in trend analysis, pattern-making, and working with diverse fabrics. Passionate about sustainability and crafting inclusive designs for all body types.`;

    useEffect(() => {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex <= fullText.length) {
          setTypedText(fullText.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(interval);
        }
      }, 30);

      return () => clearInterval(interval);
    }, []);

    return (
      <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl p-8 shadow-xl border border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold">Chineye Igwe</h3>
            <p className="text-gray-400">Fashion Designer</p>
          </div>
          <div className="flex space-x-2">
            <div className="h-3 w-3 rounded-full bg-red-500"></div>
            <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
            <div className="h-3 w-3 rounded-full bg-green-500"></div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center text-sm text-gray-400">
            <MapPin className="h-4 w-4 mr-2" />
            Nigeria
            <Globe className="h-4 w-4 mx-2" />
            <a href="#" className="text-emerald-400 hover:underline">
              chigwe.com
            </a>
            <Mail className="h-4 w-4 mx-2" />
            <a href="#" className="text-emerald-400 hover:underline">
              hello@chigwe.com
            </a>
          </div>
          <div className="relative">
            <p className="text-gray-300">
              {typedText}
              <span className="animate-pulse">|</span>
            </p>
          </div>
        </div>
      </div>
    );
}