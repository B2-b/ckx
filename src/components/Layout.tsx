import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Home, BookOpen, Utensils, Upload, MessageSquare, Settings } from 'lucide-react';
import clsx from 'clsx';

const NavItem = ({ to, icon: Icon, label }: { to: string; icon: React.ElementType; label: string }) => {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <Link
            to={to}
            className={clsx(
                'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                isActive
                    ? 'bg-orange-500/10 text-orange-500'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
            )}
        >
            <Icon size={20} />
            <span className="font-medium">{label}</span>
        </Link>
    );
};

export const Layout = () => {
    return (
        <div className="flex h-screen bg-[#1a1a1a] text-white overflow-hidden font-sans">
            {/* Sidebar */}
            <aside className="w-64 border-r border-white/10 flex flex-col bg-[#1a1a1a]">
                <div className="p-6">
                    <h1 className="text-xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                        Culinary Brain
                    </h1>
                </div>

                <nav className="flex-1 px-4 space-y-2">
                    <NavItem to="/" icon={Home} label="Dashboard" />
                    <NavItem to="/ingest" icon={Upload} label="Ingest" />
                    <NavItem to="/recipes" icon={Utensils} label="Recipes" />
                    <NavItem to="/library" icon={BookOpen} label="Library" />
                    <NavItem to="/chat" icon={MessageSquare} label="Sous-Chef" />
                </nav>

                <div className="p-4 border-t border-white/10">
                    <NavItem to="/settings" icon={Settings} label="Settings" />
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto bg-[#121212]">
                <div className="max-w-7xl mx-auto p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};
