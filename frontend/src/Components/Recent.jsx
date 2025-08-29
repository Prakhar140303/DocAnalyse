import React, { useEffect, useState } from "react";

function Recent() {
  const [summaries, setSummaries] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSummary, setSelectedSummary] = useState(null);

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
      {/* Modal */}
      {modalOpen && selectedSummary && (
        <div
          className="modal p-[10vw] cursor-pointer fixed inset-0 bg-black/50 flex justify-center items-center z-50"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="bg-gray-200 flex flex-col justify-start md:min-w-[50vw] md:min-h-[50vh] min-w-[80vw] min-h-[60vh] max-h-[80vh] overflow-y-auto items-start p-6 gap-4 rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h1 className="text-2xl font-semibold">Summary Details</h1>

            <div className="flex justify-between items-center w-full">
              <span className="text-sm text-gray-400">
                {new Date(selectedSummary.timestamp).toLocaleString()}
              </span>
              <span className="text-xs px-2 py-1 rounded bg-primary-extralight text-primary-dark">
                {selectedSummary.tone} • {selectedSummary.length}
              </span>
            </div>

            <div className="bg-white w-full h-[40vh] p-3 rounded-xl overflow-y-auto shadow-inner">
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                {selectedSummary.summary.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>

            <button
              className="bg-primary text-white px-4 py-2 rounded-lg shadow selected-hover transition self-end"
              onClick={() => setModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <h2 className="text-2xl font-semibold mb-4 text-primary-dark">
        Recent Summaries
      </h2>

      {summaries.length === 0 ? (
        <p className="text-gray-500">No summaries yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {summaries.map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition cursor-pointer"
              onClick={() => {
                setSelectedSummary(item);
                setModalOpen(true);
              }}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-400">
                  {new Date(item.timestamp).toLocaleString()}
                </span>
                <span className="text-xs px-2 py-1 rounded bg-primary-extralight text-primary-dark">
                  {item.tone} • {item.length}
                </span>
              </div>

              <ul className="list-disc pl-5 text-gray-700 space-y-1 line-clamp-3">
                {item.summary.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
              <p className="text-blue-500 text-xs mt-2">Click to expand →</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Recent;
