import React, { useState } from 'react';
import { Upload, Loader, Check, Book } from 'lucide-react';
import { ingestFile } from '../../services/api';

export const LibraryBook = () => {
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setSuccess(false);
        }
    };

    const handleUpload = async () => {
        if (!file) return;
        setLoading(true);
        try {
            await ingestFile(file, 'library_book');
            setSuccess(true);
            setFile(null);
        } catch (error) {
            console.error('Upload failed:', error);
            alert('Upload failed. Check console for details.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto text-center">
            {!success ? (
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-white/10 rounded-xl p-12 hover:border-orange-500/50 transition-colors">
                    <input
                        type="file"
                        accept=".pdf"
                        onChange={handleFileChange}
                        className="hidden"
                        id="book-upload"
                    />
                    <label
                        htmlFor="book-upload"
                        className="flex flex-col items-center cursor-pointer"
                    >
                        <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-500 mb-4">
                            <Book size={32} />
                        </div>
                        <span className="text-lg font-medium text-white mb-2">
                            {file ? file.name : 'Upload PDF Book'}
                        </span>
                        <span className="text-sm text-gray-500">
                            Supports PDF only
                        </span>
                    </label>

                    {file && (
                        <button
                            onClick={handleUpload}
                            disabled={loading}
                            className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? <Loader className="animate-spin" size={20} /> : <Upload size={20} />}
                            {loading ? 'Uploading...' : 'Ingest Book'}
                        </button>
                    )}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-12 animate-in fade-in zoom-in duration-500">
                    <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center text-green-500 mb-4">
                        <Check size={32} />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">Book Uploaded!</h3>
                    <p className="text-gray-400 mb-6">
                        The Librarian is processing it in the background. It will appear in your library shortly.
                    </p>
                    <button
                        onClick={() => setSuccess(false)}
                        className="text-blue-500 hover:text-blue-400 font-medium"
                    >
                        Upload Another
                    </button>
                </div>
            )}
        </div>
    );
};
