import { ArrowRight, Camera, Book, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

const QuickActionCard = ({ to, icon: Icon, title, description, color }: any) => (
    <Link
        to={to}
        className="group relative overflow-hidden rounded-2xl bg-[#1e1e1e] p-6 hover:bg-[#252525] transition-all border border-white/5 hover:border-white/10"
    >
        <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity ${color}`}>
            <Icon size={100} />
        </div>
        <div className="relative z-10">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${color} bg-opacity-20 text-white`}>
                <Icon size={24} />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
            <p className="text-gray-400 text-sm mb-4">{description}</p>
            <div className="flex items-center text-sm font-medium text-white/60 group-hover:text-white transition-colors">
                Start <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </div>
        </div>
    </Link>
);

export const Dashboard = () => {
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold text-white mb-2">Welcome back, Chef</h2>
                <p className="text-gray-400">What are we cooking today?</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <QuickActionCard
                    to="/ingest"
                    icon={Camera}
                    title="Quick Scan"
                    description="Digitize a recipe card or book page in seconds."
                    color="bg-orange-500"
                />
                <QuickActionCard
                    to="/chat"
                    icon={MessageSquare}
                    title="Ask Sous-Chef"
                    description="Get cooking advice or find a recipe."
                    color="bg-blue-500"
                />
                <QuickActionCard
                    to="/library"
                    icon={Book}
                    title="Browse Library"
                    description="Explore your collection of books and clips."
                    color="bg-green-500"
                />
            </div>

            {/* Recent Activity Placeholder */}
            <div className="bg-[#1e1e1e] rounded-2xl p-6 border border-white/5">
                <h3 className="text-xl font-semibold text-white mb-4">Recent Activity</h3>
                <div className="text-center py-12 text-gray-500">
                    No recent activity found. Start by scanning a recipe!
                </div>
            </div>
        </div>
    );
};
