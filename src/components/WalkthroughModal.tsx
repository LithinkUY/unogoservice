import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  CheckCircle2, 
  Home, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft,
  Sparkles
} from 'lucide-react';
import { useCms } from '../context/CmsContext';

interface WalkthroughModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledZip?: string;
}

export const WalkthroughModal: React.FC<WalkthroughModalProps> = ({ 
  isOpen, 
  onClose,
  prefilledZip = ''
}) => {
  const { addAppointment } = useCms();
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState({
    address: '',
    city: '',
    state: 'MD',
    zip: prefilledZip,
    sqft: '4,500',
    homeType: 'Single Family Home',
    priorities: ['Preventative Maintenance', 'Handyman Honey-Do Repairs'],
    fullName: '',
    email: '',
    phone: '',
    preferredDate: '',
    preferredTime: 'Morning (9am - 12pm)',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const togglePriority = (p: string) => {
    setFormData(prev => {
      const exists = prev.priorities.includes(p);
      return {
        ...prev,
        priorities: exists 
          ? prev.priorities.filter(item => item !== p) 
          : [...prev.priorities, p]
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addAppointment({
      fullName: formData.fullName || 'Homeowner',
      phone: formData.phone,
      email: formData.email,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      zip: formData.zip,
      sqft: formData.sqft,
      homeType: formData.homeType,
      priorities: formData.priorities,
      preferredDate: formData.preferredDate || new Date().toISOString().split('T')[0],
      preferredTime: formData.preferredTime,
      notes: formData.notes,
      status: 'pending'
    });

    // Notify unogohome@gmail.com
    fetch('https://formsubmit.co/ajax/unogohome@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        _subject: `Nueva Solicitud de Walkthrough: ${formData.fullName || 'Propietario'} (${formData.city || ''}, ${formData.state || ''} ${formData.zip || ''})`,
        nombre: formData.fullName,
        telefono: formData.phone,
        email: formData.email,
        direccion: `${formData.address || ''}, ${formData.city || ''}, ${formData.state || ''} ${formData.zip || ''}`,
        tipoHogar: formData.homeType,
        piesCuadrados: formData.sqft,
        prioridades: formData.priorities?.join(', '),
        fechaPreferida: formData.preferredDate,
        horarioPreferido: formData.preferredTime,
        notas: formData.notes
      })
    }).catch(err => console.warn('Email dispatch notice', err));

    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setStep(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-2xl max-h-[92vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-[#0f2942] text-white px-6 py-5 flex items-center justify-between border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span className="text-xs font-bold tracking-wider text-emerald-400 uppercase">
                Complimentary & No-Obligation
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-white mt-0.5">
              Schedule Your Home Walkthrough
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Multi-step indicator */}
        {!submitted && (
          <div className="bg-slate-50 px-6 py-3 border-b border-slate-200 flex items-center justify-between text-xs font-bold text-slate-500">
            <div className={`flex items-center gap-1.5 ${step >= 1 ? 'text-emerald-700' : ''}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                step >= 1 ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'
              }`}>1</span>
              <span>Property</span>
            </div>
            <div className="h-0.5 w-8 bg-slate-200"></div>
            <div className={`flex items-center gap-1.5 ${step >= 2 ? 'text-emerald-700' : ''}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                step >= 2 ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'
              }`}>2</span>
              <span>Priorities</span>
            </div>
            <div className="h-0.5 w-8 bg-slate-200"></div>
            <div className={`flex items-center gap-1.5 ${step >= 3 ? 'text-emerald-700' : ''}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                step >= 3 ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'
              }`}>3</span>
              <span>Contact & Time</span>
            </div>
          </div>
        )}

        {/* Content Area */}
        <div className="p-6 overflow-y-auto flex-1">
          {submitted ? (
            <div className="text-center py-8 space-y-5">
              <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-sm animate-bounce">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="space-y-2">
                <h4 className="text-2xl font-black text-[#0f2942]">
                  Walkthrough Confirmed!
                </h4>
                <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-slate-800">{formData.fullName || 'Neighbor'}</strong>. 
                  A Senior Home Manager has been assigned to your address in {formData.city || 'your area'}.
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 max-w-md mx-auto text-left text-xs space-y-2 text-slate-700">
                <div className="flex items-center justify-between font-bold text-slate-900 border-b pb-2">
                  <span>Inspection Overview:</span>
                  <span className="text-emerald-700">Zero Cost / No Obligation</span>
                </div>
                <div><strong>Address:</strong> {formData.address || '123 Main St'}, {formData.city} {formData.state} {formData.zip}</div>
                <div><strong>Time Window:</strong> {formData.preferredDate || 'Upcoming Weekday'} ({formData.preferredTime})</div>
                <div><strong>What to expect:</strong> Complete 50-point baseline mechanical audit, filter dimension logging, and custom proposal.</div>
              </div>

              <button
                onClick={handleReset}
                className="px-6 py-2.5 rounded-xl bg-[#0f2942] hover:bg-[#16385d] text-white font-bold text-xs shadow-sm cursor-pointer"
              >
                Back to Site
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* STEP 1: PROPERTY DETAILS */}
              {step === 1 && (
                <div className="space-y-4">
                  <div>
                    <h4 className="text-base font-bold text-[#0f2942]">Where is your home located?</h4>
                    <p className="text-xs text-slate-500">We verify regional technician route coverage in real time.</p>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Street Address</label>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="e.g. 10408 Highland Drive"
                      className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-medium text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-hidden"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="col-span-1">
                      <label className="text-xs font-bold text-slate-700 block mb-1">City</label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        placeholder="e.g. Bethesda"
                        className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-medium text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">State</label>
                      <select
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-medium text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-hidden bg-white"
                      >
                        <option value="MD">Maryland (MD)</option>
                        <option value="DC">Washington D.C. (DC)</option>
                        <option value="VA">Virginia (VA)</option>
                        <option value="CT">Connecticut (CT)</option>
                        <option value="GA">Georgia (GA)</option>
                        <option value="FL">Florida (FL)</option>
                        <option value="IL">Illinois (IL)</option>
                        <option value="MA">Massachusetts (MA)</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Zip Code</label>
                      <input
                        type="text"
                        required
                        value={formData.zip}
                        onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                        placeholder="e.g. 20854"
                        className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-medium text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Approximate Sq Footage</label>
                      <select
                        value={formData.sqft}
                        onChange={(e) => setFormData({ ...formData, sqft: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-medium text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-hidden bg-white"
                      >
                        <option>Under 3,000 sq ft</option>
                        <option>3,000 - 5,000 sq ft</option>
                        <option>5,000 - 7,500 sq ft</option>
                        <option>7,500+ sq ft (Estate)</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Residence Type</label>
                      <select
                        value={formData.homeType}
                        onChange={(e) => setFormData({ ...formData, homeType: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-medium text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-hidden bg-white"
                      >
                        <option>Single Family Home</option>
                        <option>Luxury Estate</option>
                        <option>Historic Property</option>
                        <option>Townhome</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer"
                    >
                      <span>Next: Select Priorities</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: PRIORITIES */}
              {step === 2 && (
                <div className="space-y-4">
                  <div>
                    <h4 className="text-base font-bold text-[#0f2942]">What are your primary goals for your home?</h4>
                    <p className="text-xs text-slate-500">Select all that apply to help us tailor your walkthrough checklist.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      'Preventative Maintenance (Water heaters, coils, filters)',
                      'Handyman Honey-Do Repairs (Lights, caulking, locks)',
                      'Worry about hidden leaks, roof, attic or gutters',
                      'Major upcoming project (Painting, roofing, HVAC overhaul)',
                      'Frequent business travel / need property oversight',
                      'Sick of chasing unreliable, unvetted contractors'
                    ].map((p, idx) => {
                      const isChecked = formData.priorities.includes(p);
                      return (
                        <div
                          key={idx}
                          onClick={() => togglePriority(p)}
                          className={`p-3 rounded-xl border text-xs font-semibold flex items-start gap-2.5 cursor-pointer transition-all ${
                            isChecked 
                              ? 'bg-emerald-50 border-emerald-400 text-emerald-900 shadow-2xs' 
                              : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                          }`}
                        >
                          <div className={`w-4 h-4 rounded-md flex items-center justify-center shrink-0 mt-0.5 ${
                            isChecked ? 'bg-emerald-600 text-white' : 'border border-slate-300'
                          }`}>
                            {isChecked && <CheckCircle2 className="w-3.5 h-3.5" />}
                          </div>
                          <span>{p}</span>
                        </div>
                      );
                    })}
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Any specific issues you'd like our Senior Home Manager to look at?
                    </label>
                    <textarea
                      rows={2}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="e.g. Sump pump makes a vibration, master bathroom door rubs on carpet, upstairs HVAC runs constantly"
                      className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-medium text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-hidden"
                    />
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-bold text-xs flex items-center gap-1 cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer"
                    >
                      <span>Next: Contact & Time</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: CONTACT & TIME */}
              {step === 3 && (
                <div className="space-y-4">
                  <div>
                    <h4 className="text-base font-bold text-[#0f2942]">Who should we send the confirmation to?</h4>
                    <p className="text-xs text-slate-500">We will never spam or share your information.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Full Name</label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="John & Sarah Doe"
                        className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-medium text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Phone Number</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="(301) 555-0199"
                        className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-medium text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-hidden"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="homeowner@example.com"
                      className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-medium text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-hidden"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Preferred Date</label>
                      <input
                        type="date"
                        value={formData.preferredDate}
                        onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-medium text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-hidden bg-white"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Preferred Time Window</label>
                      <select
                        value={formData.preferredTime}
                        onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-medium text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-hidden bg-white"
                      >
                        <option>Morning (9:00 AM - 12:00 PM)</option>
                        <option>Afternoon (1:00 PM - 4:00 PM)</option>
                        <option>Flexible / Any Weekday Window</option>
                      </select>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-900 flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      100% Free Consultation Guarantee: There is absolutely no pressure or obligation. We inspect your home, document your mechanical systems, and present you with a transparent monthly care proposal.
                    </span>
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-bold text-xs flex items-center gap-1 cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-black text-xs shadow-md shadow-emerald-700/20 cursor-pointer"
                    >
                      Confirm Walkthrough Request
                    </button>
                  </div>
                </div>
              )}

            </form>
          )}
        </div>

        {/* Footer info */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Questions? Call our intake team: (888) 555-CARE</span>
          <span className="font-semibold text-slate-700">W-2 Certified Technicians</span>
        </div>

      </div>
    </div>
  );
};
