import React, { useState } from 'react';
import { Save, Loader, Check, FileText } from 'lucide-react';
import { ingestFile, saveItem } from '../../services/api';

export const KnowledgeClip = () => {
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [clipData, setClipData] = useState<any>(null);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setClipData(null);
            setSaved(false);
        }
    };

    const handleScan = async () => {
        if (!file) return;
        setLoading(true);
        try {
            const result = await ingestFile(file, 'knowledge_clip');
            setClipData(result);
        } catch (error) {
            console.error('Scan failed:', error);
            alert('Scan failed. Check console for details.');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        if (!clipData) return;
        setSaving(true);
        try {
            await saveItem(clipData, 'knowledge_clip');
            setSaved(true);
            setClipData(null);
            setFile(null);
        } catch (error) {
            console.error('Save failed:', error);
            alert('Save failed. Check console for details.');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto">
            {!clipData && !saved && (
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-white/10 rounded-xl p-12 hover:border-orange-500/50 transition-colors">
                    <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={handleFileChange}
                        className="hidden"
                        id="clip-upload"
                    />
                    <label
                        htmlFor="clip-upload"
                        className="flex flex-col items-center cursor-pointer"
                    >
                        <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center text-purple-500 mb-4">
                            <FileText size={32} />
                        </div>
                        <span className="text-lg font-medium text-white mb-2">
                            {file ? file.name : 'Upload Chart or Note'}
                        </span>
                        <span className="text-sm text-gray-500">
                            Supports Images & PDF
                        </span>
                    </label>

                    {file && (
                        <button
                            onClick={handleScan}
                            disabled={loading}
                            className="mt-8 bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? <Loader className="animate-spin" size={20} /> : <FileText size={20} />}
                            {loading ? 'Analyzing...' : 'Analyze Clip'}
                        </button>
                    )}
                </div>
            )}

            {clipData && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-semibold text-white">Review Clip</h3>
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 disabled:opacity-50"
                        >
                            {saving ? <Loader className="animate-spin" size={18} /> : <Save size={18} />}
                            {saving ? 'Saving...' : 'Save to Library'}
                        </button>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Title</label>
                            <input
                                type="text"
                                value={clipData.title || ''}
                                onChange={(e) => setClipData({ ...clipData, title: e.target.value })}
                                className="w-full bg-[#121212] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Summary</label>
                            <textarea
                                value={clipData.summary || ''}
                                onChange={(e) => setClipData({ ...clipData, summary: e.target.value })}
                                className="w-full h-24 bg-[#121212] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Content (Markdown)</label>
                            <textarea
                                value={clipData.content || ''}
                                onChange={(e) => setClipData({ ...clipData, content: e.target.value })}
                                className="w-full h-64 bg-[#121212] border border-white/10 rounded-lg px-4 py-2 text-white font-mono text-sm focus:outline-none focus:border-purple-500"
                            />
                        </div>
                    </div>
                </div>
            )}

            {saved && (
                <div className="flex flex-col items-center justify-center py-12 animate-in fade-in zoom-in duration-500">
                    <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center text-green-500 mb-4">
                        <Check size={32} />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">Clip Saved!</h3>
                    <button
                        onClick={() => setSaved(false)}
                        className="text-purple-500 hover:text-purple-400 font-medium"
                    >
                        Upload Another
                    </button>
                </div>
            )}
        </div>
    );
};
