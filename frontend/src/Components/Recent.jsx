import React, { useEffect, useState } from "react";

function Recent() {
  const [summaries, setSummaries] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSummary, setSelectedSummary] = useState({});

  useEffect(() => {
    const stored = sessionStorage.getItem("summaries");
    if (stored) {
      try {
        setSummaries(JSON.parse(stored));
      } catch {
        setSummaries([]);
      }
    }
  }, []);

  return (
    <div className="p-4 w-full h-full overflow-y-auto">
        {modalOpen && (
            <div className="modal">

            </div>
        )

        }
      <h2 className="text-2xl font-semibold mb-4 text-primary-dark">Recent Summaries</h2>
      
      {summaries.length === 0 ? (
        <p className="text-gray-500">No summaries yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {summaries.map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-400">
                  {new Date(item.timestamp).toLocaleString()}
                </span>
                <span className="text-xs px-2 py-1 rounded bg-primary-extralight text-primary-dark">
                  {item.tone} • {item.length}
                </span>
              </div>

              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                {item.summary.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Recent;
