import React, { useState } from 'react';
import { 
  X, 
  UserCheck, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Plus, 
  Wrench, 
  FileText, 
  ShieldCheck, 
  Home, 
  AlertCircle,
  Phone,
  Camera,
  ChevronRight
} from 'lucide-react';
import { SAMPLE_PORTAL_TASKS } from '../data/mockData';
import { PortalTask } from '../types';

interface ClientPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ClientPortalModal: React.FC<ClientPortalModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'tasks' | 'request' | 'inventory'>('overview');
  const [tasks, setTasks] = useState<PortalTask[]>(SAMPLE_PORTAL_TASKS);
  
  // New request form state
  const [requestTitle, setRequestTitle] = useState('');
  const [requestCategory, setRequestCategory] = useState('Handyman Repair');
  const [requestPriority, setRequestPriority] = useState('Normal (Next Visit)');
  const [requestNotes, setRequestNotes] = useState('');
  const [requestSubmitted, setRequestSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleCreateRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestTitle.trim()) return;

    const newTask: PortalTask = {
      id: `pt-${Date.now()}`,
      title: requestTitle,
      status: 'scheduled',
      date: 'Next Scheduled Visit (May 12, 2026)',
      technician: 'Mark Jenkins (Assigned Lead)',
      notes: `${requestCategory} - ${requestPriority}. ${requestNotes || 'Submitted by homeowner.'}`
    };

    setTasks([newTask, ...tasks]);
    setRequestSubmitted(true);
    setTimeout(() => {
      setRequestTitle('');
      setRequestNotes('');
      setRequestSubmitted(false);
      setActiveTab('tasks');
    }, 1400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="bg-[#0f2942] text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center font-bold text-white shadow-xs">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">Premier Member Portal</h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  ACTIVE MEMBER
                </span>
              </div>
              <p className="text-xs text-slate-300">Residence: 10408 Highland Dr, Potomac, MD (Bi-Monthly Pro)</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="bg-slate-100 px-6 pt-2 flex items-center gap-1 border-b border-slate-200 overflow-x-auto">
          {[
            { id: 'overview', label: 'Home Dashboard' },
            { id: 'tasks', label: `Service History (${tasks.length})` },
            { id: 'request', label: '+ Submit Honey-Do Task' },
            { id: 'inventory', label: 'Equipment Inventory' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-white text-[#0f2942] border-t-2 border-emerald-600 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              {/* Top Status Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* Next Visit Card */}
                <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200">
                  <span className="text-[11px] font-bold uppercase text-emerald-800 block mb-1">
                    Next Scheduled Visit
                  </span>
                  <div className="text-lg font-black text-[#0f2942] flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-emerald-600" />
                    <span>May 12, 2026</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">9:00 AM - 12:30 PM (Bi-Monthly Summer Prep)</p>
                </div>

                {/* Assigned Tech Card */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <span className="text-[11px] font-bold uppercase text-slate-500 block mb-1">
                    Primary Dedicated Tech
                  </span>
                  <div className="text-base font-bold text-[#0f2942] flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-emerald-600" />
                    <span>Mark Jenkins</span>
                  </div>
                  <p className="text-xs text-emerald-700 font-semibold mt-1">W-2 Certified Master Technician</p>
                </div>

                {/* Handyman Hours Remaining */}
                <div className="bg-blue-50/60 p-4 rounded-2xl border border-blue-200">
                  <span className="text-[11px] font-bold uppercase text-blue-800 block mb-1">
                    Included Handyman Hours
                  </span>
                  <div className="text-lg font-black text-[#0f2942] flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span>2.0 hrs / visit</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">8 hours banked for 2026 projects</p>
                </div>

              </div>

              {/* Dedicated Technician Profile Card */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80"
                    alt="Technician Mark Jenkins"
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-600 shadow-sm"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-base font-bold text-[#0f2942]">Mark Jenkins</h4>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        8 Yrs with Premier Home Services
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">Assigned specifically to your home. Licensed & Insured.</p>
                    <p className="text-xs text-slate-700 font-medium mt-1">Direct Field Dispatch: (301) 949-8080</p>
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('request')}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Task to May 12 Visit</span>
                </button>
              </div>

              {/* Recent Activity Mini List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-900">Recent Service Activity</h4>
                  <button 
                    onClick={() => setActiveTab('tasks')}
                    className="text-xs font-semibold text-emerald-700 hover:underline"
                  >
                    View All ({tasks.length})
                  </button>
                </div>

                {tasks.slice(0, 2).map((t) => (
                  <div key={t.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs flex flex-col sm:flex-row justify-between gap-2">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-sm">{t.title}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          t.status === 'completed' 
                            ? 'bg-emerald-100 text-emerald-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {t.status.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-slate-600">{t.notes}</p>
                    </div>
                    <span className="text-slate-400 font-semibold shrink-0">{t.date}</span>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* TAB 2: TASKS */}
          {activeTab === 'tasks' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-900">Complete Inspection & Task Logs</h4>
                <button
                  onClick={() => setActiveTab('request')}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Request</span>
                </button>
              </div>

              {tasks.map((task) => (
                <div key={task.id} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h5 className="font-bold text-slate-900 text-sm">{task.title}</h5>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        task.status === 'completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {task.status}
                      </span>
                    </div>
                    <span className="text-xs text-slate-400 font-medium">{task.date}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{task.notes}</p>
                  <div className="text-[11px] text-slate-400 font-medium pt-1">
                    Technician: {task.technician}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: SUBMIT REQUEST */}
          {activeTab === 'request' && (
            <form onSubmit={handleCreateRequest} className="space-y-4 max-w-xl mx-auto">
              <div className="text-center space-y-1 mb-4">
                <h4 className="text-base font-bold text-[#0f2942]">Submit a Honey-Do Task</h4>
                <p className="text-xs text-slate-500">
                  Your dedicated technician will review and execute this during your included visit hours.
                </p>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Task Title / Item to Fix:
                </label>
                <input
                  type="text"
                  required
                  value={requestTitle}
                  onChange={(e) => setRequestTitle(e.target.value)}
                  placeholder="e.g. Replace light fixture in entry, fix leaking powder room faucet, patch drywall hole"
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-medium text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Category:</label>
                  <select
                    value={requestCategory}
                    onChange={(e) => setRequestCategory(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-medium text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-hidden bg-white"
                  >
                    <option>Handyman Repair</option>
                    <option>Electrical / Lighting</option>
                    <option>Plumbing / Fixtures</option>
                    <option>Carpentry / Drywall</option>
                    <option>Exterior / Gutter</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Priority:</label>
                  <select
                    value={requestPriority}
                    onChange={(e) => setRequestPriority(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-medium text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-hidden bg-white"
                  >
                    <option>Normal (Next Visit)</option>
                    <option>High (Next 48 Hours)</option>
                    <option>Urgent / Emergency</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Additional Details & Location in Home:
                </label>
                <textarea
                  rows={3}
                  value={requestNotes}
                  onChange={(e) => setRequestNotes(e.target.value)}
                  placeholder="e.g. In the master closet ceiling, replacement fixture is in the box on the dresser."
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-medium text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-hidden"
                />
              </div>

              {requestSubmitted ? (
                <div className="p-3 bg-emerald-100 text-emerald-900 rounded-xl text-center font-bold text-xs animate-in zoom-in">
                  Task added to your technician's schedule!
                </div>
              ) : (
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md cursor-pointer"
                >
                  Save Task to Next Visit
                </button>
              )}
            </form>
          )}

          {/* TAB 4: INVENTORY */}
          {activeTab === 'inventory' && (
            <div className="space-y-4">
              <div className="text-xs text-slate-500">
                Premier Home Services maintains an active registry of all serial numbers, filter sizes, and warranty dates so you never have to search for manuals.
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                  <div className="font-bold text-slate-900">HVAC Unit 1 (Upstairs Zone)</div>
                  <div className="text-slate-600">Carrier Infinity 4-Ton 19-SEER Heat Pump</div>
                  <div className="text-slate-500">Filter: 20x25x4 MERV-13 (Replaced March 2026)</div>
                  <div className="text-emerald-700 font-semibold">Warranty Active through Oct 2029</div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                  <div className="font-bold text-slate-900">Primary Water Heater</div>
                  <div className="text-slate-600">Bradford White 75-Gallon Power Direct Vent Gas</div>
                  <div className="text-slate-500">Last Anode & Flush: March 14, 2026 (Mark Jenkins)</div>
                  <div className="text-emerald-700 font-semibold">Operational Status: Optimal</div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                  <div className="font-bold text-slate-900">Whole House Backup Generator</div>
                  <div className="text-slate-600">Generac 24kW Guardian Series Automatic Transfer</div>
                  <div className="text-slate-500">Semi-Annual Oil & Spark Plug Service: Due Fall 2026</div>
                  <div className="text-emerald-700 font-semibold">Battery Test: 12.8V Passed</div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                  <div className="font-bold text-slate-900">Basement Sump & Battery Backup</div>
                  <div className="text-slate-600">Zoeller M53 Mighty-Mate 1/3 HP Cast Iron</div>
                  <div className="text-slate-500">Tested float switch & check valve March 2026</div>
                  <div className="text-emerald-700 font-semibold">Auxiliary 12V AGM Battery: Healthy</div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Need immediate help? Call 24/7 Member Line: (866) 884-2775</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 font-bold text-slate-800 transition-colors cursor-pointer"
          >
            Close Portal Preview
          </button>
        </div>

      </div>
    </div>
  );
};
