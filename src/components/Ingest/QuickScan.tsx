import React, { useState } from 'react';
import { Upload, Save, Loader, Check, Camera } from 'lucide-react';
import { ingestFile, saveItem } from '../../services/api';


export const QuickScan = () => {
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [recipeData, setRecipeData] = useState<any>(null);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setRecipeData(null);
            setSaved(false);
        }
    };

    const handleScan = async () => {
        if (!file) return;
        setLoading(true);
        try {
            const result = await ingestFile(file, 'quick_scan');
            // result should be the JSON returned by WF2
            setRecipeData(result);
        } catch (error) {
            console.error('Scan failed:', error);
            alert('Scan failed. Check console for details.');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        if (!recipeData) return;
        setSaving(true);
        try {
            await saveItem(recipeData, 'recipe');
            setSaved(true);
            setRecipeData(null);
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
            {!recipeData && !saved && (
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-white/10 rounded-xl p-12 hover:border-orange-500/50 transition-colors">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                        id="recipe-upload"
                    />
                    <label
                        htmlFor="recipe-upload"
                        className="flex flex-col items-center cursor-pointer"
                    >
                        <div className="w-16 h-16 bg-orange-500/10 rounded-full flex items-center justify-center text-orange-500 mb-4">
                            <Upload size={32} />
                        </div>
                        <span className="text-lg font-medium text-white mb-2">
                            {file ? file.name : 'Upload Recipe Image'}
                        </span>
                        <span className="text-sm text-gray-500">
                            Supports JPG, PNG, WEBP
                        </span>
                    </label>

                    {file && (
                        <button
                            onClick={handleScan}
                            disabled={loading}
                            className="mt-8 bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? <Loader className="animate-spin" size={20} /> : <Camera size={20} />}
                            {loading ? 'Scanning...' : 'Scan Recipe'}
                        </button>
                    )}
                </div>
            )}

            {recipeData && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-semibold text-white">Review & Edit</h3>
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 disabled:opacity-50"
                        >
                            {saving ? <Loader className="animate-spin" size={18} /> : <Save size={18} />}
                            {saving ? 'Saving...' : 'Save Recipe'}
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Recipe Name</label>
                                <input
                                    type="text"
                                    value={recipeData.recipe_name || ''}
                                    onChange={(e) => setRecipeData({ ...recipeData, recipe_name: e.target.value })}
                                    className="w-full bg-[#121212] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Cuisine</label>
                                <input
                                    type="text"
                                    value={recipeData.cuisine || ''}
                                    onChange={(e) => setRecipeData({ ...recipeData, cuisine: e.target.value })}
                                    className="w-full bg-[#121212] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500"
                                />
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Prep Time</label>
                                    <input
                                        type="text"
                                        value={recipeData.prep_time || ''}
                                        onChange={(e) => setRecipeData({ ...recipeData, prep_time: e.target.value })}
                                        className="w-full bg-[#121212] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Cook Time</label>
                                    <input
                                        type="text"
                                        value={recipeData.cook_time || ''}
                                        onChange={(e) => setRecipeData({ ...recipeData, cook_time: e.target.value })}
                                        className="w-full bg-[#121212] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Servings</label>
                                    <input
                                        type="number"
                                        value={recipeData.servings || ''}
                                        onChange={(e) => setRecipeData({ ...recipeData, servings: parseInt(e.target.value) })}
                                        className="w-full bg-[#121212] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Ingredients (JSON)</label>
                                <textarea
                                    value={JSON.stringify(recipeData.ingredients_json, null, 2)}
                                    onChange={(e) => {
                                        try {
                                            setRecipeData({ ...recipeData, ingredients_json: JSON.parse(e.target.value) })
                                        } catch (err) {
                                            // Allow typing invalid JSON temporarily
                                        }
                                    }}
                                    className="w-full h-32 bg-[#121212] border border-white/10 rounded-lg px-4 py-2 text-white font-mono text-sm focus:outline-none focus:border-orange-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Instructions (JSON)</label>
                                <textarea
                                    value={JSON.stringify(recipeData.instructions_json, null, 2)}
                                    onChange={(e) => {
                                        try {
                                            setRecipeData({ ...recipeData, instructions_json: JSON.parse(e.target.value) })
                                        } catch (err) {
                                            // Allow typing invalid JSON temporarily
                                        }
                                    }}
                                    className="w-full h-32 bg-[#121212] border border-white/10 rounded-lg px-4 py-2 text-white font-mono text-sm focus:outline-none focus:border-orange-500"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {saved && (
                <div className="flex flex-col items-center justify-center py-12 animate-in fade-in zoom-in duration-500">
                    <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center text-green-500 mb-4">
                        <Check size={32} />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">Recipe Saved!</h3>
                    <button
                        onClick={() => setSaved(false)}
                        className="text-orange-500 hover:text-orange-400 font-medium"
                    >
                        Scan Another
                    </button>
                </div>
            )}
        </div>
    );
};
