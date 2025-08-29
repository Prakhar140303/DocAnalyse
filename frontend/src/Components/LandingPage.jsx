import React from 'react';
import { FolderUp, FileText, Sparkles, UploadCloud } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
    const navigate = useNavigate();
    return (
        <div className="w-full min-h-screen bg-gray-50 flex flex-col items-center">
            
            {/* Hero Section */}
            <section className="flex flex-col-reverse md:flex-row items-center justify-between max-w-6xl w-full p-6 md:p-16 gap-8">
                <div className="flex-1 flex flex-col gap-4 md:gap-6 text-center md:text-left">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                        DocSummarizer
                    </h1>
                    <p className="text-gray-700 text-base sm:text-lg md:text-xl">
                        Extract text from PDFs & Images, and generate summaries instantly.
                    </p>
                    <div className="flex flex-row gap-4 mt-4 justify-center md:justify-start">
                        <p
                            className="bg-primary text-white px-6 py-3 rounded-lg shadow hover:bg-primary-dark transition cursor-pointer text-center"
                            onClick={() => navigate('/home')}
                        >
                            Get Started
                        </p>
                        <a
                            href="#features"
                            className="bg-white border border-primary text-primary px-6 py-3 
                            rounded-lg shadow hover:bg-primary-light "
                        >
                            Learn More
                        </a>
                    </div>
                </div>
                <div className="flex-1 w-full flex justify-center md:justify-end">
                    <div className="size-56 md:size-68 lg:size-72 bg-primary-light rounded-2xl flex items-center justify-center text-primary text-6xl font-bold">
                        <img src="documents.png" alt="" />
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section
                id="features"
                className="w-full max-w-6xl p-6 md:p-16 flex flex-col gap-12"
            >
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8">
                    Features
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
                        <FolderUp className="w-12 h-12 text-primary mb-4" />
                        <h3 className="font-semibold text-lg sm:text-xl mb-2">Upload Documents</h3>
                        <p className="text-gray-600 text-sm sm:text-base">Drag & drop or select PDFs, PNGs, or JPGs up to 10MB.</p>
                    </div>

                    <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
                        <FileText className="w-12 h-12 text-primary mb-4" />
                        <h3 className="font-semibold text-lg sm:text-xl mb-2">Extract Text</h3>
                        <p className="text-gray-600 text-sm sm:text-base">Automatically extract text from any document or image.</p>
                    </div>

                    <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
                        <Sparkles className="w-12 h-12 text-primary mb-4" />
                        <h3 className="font-semibold text-lg sm:text-xl mb-2">Generate Summary</h3>
                        <p className="text-gray-600 text-sm sm:text-base">Create concise summaries with selectable tone and length.</p>
                    </div>

                    <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
                        <UploadCloud className="w-12 h-12 text-primary mb-4" />
                        <h3 className="font-semibold text-lg sm:text-xl mb-2">Export & Share</h3>
                        <p className="text-gray-600 text-sm sm:text-base">Copy or download your summaries instantly.</p>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="w-full bg-primary text-white py-12 md:py-16 flex flex-col items-center gap-4 md:gap-6">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center">
                    Start Summarizing Today
                </h2>
                <p className="text-base sm:text-lg md:text-xl max-w-2xl text-center">
                    Upload your documents, extract text, and generate summaries effortlessly.
                </p>
                <p
                    className="bg-white text-primary px-8 py-3 md:px-10 md:py-4 rounded-lg font-semibold hover:bg-gray-100 transition cursor-pointer"
                    onClick={() => navigate('/home')}
                >
                    Try Now
                </p>
            </section>

            {/* Footer */}
            <footer className="w-full bg-gray-100 py-6 text-center text-gray-700 text-sm sm:text-base">
                © {new Date().getFullYear()} DocSummarizer. All rights reserved.
            </footer>
        </div>
    );
}

export default LandingPage;
