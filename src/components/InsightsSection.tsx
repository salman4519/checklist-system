import { useState, useEffect } from 'react';

interface InsightsData {
  ac: number;
  cctv: number;
  tablesClean: number;
}

export default function InsightsSection() {
  const [insights, setInsights] = useState<InsightsData | null>(null);

  useEffect(() => {
    fetch("https://script.google.com/macros/s/AKfycbwduytD9-Eg_UI3xOHvGrWHe-AAb-s4KogzSKqz32zFJBaVLXK94sgOpgQPPEFfyUHS/exec?type=insights")
      .then(res => res.json())
      .then((data: InsightsData) => {
        setInsights(data);
      })
      .catch(err => console.error("Failed to fetch insights:", err));
  }, []);

  const messages: { [key: string]: string } = {
    ac: "AC was off",
    cctv: "CCTV not working",
    tablesClean: "Tables were not clean",
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4 sm:p-6 border border-gray-700">
      <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Insights & Priorities</h2>
      
      <div className="space-y-3">
        <ul className="list-disc ml-6 text-gray-300">
          {insights ? (
            Object.entries(insights).filter(([_, v]) => (v as number) > 0).length > 0 ? (
              Object.entries(insights).map(([key, value]) => (
                (value as number) > 0 && messages[key] ? (
                  <li key={key} className="text-xs sm:text-sm font-medium break-words">❗ {messages[key]} in {value} of last 10 entries</li>
                ) : null
              ))
            ) : (
              <li className="p-3 sm:p-4 rounded-lg bg-green-900/30 border-l-4 border-green-500 text-green-200 font-medium text-xs sm:text-sm">✅ All systems look good recently!</li>
            )
          ) : (
            <li className="p-3 sm:p-4 rounded-lg text-white">Loading insights...</li>
          )}
        </ul>
      </div>
    </div>
  );
} 