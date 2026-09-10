import React, { useMemo, useState } from 'react';
import { DEFAULT_SITE_CONTENT, loadSiteContent, saveSiteContent } from '../data/content';
import { SiteContent, SitePage } from '../types';
import { Pencil, Save, ShieldCheck, Images, LayoutTemplate, Users, Download } from 'lucide-react';

interface AdminPanelProps {
    isOpen: boolean;
    onClose: () => void;
}

const PAGE_KEYS: Array<{ key: keyof SiteContent['pages']; label: string }> = [
    { key: 'services', label: 'Services' },
    { key: 'story', label: 'Our Story' },
    { key: 'locations', label: 'Locations' },
    { key: 'faq', label: 'FAQ' },
    { key: 'careers', label: 'Careers' }
];

export const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose }) => {
    const [content, setContent] = useState<SiteContent>(() => loadSiteContent());
    const [activeTab, setActiveTab] = useState<'home' | 'gallery' | 'pages'>('home');
    const [activePage, setActivePage] = useState<keyof SiteContent['pages']>('services');
    const [isDirty, setIsDirty] = useState(false);

    const currentPage = useMemo(() => content.pages[activePage], [content, activePage]);

    const updateContent = (updater: (current: SiteContent) => SiteContent) => {
        setContent((current) => {
            const next = updater(current);
            setIsDirty(true);
            return next;
        });
    };

    const handleSave = async () => {
        try {
            const response = await fetch('/api/content', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(content)
            });

            if (!response.ok) {
                throw new Error('Failed to save content');
            }

            setIsDirty(false);
        } catch {
            saveSiteContent(content);
            setIsDirty(false);
        }
    };

    const handleExport = () => {
        const data = JSON.stringify(content, null, 2);
        const blob = new Blob([data], { type: 'application/json' });
        const href = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = href;
        link.download = 'hasslefree-admin-content.json';
        link.click();
        URL.revokeObjectURL(href);
    };

    const handleReset = () => {
        setContent(DEFAULT_SITE_CONTENT);
        setIsDirty(true);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-start justify-center overflow-y-auto p-4 sm:p-6">
            <div className="w-full max-w-6xl rounded-3xl bg-white shadow-2xl border border-slate-200">
                <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-5 py-4 rounded-t-3xl">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">Admin panel</p>
                        <h2 className="text-xl font-black text-[#0f2942]">Content Management</h2>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleExport}
                            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                        >
                            <Download className="w-4 h-4" />
                            Export
                        </button>
                        <button
                            onClick={handleSave}
                            className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-700"
                        >
                            <Save className="w-4 h-4" />
                            {isDirty ? 'Save Changes' : 'Saved'}
                        </button>
                        <button
                            onClick={onClose}
                            className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                        >
                            Close
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] min-h-[72vh]">
                    <aside className="border-r border-slate-200 bg-slate-50 p-4">
                        <div className="space-y-2">
                            {[
                                { id: 'home', label: 'Home', icon: LayoutTemplate },
                                { id: 'gallery', label: 'Gallery', icon: Images },
                                { id: 'pages', label: 'Pages', icon: Pencil }
                            ].map((tab) => {
                                const Icon = tab.icon;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id as any)}
                                        className={`w-full flex items-center gap-3 rounded-xl px-3 py-3 text-left transition ${activeTab === tab.id ? 'bg-[#0f2942] text-white shadow-sm' : 'text-slate-700 hover:bg-white'
                                            }`}
                                    >
                                        <Icon className="w-4 h-4" />
                                        <span className="text-sm font-semibold">{tab.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </aside>

                    <main className="p-5 sm:p-6">
                        {activeTab === 'home' && (
                            <div className="space-y-6">
                                <div className="grid gap-6 md:grid-cols-2">
                                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                        <p className="mb-4 text-sm font-bold uppercase tracking-[0.16em] text-slate-500">Company</p>
                                        <label className="mb-3 block text-xs font-semibold text-slate-600">Company name</label>
                                        <input
                                            value={content.company.name}
                                            onChange={(e) => updateContent((current) => ({ ...current, company: { ...current.company, name: e.target.value } }))}
                                            className="mb-4 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
                                        />

                                        <label className="mb-3 block text-xs font-semibold text-slate-600">Phone</label>
                                        <input
                                            value={content.company.phone}
                                            onChange={(e) => updateContent((current) => ({ ...current, company: { ...current.company, phone: e.target.value } }))}
                                            className="mb-4 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
                                        />

                                        <label className="mb-3 block text-xs font-semibold text-slate-600">Emergency line</label>
                                        <input
                                            value={content.company.emergency}
                                            onChange={(e) => updateContent((current) => ({ ...current, company: { ...current.company, emergency: e.target.value } }))}
                                            className="mb-4 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
                                        />

                                        <label className="mb-3 block text-xs font-semibold text-slate-600">Location text</label>
                                        <input
                                            value={content.company.location}
                                            onChange={(e) => updateContent((current) => ({ ...current, company: { ...current.company, location: e.target.value } }))}
                                            className="mb-4 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
                                        />
                                    </div>

                                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                        <p className="mb-4 text-sm font-bold uppercase tracking-[0.16em] text-slate-500">Hero</p>
                                        <label className="mb-3 block text-xs font-semibold text-slate-600">Eyebrow</label>
                                        <input
                                            value={content.home.hero.eyebrow}
                                            onChange={(e) => updateContent((current) => ({ ...current, home: { ...current.home, hero: { ...current.home.hero, eyebrow: e.target.value } } }))}
                                            className="mb-4 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
                                        />

                                        <label className="mb-3 block text-xs font-semibold text-slate-600">Title</label>
                                        <input
                                            value={content.home.hero.title}
                                            onChange={(e) => updateContent((current) => ({ ...current, home: { ...current.home, hero: { ...current.home.hero, title: e.target.value } } }))}
                                            className="mb-4 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
                                        />

                                        <label className="mb-3 block text-xs font-semibold text-slate-600">Subtitle</label>
                                        <textarea
                                            value={content.home.hero.subtitle}
                                            onChange={(e) => updateContent((current) => ({ ...current, home: { ...current.home, hero: { ...current.home.hero, subtitle: e.target.value } } }))}
                                            className="mb-4 min-h-[110px] w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
                                        />

                                        <div className="grid gap-4 md:grid-cols-2">
                                            <div>
                                                <label className="mb-3 block text-xs font-semibold text-slate-600">Primary CTA</label>
                                                <input
                                                    value={content.home.hero.primaryCta}
                                                    onChange={(e) => updateContent((current) => ({ ...current, home: { ...current.home, hero: { ...current.home.hero, primaryCta: e.target.value } } }))}
                                                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="mb-3 block text-xs font-semibold text-slate-600">Secondary CTA</label>
                                                <input
                                                    value={content.home.hero.secondaryCta}
                                                    onChange={(e) => updateContent((current) => ({ ...current, home: { ...current.home, hero: { ...current.home.hero, secondaryCta: e.target.value } } }))}
                                                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'gallery' && (
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-bold uppercase tracking-[0.16em] text-slate-500">Gallery</p>
                                        <h3 className="text-xl font-black text-[#0f2942]">Manage gallery items</h3>
                                    </div>
                                    <button
                                        onClick={() => updateContent((current) => ({
                                            ...current,
                                            gallery: [
                                                ...current.gallery,
                                                {
                                                    id: `g-${Date.now()}`,
                                                    title: 'New gallery item',
                                                    category: 'General',
                                                    description: 'Add a description for this gallery item.',
                                                    image: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=900&q=80'
                                                }
                                            ]
                                        }))}
                                        className="rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-700"
                                    >
                                        Add item
                                    </button>
                                </div>

                                <div className="grid gap-4 md:grid-cols-2">
                                    {content.gallery.map((item, idx) => (
                                        <div key={item.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                            <img src={item.image} alt={item.title} className="mb-4 h-44 w-full rounded-xl object-cover" />
                                            <label className="mb-2 block text-xs font-semibold text-slate-600">Title</label>
                                            <input
                                                value={item.title}
                                                onChange={(e) => updateContent((current) => ({
                                                    ...current,
                                                    gallery: current.gallery.map((entry, i) => i === idx ? { ...entry, title: e.target.value } : entry)
                                                }))}
                                                className="mb-3 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
                                            />
                                            <label className="mb-2 block text-xs font-semibold text-slate-600">Category</label>
                                            <input
                                                value={item.category}
                                                onChange={(e) => updateContent((current) => ({
                                                    ...current,
                                                    gallery: current.gallery.map((entry, i) => i === idx ? { ...entry, category: e.target.value } : entry)
                                                }))}
                                                className="mb-3 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
                                            />
                                            <label className="mb-2 block text-xs font-semibold text-slate-600">Description</label>
                                            <textarea
                                                value={item.description}
                                                onChange={(e) => updateContent((current) => ({
                                                    ...current,
                                                    gallery: current.gallery.map((entry, i) => i === idx ? { ...entry, description: e.target.value } : entry)
                                                }))}
                                                className="mb-3 min-h-[90px] w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
                                            />
                                            <label className="mb-2 block text-xs font-semibold text-slate-600">Image URL</label>
                                            <input
                                                value={item.image}
                                                onChange={(e) => updateContent((current) => ({
                                                    ...current,
                                                    gallery: current.gallery.map((entry, i) => i === idx ? { ...entry, image: e.target.value } : entry)
                                                }))}
                                                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'pages' && (
                            <div className="space-y-5">
                                <div className="flex flex-wrap gap-2">
                                    {PAGE_KEYS.map((page) => (
                                        <button
                                            key={page.key}
                                            onClick={() => setActivePage(page.key)}
                                            className={`rounded-full px-3 py-1.5 text-xs font-bold ${activePage === page.key ? 'bg-[#0f2942] text-white' : 'bg-slate-100 text-slate-700'
                                                }`}
                                        >
                                            {page.label}
                                        </button>
                                    ))}
                                </div>

                                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                    <label className="mb-2 block text-xs font-semibold text-slate-600">Page title</label>
                                    <input
                                        value={currentPage.title}
                                        onChange={(e) => updateContent((current) => ({
                                            ...current,
                                            pages: {
                                                ...current.pages,
                                                [activePage]: {
                                                    ...current.pages[activePage],
                                                    title: e.target.value
                                                }
                                            }
                                        }))}
                                        className="mb-4 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
                                    />

                                    <label className="mb-2 block text-xs font-semibold text-slate-600">Subtitle</label>
                                    <input
                                        value={currentPage.subtitle}
                                        onChange={(e) => updateContent((current) => ({
                                            ...current,
                                            pages: {
                                                ...current.pages,
                                                [activePage]: {
                                                    ...current.pages[activePage],
                                                    subtitle: e.target.value
                                                }
                                            }
                                        }))}
                                        className="mb-4 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
                                    />

                                    <label className="mb-2 block text-xs font-semibold text-slate-600">Intro</label>
                                    <textarea
                                        value={currentPage.intro}
                                        onChange={(e) => updateContent((current) => ({
                                            ...current,
                                            pages: {
                                                ...current.pages,
                                                [activePage]: {
                                                    ...current.pages[activePage],
                                                    intro: e.target.value
                                                }
                                            }
                                        }))}
                                        className="mb-4 min-h-[90px] w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
                                    />

                                    <div className="space-y-4">
                                        {currentPage.sections.map((section, idx) => (
                                            <div key={section.id} className="rounded-xl border border-slate-200 bg-white p-3">
                                                <label className="mb-2 block text-xs font-semibold text-slate-600">Section title</label>
                                                <input
                                                    value={section.title}
                                                    onChange={(e) => updateContent((current) => ({
                                                        ...current,
                                                        pages: {
                                                            ...current.pages,
                                                            [activePage]: {
                                                                ...current.pages[activePage],
                                                                sections: current.pages[activePage].sections.map((s, i) => i === idx ? { ...s, title: e.target.value } : s)
                                                            }
                                                        }
                                                    }))}
                                                    className="mb-3 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm"
                                                />
                                                <label className="mb-2 block text-xs font-semibold text-slate-600">Body</label>
                                                <textarea
                                                    value={section.body}
                                                    onChange={(e) => updateContent((current) => ({
                                                        ...current,
                                                        pages: {
                                                            ...current.pages,
                                                            [activePage]: {
                                                                ...current.pages[activePage],
                                                                sections: current.pages[activePage].sections.map((s, i) => i === idx ? { ...s, body: e.target.value } : s)
                                                            }
                                                        }
                                                    }))}
                                                    className="min-h-[100px] w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};
