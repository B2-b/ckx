import { useState } from 'react';
import clsx from 'clsx';
import { Camera, Book, FileText, List } from 'lucide-react';
import { QuickScan } from '../components/Ingest/QuickScan';
import { LibraryBook } from '../components/Ingest/LibraryBook';
import { KnowledgeClip } from '../components/Ingest/KnowledgeClip';

const TabButton = ({ active, onClick, icon: Icon, label }: any) => (
    <button
        onClick={onClick}
        className={clsx(
            'flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all',
            active
                ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20'
                : 'bg-[#1e1e1e] text-gray-400 hover:bg-[#252525] hover:text-white'
        )}
    >
        <Icon size={18} />
        {label}
    </button>
);

export const Ingest = () => {
    const [activeTab, setActiveTab] = useState<'quick_scan' | 'library_book' | 'knowledge_clip' | 'index'>('quick_scan');

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold text-white mb-2">Ingestion Hub</h2>
                <p className="text-gray-400">Digitize your culinary world.</p>
            </div>

            <div className="flex flex-wrap gap-4">
                <TabButton
                    active={activeTab === 'quick_scan'}
                    onClick={() => setActiveTab('quick_scan')}
                    icon={Camera}
                    label="Quick Scan (Recipe)"
                />
                <TabButton
                    active={activeTab === 'knowledge_clip'}
                    onClick={() => setActiveTab('knowledge_clip')}
                    icon={FileText}
                    label="Knowledge Clip"
                />
                <TabButton
                    active={activeTab === 'library_book'}
                    onClick={() => setActiveTab('library_book')}
                    icon={Book}
                    label="Library Book"
                />
                {/* Placeholder for Index Digitizer */}
                <TabButton
                    active={activeTab === 'index'}
                    onClick={() => setActiveTab('index')}
                    icon={List}
                    label="Index Digitizer"
                />
            </div>

            <div className="bg-[#1e1e1e] rounded-2xl p-8 border border-white/5 min-h-[400px]">
                {activeTab === 'quick_scan' && <QuickScan />}
                {activeTab === 'library_book' && <LibraryBook />}
                {activeTab === 'knowledge_clip' && <KnowledgeClip />}
                {activeTab === 'index' && <div className="text-center text-gray-500 py-12">Index Digitizer Coming Soon</div>}
            </div>
        </div>
    );
};
