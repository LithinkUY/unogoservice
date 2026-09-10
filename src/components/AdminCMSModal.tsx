import React, { useState, useRef } from 'react';
import {
  X,
  Settings,
  Palette,
  Sliders,
  Menu,
  Layout,
  FileText,
  CheckSquare,
  DollarSign,
  Images,
  Calendar,
  ArrowRight,
  Plus,
  Trash2,
  Save,
  Download,
  Upload,
  RotateCcw,
  Eye,
  Play,
  Sparkles,
  UserCheck,
  Phone,
  CheckCircle2,
  Clock,
  Search,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Image,
  ArrowUp,
  ArrowDown,
  Edit,
  MessageCircle,
  User,
  HelpCircle,
  Calculator,
  MapPin,
  Globe,
  Languages
} from 'lucide-react';
import { useCms } from '../context/CmsContext';
import {
  ChecklistItem,
  PricingPlan,
  GalleryItem,
  Appointment,
  ClientRecord,
  SlideItem,
  NavItemConfig,
  PageSection,
  FaqItem
} from '../types';
import { DEFAULT_SCHEDULE_MODAL_CONFIG } from '../data/defaultCmsData';
import { getAdminText, useAdminAutoTranslation } from '../utils/adminTranslations';

interface AdminCMSModalProps {
  isOpen: boolean;
  onClose: () => void;
  pageMode?: boolean;
}

type TabType =
  | 'styles'
  | 'logo'
  | 'sections'
  | 'header'
  | 'slider'
  | 'content'
  | 'checklist'
  | 'pricing'
  | 'calculator'
  | 'gallery'
  | 'clients'
  | 'schedule'
  | 'schedule-config'
  | 'service-areas'
  | 'footer'
  | 'faqs'
  | 'pages'
  | 'usuario'
  | 'whatsapp'
  | 'backup';

export const AdminCMSModal: React.FC<AdminCMSModalProps> = ({ isOpen, onClose, pageMode = false }) => {
  const {
    config,
    updateTheme,
    updateHeader,
    updateSlider,
    updateContent,
    updateSections,
    updateSingleSection,
    toggleSection,
    reorderSections,
    addCustomSection,
    deleteSection,
    updateChecklist,
    updatePricingPlans,
    updateTestimonials,
    updateGallery,
    updateAppointments,
    updateAppointmentStatus,
    deleteAppointment,
    addAppointment,
    addClient,
    updateClient,
    deleteClient,
    updateAdminCredentials,
    updateFooter,
    updateFaqs,
    updateServiceAreas,
    addPage,
    updatePage,
    deletePage,
    saveAndNotify,
    resetToDefaults,
    exportConfigAsJson,
    importConfigFromJson,
    updateScheduleModal
  } = useCms();

  const [activeTab, setActiveTab] = useState<TabType>('styles');
  const [saveToast, setSaveToast] = useState<string | null>(null);
  const [adminLang, setAdminLang] = useState<'es' | 'en'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('premier_admin_lang') as 'es' | 'en') || 'es';
    }
    return 'es';
  });

  const toggleLang = (lang: 'es' | 'en') => {
    setAdminLang(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('premier_admin_lang', lang);
    }
  };

  const t = (es: string, en: string) => (adminLang === 'en' ? en : es);

  // Auto-translate the entire modal body DOM when language changes
  const adminBodyRef = useRef<HTMLDivElement>(null);
  useAdminAutoTranslation(adminBodyRef, adminLang, activeTab);


  const [checklistSearch, setChecklistSearch] = useState('');
  const [appointmentStatusFilter, setAppointmentStatusFilter] = useState<string>('all');
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  // New item draft states
  const [newChecklistModal, setNewChecklistModal] = useState(false);
  const [newChecklistDraft, setNewChecklistDraft] = useState<Partial<ChecklistItem>>({
    title: '',
    category: 'hvac',
    season: 'spring',
    frequency: 'Every Visit',
    description: '',
    preventedDamage: ''
  });

  const [newGalleryModal, setNewGalleryModal] = useState(false);
  const [newGalleryDraft, setNewGalleryDraft] = useState<Partial<GalleryItem>>({
    title: '',
    category: 'HVAC & Electrical',
    type: 'single',
    imageUrl: '',
    beforeImageUrl: '',
    afterImageUrl: '',
    videoUrl: '',
    description: '',
    location: 'Potomac, MD',
    completionDate: '2026'
  });

  const [editGalleryModal, setEditGalleryModal] = useState(false);
  const [editGalleryDraft, setEditGalleryDraft] = useState<GalleryItem | null>(null);

  const [newFaqModal, setNewFaqModal] = useState(false);
  const [newFaqDraft, setNewFaqDraft] = useState<FaqItem>({
    question: '',
    answer: '',
    category: 'general',
    hidden: false
  });

  const [newSectionModal, setNewSectionModal] = useState(false);
  const [newSectionDraft, setNewSectionDraft] = useState({
    title: '',
    subtitle: '',
    badge: 'Nuevo Módulo',
    content: '',
    imageUrl: '',
    enabled: true
  });
  const [editingSectionId, setEditingSectionId] = useState<string | null>(null);

  const [newAptModal, setNewAptModal] = useState(false);
  const [newAptDraft, setNewAptDraft] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: 'Bethesda',
    state: 'MD',
    zip: '20814',
    sqft: '4,500 sq ft',
    homeType: 'Single Family Home',
    priorities: ['Preventative Maintenance'],
    preferredDate: new Date().toISOString().split('T')[0],
    preferredTime: 'Morning (9am - 12pm)',
    notes: '',
    status: 'pending' as Appointment['status'],
    technicianAssigned: 'Mark Jenkins (Sr. Lead)'
  });

  const [newClientModal, setNewClientModal] = useState(false);
  const [editingClientId, setEditingClientId] = useState<string | null>(null);
  const [newClientDraft, setNewClientDraft] = useState<Partial<ClientRecord>>({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: 'Bethesda',
    state: 'MD',
    zip: '20814',
    sqft: '4,500 sq ft',
    homeType: 'Single Family Home',
    serviceType: 'Premier Care',
    priorities: ['Preventative Maintenance'],
    notes: '',
    status: 'active'
  });

  if (!isOpen && !pageMode) return null;

  const showToast = (msg: string) => {
    setSaveToast(msg);
    setTimeout(() => setSaveToast(null), 3000);
  };

  // Color preset options
  const colorPresets = [
    { name: 'emerald', label: 'Emerald Green (Default)', hex: '#059669', darkHex: '#0f2942' },
    { name: 'navy', label: 'Heritage Navy', hex: '#1e3a8a', darkHex: '#0b192c' },
    { name: 'blue', label: 'Pacific Blue', hex: '#0284c7', darkHex: '#0c2438' },
    { name: 'amber', label: 'Warm Amber Gold', hex: '#d97706', darkHex: '#1c1917' },
    { name: 'crimson', label: 'Classic Crimson', hex: '#e11d48', darkHex: '#1e1b2e' },
    { name: 'forest', label: 'Deep Forest', hex: '#15803d', darkHex: '#052e16' }
  ];

  // Font options
  const fontOptions = [
    'Plus Jakarta Sans',
    'Inter',
    'Outfit',
    'Roboto',
    'Montserrat'
  ];

  // ============ HANDLERS ============

  const handleAddSlide = () => {
    const newSlide: SlideItem = {
      id: `slide-${Date.now()}`,
      type: 'image',
      mediaUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=80',
      eyebrow: 'NEW FEATURED RESIDENCE',
      title: 'Luxury Estate',
      titleHighlight: 'Preserved.',
      description: 'Custom preventative maintenance and dedicated craftsman support tailored to your architectural home requirements.',
      primaryBtnText: 'Schedule Walkthrough',
      primaryBtnAction: 'walkthrough',
      secondaryBtnText: 'Explore Plans',
      secondaryBtnAction: 'pricing',
      overlayDarkness: 50,
      align: 'left',
      enabled: true
    };
    updateSlider({ slides: [...config.slider.slides, newSlide] });
    showToast('Nueva diapositiva añadida al Slider');
  };

  const handleUpdateSlide = (id: string, updates: Partial<SlideItem>) => {
    const updated = config.slider.slides.map(s => s.id === id ? { ...s, ...updates } : s);
    updateSlider({ slides: updated });
  };

  const handleDeleteSlide = (id: string) => {
    const updated = config.slider.slides.filter(s => s.id !== id);
    updateSlider({ slides: updated });
    showToast('Diapositiva eliminada');
  };

  const handleAddNavItem = () => {
    const newNav: NavItemConfig = {
      id: `nav-${Date.now()}`,
      label: 'Nuevo Enlace',
      sectionId: 'how-it-works',
      enabled: true
    };
    updateHeader({ navItems: [...config.header.navItems, newNav] });
    showToast('Enlace añadido al menú');
  };

  const handleUpdateNavItem = (id: string, updates: Partial<NavItemConfig>) => {
    const updated = config.header.navItems.map(n => n.id === id ? { ...n, ...updates } : n);
    updateHeader({ navItems: updated });
  };

  const handleDeleteNavItem = (id: string) => {
    const updated = config.header.navItems.filter(n => n.id !== id);
    updateHeader({ navItems: updated });
    showToast('Enlace eliminado del menú');
  };

  const handleSaveChecklistDraft = () => {
    if (!newChecklistDraft.title?.trim()) return;
    const item: ChecklistItem = {
      id: `ch-${Date.now()}`,
      title: newChecklistDraft.title,
      category: newChecklistDraft.category as any || 'hvac',
      season: newChecklistDraft.season as any || 'spring',
      frequency: newChecklistDraft.frequency || 'Annual',
      description: newChecklistDraft.description || '',
      preventedDamage: newChecklistDraft.preventedDamage || 'Prevents costly equipment breakdown'
    };
    updateChecklist([...config.checklist, item]);
    setNewChecklistModal(false);
    setNewChecklistDraft({
      title: '',
      category: 'hvac',
      season: 'spring',
      frequency: 'Every Visit',
      description: '',
      preventedDamage: ''
    });
    showToast('Nuevo punto añadido al Checklist de 50 Puntos');
  };

  const handleDeleteChecklistItem = (id: string) => {
    updateChecklist(config.checklist.filter(c => c.id !== id));
    showToast('Ítem eliminado del checklist');
  };

  const handleSaveGalleryDraft = () => {
    if (!newGalleryDraft.title?.trim()) return;
    if (!newGalleryDraft.imageUrl?.trim() && !newGalleryDraft.videoUrl?.trim()) return;

    const item: GalleryItem = {
      id: `gal-${Date.now()}`,
      title: newGalleryDraft.title,
      category: newGalleryDraft.category as any || 'HVAC & Electrical',
      type: newGalleryDraft.type as any || 'single',
      imageUrl: newGalleryDraft.imageUrl || '',
      beforeImageUrl: newGalleryDraft.beforeImageUrl,
      afterImageUrl: newGalleryDraft.afterImageUrl,
      videoUrl: newGalleryDraft.videoUrl,
      description: newGalleryDraft.description || '',
      location: newGalleryDraft.location || 'Potomac, MD',
      completionDate: newGalleryDraft.completionDate || '2026'
    };
    updateGallery([...config.gallery, item]);
    setNewGalleryModal(false);
    setNewGalleryDraft({
      title: '',
      category: 'HVAC & Electrical',
      type: 'single',
      imageUrl: '',
      beforeImageUrl: '',
      afterImageUrl: '',
      videoUrl: '',
      description: '',
      location: 'Potomac, MD',
      completionDate: '2026'
    });
    showToast('Proyecto añadido a la Galería');
  };

  const handleGalleryMediaUpload = async (
    file: File,
    target: 'image' | 'before' | 'after' | 'video',
    mode: 'new' | 'edit'
  ) => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'No se pudo subir el archivo.');
      }

      if (mode === 'new') {
        setNewGalleryDraft((prev) => ({
          ...prev,
          imageUrl: target === 'image' || target === 'after' ? data.url : prev.imageUrl,
          afterImageUrl: target === 'after' ? data.url : prev.afterImageUrl,
          beforeImageUrl: target === 'before' ? data.url : prev.beforeImageUrl,
          videoUrl: target === 'video' ? data.url : prev.videoUrl
        }));
      } else {
        setEditGalleryDraft((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            imageUrl: target === 'image' || target === 'after' ? data.url : prev.imageUrl,
            afterImageUrl: target === 'after' ? data.url : prev.afterImageUrl,
            beforeImageUrl: target === 'before' ? data.url : prev.beforeImageUrl,
            videoUrl: target === 'video' ? data.url : prev.videoUrl
          };
        });
      }

      showToast(`Archivo cargado correctamente: ${file.name}`);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error desconocido';
      alert(message);
    }
  };

  const handleDeleteGalleryItem = (id: string) => {
    updateGallery(config.gallery.filter(g => g.id !== id));
    showToast('Proyecto eliminado de la galería');
  };

  const handleAddTestimonial = () => {
    const newItem = {
      id: `test-${Date.now()}`,
      author: 'Nuevo Cliente',
      location: 'Tu ciudad',
      homeType: 'Residencia',
      rating: 5,
      yearsAsMember: 1,
      quote: 'Escribe aquí tu testimonio...',
      highlight: 'Resultado destacado',
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80'
    };
    updateTestimonials([...config.testimonials, newItem]);
    showToast('Nuevo testimonio añadido');
  };

  const handleUpdateTestimonial = (id: string, updates: Partial<typeof config.testimonials[number]>) => {
    updateTestimonials(config.testimonials.map(item => item.id === id ? { ...item, ...updates } : item));
  };

  const handleDeleteTestimonial = (id: string) => {
    updateTestimonials(config.testimonials.filter(item => item.id !== id));
    showToast('Testimonio eliminado');
  };

  const handleOpenEditGallery = (item: GalleryItem) => {
    setEditGalleryDraft({ ...item });
    setEditGalleryModal(true);
  };

  const handleSaveEditGallery = () => {
    if (!editGalleryDraft) return;
    updateGallery(config.gallery.map(item => item.id === editGalleryDraft.id ? editGalleryDraft : item));
    setEditGalleryModal(false);
    setEditGalleryDraft(null);
    showToast('Proyecto de galería actualizado con éxito');
  };

  const handleMoveSectionUp = (index: number) => {
    if (index === 0) return;
    const currentSections = config.sections || [];
    reorderSections(index, index - 1);
    showToast('Sección movida hacia arriba');
  };

  const handleMoveSectionDown = (index: number) => {
    const currentSections = config.sections || [];
    if (index >= currentSections.length - 1) return;
    reorderSections(index, index + 1);
    showToast('Sección movida hacia abajo');
  };

  const handleAddCustomSectionSubmit = () => {
    if (!newSectionDraft.title.trim()) return;
    addCustomSection({
      name: newSectionDraft.title,
      title: newSectionDraft.title,
      subtitle: newSectionDraft.subtitle,
      badge: newSectionDraft.badge,
      content: newSectionDraft.content,
      imageUrl: newSectionDraft.imageUrl,
      enabled: newSectionDraft.enabled,
      isCustom: true
    });
    setNewSectionModal(false);
    setNewSectionDraft({
      title: '',
      subtitle: '',
      badge: 'Nuevo Módulo',
      content: '',
      imageUrl: '',
      enabled: true
    });
    showToast('Nueva sección creada y agregada');
  };

  const handleLogoFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('Por favor selecciona una imagen menor a 2MB');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          updateHeader({
            branding: {
              ...config.header.branding,
              customLogoUrl: result,
              logoDisplayMode: config.header.branding.logoDisplayMode === 'text' ? 'both' : config.header.branding.logoDisplayMode
            }
          });
          showToast('Logotipo subido y aplicado exitosamente');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveAptDraft = () => {
    if (!newAptDraft.fullName.trim() || !newAptDraft.phone.trim()) return;
    addAppointment(newAptDraft);
    setNewAptModal(false);
    showToast('Cita de walkthrough agregada con éxito');
  };

  const handleSaveClientDraft = () => {
    if (!newClientDraft.fullName?.trim() || !newClientDraft.phone?.trim()) return;

    const normalizedClient = {
      fullName: newClientDraft.fullName.trim(),
      phone: newClientDraft.phone.trim(),
      email: newClientDraft.email?.trim() || '',
      address: newClientDraft.address?.trim() || '',
      city: newClientDraft.city?.trim() || 'Bethesda',
      state: newClientDraft.state?.trim() || 'MD',
      zip: newClientDraft.zip?.trim() || '20814',
      sqft: newClientDraft.sqft?.trim() || '4,500 sq ft',
      homeType: newClientDraft.homeType?.trim() || 'Single Family Home',
      serviceType: newClientDraft.serviceType?.trim() || 'Premier Care',
      priorities: Array.isArray(newClientDraft.priorities) && newClientDraft.priorities.length > 0
        ? newClientDraft.priorities
        : ['Preventative Maintenance'],
      notes: newClientDraft.notes?.trim() || '',
      status: newClientDraft.status === 'inactive' ? 'inactive' : 'active'
    };

    if (editingClientId) {
      updateClient(editingClientId, normalizedClient);
      showToast('Cliente actualizado con éxito');
    } else {
      addClient(normalizedClient);
      showToast('Cliente añadido con éxito');
    }

    setNewClientModal(false);
    setEditingClientId(null);
    setNewClientDraft({
      fullName: '',
      phone: '',
      email: '',
      address: '',
      city: 'Bethesda',
      state: 'MD',
      zip: '20814',
      sqft: '4,500 sq ft',
      homeType: 'Single Family Home',
      serviceType: 'Premier Care',
      priorities: ['Preventative Maintenance'],
      notes: '',
      status: 'active'
    });
  };

  const handleExportCsv = () => {
    const headers = ['ID', 'Nombre', 'Telefono', 'Email', 'Direccion', 'Ciudad', 'Estado', 'Zip', 'Metros Cuadrados', 'Tipo Residencia', 'Prioridades', 'Fecha Preferida', 'Horario', 'Estado', 'Tecnico Asignado', 'Notas'];
    const rows = config.appointments.map(a => [
      a.id,
      `"${a.fullName}"`,
      `"${a.phone}"`,
      `"${a.email}"`,
      `"${a.address}"`,
      `"${a.city}"`,
      `"${a.state}"`,
      `"${a.zip}"`,
      `"${a.sqft}"`,
      `"${a.homeType}"`,
      `"${a.priorities.join('; ')}"`,
      `"${a.preferredDate}"`,
      `"${a.preferredTime}"`,
      `"${a.status}"`,
      `"${a.technicianAssigned || 'Sin asignar'}"`,
      `"${(a.notes || '').replace(/"/g, '""')}"`
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `premier_schedule_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    showToast('Exportación de citas CSV descargada');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const content = ev.target?.result as string;
      if (content) {
        const ok = importConfigFromJson(content);
        if (ok) {
          showToast('Configuración importada exitosamente');
        } else {
          alert('El archivo JSON no tiene el formato válido del CMS.');
        }
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className={pageMode ? "min-h-screen w-full bg-slate-100" : "fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"}>
      <div className={pageMode ? "bg-white shadow-2xl border border-slate-200 w-full h-screen flex flex-col overflow-hidden" : "bg-white rounded-3xl shadow-2xl border border-slate-700 w-full max-w-6xl h-[94vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"}>

        {/* Header Bar */}
        <div className="bg-[#0b1c2d] text-white px-6 py-4 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-md">
              <Settings className="w-6 h-6 animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-black text-white tracking-tight">
                  {t('Panel Administrador CMS', 'CMS Admin Dashboard')}
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 uppercase">
                  {t('MODO EN VIVO', 'LIVE MODE')}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Language Switcher Button Group */}
            <div className="flex items-center bg-slate-800/90 rounded-xl p-0.5 border border-slate-700 mr-1">
              <button
                type="button"
                onClick={() => {
                  toggleLang('es');
                  showToast('Idioma cambiado a Español');
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  adminLang === 'es'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Cambiar idioma a Español"
              >
                <span>🇪🇸</span>
                <span className="hidden sm:inline">ES</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  toggleLang('en');
                  showToast('Language switched to English');
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  adminLang === 'en'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Switch language to English"
              >
                <span>🇺🇸</span>
                <span className="hidden sm:inline">EN</span>
              </button>
            </div>

            <button
              onClick={exportConfigAsJson}
              title={t('Descargar Backup JSON', 'Download JSON Backup')}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t('Exportar', 'Export')}</span>
            </button>
            <button
              onClick={() => {
                showToast(t('Cambios guardados en vivo', 'Live changes saved'));
                onClose();
              }}
              className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm flex items-center gap-1.5 cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{t('Ver Web', 'View Site')}</span>
            </button>
            <button
              onClick={onClose}
              title={t('Cerrar', 'Close')}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Save Toast Notification */}
        {saveToast && (
          <div className="bg-emerald-600 text-white text-xs font-bold px-4 py-2 text-center flex items-center justify-center gap-2 animate-in slide-in-from-top-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{saveToast}</span>
          </div>
        )}

        {/* Main Body with Sidebar Tabs and Content Panel */}
        <div ref={adminBodyRef} className="flex-1 flex overflow-hidden">

          {/* Sidebar Tabs */}
          <div className="w-56 sm:w-64 bg-slate-900 border-r border-slate-800 p-3 space-y-1 overflow-y-auto shrink-0 text-slate-300">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 py-2 flex items-center justify-between">
              <span>{t('Módulos del CMS', 'CMS Modules')}</span>
              <span className="text-[9px] font-black text-emerald-400 bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-800 uppercase">
                {adminLang.toUpperCase()}
              </span>
            </div>

            {[
              { id: 'styles', label: t('1. Estilos y Colores', '1. Styles & Colors'), icon: Palette },
              { id: 'logo', label: t('2. Logo e Identidad', '2. Logo & Branding'), icon: Sparkles },
              { id: 'pages', label: t('3. Páginas CMS', '3. CMS Pages'), icon: FileText },
              { id: 'sections', label: t('4. Secciones de Inicio', '4. Homepage Sections'), icon: Layout },
              { id: 'header', label: t('5. Header y Menús', '5. Header & Menus'), icon: Menu },
              { id: 'slider', label: t('6. Slider Principal', '6. Hero Slider'), icon: Sliders },
              { id: 'content', label: t('7. Textos Globales', '7. Global Content'), icon: FileText },
              { id: 'faqs', label: t('8. Preguntas FAQ', '8. FAQ Items'), icon: HelpCircle },
              { id: 'pricing', label: t('9. Tarjetas de Precios', '9. Pricing Plans'), icon: DollarSign },
              { id: 'calculator', label: t('10. Calculadora Estimadora', '10. Cost Estimator'), icon: Calculator },
              { id: 'service-areas', label: t('11. Zonas & Dispatch Regional', '11. Service Areas & Dispatch'), icon: MapPin },
              { id: 'gallery', label: t('12. Galería', '12. Project Gallery'), icon: Images },
              { id: 'clients', label: t('13. Clientes', '13. Client CRM'), icon: UserCheck, badge: config.clients.length },
              { id: 'schedule', label: t('14. Citas Schedule', '14. Schedule Bookings'), icon: Calendar, badge: config.appointments.filter(a => a.status === 'pending').length },
              { id: 'schedule-config', label: t('15. Config Modal Schedule', '15. Configure Schedule Modal'), icon: Settings },
              { id: 'footer', label: t('16. Footer y Contacto', '16. Footer & Contact'), icon: Layout },
              { id: 'usuario', label: t('17. Usuario Admin', '17. Admin User & Password'), icon: User },
              { id: 'whatsapp', label: t('18. WhatsApp', '18. WhatsApp Widget'), icon: MessageCircle },
              { id: 'backup', label: t('19. Backup', '19. Backup & Restore'), icon: RotateCcw }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${isActive
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'hover:bg-slate-800 text-slate-300'
                    }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span className="truncate">{tab.label}</span>
                  </div>
                  {tab.badge !== undefined && tab.badge > 0 && (
                    <span className="px-1.5 py-0.2 rounded-full text-[10px] font-black bg-amber-500 text-slate-950 shrink-0">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}

            <div className="pt-6 border-t border-slate-800 mt-4 px-2 space-y-2">
              <div className="text-[11px] text-slate-400">
                {t('Estado:', 'Status:')} <span className="text-emerald-400 font-bold">{t('Auto-guardado activo', 'Auto-save active')}</span>
              </div>
              <p className="text-[10px] text-slate-400 leading-tight">
                {t('Cada cambio modifica la web inmediatamente y se almacena en el navegador.', 'Every change immediately updates the live website and persists in the browser.')}
              </p>
            </div>
          </div>

          {/* Right Content Scrollable Area */}
          <div className="flex-1 bg-slate-50 p-6 overflow-y-auto">

            {/* ================= TAB 1: ESTILOS Y TEMAS ================= */}
            {activeTab === 'styles' && (
              <div className="space-y-6 max-w-3xl">
                <div>
                  <h4 className="text-lg font-black text-[#0f2942]">Diseño Global y Paleta de Colores</h4>
                  <p className="text-xs text-slate-500">Personaliza la identidad visual, tipografía y estilo de botones de toda la plataforma.</p>
                </div>

                {/* Primary Color Presets */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                  <label className="text-xs font-bold text-slate-800 block">Color Primario de Marca (Acentos, Botones y Checkmarks)</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {colorPresets.map(preset => (
                      <button
                        key={preset.name}
                        onClick={() => {
                          updateTheme({
                            primaryColor: preset.hex,
                            primaryColorName: preset.name as any,
                            secondaryColorHex: preset.darkHex
                          });
                          showToast(`Tema cambiado a ${preset.label}`);
                        }}
                        className={`p-3 rounded-xl border text-left flex items-center gap-3 cursor-pointer transition-all ${config.theme.primaryColor === preset.hex
                          ? 'border-emerald-500 ring-2 ring-emerald-500/20 bg-emerald-50/40'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                          }`}
                      >
                        <div
                          className="w-7 h-7 rounded-lg shadow-xs shrink-0"
                          style={{ backgroundColor: preset.hex }}
                        />
                        <div>
                          <div className="text-xs font-bold text-slate-900 leading-tight">{preset.label}</div>
                          <div className="text-[10px] text-slate-400">{preset.hex}</div>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Custom Hex input */}
                  <div className="pt-2 flex items-center gap-3">
                    <label className="text-xs font-semibold text-slate-700">Hexadecimal Personalizado:</label>
                    <input
                      type="color"
                      value={config.theme.primaryColor}
                      onChange={(e) => updateTheme({ primaryColor: e.target.value })}
                      className="w-10 h-8 rounded-lg cursor-pointer border border-slate-300"
                    />
                    <input
                      type="text"
                      value={config.theme.primaryColor}
                      onChange={(e) => updateTheme({ primaryColor: e.target.value })}
                      placeholder="#059669"
                      className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-mono w-28 uppercase"
                    />
                  </div>
                </div>

                {/* Typography Settings */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                  <label className="text-xs font-bold text-slate-800 block">Tipografía Principal del Sitio</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {fontOptions.map(f => (
                      <button
                        key={f}
                        onClick={() => {
                          updateTheme({ fontFamily: f as any });
                          showToast(`Fuente cambiada a ${f}`);
                        }}
                        className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${config.theme.fontFamily === f
                          ? 'border-emerald-500 ring-2 ring-emerald-500/20 bg-emerald-50/40'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                          }`}
                      >
                        <div className="text-sm font-bold text-slate-900" style={{ fontFamily: f }}>{f}</div>
                        <div className="text-[10px] text-slate-400 mt-1">Aa Bb Gg 123</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                  <label className="text-xs font-bold text-slate-800 block">Colores del Menú Principal</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                      <label className="text-[11px] font-bold text-slate-700 block">Color del texto del menú</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={config.theme.navTextColor || '#0f2942'}
                          onChange={(e) => updateTheme({ navTextColor: e.target.value })}
                          className="w-10 h-8 rounded-lg border border-slate-300 cursor-pointer"
                        />
                        <input
                          type="text"
                          value={config.theme.navTextColor || '#0f2942'}
                          onChange={(e) => updateTheme({ navTextColor: e.target.value })}
                          className="w-full p-2 text-xs rounded-xl border border-slate-300"
                        />
                      </div>
                    </div>

                    <div className="p-3 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                      <label className="text-[11px] font-bold text-slate-700 block">Color hover / subrayado del menú</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={config.theme.navTextHoverColor || '#0f2942'}
                          onChange={(e) => updateTheme({ navTextHoverColor: e.target.value })}
                          className="w-10 h-8 rounded-lg border border-slate-300 cursor-pointer"
                        />
                        <input
                          type="text"
                          value={config.theme.navTextHoverColor || '#0f2942'}
                          onChange={(e) => updateTheme({ navTextHoverColor: e.target.value })}
                          className="w-full p-2 text-xs rounded-xl border border-slate-300"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Border Radius & Button Style */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
                    <label className="text-xs font-bold text-slate-800 block">Bordes de Contenedores y Tarjetas</label>
                    <select
                      value={config.theme.borderRadius}
                      onChange={(e) => updateTheme({ borderRadius: e.target.value as any })}
                      className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-medium bg-white"
                    >
                      <option value="rounded-2xl">Moderno Redondeado (rounded-2xl - Recomendado)</option>
                      <option value="rounded-3xl">Ultra Redondeado (rounded-3xl)</option>
                      <option value="rounded-xl">Estándar (rounded-xl)</option>
                      <option value="rounded-none">Esquinas Rectas / Cuadradas (Sharp)</option>
                    </select>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
                    <label className="text-xs font-bold text-slate-800 block">Estilo de Botones (CTA)</label>
                    <select
                      value={config.theme.buttonStyle}
                      onChange={(e) => updateTheme({ buttonStyle: e.target.value as any })}
                      className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-medium bg-white"
                    >
                      <option value="rounded-xl">Botón Suave (rounded-xl)</option>
                      <option value="rounded-full">Botón Píldora (rounded-full)</option>
                      <option value="rounded-lg">Botón Compacto (rounded-lg)</option>
                      <option value="rounded-none">Botón Recto (rounded-none)</option>
                    </select>
                  </div>
                </div>

                {/* Navbar Appearance */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-slate-900">Encabezado en Modo Oscuro (Dark Navbar)</div>
                    <p className="text-[11px] text-slate-500">Aplica fondo oscuro azul noche al menú de navegación superior.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={config.theme.darkNavbar}
                    onChange={(e) => updateTheme({ darkNavbar: e.target.checked })}
                    className="w-5 h-5 accent-emerald-600 cursor-pointer"
                  />
                </div>

                {/* Explicit Save Button for Styles */}
                <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">Guarda la paleta de colores y estilos en el almacenamiento permanente.</span>
                  <button
                    onClick={() => {
                      saveAndNotify('Estilos y Colores de la Marca');
                      showToast('¡Estilos y colores guardados exitosamente!');
                    }}
                    className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm flex items-center gap-2 cursor-pointer transition-all hover:scale-105"
                  >
                    <Save className="w-4 h-4" />
                    <span>Guardar Estilos y Colores</span>
                  </button>
                </div>

              </div>
            )}

            {/* ================= TAB 2: LOGO E IDENTIDAD ================= */}
            {activeTab === 'logo' && (
              <div className="space-y-6 max-w-3xl">
                <div>
                  <h4 className="text-lg font-black text-[#0f2942]">Logotipo e Identidad de Marca</h4>
                  <p className="text-xs text-slate-500">
                    Sube el logotipo de tu empresa desde tu computadora o especifica una URL directa. Controla cómo se visualiza en la cabecera y el pie de página.
                  </p>
                </div>

                {/* Live Preview of Logo */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">Vista Previa en Vivo del Logotipo</span>
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Header & Footer</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Light Background Preview */}
                    <div className="p-6 rounded-xl bg-slate-100 border border-slate-200 flex flex-col items-center justify-center min-h-[120px] text-center">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Fondo Claro (Light)</div>
                      <div className="flex items-center gap-3">
                        {config.header.branding.logoDisplayMode !== 'text' && config.header.branding.customLogoUrl ? (
                          <img
                            src={config.header.branding.customLogoUrl}
                            alt="Logo preview"
                            style={{ height: `${config.header.branding.logoHeight || 36}px` }}
                            className="w-auto object-contain max-w-[180px]"
                          />
                        ) : (
                          <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-black text-base shadow-sm">
                            P
                          </div>
                        )}
                        {config.header.branding.logoDisplayMode !== 'image' && (
                          <div className="text-left">
                            <div className="text-sm font-black text-[#0f2942] tracking-tight leading-tight">
                              {config.header.branding.title}
                            </div>
                            <div className="text-[9px] font-bold text-emerald-600 tracking-wider">
                              {config.header.branding.subtitle}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Dark Background Preview */}
                    <div className="p-6 rounded-xl bg-[#0f2942] border border-slate-700 flex flex-col items-center justify-center min-h-[120px] text-center">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Fondo Oscuro (Dark)</div>
                      <div className="flex items-center gap-3">
                        {config.header.branding.logoDisplayMode !== 'text' && config.header.branding.customLogoUrl ? (
                          <img
                            src={config.header.branding.customLogoUrl}
                            alt="Logo preview dark"
                            style={{ height: `${config.header.branding.logoHeight || 36}px` }}
                            className="w-auto object-contain max-w-[180px]"
                          />
                        ) : (
                          <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center text-white font-black text-base shadow-sm">
                            P
                          </div>
                        )}
                        {config.header.branding.logoDisplayMode !== 'image' && (
                          <div className="text-left">
                            <div className="text-sm font-black text-white tracking-tight leading-tight">
                              {config.header.branding.title}
                            </div>
                            <div className="text-[9px] font-bold text-emerald-400 tracking-wider">
                              {config.header.branding.subtitle}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Upload or Direct URL */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                  <label className="text-xs font-bold text-slate-800 block">Subir Archivo de Logotipo</label>

                  <div className="flex flex-col sm:flex-row items-center gap-4 p-4 border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-2xl bg-slate-50 transition-colors">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
                      <Upload className="w-6 h-6" />
                    </div>
                    <div className="flex-1 text-center sm:text-left">
                      <div className="text-xs font-bold text-slate-800">Selecciona una imagen de tu dispositivo (PNG, SVG, JPG, WebP)</div>
                      <div className="text-[11px] text-slate-500">Tamaño recomendado: altura de 80 a 160px con fondo transparente</div>
                    </div>
                    <label className="px-4 py-2 rounded-xl bg-[#0f2942] hover:bg-[#184065] text-white font-bold text-xs shadow-sm cursor-pointer flex items-center gap-1.5 shrink-0 transition-colors">
                      <Upload className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Examinar Archivo</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoFileUpload}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {/* Or Direct Image URL */}
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">O especifica una URL directa de imagen:</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={config.header.branding.customLogoUrl || ''}
                        onChange={(e) => updateHeader({
                          branding: {
                            ...config.header.branding,
                            customLogoUrl: e.target.value,
                            logoDisplayMode: config.header.branding.logoDisplayMode === 'text' && e.target.value ? 'both' : config.header.branding.logoDisplayMode
                          }
                        })}
                        placeholder="https://ejemplo.com/logo-empresa.png"
                        className="flex-1 p-2.5 text-xs rounded-xl border border-slate-300 font-mono"
                      />
                      {config.header.branding.customLogoUrl && (
                        <button
                          onClick={() => {
                            updateHeader({
                              branding: {
                                ...config.header.branding,
                                customLogoUrl: '',
                                logoDisplayMode: 'text'
                              }
                            });
                            showToast('Logotipo removido');
                          }}
                          className="px-3 py-2 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 text-xs font-bold cursor-pointer flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Quitar</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Display Mode Selector */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
                  <label className="text-xs font-bold text-slate-800 block">Modo de Visualización del Logo</label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: 'both', label: 'Ambos (Logo + Texto)', desc: 'Muestra imagen del logo y nombre de la marca' },
                      { id: 'image', label: 'Solo Imagen de Logo', desc: 'Muestra únicamente la imagen gráfica' },
                      { id: 'text', label: 'Solo Texto Tipográfico', desc: 'Muestra monograma tipográfico y título' }
                    ].map(mode => (
                      <button
                        key={mode.id}
                        onClick={() => updateHeader({
                          branding: { ...config.header.branding, logoDisplayMode: mode.id as any }
                        })}
                        className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${config.header.branding.logoDisplayMode === mode.id
                          ? 'border-emerald-500 ring-2 ring-emerald-500/20 bg-emerald-50/40'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                          }`}
                      >
                        <div className="text-xs font-bold text-slate-900">{mode.label}</div>
                        <div className="text-[10px] text-slate-500 mt-0.5">{mode.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Brand Texts & Size */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">Nombre Principal de la Empresa:</label>
                      <input
                        type="text"
                        value={config.header.branding.title}
                        onChange={(e) => updateHeader({
                          branding: { ...config.header.branding, title: e.target.value }
                        })}
                        className="w-full p-2.5 text-xs rounded-xl border border-slate-300 font-bold text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">Subtítulo / Lema (Tagline):</label>
                      <input
                        type="text"
                        value={config.header.branding.subtitle}
                        onChange={(e) => updateHeader({
                          branding: { ...config.header.branding, subtitle: e.target.value }
                        })}
                        className="w-full p-2.5 text-xs rounded-xl border border-slate-300 font-bold text-slate-700"
                      />
                    </div>
                  </div>

                  {/* Logo Max Height Slider */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-[11px] font-bold text-slate-700">Altura Máxima del Logo en Header:</label>
                      <span className="text-xs font-mono font-bold text-emerald-600">{config.header.branding.logoHeight || 36}px</span>
                    </div>
                    <input
                      type="range"
                      min="24"
                      max="72"
                      step="2"
                      value={config.header.branding.logoHeight || 36}
                      onChange={(e) => updateHeader({
                        branding: { ...config.header.branding, logoHeight: parseInt(e.target.value) }
                      })}
                      className="w-full accent-emerald-600 cursor-pointer"
                    />
                  </div>
                </div>

                {/* Explicit Save Button for Logo */}
                <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">Guarda permanentemente el logo y la identidad de marca.</span>
                  <button
                    onClick={() => {
                      saveAndNotify('Logotipo e Identidad');
                      showToast('¡Logotipo e identidad guardados exitosamente!');
                    }}
                    className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm flex items-center gap-2 cursor-pointer transition-all hover:scale-105"
                  >
                    <Save className="w-4 h-4" />
                    <span>Guardar Logo e Identidad</span>
                  </button>
                </div>
              </div>
            )}

            {/* ================= TAB 3: GESTION DE SECCIONES DE LA PAGINA ================= */}
            {activeTab === 'sections' && (
              <div className="space-y-6 max-w-4xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h4 className="text-lg font-black text-[#0f2942]">Gestión de Secciones de la Página Web</h4>
                    <p className="text-xs text-slate-500">
                      Administra el orden, visibilidad y contenido de cada sección de la página. Puedes activar, ocultar, reordenar y crear nuevas secciones personalizadas.
                    </p>
                  </div>
                  <button
                    onClick={() => setNewSectionModal(true)}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm cursor-pointer whitespace-nowrap transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Crear Sección Personalizada</span>
                  </button>
                </div>

                {/* Stats Summary */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs">
                    <div className="text-[11px] font-bold uppercase text-slate-500">Total Secciones</div>
                    <div className="text-xl font-black text-slate-900 mt-0.5">{config.sections.length}</div>
                  </div>
                  <div className="bg-emerald-50/70 p-3.5 rounded-2xl border border-emerald-200 shadow-2xs">
                    <div className="text-[11px] font-bold uppercase text-emerald-800">Activas (Visibles)</div>
                    <div className="text-xl font-black text-emerald-900 mt-0.5">
                      {config.sections.filter(s => s.enabled).length}
                    </div>
                  </div>
                  <div className="bg-slate-100 p-3.5 rounded-2xl border border-slate-200 shadow-2xs">
                    <div className="text-[11px] font-bold uppercase text-slate-500">Ocultas</div>
                    <div className="text-xl font-black text-slate-600 mt-0.5">
                      {config.sections.filter(s => !s.enabled).length}
                    </div>
                  </div>
                </div>

                {/* Sections Interactive List */}
                <div className="space-y-3">
                  {config.sections.map((section, idx) => {
                    const isExpanded = editingSectionId === section.id;
                    return (
                      <div
                        key={section.id}
                        className={`rounded-2xl border transition-all ${section.enabled
                          ? 'bg-white border-slate-200 shadow-2xs'
                          : 'bg-slate-100/80 border-slate-300 opacity-75'
                          }`}
                      >
                        {/* Section Header Row */}
                        <div className="p-4 flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            {/* Order Index and Drag Controls */}
                            <div className="flex flex-col items-center gap-0.5 shrink-0">
                              <button
                                disabled={idx === 0}
                                onClick={() => handleMoveSectionUp(idx)}
                                className={`p-1 rounded-md ${idx === 0 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:bg-slate-100 cursor-pointer'}`}
                                title="Mover arriba"
                              >
                                <ArrowUp className="w-3.5 h-3.5" />
                              </button>
                              <span className="font-mono text-[10px] font-bold text-slate-400">{idx + 1}</span>
                              <button
                                disabled={idx === config.sections.length - 1}
                                onClick={() => handleMoveSectionDown(idx)}
                                className={`p-1 rounded-md ${idx === config.sections.length - 1 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:bg-slate-100 cursor-pointer'}`}
                                title="Mover abajo"
                              >
                                <ArrowDown className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            {/* Section Title & Info */}
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="font-bold text-sm text-[#0f2942] truncate">
                                  {section.title}
                                </span>
                                {section.badge && (
                                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300">
                                    {section.badge}
                                  </span>
                                )}
                                <span className="text-[10px] font-mono text-slate-400">
                                  #{section.id}
                                </span>
                              </div>
                              {section.subtitle && (
                                <p className="text-xs text-slate-500 truncate mt-0.5">
                                  {section.subtitle}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Toggle & Action Controls */}
                          <div className="flex items-center gap-2 shrink-0">
                            {/* Visibility Switch */}
                            <label className="flex items-center gap-1.5 text-xs font-bold cursor-pointer">
                              <input
                                type="checkbox"
                                checked={section.enabled}
                                onChange={() => {
                                  toggleSection(section.id);
                                  showToast(`Sección "${section.title}" ${section.enabled ? 'ocultada' : 'activada'}`);
                                }}
                                className="w-4 h-4 accent-emerald-600 cursor-pointer"
                              />
                              <span className={`text-[11px] font-semibold hidden sm:inline ${section.enabled ? 'text-emerald-700' : 'text-slate-400'}`}>
                                {section.enabled ? 'Visible' : 'Oculta'}
                              </span>
                            </label>

                            {/* Edit Content Toggle */}
                            <button
                              onClick={() => setEditingSectionId(isExpanded ? null : section.id)}
                              className={`p-1.5 rounded-xl border text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors ${isExpanded
                                ? 'bg-[#0f2942] text-white border-[#0f2942]'
                                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                                }`}
                              title="Editar detalles de esta sección"
                            >
                              <Edit className="w-3.5 h-3.5" />
                              <span className="text-[11px] hidden sm:inline">{isExpanded ? 'Cerrar' : 'Editar'}</span>
                            </button>

                            {/* Delete section */}
                            <button
                              onClick={() => {
                                if (confirm(`¿Eliminar la sección "${section.title}"?`)) {
                                  deleteSection(section.id);
                                  showToast('Sección eliminada');
                                }
                              }}
                              className="p-1.5 rounded-xl text-red-500 hover:bg-red-50 border border-transparent hover:border-red-200 cursor-pointer"
                              title="Eliminar sección"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Expanded Edit Form */}
                        {isExpanded && (
                          <div className="p-4 border-t border-slate-200 bg-slate-50/70 space-y-3">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <label className="text-[11px] font-bold text-slate-700 block mb-1">Título de la Sección:</label>
                                <input
                                  type="text"
                                  value={section.title}
                                  onChange={(e) => updateSingleSection(section.id, { title: e.target.value })}
                                  className="w-full p-2 text-xs rounded-xl border border-slate-300 bg-white font-bold text-slate-900"
                                />
                              </div>
                              <div>
                                <label className="text-[11px] font-bold text-slate-700 block mb-1">Insignia / Badge Superior:</label>
                                <input
                                  type="text"
                                  value={section.badge || ''}
                                  onChange={(e) => updateSingleSection(section.id, { badge: e.target.value })}
                                  placeholder="e.g. Mantenimiento Preventivo"
                                  className="w-full p-2 text-xs rounded-xl border border-slate-300 bg-white"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="text-[11px] font-bold text-slate-700 block mb-1">Subtítulo Descriptivo:</label>
                              <input
                                type="text"
                                value={section.subtitle || ''}
                                onChange={(e) => updateSingleSection(section.id, { subtitle: e.target.value })}
                                className="w-full p-2 text-xs rounded-xl border border-slate-300 bg-white"
                              />
                            </div>

                            <div>
                              <label className="text-[11px] font-bold text-slate-700 block mb-1">Contenido de Texto / Cuerpo:</label>
                              <textarea
                                rows={3}
                                value={section.content || ''}
                                onChange={(e) => updateSingleSection(section.id, { content: e.target.value })}
                                placeholder="Escribe aquí el texto detallado que se mostrará en esta sección..."
                                className="w-full p-2 text-xs rounded-xl border border-slate-300 bg-white leading-relaxed"
                              />
                            </div>

                            <div>
                              <label className="text-[11px] font-bold text-slate-700 block mb-1">URL de Imagen Ilustrativa (Opcional):</label>
                              <input
                                type="text"
                                value={section.imageUrl || ''}
                                onChange={(e) => updateSingleSection(section.id, { imageUrl: e.target.value })}
                                placeholder="https://images.unsplash.com/..."
                                className="w-full p-2 text-xs rounded-xl border border-slate-300 bg-white font-mono text-[11px]"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Explicit Save Button for Sections */}
                <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">Guarda permanentemente el orden y las modificaciones de secciones.</span>
                  <button
                    onClick={() => {
                      saveAndNotify('Secciones de la Página');
                      showToast('¡Secciones y orden guardados exitosamente!');
                    }}
                    className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm flex items-center gap-2 cursor-pointer transition-all hover:scale-105"
                  >
                    <Save className="w-4 h-4" />
                    <span>Guardar Secciones de la Página</span>
                  </button>
                </div>
              </div>
            )}

            {/* ================= TAB 4: HEADER Y MENUS ================= */}
            {activeTab === 'header' && (
              <div className="space-y-6 max-w-3xl">
                <div>
                  <h4 className="text-lg font-black text-[#0f2942]">Configuración de Header y Menús</h4>
                  <p className="text-xs text-slate-500">Modifica el aviso superior, enlaces de navegación, teléfonos de emergencia y botones de acción.</p>
                </div>

                {/* Top Announcement Bar */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">Barra de Avisos Superior (Top Announcement Bar)</span>
                    <input
                      type="checkbox"
                      checked={config.header.topBar.enabled}
                      onChange={(e) => updateHeader({
                        topBar: { ...config.header.topBar, enabled: e.target.checked }
                      })}
                      className="w-4 h-4 accent-emerald-600"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">Texto del Badge:</label>
                      <input
                        type="text"
                        value={config.header.topBar.badgeText}
                        onChange={(e) => updateHeader({
                          topBar: { ...config.header.topBar, badgeText: e.target.value }
                        })}
                        className="w-full p-2 text-xs rounded-xl border border-slate-300 font-bold"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">Texto de Regiones:</label>
                      <input
                        type="text"
                        value={config.header.topBar.regionsText}
                        onChange={(e) => updateHeader({
                          topBar: { ...config.header.topBar, regionsText: e.target.value }
                        })}
                        className="w-full p-2 text-xs rounded-xl border border-slate-300 font-bold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">Puntuación:</label>
                      <input
                        type="text"
                        value={config.header.topBar.ratingScore}
                        onChange={(e) => updateHeader({
                          topBar: { ...config.header.topBar, ratingScore: e.target.value }
                        })}
                        className="w-full p-2 text-xs rounded-xl border border-slate-300 font-bold"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">Texto de Reseñas:</label>
                      <input
                        type="text"
                        value={config.header.topBar.ratingReviewsCount}
                        onChange={(e) => updateHeader({
                          topBar: { ...config.header.topBar, ratingReviewsCount: e.target.value }
                        })}
                        className="w-full p-2 text-xs rounded-xl border border-slate-300 font-bold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl border border-slate-200 bg-slate-50">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <div className="text-xs font-bold text-slate-900">Header transparente</div>
                          <div className="text-[10px] text-slate-500">Se ve limpio al inicio</div>
                        </div>
                        <input
                          type="checkbox"
                          checked={config.header.transparentHeader}
                          onChange={(e) => updateHeader({ transparentHeader: e.target.checked })}
                          className="w-4 h-4 accent-emerald-600"
                        />
                      </div>
                    </div>

                    <div className="p-3 rounded-xl border border-slate-200 bg-slate-50">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <div className="text-xs font-bold text-slate-900">Header pegajoso</div>
                          <div className="text-[10px] text-slate-500">Se mantiene visible al scroll</div>
                        </div>
                        <input
                          type="checkbox"
                          checked={config.header.stickyHeader}
                          onChange={(e) => updateHeader({ stickyHeader: e.target.checked })}
                          className="w-4 h-4 accent-emerald-600"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">Color del header:</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={config.header.scrolledHeaderBgColor || '#0f2942'}
                        onChange={(e) => updateHeader({ scrolledHeaderBgColor: e.target.value })}
                        className="w-12 h-10 rounded-lg border border-slate-300 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={config.header.scrolledHeaderBgColor || '#0f2942'}
                        onChange={(e) => updateHeader({ scrolledHeaderBgColor: e.target.value })}
                        className="w-full p-2 text-xs rounded-xl border border-slate-300"
                      />
                    </div>
                  </div>

                  <div className="pt-1">
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">Transparencia del header (sin degradado):</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="range"
                        min={0}
                        max={100}
                        step={5}
                        value={config.header.headerTransparency ?? 80}
                        onChange={(e) => updateHeader({ headerTransparency: Number(e.target.value) })}
                        className="flex-1 accent-emerald-600"
                      />
                      <div className="w-16 rounded-xl border border-slate-300 bg-slate-50 px-2 py-1.5 text-center text-[11px] font-bold text-slate-700">
                        {config.header.headerTransparency ?? 80}%
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
                  <span className="text-xs font-bold text-slate-900 block">Logotipo y Marca</span>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">Nombre Principal:</label>
                      <input
                        type="text"
                        value={config.header.branding.title}
                        onChange={(e) => updateHeader({
                          branding: { ...config.header.branding, title: e.target.value }
                        })}
                        className="w-full p-2 text-xs rounded-xl border border-slate-300 font-bold"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">Subtítulo / Tagline:</label>
                      <input
                        type="text"
                        value={config.header.branding.subtitle}
                        onChange={(e) => updateHeader({
                          branding: { ...config.header.branding, subtitle: e.target.value }
                        })}
                        className="w-full p-2 text-xs rounded-xl border border-slate-300 font-bold"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">Elementos del Menú Principal</span>
                      <p className="text-[11px] text-slate-500">Agrega, edita o desactiva enlaces de navegación.</p>
                    </div>
                    <button
                      onClick={handleAddNavItem}
                      className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Agregar Enlace</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-slate-900">Botón de Panel CMS</div>
                        <div className="text-[10px] text-slate-500">Mostrar/ocultar acceso al admin</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={config.header.showAdminButton}
                        onChange={(e) => updateHeader({ showAdminButton: e.target.checked })}
                        className="w-4 h-4 accent-emerald-600"
                      />
                    </div>

                    <div className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-slate-900">Botón Schedule / Walkthrough</div>
                        <div className="text-[10px] text-slate-500">Mostrar u ocultar CTA principal</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={config.header.showScheduleButton}
                        onChange={(e) => updateHeader({ showScheduleButton: e.target.checked })}
                        className="w-4 h-4 accent-emerald-600"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    {config.header.navItems.map((nav, idx) => (
                      <div key={nav.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3 text-xs">
                        <div className="flex items-center gap-2 flex-1">
                          <span className="w-5 text-slate-400 font-mono font-bold text-[10px]">{idx + 1}.</span>
                          <input
                            type="text"
                            value={nav.label}
                            onChange={(e) => handleUpdateNavItem(nav.id, { label: e.target.value })}
                            className="p-1.5 rounded-lg border border-slate-300 bg-white font-semibold text-slate-800 flex-1 max-w-[180px]"
                          />
                          <span className="text-slate-400 font-mono">→</span>
                          <input
                            type="text"
                            value={nav.sectionId}
                            onChange={(e) => handleUpdateNavItem(nav.id, { sectionId: e.target.value })}
                            placeholder="ID Sección (e.g. pricing)"
                            className="p-1.5 rounded-lg border border-slate-300 bg-white font-mono text-[11px] text-slate-600 flex-1 max-w-[180px]"
                          />
                        </div>

                        <div className="flex items-center gap-2">
                          <label className="flex items-center gap-1 text-[11px] font-medium text-slate-600 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={nav.enabled}
                              onChange={(e) => handleUpdateNavItem(nav.id, { enabled: e.target.checked })}
                              className="w-3.5 h-3.5 accent-emerald-600"
                            />
                            <span>Visible</span>
                          </label>
                          <button
                            onClick={() => handleDeleteNavItem(nav.id)}
                            className="p-1 text-red-500 hover:bg-red-50 rounded-md cursor-pointer"
                            title="Eliminar"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>


                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                  <span className="text-xs font-bold text-slate-900 block">Botones de Acción del Header (CTA)</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                      <label className="text-xs font-bold text-slate-800 block">Botón Principal (Verde)</label>
                      <input
                        type="text"
                        value={config.header.ctaButtons.primaryText}
                        onChange={(e) => updateHeader({
                          ctaButtons: { ...config.header.ctaButtons, primaryText: e.target.value }
                        })}
                        className="w-full p-2 text-xs rounded-lg border border-slate-300 bg-white"
                      />
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                      <label className="text-xs font-bold text-slate-800 block">Botón Secundario (Portal)</label>
                      <input
                        type="text"
                        value={config.header.ctaButtons.secondaryText}
                        onChange={(e) => updateHeader({
                          ctaButtons: { ...config.header.ctaButtons, secondaryText: e.target.value }
                        })}
                        className="w-full p-2 text-xs rounded-lg border border-slate-300 bg-white"
                      />
                    </div>
                  </div>
                </div>


                <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">Guarda permanentemente el header, avisos y enlaces de menú.</span>
                  <button
                    onClick={() => {
                      saveAndNotify('Header y Menús');
                      showToast('¡Header y menús guardados exitosamente!');
                    }}
                    className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm flex items-center gap-2 cursor-pointer transition-all hover:scale-105"
                  >
                    <Save className="w-4 h-4" />
                    <span>Guardar Header y Menús</span>
                  </button>
                </div>
              </div>
            )}

            {/* ================= TAB 3: SLIDER DE VIDEOS E IMAGENES ================= */}
            {activeTab === 'slider' && (
              <div className="space-y-6 max-w-4xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h4 className="text-lg font-black text-[#0f2942]">Carrusel y Slider Multimedia</h4>
                    <p className="text-xs text-slate-500">Configura diapositivas con fondos de video o fotografía de alta resolución, textos y botones interactivos.</p>
                  </div>
                  <button
                    onClick={handleAddSlide}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm cursor-pointer whitespace-nowrap"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Añadir Diapositiva</span>
                  </button>
                </div>

                {/* Slider Global Options */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <div>
                      <div className="text-xs font-bold text-slate-800">Modo Slider Activo</div>
                      <div className="text-[10px] text-slate-500">Muestra carrusel interactivo</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={config.slider.sliderMode}
                      onChange={(e) => updateSlider({ sliderMode: e.target.checked })}
                      className="w-4 h-4 accent-emerald-600"
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <div>
                      <div className="text-xs font-bold text-slate-800">Reproducción Automática</div>
                      <div className="text-[10px] text-slate-500">Cambia slides solo</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={config.slider.autoplay}
                      onChange={(e) => updateSlider({ autoplay: e.target.checked })}
                      className="w-4 h-4 accent-emerald-600"
                    />
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                    <div className="flex justify-between text-xs font-bold text-slate-800">
                      <span>Intervalo de Tiempo:</span>
                      <span className="text-emerald-700">{config.slider.autoplayInterval} seg</span>
                    </div>
                    <input
                      type="range"
                      min={3}
                      max={15}
                      value={config.slider.autoplayInterval}
                      onChange={(e) => updateSlider({ autoplayInterval: Number(e.target.value) })}
                      className="w-full accent-emerald-600"
                    />
                  </div>
                </div>

                {/* Slides List */}
                <div className="space-y-4">
                  {config.slider.slides.map((slide, idx) => (
                    <div key={slide.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-4">

                      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-lg bg-[#0f2942] text-white flex items-center justify-center font-bold text-xs">
                            {idx + 1}
                          </span>
                          <span className="font-bold text-sm text-slate-900">{slide.title} {slide.titleHighlight}</span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${slide.type === 'video' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                            }`}>
                            {slide.type.toUpperCase()}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <label className="flex items-center gap-1 text-xs font-semibold text-slate-600 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={slide.enabled}
                              onChange={(e) => handleUpdateSlide(slide.id, { enabled: e.target.checked })}
                              className="w-3.5 h-3.5 accent-emerald-600"
                            />
                            <span>Habilitada</span>
                          </label>
                          <button
                            onClick={() => handleDeleteSlide(slide.id)}
                            className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg cursor-pointer"
                            title="Eliminar Slide"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Slide Media & Type */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="text-[11px] font-bold text-slate-700 block mb-1">Tipo de Fondo:</label>
                          <select
                            value={slide.type}
                            onChange={(e) => handleUpdateSlide(slide.id, { type: e.target.value as any })}
                            className="w-full p-2 text-xs rounded-xl border border-slate-300 bg-white"
                          >
                            <option value="image">Fotografía (Imagen Alta Resolución)</option>
                            <option value="video">Video (MP4 directo o link)</option>
                          </select>
                        </div>

                        <div className="sm:col-span-2">
                          <label className="text-[11px] font-bold text-slate-700 block mb-1">URL de la Imagen o Video:</label>
                          <input
                            type="text"
                            value={slide.mediaUrl}
                            onChange={(e) => handleUpdateSlide(slide.id, { mediaUrl: e.target.value })}
                            placeholder="https://images.unsplash.com/... o enlace MP4"
                            className="w-full p-2 text-xs rounded-xl border border-slate-300"
                          />
                        </div>
                      </div>

                      {/* Slide Copy */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="text-[11px] font-bold text-slate-700 block mb-1">Insignia / Eyebrow:</label>
                          <input
                            type="text"
                            value={slide.eyebrow}
                            onChange={(e) => handleUpdateSlide(slide.id, { eyebrow: e.target.value })}
                            className="w-full p-2 text-xs rounded-xl border border-slate-300"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-bold text-slate-700 block mb-1">Título Principal:</label>
                          <input
                            type="text"
                            value={slide.title}
                            onChange={(e) => handleUpdateSlide(slide.id, { title: e.target.value })}
                            className="w-full p-2 text-xs rounded-xl border border-slate-300 font-bold"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-bold text-slate-700 block mb-1">Palabra Destacada (Color):</label>
                          <input
                            type="text"
                            value={slide.titleHighlight}
                            onChange={(e) => handleUpdateSlide(slide.id, { titleHighlight: e.target.value })}
                            className="w-full p-2 text-xs rounded-xl border border-slate-300 font-bold text-emerald-700"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-slate-700 block mb-1">Descripción / Párrafo:</label>
                        <textarea
                          rows={2}
                          value={slide.description}
                          onChange={(e) => handleUpdateSlide(slide.id, { description: e.target.value })}
                          className="w-full p-2 text-xs rounded-xl border border-slate-300"
                        />
                      </div>

                      {/* Action Buttons on Slide */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                          <label className="text-[11px] font-bold text-slate-700 block mb-1">Botón Principal (Verde):</label>
                          <input
                            type="text"
                            value={slide.primaryBtnText}
                            onChange={(e) => handleUpdateSlide(slide.id, { primaryBtnText: e.target.value })}
                            className="w-full p-2 text-xs rounded-lg border border-slate-300 bg-white"
                          />
                        </div>

                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                          <label className="text-[11px] font-bold text-slate-700 block mb-1">Botón Secundario:</label>
                          <input
                            type="text"
                            value={slide.secondaryBtnText || ''}
                            onChange={(e) => handleUpdateSlide(slide.id, { secondaryBtnText: e.target.value })}
                            className="w-full p-2 text-xs rounded-lg border border-slate-300 bg-white"
                          />
                        </div>
                      </div>

                    </div>
                  ))}
                </div>

                {/* Explicit Save Button for Slider */}
                <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">Guarda permanentemente las diapositivas de imágenes y videos del slider.</span>
                  <button
                    onClick={() => {
                      saveAndNotify('Slider de Imágenes y Videos');
                      showToast('¡Slider y videos guardados exitosamente!');
                    }}
                    className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm flex items-center gap-2 cursor-pointer transition-all hover:scale-105"
                  >
                    <Save className="w-4 h-4" />
                    <span>Guardar Slider y Videos</span>
                  </button>
                </div>

              </div>
            )}

            {/* ================= TAB 4: CONTENIDO DE PAGINAS ================= */}
            {activeTab === 'content' && (
              <div className="space-y-6 max-w-3xl">
                <div>
                  <h4 className="text-lg font-black text-[#0f2942]">Contenido de las Secciones Principales</h4>
                  <p className="text-xs text-slate-500">Edita directamente los títulos, subtítulos y mensajes de cada bloque de la landing page.</p>
                </div>

                {/* Hero Content */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                  <span className="text-xs font-bold text-slate-900 block border-b pb-2">Sección Hero (Cabecera)</span>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">Texto Título 1:</label>
                      <input
                        type="text"
                        value={config.content.hero.headlinePart1}
                        onChange={(e) => updateContent({
                          hero: { ...config.content.hero, headlinePart1: e.target.value }
                        })}
                        className="w-full p-2 text-xs rounded-xl border border-slate-300 font-bold"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">Texto Destacado (Gradiente):</label>
                      <input
                        type="text"
                        value={config.content.hero.headlineHighlight}
                        onChange={(e) => updateContent({
                          hero: { ...config.content.hero, headlineHighlight: e.target.value }
                        })}
                        className="w-full p-2 text-xs rounded-xl border border-slate-300 font-bold text-emerald-700"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">Párrafo Principal:</label>
                    <textarea
                      rows={2}
                      value={config.content.hero.description}
                      onChange={(e) => updateContent({
                        hero: { ...config.content.hero, description: e.target.value }
                      })}
                      className="w-full p-2 text-xs rounded-xl border border-slate-300"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">Placeholder del Buscador de Código Postal:</label>
                    <input
                      type="text"
                      value={config.content.hero.zipPlaceholder}
                      onChange={(e) => updateContent({
                        hero: { ...config.content.hero, zipPlaceholder: e.target.value }
                      })}
                      className="w-full p-2 text-xs rounded-xl border border-slate-300"
                    />
                  </div>

                  {/* Micro Pillars Editor */}
                  <div className="pt-4 border-t border-slate-200">
                    <span className="text-[11px] font-bold text-slate-700 block mb-3">Micro Pilares (Debajo del Hero)</span>
                    <div className="space-y-3">
                      {config.content.hero.microPillars.map((pillar, idx) => (
                        <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2 relative">
                          <button
                            onClick={() => {
                              const newPillars = [...config.content.hero.microPillars];
                              newPillars.splice(idx, 1);
                              updateContent({ hero: { ...config.content.hero, microPillars: newPillars } });
                            }}
                            className="absolute top-2 right-2 p-1 text-red-500 hover:bg-red-50 rounded-lg cursor-pointer"
                            title="Eliminar pilar"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                          <label className="text-[10px] font-bold text-slate-500 uppercase">Pilar {idx + 1}</label>
                          <input
                            type="text"
                            value={pillar.title}
                            onChange={(e) => {
                              const newPillars = [...config.content.hero.microPillars];
                              newPillars[idx] = { ...pillar, title: e.target.value };
                              updateContent({ hero: { ...config.content.hero, microPillars: newPillars } });
                            }}
                            placeholder="Título"
                            className="w-full p-2 text-xs rounded-lg border border-slate-300 bg-white font-bold"
                          />
                          <input
                            type="text"
                            value={pillar.subtitle}
                            onChange={(e) => {
                              const newPillars = [...config.content.hero.microPillars];
                              newPillars[idx] = { ...pillar, subtitle: e.target.value };
                              updateContent({ hero: { ...config.content.hero, microPillars: newPillars } });
                            }}
                            placeholder="Subtítulo"
                            className="w-full p-2 text-xs rounded-lg border border-slate-300 bg-white text-slate-600"
                          />
                        </div>
                      ))}
                      {config.content.hero.microPillars.length < 3 && (
                        <button
                          onClick={() => {
                            const newPillars = [...config.content.hero.microPillars, { title: 'Nuevo Pilar', subtitle: 'Descripción' }];
                            updateContent({ hero: { ...config.content.hero, microPillars: newPillars } });
                          }}
                          className="w-full p-2 rounded-xl border border-dashed border-slate-300 text-slate-500 hover:text-emerald-600 hover:border-emerald-300 text-xs font-bold transition-colors cursor-pointer"
                        >
                          + Añadir Micro Pilar
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Section Titles Editor */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                  <span className="text-xs font-bold text-slate-900 block border-b pb-2">Títulos y Textos de Otras Secciones</span>

                  <div className="space-y-3">

                    {/* Sección: La Diferencia */}
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                      <span className="text-[11px] font-bold text-slate-800 block">🔄 Sección: La Diferencia Premier Home Services</span>
                      <div>
                        <label className="text-[10px] text-slate-500">Badge Superior</label>
                        <input type="text" value={config.content.difference.badge || ''} onChange={(e) => updateContent({ difference: { ...config.content.difference, badge: e.target.value } })} className="w-full p-2 text-xs rounded-lg border border-slate-300 bg-white" />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-500">Título Principal</label>
                        <input type="text" value={config.content.difference.title} onChange={(e) => updateContent({ difference: { ...config.content.difference, title: e.target.value } })} className="w-full p-2 text-xs rounded-lg border border-slate-300 bg-white font-bold" />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-500">Título Resaltado (color verde)</label>
                        <input type="text" value={(config.content.difference as any).titleHighlight || ''} onChange={(e) => updateContent({ difference: { ...config.content.difference, titleHighlight: e.target.value } as any })} className="w-full p-2 text-xs rounded-lg border border-slate-300 bg-white text-emerald-700 font-bold" />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-500">Subtítulo</label>
                        <input type="text" value={config.content.difference.subtitle} onChange={(e) => updateContent({ difference: { ...config.content.difference, subtitle: e.target.value } })} className="w-full p-2 text-xs rounded-lg border border-slate-300 bg-white text-slate-600" />
                      </div>
                      {config.content.difference.items?.length > 0 && (
                        <div className="pt-2 border-t border-slate-200 space-y-3">
                          <label className="text-[10px] text-slate-500 block font-bold uppercase">Items de Comparación (La Diferencia)</label>
                          {config.content.difference.items.map((item: any, idx: number) => (
                            <div key={idx} className="bg-white p-3 rounded-lg border border-slate-200 space-y-2">
                              <label className="text-[10px] font-bold text-slate-500 block">Item #{idx + 1}</label>
                              <div>
                                <label className="text-[10px] text-rose-500">❌ El problema (izquierda):</label>
                                <textarea rows={2} value={item.traditional || ''} onChange={(e) => {
                                  const items = [...config.content.difference.items];
                                  items[idx] = { ...items[idx], traditional: e.target.value };
                                  updateContent({ difference: { ...config.content.difference, items } });
                                }} className="w-full p-2 text-xs rounded-lg border border-slate-300 bg-white" />
                              </div>
                              <div>
                                <label className="text-[10px] text-emerald-600">✅ La solución Premier (derecha):</label>
                                <textarea rows={2} value={item.premierCare || item.serviceSolution || ''} onChange={(e) => {
                                  const items = [...config.content.difference.items];
                                  items[idx] = { ...items[idx], premierCare: e.target.value, serviceSolution: e.target.value };
                                  updateContent({ difference: { ...config.content.difference, items } });
                                }} className="w-full p-2 text-xs rounded-lg border border-slate-300 bg-white" />
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Sección: 3 Pilares */}
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                      <span className="text-[11px] font-bold text-slate-800 block">🏛️ Sección: Los 3 Pilares del Hogar</span>
                      <div>
                        <label className="text-[10px] text-slate-500">Título</label>
                        <input type="text" value={config.content.threePillars.title} onChange={(e) => updateContent({ threePillars: { ...config.content.threePillars, title: e.target.value } })} className="w-full p-2 text-xs rounded-lg border border-slate-300 bg-white font-bold" />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-500">Subtítulo</label>
                        <input type="text" value={(config.content.threePillars as any).subtitle || ''} onChange={(e) => updateContent({ threePillars: { ...config.content.threePillars, subtitle: e.target.value } as any })} className="w-full p-2 text-xs rounded-lg border border-slate-300 bg-white" />
                      </div>
                      {(config.content.threePillars as any).pillars?.map((pillar: any, idx: number) => (
                        <div key={idx} className="bg-white p-3 rounded-lg border border-slate-200 space-y-2">
                          <label className="text-[10px] font-bold text-slate-500">Pilar #{idx + 1}</label>
                          <input type="text" value={pillar.title || ''} onChange={(e) => {
                            const pillars = [...(config.content.threePillars as any).pillars];
                            pillars[idx] = { ...pillars[idx], title: e.target.value };
                            updateContent({ threePillars: { ...(config.content.threePillars as any), pillars } });
                          }} placeholder="Título del pilar" className="w-full p-2 text-xs rounded-lg border border-slate-300 bg-white font-bold" />
                          <textarea rows={2} value={pillar.description || ''} onChange={(e) => {
                            const pillars = [...(config.content.threePillars as any).pillars];
                            pillars[idx] = { ...pillars[idx], description: e.target.value };
                            updateContent({ threePillars: { ...(config.content.threePillars as any), pillars } });
                          }} placeholder="Descripción" className="w-full p-2 text-xs rounded-lg border border-slate-300 bg-white" />
                        </div>
                      ))}
                    </div>

                    {/* Sección: Cómo Funciona */}
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                      <span className="text-[11px] font-bold text-slate-800 block">⚙️ Sección: Cómo Funciona (4 Pasos)</span>
                      <div>
                        <label className="text-[10px] text-slate-500">Título</label>
                        <input type="text" value={config.content.howItWorks.title} onChange={(e) => updateContent({ howItWorks: { ...config.content.howItWorks, title: e.target.value } })} className="w-full p-2 text-xs rounded-lg border border-slate-300 bg-white font-bold" />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-500">Subtítulo</label>
                        <input type="text" value={(config.content.howItWorks as any).subtitle || ''} onChange={(e) => updateContent({ howItWorks: { ...config.content.howItWorks, subtitle: e.target.value } as any })} className="w-full p-2 text-xs rounded-lg border border-slate-300 bg-white" />
                      </div>
                      {config.content.howItWorks.steps?.map((step: any, idx: number) => (
                        <div key={idx} className="bg-white p-3 rounded-lg border border-slate-200 space-y-2">
                          <label className="text-[10px] font-bold text-slate-500">Paso {step.step}</label>
                          <input type="text" value={step.title || ''} onChange={(e) => {
                            const steps = [...config.content.howItWorks.steps];
                            steps[idx] = { ...steps[idx], title: e.target.value };
                            updateContent({ howItWorks: { ...config.content.howItWorks, steps } });
                          }} placeholder="Título del paso" className="w-full p-2 text-xs rounded-lg border border-slate-300 bg-white font-bold" />
                          <textarea rows={2} value={step.description || ''} onChange={(e) => {
                            const steps = [...config.content.howItWorks.steps];
                            steps[idx] = { ...steps[idx], description: e.target.value };
                            updateContent({ howItWorks: { ...config.content.howItWorks, steps } });
                          }} placeholder="Descripción" className="w-full p-2 text-xs rounded-lg border border-slate-300 bg-white" />
                        </div>
                      ))}
                      <div>
                        <label className="text-[10px] text-slate-500">CTA Título inferior</label>
                        <input type="text" value={config.content.howItWorks.ctaTitle || ''} onChange={(e) => updateContent({ howItWorks: { ...config.content.howItWorks, ctaTitle: e.target.value } })} className="w-full p-2 text-xs rounded-lg border border-slate-300 bg-white" />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-500">CTA Texto del Botón</label>
                        <input type="text" value={config.content.howItWorks.ctaButtonText || ''} onChange={(e) => updateContent({ howItWorks: { ...config.content.howItWorks, ctaButtonText: e.target.value } })} className="w-full p-2 text-xs rounded-lg border border-slate-300 bg-white" />
                      </div>
                    </div>

                    {/* Sección: Precios */}
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                      <span className="text-[11px] font-bold text-slate-800 block">💰 Sección: Planes y Precios</span>
                      <div>
                        <label className="text-[10px] text-slate-500">Badge</label>
                        <input type="text" value={(config.content as any).pricing?.badge || ''} onChange={(e) => updateContent({ pricing: { ...(config.content as any).pricing, badge: e.target.value } } as any)} className="w-full p-2 text-xs rounded-lg border border-slate-300 bg-white" />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-500">Título</label>
                        <input type="text" value={(config.content as any).pricing?.title || ''} onChange={(e) => updateContent({ pricing: { ...(config.content as any).pricing, title: e.target.value } } as any)} className="w-full p-2 text-xs rounded-lg border border-slate-300 bg-white font-bold" />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-500">Subtítulo</label>
                        <textarea rows={2} value={(config.content as any).pricing?.subtitle || ''} onChange={(e) => updateContent({ pricing: { ...(config.content as any).pricing, subtitle: e.target.value } } as any)} className="w-full p-2 text-xs rounded-lg border border-slate-300 bg-white" />
                      </div>
                    </div>

                    {/* Sección: Calculadora de Estimación */}
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                      <span className="text-[11px] font-bold text-slate-800 block">🧮 Sección: Calculadora de Estimación (Home Size Estimator)</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] text-slate-500">Badge</label>
                          <input type="text" value={config.content.calculator?.badge || ''} onChange={(e) => updateContent({ calculator: { ...config.content.calculator, badge: e.target.value } })} placeholder="Calculadora de Estimación" className="w-full p-2 text-xs rounded-lg border border-slate-300 bg-white" />
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-500">Título</label>
                          <input type="text" value={config.content.calculator?.title || ''} onChange={(e) => updateContent({ calculator: { ...config.content.calculator, title: e.target.value } })} placeholder="Personaliza el Presupuesto de tu Residencia" className="w-full p-2 text-xs rounded-lg border border-slate-300 bg-white font-bold" />
                        </div>
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-500">Subtítulo</label>
                        <textarea rows={2} value={config.content.calculator?.subtitle || ''} onChange={(e) => updateContent({ calculator: { ...config.content.calculator, subtitle: e.target.value } })} placeholder="Ajusta los pies cuadrados..." className="w-full p-2 text-xs rounded-lg border border-slate-300 bg-white" />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] text-slate-500">Ahorro Anual (Badge / Texto)</label>
                          <input type="text" value={config.content.calculator?.savingsBadge || ''} onChange={(e) => updateContent({ calculator: { ...config.content.calculator, savingsBadge: e.target.value } })} placeholder="Ahorro Anual Estimado" className="w-full p-2 text-xs rounded-lg border border-slate-300 bg-white" />
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-500">Botón de Acción (CTA)</label>
                          <input type="text" value={config.content.calculator?.ctaButtonText || ''} onChange={(e) => updateContent({ calculator: { ...config.content.calculator, ctaButtonText: e.target.value } })} placeholder="Agendar Evaluación Gratuita" className="w-full p-2 text-xs rounded-lg border border-slate-300 bg-white font-bold text-emerald-700" />
                        </div>
                      </div>
                    </div>

                    {/* Sección: Áreas de Servicio */}
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                      <span className="text-[11px] font-bold text-slate-800 block">📍 Sección: Áreas de Servicio (Textos y Regiones)</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] text-slate-500">Badge Superior</label>
                          <input type="text" value={(config.content.serviceAreas as any)?.badge || ''} onChange={(e) => updateContent({ serviceAreas: { ...(config.content.serviceAreas as any), badge: e.target.value } } as any)} placeholder="Coast to Coast Service" className="w-full p-2 text-xs rounded-lg border border-slate-300 bg-white" />
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-500">Título Principal</label>
                          <input type="text" value={(config.content.serviceAreas as any)?.title || ''} onChange={(e) => updateContent({ serviceAreas: { ...(config.content.serviceAreas as any), title: e.target.value } } as any)} placeholder="Our Regional Service Areas" className="w-full p-2 text-xs rounded-lg border border-slate-300 bg-white font-bold" />
                        </div>
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-500">Subtítulo</label>
                        <textarea rows={2} value={(config.content.serviceAreas as any)?.subtitle || ''} onChange={(e) => updateContent({ serviceAreas: { ...(config.content.serviceAreas as any), subtitle: e.target.value } } as any)} placeholder="Premier Home Services operates dedicated local field teams across 8 key metropolitan regions." className="w-full p-2 text-xs rounded-lg border border-slate-300 bg-white" />
                      </div>

                      {/* Buscador de Zip */}
                      <div className="p-2.5 bg-white rounded-lg border border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] text-slate-500">Placeholder buscador de Código Postal</label>
                          <input type="text" value={(config.content.serviceAreas as any)?.zipPlaceholder || ''} onChange={(e) => updateContent({ serviceAreas: { ...(config.content.serviceAreas as any), zipPlaceholder: e.target.value } } as any)} placeholder="Check your 5-digit zip code..." className="w-full p-1.5 text-xs rounded-lg border border-slate-300 bg-white" />
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-500">Texto botón verificar Zip</label>
                          <input type="text" value={(config.content.serviceAreas as any)?.zipButtonText || ''} onChange={(e) => updateContent({ serviceAreas: { ...(config.content.serviceAreas as any), zipButtonText: e.target.value } } as any)} placeholder="Verify Zip Code" className="w-full p-1.5 text-xs rounded-lg border border-slate-300 bg-white font-bold" />
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-500">Título selector de regiones</label>
                          <input type="text" value={(config.content.serviceAreas as any)?.regionSelectTitle || ''} onChange={(e) => updateContent({ serviceAreas: { ...(config.content.serviceAreas as any), regionSelectTitle: e.target.value } } as any)} placeholder="Select Your Region" className="w-full p-1.5 text-xs rounded-lg border border-slate-300 bg-white" />
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-500">Badge del Hub Activo</label>
                          <input type="text" value={(config.content.serviceAreas as any)?.activeHubBadge || ''} onChange={(e) => updateContent({ serviceAreas: { ...(config.content.serviceAreas as any), activeHubBadge: e.target.value } } as any)} placeholder="Active Regional Hub" className="w-full p-1.5 text-xs rounded-lg border border-slate-300 bg-white" />
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-500">Etiqueta Ciudades</label>
                          <input type="text" value={(config.content.serviceAreas as any)?.municipalitiesLabel || ''} onChange={(e) => updateContent({ serviceAreas: { ...(config.content.serviceAreas as any), municipalitiesLabel: e.target.value } } as any)} placeholder="Key Municipalities Served:" className="w-full p-1.5 text-xs rounded-lg border border-slate-300 bg-white" />
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-500">Etiqueta Condados / Distritos</label>
                          <input type="text" value={(config.content.serviceAreas as any)?.countiesLabel || ''} onChange={(e) => updateContent({ serviceAreas: { ...(config.content.serviceAreas as any), countiesLabel: e.target.value } } as any)} placeholder="Counties & Districts:" className="w-full p-1.5 text-xs rounded-lg border border-slate-300 bg-white" />
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-500">Texto badge flota</label>
                          <input type="text" value={(config.content.serviceAreas as any)?.fleetBadgeText || ''} onChange={(e) => updateContent({ serviceAreas: { ...(config.content.serviceAreas as any), fleetBadgeText: e.target.value } } as any)} placeholder="Full local fleet with certified W-2 technicians" className="w-full p-1.5 text-xs rounded-lg border border-slate-300 bg-white" />
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-500">Prefijo botón agendar cita</label>
                          <input type="text" value={(config.content.serviceAreas as any)?.scheduleButtonText || ''} onChange={(e) => updateContent({ serviceAreas: { ...(config.content.serviceAreas as any), scheduleButtonText: e.target.value } } as any)} placeholder="Schedule Walkthrough in" className="w-full p-1.5 text-xs rounded-lg border border-slate-300 bg-white font-bold text-emerald-700" />
                        </div>
                      </div>

                      {/* Regiones individuales */}
                      <div className="pt-2 border-t border-slate-200">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                          <div>
                            <label className="text-[10px] font-bold text-slate-500 uppercase">Regiones / Hubs ({config.serviceAreas?.length || 0})</label>
                            <p className="text-[10px] text-slate-400">Configura las zonas de trabajo y los códigos postales exactos o prefijos que aceptará el buscador.</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                if (confirm('¿Restablecer las regiones a Fairfield y Westchester Counties (CT y NY)?')) {
                                  updateServiceAreas([
                                    {
                                      state: 'Fairfield County, CT',
                                      name: 'Fairfield County Regional Dispatch',
                                      counties: ['Fairfield County', 'Coastal Fairfield', 'Gold Coast Area'],
                                      keyCities: ['Greenwich', 'Stamford', 'Westport', 'Darien', 'New Canaan', 'Fairfield', 'Norwalk', 'Wilton', 'Ridgefield', 'Trumbull'],
                                      zipPrefixes: ['068', '069'],
                                      phone: '(203) 658-8870',
                                      officeAddress: '100 West Putnam Ave, Greenwich, CT 06830'
                                    },
                                    {
                                      state: 'Westchester County, NY',
                                      name: 'Westchester County Regional Dispatch',
                                      counties: ['Westchester County', 'Sound Shore', 'Central & North Westchester'],
                                      keyCities: ['White Plains', 'Scarsdale', 'Rye', 'New Rochelle', 'Bedford', 'Chappaqua', 'Mamaroneck', 'Bronxville', 'Larchmont', 'Yonkers'],
                                      zipPrefixes: ['105', '106', '107', '108'],
                                      phone: '(914) 205-4420',
                                      officeAddress: '50 Main St, White Plains, NY 10606'
                                    }
                                  ]);
                                  showToast('¡Regiones de Fairfield y Westchester cargadas!');
                                }
                              }}
                              className="text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-lg cursor-pointer"
                            >
                              Cargar Fairfield & Westchester
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                const newRegion = {
                                  state: 'Nueva Región / Condado',
                                  name: 'Centro Regional Dispatch',
                                  phone: '(203) 658-8870',
                                  officeAddress: 'Dirección de oficina local',
                                  keyCities: ['Ciudad 1', 'Ciudad 2'],
                                  counties: ['Condado 1'],
                                  zipPrefixes: ['068']
                                };
                                updateServiceAreas([...config.serviceAreas, newRegion]);
                              }}
                              className="text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 px-2.5 py-1 rounded-lg cursor-pointer"
                            >
                              + Agregar Región
                            </button>
                          </div>
                        </div>

                        {config.serviceAreas?.map((area: any, aIdx: number) => (
                          <div key={aIdx} className="bg-white p-3 rounded-lg border border-slate-200 space-y-2 mb-2">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-[#0f2942]">#{aIdx + 1}: {area.state}</span>
                              <button
                                type="button"
                                onClick={() => {
                                  if (confirm(`¿Eliminar la región ${area.state}?`)) {
                                    const arr = [...config.serviceAreas];
                                    arr.splice(aIdx, 1);
                                    updateServiceAreas(arr);
                                  }
                                }}
                                className="text-red-500 hover:text-red-700 p-1 cursor-pointer"
                                title="Eliminar región"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <div className="flex gap-2">
                              <div className="flex-1">
                                <label className="text-[10px] text-slate-500">Estado / Nombre de pestaña</label>
                                <input type="text" value={area.state || ''} onChange={(e) => {
                                  const arr = [...config.serviceAreas];
                                  arr[aIdx] = { ...arr[aIdx], state: e.target.value };
                                  updateServiceAreas(arr);
                                }} className="w-full p-1.5 text-xs rounded-lg border border-slate-300 bg-white" />
                              </div>
                              <div className="flex-1">
                                <label className="text-[10px] text-slate-500">Teléfono directo</label>
                                <input type="text" value={area.phone || ''} onChange={(e) => {
                                  const arr = [...config.serviceAreas];
                                  arr[aIdx] = { ...arr[aIdx], phone: e.target.value };
                                  updateServiceAreas(arr);
                                }} className="w-full p-1.5 text-xs rounded-lg border border-slate-300 bg-white" />
                              </div>
                            </div>
                            <div>
                              <label className="text-[10px] text-slate-500">Nombre del Hub</label>
                              <input type="text" value={area.name || ''} onChange={(e) => {
                                const arr = [...config.serviceAreas];
                                arr[aIdx] = { ...arr[aIdx], name: e.target.value };
                                updateServiceAreas(arr);
                              }} className="w-full p-1.5 text-xs rounded-lg border border-slate-300 bg-white font-bold" />
                            </div>
                            <div>
                              <label className="text-[10px] text-slate-500">Dirección de la Oficina</label>
                              <input type="text" value={area.officeAddress || ''} onChange={(e) => {
                                const arr = [...config.serviceAreas];
                                arr[aIdx] = { ...arr[aIdx], officeAddress: e.target.value };
                                updateServiceAreas(arr);
                              }} className="w-full p-1.5 text-xs rounded-lg border border-slate-300 bg-white" />
                            </div>
                            <div>
                              <label className="text-[10px] text-slate-500">Ciudades (separadas por comas)</label>
                              <input
                                type="text"
                                value={Array.isArray(area.keyCities) ? area.keyCities.join(', ') : (area.keyCities || '')}
                                onChange={(e) => {
                                  const arr = [...config.serviceAreas];
                                  arr[aIdx] = { ...arr[aIdx], keyCities: e.target.value.split(',').map((s: string) => s.trim()).filter(Boolean) };
                                  updateServiceAreas(arr);
                                }}
                                className="w-full p-1.5 text-xs rounded-lg border border-slate-300 bg-white"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] text-slate-500">Condados y Distritos (separados por comas)</label>
                              <input
                                type="text"
                                value={Array.isArray(area.counties) ? area.counties.join(', ') : (area.counties || '')}
                                onChange={(e) => {
                                  const arr = [...config.serviceAreas];
                                  arr[aIdx] = { ...arr[aIdx], counties: e.target.value.split(',').map((s: string) => s.trim()).filter(Boolean) };
                                  updateServiceAreas(arr);
                                }}
                                className="w-full p-1.5 text-xs rounded-lg border border-slate-300 bg-white"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] font-bold text-slate-700 block">Códigos Postales / Prefijos ZIP Permitidos (separados por comas)</label>
                              <p className="text-[9px] text-slate-400 mb-1">El buscador ZIP de la web solo dará servicio a los códigos o prefijos que ingreses aquí (ej: 068, 069, 105, 106, 06830, etc.)</p>
                              <input
                                type="text"
                                value={Array.isArray(area.zipPrefixes) ? area.zipPrefixes.join(', ') : (area.zipPrefixes || '')}
                                onChange={(e) => {
                                  const arr = [...config.serviceAreas];
                                  arr[aIdx] = { ...arr[aIdx], zipPrefixes: e.target.value.split(',').map((s: string) => s.trim()).filter(Boolean) };
                                  updateServiceAreas(arr);
                                }}
                                placeholder="068, 069, 105, 106..."
                                className="w-full p-1.5 text-xs rounded-lg border border-slate-300 bg-white font-mono text-emerald-800 font-bold"
                              />
                              {area.zipPrefixes && area.zipPrefixes.length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-1.5">
                                  {area.zipPrefixes.map((z: string, zi: number) => (
                                    <span key={zi} className="px-1.5 py-0.5 bg-emerald-100 text-emerald-800 rounded text-[10px] font-mono font-bold">
                                      {z}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                  <span className="text-xs font-bold text-slate-900 block border-b pb-2">Banner Superior de Google Reviews y Estadísticas</span>

                  <div className="space-y-3">
                    {/* Trust Banner Superior */}
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                      <span className="text-[11px] font-bold text-slate-800 block">⭐ Banner de Confianza de Google Reviews (Puntaje y Reseñas Verificadas)</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] text-slate-500">Puntaje (ej: "4.9 out of 5.0")</label>
                          <input
                            type="text"
                            value={config.content.reviews.trustScore || ''}
                            onChange={(e) => updateContent({ reviews: { ...config.content.reviews, trustScore: e.target.value } })}
                            placeholder="4.9 out of 5.0"
                            className="w-full p-2 text-xs rounded-lg border border-slate-300 bg-white font-bold"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-500">Texto de Reseñas (ej: "Over 350+ Verified Google Reviews")</label>
                          <input
                            type="text"
                            value={config.content.reviews.trustReviewsCount || ''}
                            onChange={(e) => updateContent({ reviews: { ...config.content.reviews, trustReviewsCount: e.target.value } })}
                            placeholder="Over 350+ Verified Google Reviews"
                            className="w-full p-2 text-xs rounded-lg border border-slate-300 bg-white font-bold"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <span className="col-span-full text-[11px] font-bold text-slate-800 block">📊 Banner de 4 Estadísticas de Reseñas (Cifras y Textos)</span>
                      
                      {/* Stat 1 */}
                      <div className="p-2.5 bg-white rounded-lg border border-slate-200 space-y-1">
                        <label className="text-[10px] font-bold text-slate-600 block">Dato 1 - Cifra</label>
                        <input
                          type="text"
                          value={config.content.reviews.statsYears || ''}
                          onChange={(e) => updateContent({ reviews: { ...config.content.reviews, statsYears: e.target.value } })}
                          placeholder="20+"
                          className="w-full p-1.5 text-xs rounded-lg border border-slate-300 bg-white font-bold text-[#0f2942]"
                        />
                        <label className="text-[10px] text-slate-500 block">Texto debajo</label>
                        <input
                          type="text"
                          value={config.content.reviews.statsYearsLabel || ''}
                          onChange={(e) => updateContent({ reviews: { ...config.content.reviews, statsYearsLabel: e.target.value } })}
                          placeholder="Years Serving Homes"
                          className="w-full p-1.5 text-xs rounded-lg border border-slate-300 bg-white"
                        />
                      </div>

                      {/* Stat 2 */}
                      <div className="p-2.5 bg-white rounded-lg border border-slate-200 space-y-1">
                        <label className="text-[10px] font-bold text-slate-600 block">Dato 2 - Cifra</label>
                        <input
                          type="text"
                          value={config.content.reviews.statsReviews || ''}
                          onChange={(e) => updateContent({ reviews: { ...config.content.reviews, statsReviews: e.target.value } })}
                          placeholder="350+"
                          className="w-full p-1.5 text-xs rounded-lg border border-slate-300 bg-white font-bold text-emerald-600"
                        />
                        <label className="text-[10px] text-slate-500 block">Texto debajo</label>
                        <input
                          type="text"
                          value={config.content.reviews.statsReviewsLabel || ''}
                          onChange={(e) => updateContent({ reviews: { ...config.content.reviews, statsReviewsLabel: e.target.value } })}
                          placeholder="5-Star Google Reviews"
                          className="w-full p-1.5 text-xs rounded-lg border border-slate-300 bg-white"
                        />
                      </div>

                      {/* Stat 3 */}
                      <div className="p-2.5 bg-white rounded-lg border border-slate-200 space-y-1">
                        <label className="text-[10px] font-bold text-slate-600 block">Dato 3 - Cifra</label>
                        <input
                          type="text"
                          value={config.content.reviews.statsRenewal || ''}
                          onChange={(e) => updateContent({ reviews: { ...config.content.reviews, statsRenewal: e.target.value } })}
                          placeholder="98%"
                          className="w-full p-1.5 text-xs rounded-lg border border-slate-300 bg-white font-bold text-[#0f2942]"
                        />
                        <label className="text-[10px] text-slate-500 block">Texto debajo</label>
                        <input
                          type="text"
                          value={config.content.reviews.statsRenewalLabel || ''}
                          onChange={(e) => updateContent({ reviews: { ...config.content.reviews, statsRenewalLabel: e.target.value } })}
                          placeholder="Annual Renewal Rate"
                          className="w-full p-1.5 text-xs rounded-lg border border-slate-300 bg-white"
                        />
                      </div>

                      {/* Stat 4 */}
                      <div className="p-2.5 bg-white rounded-lg border border-slate-200 space-y-1">
                        <label className="text-[10px] font-bold text-slate-600 block">Dato 4 - Cifra</label>
                        <input
                          type="text"
                          value={config.content.reviews.statsBackground || ''}
                          onChange={(e) => updateContent({ reviews: { ...config.content.reviews, statsBackground: e.target.value } })}
                          placeholder="100%"
                          className="w-full p-1.5 text-xs rounded-lg border border-slate-300 bg-white font-bold text-emerald-600"
                        />
                        <label className="text-[10px] text-slate-500 block">Texto debajo</label>
                        <input
                          type="text"
                          value={config.content.reviews.statsBackgroundLabel || ''}
                          onChange={(e) => updateContent({ reviews: { ...config.content.reviews, statsBackgroundLabel: e.target.value } })}
                          placeholder="W-2 Background Checked"
                          className="w-full p-1.5 text-xs rounded-lg border border-slate-300 bg-white"
                        />
                      </div>
                    </div>

                    {/* CTA Inferior de FAQs */}
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                      <span className="text-[11px] font-bold text-slate-800 block">📞 Caja de Contacto Inferior de FAQs ("Have a question specific to your property?")</span>
                      <div>
                        <label className="text-[10px] text-slate-500 block mb-1">Título de la caja</label>
                        <input
                          type="text"
                          value={config.content.faq.ctaTitle || ''}
                          onChange={(e) => updateContent({ faq: { ...config.content.faq, ctaTitle: e.target.value } })}
                          placeholder="Have a question specific to your property?"
                          className="w-full p-2 text-xs rounded-lg border border-slate-300 bg-white font-bold"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-500 block mb-1">Subtítulo explicativo</label>
                        <textarea
                          rows={2}
                          value={config.content.faq.ctaSubtitle || ''}
                          onChange={(e) => updateContent({ faq: { ...config.content.faq, ctaSubtitle: e.target.value } })}
                          placeholder="Our home care advisors are available to review your property quirks and answer any questions."
                          className="w-full p-2 text-xs rounded-lg border border-slate-300 bg-white"
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] text-slate-500 block mb-1">Texto del botón de llamada</label>
                          <input
                            type="text"
                            value={config.content.faq.ctaPhoneText || ''}
                            onChange={(e) => updateContent({ faq: { ...config.content.faq, ctaPhoneText: e.target.value } })}
                            placeholder="Call (888) 555-CARE"
                            className="w-full p-2 text-xs rounded-lg border border-slate-300 bg-white"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-500 block mb-1">Texto del botón verde (Walkthrough)</label>
                          <input
                            type="text"
                            value={config.content.faq.ctaButtonText || ''}
                            onChange={(e) => updateContent({ faq: { ...config.content.faq, ctaButtonText: e.target.value } })}
                            placeholder="Request Free Assessment"
                            className="w-full p-2 text-xs rounded-lg border border-slate-300 bg-white font-bold text-emerald-700"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">Sección de Reseñas de Google</span>
                      <p className="text-[11px] text-slate-500">Controla el estilo de visualización y edita cada comentario.</p>
                    </div>
                    <button
                      onClick={handleAddTestimonial}
                      className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Añadir Reseña</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">Tipo de visualización</label>
                      <select
                        value={config.content.reviews.sliderType ?? 'grid'}
                        onChange={(e) => updateContent({ reviews: { ...config.content.reviews, sliderType: e.target.value as 'grid' | 'carousel' } })}
                        className="w-full p-2 text-xs rounded-xl border border-slate-300 bg-white"
                      >
                        <option value="grid">Cuadrícula</option>
                        <option value="carousel">Carrusel horizontal</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {config.testimonials.map((testimonial) => (
                      <div key={testimonial.id} className="p-3 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
                        <div className="flex items-center justify-between gap-3">
                          <div className="text-[11px] font-bold text-slate-800">#{testimonial.author || 'Nuevo testimonio'}</div>
                          <button
                            onClick={() => handleDeleteTestimonial(testimonial.id)}
                            className="text-red-500 hover:text-red-700 text-[11px] font-bold cursor-pointer"
                          >
                            Eliminar
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <input
                            type="text"
                            value={testimonial.author}
                            onChange={(e) => handleUpdateTestimonial(testimonial.id, { author: e.target.value })}
                            placeholder="Nombre"
                            className="w-full p-2 text-xs rounded-lg border border-slate-300 bg-white"
                          />
                          <input
                            type="text"
                            value={testimonial.location}
                            onChange={(e) => handleUpdateTestimonial(testimonial.id, { location: e.target.value })}
                            placeholder="Ciudad / Estado"
                            className="w-full p-2 text-xs rounded-lg border border-slate-300 bg-white"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <input
                            type="text"
                            value={testimonial.homeType}
                            onChange={(e) => handleUpdateTestimonial(testimonial.id, { homeType: e.target.value })}
                            placeholder="Tipo de propiedad"
                            className="w-full p-2 text-xs rounded-lg border border-slate-300 bg-white"
                          />
                          <input
                            type="number"
                            min={1}
                            max={5}
                            value={testimonial.rating}
                            onChange={(e) => handleUpdateTestimonial(testimonial.id, { rating: Number(e.target.value) || 5 })}
                            placeholder="Rating"
                            className="w-full p-2 text-xs rounded-lg border border-slate-300 bg-white"
                          />
                        </div>

                        <input
                          type="text"
                          value={testimonial.highlight}
                          onChange={(e) => handleUpdateTestimonial(testimonial.id, { highlight: e.target.value })}
                          placeholder="Texto destacado"
                          className="w-full p-2 text-xs rounded-lg border border-slate-300 bg-white"
                        />

                        <textarea
                          rows={3}
                          value={testimonial.quote}
                          onChange={(e) => handleUpdateTestimonial(testimonial.id, { quote: e.target.value })}
                          placeholder="Comentario completo"
                          className="w-full p-2 text-xs rounded-lg border border-slate-300 bg-white"
                        />

                        <input
                          type="text"
                          value={testimonial.avatarUrl}
                          onChange={(e) => handleUpdateTestimonial(testimonial.id, { avatarUrl: e.target.value })}
                          placeholder="URL avatar"
                          className="w-full p-2 text-xs rounded-lg border border-slate-300 bg-white font-mono"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Explicit Save Button for Content */}
                <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">Guarda permanentemente todos los textos, títulos y descripciones de las páginas.</span>
                  <button
                    onClick={() => {
                      saveAndNotify('Contenido de Secciones');
                      showToast('¡Contenido de páginas guardado exitosamente!');
                    }}
                    className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm flex items-center gap-2 cursor-pointer transition-all hover:scale-105"
                  >
                    <Save className="w-4 h-4" />
                    <span>Guardar Contenido de Páginas</span>
                  </button>
                </div>

              </div>
            )}


            {/* ================= TAB 6: PLANES Y PRECIOS ================= */}
            {/* ================= TAB 9: TARJETAS DE PRECIOS ================= */}
            {activeTab === 'pricing' && (() => {
              const pricingSection = config.sections.find(s => s.id === 'pricing');
              const isPricingEnabled = pricingSection ? pricingSection.enabled : true;

              return (
                <div className="space-y-6 max-w-4xl">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
                    <div>
                      <h4 className="text-lg font-black text-[#0f2942]">Tarjetas de Membresías y Precios</h4>
                      <p className="text-xs text-slate-500">Muestra las tarjetas de planes (Quarterly, Bi-Monthly y Monthly) en la web.</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-bold ${isPricingEnabled ? 'text-emerald-700' : 'text-slate-400'}`}>
                        {isPricingEnabled ? 'Sección Visible' : 'Sección Oculta'}
                      </span>
                      <button
                        type="button"
                        onClick={() => toggleSection('pricing')}
                        className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                          isPricingEnabled ? 'bg-emerald-600' : 'bg-slate-300'
                        }`}
                      >
                        <span className={`w-5 h-5 rounded-full bg-white shadow-md absolute top-0.5 transition-transform ${
                          isPricingEnabled ? 'left-6.5' : 'left-0.5'
                        }`} />
                      </button>
                    </div>
                  </div>

                  {/* Textos de la Sección de Precios */}
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
                    <span className="text-xs font-bold text-slate-800 block">Textos de Encabezado de Precios</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] text-slate-500 block mb-1">Badge Superior</label>
                        <input
                          type="text"
                          value={config.content.pricing.badge || ''}
                          onChange={(e) => updateContent({ pricing: { ...config.content.pricing, badge: e.target.value } })}
                          placeholder="Predictable Investment"
                          className="w-full p-2 text-xs rounded-xl border border-slate-300 bg-white"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-500 block mb-1">Título Principal</label>
                        <input
                          type="text"
                          value={config.content.pricing.title || ''}
                          onChange={(e) => updateContent({ pricing: { ...config.content.pricing, title: e.target.value } })}
                          placeholder="Transparent Memberships & Plans"
                          className="w-full p-2 text-xs rounded-xl border border-slate-300 bg-white font-bold"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-500 block mb-1">Subtítulo Descriptivo</label>
                      <textarea
                        rows={2}
                        value={config.content.pricing.subtitle || ''}
                        onChange={(e) => updateContent({ pricing: { ...config.content.pricing, subtitle: e.target.value } })}
                        placeholder="Predictable monthly payments covering proactive visits..."
                        className="w-full p-2 text-xs rounded-xl border border-slate-300 bg-white"
                      />
                    </div>
                  </div>

                  {/* Tarjetas de Planes */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {config.pricingPlans.map((plan) => (
                      <div key={plan.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-4 flex flex-col justify-between">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <input
                              type="text"
                              value={plan.badge || ''}
                              onChange={(e) => {
                                const updated = config.pricingPlans.map(p => p.id === plan.id ? { ...p, badge: e.target.value } : p);
                                updatePricingPlans(updated);
                              }}
                              placeholder="Badge (ej: Most Popular)"
                              className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 max-w-[140px]"
                            />
                            <span className="text-xs font-bold text-slate-500">{plan.visitsPerYear} visitas/año</span>
                          </div>

                          <div>
                            <label className="text-[11px] font-bold text-slate-700 block mb-1">Nombre del Plan:</label>
                            <input
                              type="text"
                              value={plan.name}
                              onChange={(e) => {
                                const updated = config.pricingPlans.map(p => p.id === plan.id ? { ...p, name: e.target.value } : p);
                                updatePricingPlans(updated);
                              }}
                              className="w-full p-2 text-xs rounded-xl border border-slate-300 font-bold"
                            />
                          </div>

                          <div>
                            <label className="text-[11px] font-bold text-slate-700 block mb-1">Precio Mensual Base ($):</label>
                            <div className="relative">
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                              <input
                                type="number"
                                value={plan.baseMonthlyPrice}
                                onChange={(e) => {
                                  const updated = config.pricingPlans.map(p => p.id === plan.id ? { ...p, baseMonthlyPrice: Number(e.target.value) } : p);
                                  updatePricingPlans(updated);
                                }}
                                className="w-full pl-7 pr-3 py-2 text-xs rounded-xl border border-slate-300 font-black text-slate-900"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="text-[11px] font-bold text-slate-700 block mb-1">Horas de Handyman Incluidas:</label>
                            <input
                              type="text"
                              value={plan.handymanHoursIncluded}
                              onChange={(e) => {
                                const updated = config.pricingPlans.map(p => p.id === plan.id ? { ...p, handymanHoursIncluded: e.target.value } : p);
                                updatePricingPlans(updated);
                              }}
                              className="w-full p-2 text-xs rounded-xl border border-slate-300 text-slate-700 font-semibold"
                            />
                          </div>

                          <div>
                            <label className="text-[11px] font-bold text-slate-700 block mb-1">Recomendado Para:</label>
                            <textarea
                              rows={2}
                              value={plan.recommendedFor}
                              onChange={(e) => {
                                const updated = config.pricingPlans.map(p => p.id === plan.id ? { ...p, recommendedFor: e.target.value } : p);
                                updatePricingPlans(updated);
                              }}
                              className="w-full p-2 text-xs rounded-xl border border-slate-300 text-slate-600"
                            />
                          </div>
                        </div>

                        <div className="text-[11px] text-slate-400 border-t pt-2">
                          {plan.features.length} beneficios configurados
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Explicit Save Button for Pricing */}
                  <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                    <span className="text-xs text-slate-500 font-medium">Guarda permanentemente las tarjetas de precios y membresías.</span>
                    <button
                      onClick={() => {
                        saveAndNotify('Planes y Precios');
                        showToast('¡Tarjetas de precios guardadas exitosamente!');
                      }}
                      className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm flex items-center gap-2 cursor-pointer transition-all hover:scale-105"
                    >
                      <Save className="w-4 h-4" />
                      <span>Guardar Tarjetas de Precios</span>
                    </button>
                  </div>

                </div>
              );
            })()}

            {/* ================= TAB 10: CALCULADORA ESTIMADORA ================= */}
            {activeTab === 'calculator' && (() => {
              const calcSection = config.sections.find(s => s.id === 'calculator');
              const isCalcEnabled = calcSection ? calcSection.enabled : true;
              const calcConfig = config.content.calculator || {};

              return (
                <div className="space-y-6 max-w-4xl">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
                    <div>
                      <h4 className="text-lg font-black text-[#0f2942]">Calculadora de Estimación (Home Size Estimator)</h4>
                      <p className="text-xs text-slate-500">
                        Configura y edita por separado toda la información de la calculadora interactiva. Puedes ocultarla o mostrarla independientemente de las tarjetas de precios.
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-bold ${isCalcEnabled ? 'text-emerald-700' : 'text-slate-400'}`}>
                        {isCalcEnabled ? 'Calculadora Visible' : 'Calculadora Oculta'}
                      </span>
                      <button
                        type="button"
                        onClick={() => toggleSection('calculator')}
                        className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                          isCalcEnabled ? 'bg-emerald-600' : 'bg-slate-300'
                        }`}
                      >
                        <span className={`w-5 h-5 rounded-full bg-white shadow-md absolute top-0.5 transition-transform ${
                          isCalcEnabled ? 'left-6.5' : 'left-0.5'
                        }`} />
                      </button>
                    </div>
                  </div>

                  {/* Textos Principales de la Sección */}
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
                    <span className="text-xs font-bold text-slate-800 block">1. Encabezado de la Sección de Calculadora</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] text-slate-500 block mb-1">Badge Superior</label>
                        <input
                          type="text"
                          value={calcConfig.badge || ''}
                          onChange={(e) => updateContent({ calculator: { ...calcConfig, badge: e.target.value } })}
                          placeholder="Calculadora de Estimación"
                          className="w-full p-2 text-xs rounded-xl border border-slate-300 bg-white"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-500 block mb-1">Título Principal</label>
                        <input
                          type="text"
                          value={calcConfig.title || ''}
                          onChange={(e) => updateContent({ calculator: { ...calcConfig, title: e.target.value } })}
                          placeholder="Personaliza el Presupuesto de tu Residencia"
                          className="w-full p-2 text-xs rounded-xl border border-slate-300 bg-white font-bold"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-500 block mb-1">Subtítulo de la Sección</label>
                      <textarea
                        rows={2}
                        value={calcConfig.subtitle || ''}
                        onChange={(e) => updateContent({ calculator: { ...calcConfig, subtitle: e.target.value } })}
                        placeholder="Ajusta los pies cuadrados y zonas mecánicas a continuación..."
                        className="w-full p-2 text-xs rounded-xl border border-slate-300 bg-white"
                      />
                    </div>
                  </div>

                  {/* Configuración del Estimador Interior y Slider */}
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
                    <span className="text-xs font-bold text-slate-800 block">2. Textos y Parámetros del Estimador</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] text-slate-500 block mb-1">Badge Interior del Cuadro</label>
                        <input
                          type="text"
                          value={calcConfig.estimatorBadge || ''}
                          onChange={(e) => updateContent({ calculator: { ...calcConfig, estimatorBadge: e.target.value } })}
                          placeholder="Custom Home Size Estimator"
                          className="w-full p-2 text-xs rounded-xl border border-slate-300 bg-white"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-500 block mb-1">Título Interior</label>
                        <input
                          type="text"
                          value={calcConfig.estimatorTitle || ''}
                          onChange={(e) => updateContent({ calculator: { ...calcConfig, estimatorTitle: e.target.value } })}
                          placeholder="Ajusta tu Hogar a Medida"
                          className="w-full p-2 text-xs rounded-xl border border-slate-300 bg-white font-bold"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] text-slate-500 block mb-1">Subtítulo Interior</label>
                      <input
                        type="text"
                        value={calcConfig.estimatorSubtitle || ''}
                        onChange={(e) => updateContent({ calculator: { ...calcConfig, estimatorSubtitle: e.target.value } })}
                        placeholder="Desliza para seleccionar los pies cuadrados y equipos mecánicos..."
                        className="w-full p-2 text-xs rounded-xl border border-slate-300 bg-white"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 pt-1">
                      <div>
                        <label className="text-[10px] text-slate-500 block mb-1">Mínimo Sq Ft</label>
                        <input
                          type="number"
                          value={calcConfig.minSqft || 2000}
                          onChange={(e) => updateContent({ calculator: { ...calcConfig, minSqft: Number(e.target.value) || 1000 } })}
                          className="w-full p-2 text-xs rounded-xl border border-slate-300 bg-white font-bold"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-500 block mb-1">Máximo Sq Ft</label>
                        <input
                          type="number"
                          value={calcConfig.maxSqft || 10000}
                          onChange={(e) => updateContent({ calculator: { ...calcConfig, maxSqft: Number(e.target.value) || 10000 } })}
                          className="w-full p-2 text-xs rounded-xl border border-slate-300 bg-white font-bold"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-500 block mb-1">Paso Slider (Sq Ft)</label>
                        <input
                          type="number"
                          value={calcConfig.stepSqft || 250}
                          onChange={(e) => updateContent({ calculator: { ...calcConfig, stepSqft: Number(e.target.value) || 100 } })}
                          className="w-full p-2 text-xs rounded-xl border border-slate-300 bg-white font-bold"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-500 block mb-1">Pies Sq Ft Iniciales</label>
                        <input
                          type="number"
                          value={calcConfig.defaultSqft || 4500}
                          onChange={(e) => updateContent({ calculator: { ...calcConfig, defaultSqft: Number(e.target.value) || 4500 } })}
                          className="w-full p-2 text-xs rounded-xl border border-slate-300 bg-white font-bold text-emerald-700"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div>
                        <label className="text-[10px] text-slate-500 block mb-1">Etiqueta Unidades HVAC</label>
                        <input
                          type="text"
                          value={calcConfig.hvacLabel || ''}
                          onChange={(e) => updateContent({ calculator: { ...calcConfig, hvacLabel: e.target.value } })}
                          placeholder="Unidades / Zonas HVAC"
                          className="w-full p-2 text-xs rounded-xl border border-slate-300 bg-white"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-500 block mb-1">Etiqueta Handyman Incluido</label>
                        <input
                          type="text"
                          value={calcConfig.handymanLabel || ''}
                          onChange={(e) => updateContent({ calculator: { ...calcConfig, handymanLabel: e.target.value } })}
                          placeholder="Handyman Incluido"
                          className="w-full p-2 text-xs rounded-xl border border-slate-300 bg-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Cuadro de Ahorro y Botón */}
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
                    <span className="text-xs font-bold text-slate-800 block">3. Cuadro de Ahorro Anual y Botón de Acción</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] text-slate-500 block mb-1">Badge de Ahorro</label>
                        <input
                          type="text"
                          value={calcConfig.savingsBadge || ''}
                          onChange={(e) => updateContent({ calculator: { ...calcConfig, savingsBadge: e.target.value } })}
                          placeholder="Ahorro Anual Estimado"
                          className="w-full p-2 text-xs rounded-xl border border-slate-300 bg-white"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-500 block mb-1">Texto del Botón (Walkthrough)</label>
                        <input
                          type="text"
                          value={calcConfig.ctaButtonText || ''}
                          onChange={(e) => updateContent({ calculator: { ...calcConfig, ctaButtonText: e.target.value } })}
                          placeholder="Agendar Evaluación Gratuita"
                          className="w-full p-2 text-xs rounded-xl border border-slate-300 bg-white font-bold text-emerald-700"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] text-slate-500 block mb-1">Subtítulo del Ahorro Estimado</label>
                      <input
                        type="text"
                        value={calcConfig.savingsSubtitle || ''}
                        onChange={(e) => updateContent({ calculator: { ...calcConfig, savingsSubtitle: e.target.value } })}
                        placeholder="promedio anual evitado en averías y contratistas independientes"
                        className="w-full p-2 text-xs rounded-xl border border-slate-300 bg-white"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] text-slate-500 block mb-1">Texto explicativo / Disclaimer</label>
                      <textarea
                        rows={2}
                        value={calcConfig.savingsDisclaimer || ''}
                        onChange={(e) => updateContent({ calculator: { ...calcConfig, savingsDisclaimer: e.target.value } })}
                        placeholder="El mantenimiento preventivo trimestral previene filtraciones y costosos reemplazos..."
                        className="w-full p-2 text-xs rounded-xl border border-slate-300 bg-white"
                      />
                    </div>
                  </div>

                  {/* Save Button for Calculator */}
                  <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                    <span className="text-xs text-slate-500 font-medium">Guarda todos los ajustes, rangos y textos de la calculadora.</span>
                    <button
                      onClick={() => {
                        saveAndNotify('Calculadora Estimadora');
                        showToast('¡Configuración de la calculadora guardada exitosamente!');
                      }}
                      className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm flex items-center gap-2 cursor-pointer transition-all hover:scale-105"
                    >
                      <Save className="w-4 h-4" />
                      <span>Guardar Calculadora</span>
                    </button>
                  </div>

                </div>
              );
            })()}

            {/* ================= TAB 11: ZONAS Y DISPATCH REGIONAL (FAIRFIELD / WESTCHESTER) ================= */}
            {activeTab === 'service-areas' && (
              <div className="space-y-6 max-w-4xl">
                <div>
                  <h4 className="text-lg font-black text-[#0f2942]">
                    Áreas de Servicio, Hubs de Despacho & Filtro de Códigos Postales
                  </h4>
                  <p className="text-xs text-slate-500">
                    Configura las zonas de cobertura (Fairfield County, CT / Westchester County, NY), teléfonos directos, oficinas locales, municipios y los códigos postales exactos aceptados por el verificador.
                  </p>
                </div>

                {/* Textos y Encabezados Globales de la Sección */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                  <span className="text-xs font-bold text-slate-900 block border-b pb-2">
                    Textos Generales de la Sección de Cobertura
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">Badge Superior:</label>
                      <input
                        type="text"
                        value={(config.content.serviceAreas as any)?.badge || ''}
                        onChange={(e) => updateContent({ serviceAreas: { ...(config.content.serviceAreas as any), badge: e.target.value } } as any)}
                        placeholder="Coast to Coast Service"
                        className="w-full p-2 text-xs rounded-xl border border-slate-300"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">Título Principal:</label>
                      <input
                        type="text"
                        value={(config.content.serviceAreas as any)?.title || ''}
                        onChange={(e) => updateContent({ serviceAreas: { ...(config.content.serviceAreas as any), title: e.target.value } } as any)}
                        placeholder="Our Regional Service Areas"
                        className="w-full p-2 text-xs rounded-xl border border-slate-300 font-bold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">Subtítulo Descriptivo:</label>
                    <textarea
                      rows={2}
                      value={(config.content.serviceAreas as any)?.subtitle || ''}
                      onChange={(e) => updateContent({ serviceAreas: { ...(config.content.serviceAreas as any), subtitle: e.target.value } } as any)}
                      placeholder="Premier Home Services operates dedicated local field teams across key metropolitan regions."
                      className="w-full p-2 text-xs rounded-xl border border-slate-300"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-100">
                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">Placeholder Buscador de Zip:</label>
                      <input
                        type="text"
                        value={(config.content.serviceAreas as any)?.zipPlaceholder || ''}
                        onChange={(e) => updateContent({ serviceAreas: { ...(config.content.serviceAreas as any), zipPlaceholder: e.target.value } } as any)}
                        placeholder="Check your 5-digit zip code..."
                        className="w-full p-2 text-xs rounded-xl border border-slate-300"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">Texto Botón Verificar Zip:</label>
                      <input
                        type="text"
                        value={(config.content.serviceAreas as any)?.zipButtonText || ''}
                        onChange={(e) => updateContent({ serviceAreas: { ...(config.content.serviceAreas as any), zipButtonText: e.target.value } } as any)}
                        placeholder="Verify Zip Code"
                        className="w-full p-2 text-xs rounded-xl border border-slate-300 font-bold"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">Título Selector de Regiones:</label>
                      <input
                        type="text"
                        value={(config.content.serviceAreas as any)?.regionSelectTitle || ''}
                        onChange={(e) => updateContent({ serviceAreas: { ...(config.content.serviceAreas as any), regionSelectTitle: e.target.value } } as any)}
                        placeholder="Select Your Region"
                        className="w-full p-2 text-xs rounded-xl border border-slate-300"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">Badge Hub Activo:</label>
                      <input
                        type="text"
                        value={(config.content.serviceAreas as any)?.activeHubBadge || ''}
                        onChange={(e) => updateContent({ serviceAreas: { ...(config.content.serviceAreas as any), activeHubBadge: e.target.value } } as any)}
                        placeholder="Active Regional Hub"
                        className="w-full p-2 text-xs rounded-xl border border-slate-300"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">Etiqueta Municipios / Ciudades:</label>
                      <input
                        type="text"
                        value={(config.content.serviceAreas as any)?.municipalitiesLabel || ''}
                        onChange={(e) => updateContent({ serviceAreas: { ...(config.content.serviceAreas as any), municipalitiesLabel: e.target.value } } as any)}
                        placeholder="Key Municipalities Served:"
                        className="w-full p-2 text-xs rounded-xl border border-slate-300"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">Etiqueta Condados / Distritos:</label>
                      <input
                        type="text"
                        value={(config.content.serviceAreas as any)?.countiesLabel || ''}
                        onChange={(e) => updateContent({ serviceAreas: { ...(config.content.serviceAreas as any), countiesLabel: e.target.value } } as any)}
                        placeholder="Counties & Districts:"
                        className="w-full p-2 text-xs rounded-xl border border-slate-300"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">Texto Badge Flota Técnica:</label>
                      <input
                        type="text"
                        value={(config.content.serviceAreas as any)?.fleetBadgeText || ''}
                        onChange={(e) => updateContent({ serviceAreas: { ...(config.content.serviceAreas as any), fleetBadgeText: e.target.value } } as any)}
                        placeholder="Full local fleet with certified W-2 technicians"
                        className="w-full p-2 text-xs rounded-xl border border-slate-300"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">Prefijo Botón Agendar Walkthrough:</label>
                      <input
                        type="text"
                        value={(config.content.serviceAreas as any)?.scheduleButtonText || ''}
                        onChange={(e) => updateContent({ serviceAreas: { ...(config.content.serviceAreas as any), scheduleButtonText: e.target.value } } as any)}
                        placeholder="Schedule Walkthrough in"
                        className="w-full p-2 text-xs rounded-xl border border-slate-300 font-bold text-emerald-700"
                      />
                    </div>
                  </div>
                </div>

                {/* Hubs & Regiones Individuales */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-3">
                    <div>
                      <h5 className="text-sm font-bold text-slate-900">
                        Hubs Regionales de Despacho ({config.serviceAreas?.length || 0})
                      </h5>
                      <p className="text-[11px] text-slate-500">
                        Solo los códigos postales que coincidan con los prefijos o zips configurados aquí serán aprobados en el verificador web.
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm('¿Restablecer las regiones a Fairfield y Westchester Counties (CT y NY)?')) {
                            updateServiceAreas([
                              {
                                state: 'Fairfield County, CT',
                                name: 'Fairfield County Regional Dispatch',
                                counties: ['Fairfield County', 'Coastal Fairfield', 'Gold Coast Area'],
                                keyCities: ['Greenwich', 'Stamford', 'Westport', 'Darien', 'New Canaan', 'Fairfield', 'Norwalk', 'Wilton', 'Ridgefield', 'Trumbull'],
                                zipPrefixes: ['068', '069'],
                                phone: '(203) 658-8870',
                                officeAddress: '100 West Putnam Ave, Greenwich, CT 06830'
                              },
                              {
                                state: 'Westchester County, NY',
                                name: 'Westchester County Regional Dispatch',
                                counties: ['Westchester County', 'Sound Shore', 'Central & North Westchester'],
                                keyCities: ['White Plains', 'Scarsdale', 'Rye', 'New Rochelle', 'Bedford', 'Chappaqua', 'Mamaroneck', 'Bronxville', 'Larchmont', 'Yonkers'],
                                zipPrefixes: ['105', '106', '107', '108'],
                                phone: '(914) 205-4420',
                                officeAddress: '50 Main St, White Plains, NY 10606'
                              }
                            ]);
                            showToast('¡Hubs de Fairfield y Westchester restablecidos!');
                          }
                        }}
                        className="text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-xl cursor-pointer"
                      >
                        Restablecer Fairfield & Westchester
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          const newRegion = {
                            state: 'Nueva Región / Condado',
                            name: 'Centro Regional Dispatch',
                            counties: ['Condado Principal'],
                            keyCities: ['Ciudad 1', 'Ciudad 2'],
                            zipPrefixes: ['000'],
                            phone: '(888) 555-CARE',
                            officeAddress: 'Dirección de la oficina local'
                          };
                          updateServiceAreas([...config.serviceAreas, newRegion]);
                          showToast('Nueva región agregada');
                        }}
                        className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Añadir Región / Hub</span>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {config.serviceAreas?.map((area: any, aIdx: number) => (
                      <div key={aIdx} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-black text-slate-800 flex items-center gap-2">
                            <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Hub #{aIdx + 1}: {area.name || area.state}</span>
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              if (confirm(`¿Eliminar la región "${area.state}"?`)) {
                                const arr = [...config.serviceAreas];
                                arr.splice(aIdx, 1);
                                updateServiceAreas(arr);
                                showToast('Región eliminada');
                              }
                            }}
                            className="text-red-500 hover:text-red-700 text-xs font-bold flex items-center gap-1 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Eliminar</span>
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="text-[10px] font-bold text-slate-600 block mb-0.5">Nombre Región / Estado / Condado</label>
                            <input
                              type="text"
                              value={area.state}
                              onChange={(e) => {
                                const arr = [...config.serviceAreas];
                                arr[aIdx] = { ...arr[aIdx], state: e.target.value };
                                updateServiceAreas(arr);
                              }}
                              className="w-full p-2 text-xs rounded-xl border border-slate-300 bg-white font-bold"
                              placeholder="Ej: Fairfield County, CT"
                            />
                          </div>

                          <div>
                            <label className="text-[10px] font-bold text-slate-600 block mb-0.5">Nombre del Hub de Despacho</label>
                            <input
                              type="text"
                              value={area.name}
                              onChange={(e) => {
                                const arr = [...config.serviceAreas];
                                arr[aIdx] = { ...arr[aIdx], name: e.target.value };
                                updateServiceAreas(arr);
                              }}
                              className="w-full p-2 text-xs rounded-xl border border-slate-300 bg-white font-bold"
                              placeholder="Ej: Fairfield County Regional Dispatch"
                            />
                          </div>

                          <div>
                            <label className="text-[10px] font-bold text-slate-600 block mb-0.5">Teléfono Directo del Hub</label>
                            <input
                              type="text"
                              value={area.phone}
                              onChange={(e) => {
                                const arr = [...config.serviceAreas];
                                arr[aIdx] = { ...arr[aIdx], phone: e.target.value };
                                updateServiceAreas(arr);
                              }}
                              className="w-full p-2 text-xs rounded-xl border border-slate-300 bg-white"
                              placeholder="Ej: (203) 658-8870"
                            />
                          </div>

                          <div>
                            <label className="text-[10px] font-bold text-slate-600 block mb-0.5">Dirección de Oficina / Despacho Local</label>
                            <input
                              type="text"
                              value={area.officeAddress}
                              onChange={(e) => {
                                const arr = [...config.serviceAreas];
                                arr[aIdx] = { ...arr[aIdx], officeAddress: e.target.value };
                                updateServiceAreas(arr);
                              }}
                              className="w-full p-2 text-xs rounded-xl border border-slate-300 bg-white"
                              placeholder="Ej: 100 West Putnam Ave, Greenwich, CT 06830"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-[10px] font-bold text-slate-600 block mb-0.5">
                            Ciudades y Municipios Servidos (separados por coma)
                          </label>
                          <textarea
                            rows={2}
                            value={Array.isArray(area.keyCities) ? area.keyCities.join(', ') : area.keyCities || ''}
                            onChange={(e) => {
                              const arr = [...config.serviceAreas];
                              arr[aIdx] = {
                                ...arr[aIdx],
                                keyCities: e.target.value.split(',').map((s: string) => s.trim()).filter(Boolean)
                              };
                              updateServiceAreas(arr);
                            }}
                            className="w-full p-2 text-xs rounded-xl border border-slate-300 bg-white"
                            placeholder="Greenwich, Stamford, Westport, Darien, New Canaan..."
                          />
                        </div>

                        <div>
                          <label className="text-[10px] font-bold text-slate-600 block mb-0.5">
                            Condados y Distritos (separados por coma)
                          </label>
                          <textarea
                            rows={2}
                            value={Array.isArray(area.counties) ? area.counties.join(', ') : area.counties || ''}
                            onChange={(e) => {
                              const arr = [...config.serviceAreas];
                              arr[aIdx] = {
                                ...arr[aIdx],
                                counties: e.target.value.split(',').map((s: string) => s.trim()).filter(Boolean)
                              };
                              updateServiceAreas(arr);
                            }}
                            className="w-full p-2 text-xs rounded-xl border border-slate-300 bg-white"
                            placeholder="Fairfield County, Coastal Fairfield, Gold Coast Area..."
                          />
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-0.5">
                            <label className="text-[10px] font-bold text-slate-600">
                              Códigos Postales / Prefijos Habilitados (separados por coma)
                            </label>
                            <span className="text-[10px] text-emerald-700 font-semibold">
                              Ej: 068, 069 o 06830, 06831...
                            </span>
                          </div>
                          <input
                            type="text"
                            value={Array.isArray(area.zipPrefixes) ? area.zipPrefixes.join(', ') : area.zipPrefixes || ''}
                            onChange={(e) => {
                              const arr = [...config.serviceAreas];
                              arr[aIdx] = {
                                ...arr[aIdx],
                                zipPrefixes: e.target.value.split(',').map((s: string) => s.trim()).filter(Boolean)
                              };
                              updateServiceAreas(arr);
                            }}
                            className="w-full p-2 text-xs rounded-xl border border-emerald-300 bg-white font-mono text-slate-800"
                            placeholder="068, 069"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-slate-200 flex justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        saveAndNotify('Áreas de Servicio y Zonas');
                        showToast('¡Configuración de áreas de servicio y hubs guardada!');
                      }}
                      className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm flex items-center gap-2 cursor-pointer transition-all hover:scale-105"
                    >
                      <Save className="w-4 h-4" />
                      <span>Guardar Áreas de Servicio y Zonas</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ================= TAB 7: GALERIA DE PROYECTOS ================= */}
            {activeTab === 'gallery' && (
              <div className="space-y-6 max-w-4xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h4 className="text-lg font-black text-[#0f2942]">Galería de Trabajos y Antes / Después ({config.gallery.length} fotos/videos)</h4>
                    <p className="text-xs text-slate-500">Muestra proyectos reales de plomería, HVAC, carpintería y mantenimiento estacional.</p>
                  </div>
                  <button
                    onClick={() => setNewGalleryModal(true)}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm cursor-pointer whitespace-nowrap"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Añadir a la Galería</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {config.gallery.map((item) => (
                    <div key={item.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs flex flex-col justify-between">
                      <div className="relative h-44 bg-slate-900">
                        <img
                          src={item.afterImageUrl || item.imageUrl}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/70 text-white font-bold text-[10px]">
                          {item.category}
                        </span>
                        {item.type === 'before_after' && (
                          <span className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-amber-500 text-black font-black text-[10px]">
                            ANTES / DESPUÉS
                          </span>
                        )}
                        {item.type === 'video' && (
                          <span className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-purple-600 text-white font-black text-[10px]">
                            VIDEO
                          </span>
                        )}
                      </div>

                      <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="text-[11px] font-semibold text-emerald-800">{item.location} • {item.completionDate}</div>
                          <h5 className="font-bold text-slate-900 text-xs leading-snug mt-1">{item.title}</h5>
                          <p className="text-[11px] text-slate-600 line-clamp-2 mt-1">{item.description}</p>
                        </div>

                        <div className="pt-2 border-t flex items-center justify-between">
                          <button
                            onClick={() => handleOpenEditGallery(item)}
                            className="text-emerald-700 hover:text-emerald-800 text-xs font-bold flex items-center gap-1 cursor-pointer bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-lg transition-colors"
                          >
                            <Edit className="w-3.5 h-3.5" />
                            <span>Editar</span>
                          </button>
                          <button
                            onClick={() => handleDeleteGalleryItem(item.id)}
                            className="text-red-500 hover:text-red-700 text-xs font-bold flex items-center gap-1 cursor-pointer hover:bg-red-50 px-2 py-1 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Eliminar</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Explicit Save Button for Gallery */}
                <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">Guarda permanentemente todos los cambios en la galería de fotos y proyectos.</span>
                  <button
                    onClick={() => {
                      saveAndNotify('Galería de Proyectos');
                      showToast('¡Galería de proyectos guardada exitosamente!');
                    }}
                    className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm flex items-center gap-2 cursor-pointer transition-all hover:scale-105"
                  >
                    <Save className="w-4 h-4" />
                    <span>Guardar Galería de Proyectos</span>
                  </button>
                </div>

              </div>
            )}

            {/* ================= TAB 9: CLIENTES ================= */}
            {activeTab === 'clients' && (
              <div className="space-y-6 max-w-6xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h4 className="text-lg font-black text-[#0f2942]">Clientes ({config.clients.length})</h4>
                    <p className="text-xs text-slate-500">Administra los clientes activos, sus datos y la información que luego podrás reutilizar para generar schedule y seguimiento.</p>
                  </div>
                  <button
                    onClick={() => {
                      setEditingClientId(null);
                      setNewClientDraft({
                        fullName: '',
                        phone: '',
                        email: '',
                        address: '',
                        city: 'Bethesda',
                        state: 'MD',
                        zip: '20814',
                        sqft: '4,500 sq ft',
                        homeType: 'Single Family Home',
                        serviceType: 'Premier Care',
                        priorities: ['Preventative Maintenance'],
                        notes: '',
                        status: 'active'
                      });
                      setNewClientModal(true);
                    }}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm cursor-pointer whitespace-nowrap"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Añadir Cliente</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
                    <div className="text-[11px] font-bold uppercase text-slate-500">Total</div>
                    <div className="text-2xl font-black text-slate-900 mt-0.5">{config.clients.length}</div>
                  </div>
                  <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200 shadow-2xs">
                    <div className="text-[11px] font-bold uppercase text-emerald-800">Activos</div>
                    <div className="text-2xl font-black text-emerald-900 mt-0.5">{config.clients.filter(client => client.status === 'active').length}</div>
                  </div>
                  <div className="bg-slate-100 p-4 rounded-2xl border border-slate-200 shadow-2xs">
                    <div className="text-[11px] font-bold uppercase text-slate-700">Inactivos</div>
                    <div className="text-2xl font-black text-slate-900 mt-0.5">{config.clients.filter(client => client.status === 'inactive').length}</div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
                  <div className="divide-y divide-slate-200">
                    {config.clients.map((client) => (
                      <div key={client.id} className="p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                        <div className="space-y-1.5 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-bold text-slate-900 text-sm">{client.fullName}</span>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${client.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'}`}>
                              {client.status}
                            </span>
                            {client.serviceType && (
                              <span className="text-xs font-semibold text-slate-500">• {client.serviceType}</span>
                            )}
                          </div>

                          <div className="text-xs text-slate-600 flex items-center gap-3 flex-wrap">
                            <span>📞 {client.phone}</span>
                            <span>•</span>
                            <span>✉️ {client.email || 'Sin email'}</span>
                            <span>•</span>
                            <span>📍 {client.address || 'Sin dirección'}, {client.city}, {client.state} {client.zip}</span>
                          </div>

                          <div className="text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
                            <strong>Propiedad:</strong> {client.sqft} ({client.homeType})
                            {client.priorities?.length > 0 && (
                              <div className="mt-1"><strong>Prioridades:</strong> {client.priorities.join(', ')}</div>
                            )}
                            {client.notes && <div className="text-slate-500 mt-1 italic">"{client.notes}"</div>}
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            onClick={() => {
                              setEditingClientId(client.id);
                              setNewClientDraft({ ...client });
                              setNewClientModal(true);
                            }}
                            className="text-emerald-700 hover:text-emerald-800 text-xs font-bold flex items-center gap-1 cursor-pointer bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-lg transition-colors"
                          >
                            <Edit className="w-3.5 h-3.5" />
                            <span>Editar</span>
                          </button>
                          <button
                            onClick={() => deleteClient(client.id)}
                            className="text-red-500 hover:text-red-700 text-xs font-bold flex items-center gap-1 cursor-pointer hover:bg-red-50 px-2 py-1 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Eliminar</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">Guarda permanentemente los clientes, su estado y el historial de contacto disponible para future schedules.</span>
                  <button
                    onClick={() => {
                      saveAndNotify('Clientes');
                      showToast('¡Clientes guardados exitosamente!');
                    }}
                    className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm flex items-center gap-2 cursor-pointer transition-all hover:scale-105"
                  >
                    <Save className="w-4 h-4" />
                    <span>Guardar Clientes</span>
                  </button>
                </div>
              </div>
            )}

            {/* ================= TAB 10: SCHEDULE Y CITAS (WALKTHROUGHS) ================= */}
            {activeTab === 'schedule' && (
              <div className="space-y-6 max-w-5xl">

                {/* Header with Stats & Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="text-lg font-black text-[#0f2942]">
                      Gestión de Schedule e Inspecciones Walkthrough
                    </h4>
                    <p className="text-xs text-slate-500">
                      Gestiona solicitudes de citas de inspección inicial gratuita de clientes, asigna técnicos y exporta a CSV.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleExportCsv}
                      className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Exportar CSV</span>
                    </button>
                    <button
                      onClick={() => setNewAptModal(true)}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm cursor-pointer whitespace-nowrap"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Crear Cita Manual</span>
                    </button>
                  </div>
                </div>

                {/* Stats Counters Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs">
                    <div className="text-[11px] font-bold uppercase text-slate-500">Total Solicitudes</div>
                    <div className="text-2xl font-black text-slate-900 mt-0.5">{config.appointments.length}</div>
                  </div>
                  <div className="bg-amber-50/70 p-3.5 rounded-2xl border border-amber-200 shadow-2xs">
                    <div className="text-[11px] font-bold uppercase text-amber-800">Pendientes de Confirmar</div>
                    <div className="text-2xl font-black text-amber-900 mt-0.5">
                      {config.appointments.filter(a => a.status === 'pending').length}
                    </div>
                  </div>
                  <div className="bg-blue-50/70 p-3.5 rounded-2xl border border-blue-200 shadow-2xs">
                    <div className="text-[11px] font-bold uppercase text-blue-800">Confirmadas / En Ruta</div>
                    <div className="text-2xl font-black text-blue-900 mt-0.5">
                      {config.appointments.filter(a => a.status === 'confirmed' || a.status === 'in_progress').length}
                    </div>
                  </div>
                  <div className="bg-emerald-50/70 p-3.5 rounded-2xl border border-emerald-200 shadow-2xs">
                    <div className="text-[11px] font-bold uppercase text-emerald-800">Completadas</div>
                    <div className="text-2xl font-black text-emerald-900 mt-0.5">
                      {config.appointments.filter(a => a.status === 'completed').length}
                    </div>
                  </div>
                </div>

                {/* Status Filter Buttons */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-500">Filtrar:</span>
                  {[
                    { id: 'all', label: 'Todas' },
                    { id: 'pending', label: 'Pendientes' },
                    { id: 'confirmed', label: 'Confirmadas' },
                    { id: 'completed', label: 'Completadas' },
                    { id: 'cancelled', label: 'Canceladas' }
                  ].map(f => (
                    <button
                      key={f.id}
                      onClick={() => setAppointmentStatusFilter(f.id)}
                      className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${appointmentStatusFilter === f.id
                        ? 'bg-[#0f2942] text-white'
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                        }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>

                {/* Appointments List Table */}
                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
                  <div className="divide-y divide-slate-200">
                    {config.appointments
                      .filter(a => appointmentStatusFilter === 'all' || a.status === appointmentStatusFilter)
                      .map((apt) => (
                        <div key={apt.id} className="p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">

                          <div className="space-y-1.5 flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-bold text-slate-900 text-sm">{apt.fullName}</span>
                              <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${apt.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                                apt.status === 'completed' ? 'bg-emerald-100 text-emerald-800' :
                                  apt.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                    'bg-amber-100 text-amber-800'
                                }`}>
                                {apt.status}
                              </span>
                              <span className="text-xs font-semibold text-slate-500">
                                📅 {apt.preferredDate} ({apt.preferredTime})
                              </span>
                            </div>

                            <div className="text-xs text-slate-600 flex items-center gap-3 flex-wrap">
                              <span>📍 {apt.address}, {apt.city}, {apt.state} {apt.zip}</span>
                              <span>•</span>
                              <span>📞 {apt.phone}</span>
                              <span>•</span>
                              <span>✉️ {apt.email}</span>
                            </div>

                            <div className="text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
                              <strong>Propiedad:</strong> {apt.sqft} ({apt.homeType}) • <strong>Prioridades:</strong> {apt.priorities.join(', ')}
                              {apt.notes && <div className="text-slate-500 mt-1 italic">"{apt.notes}"</div>}
                            </div>
                          </div>

                          {/* Quick Actions & Technician Assignment */}
                          <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-2 shrink-0">
                            <div className="flex items-center gap-2">
                              <span className="text-[11px] font-bold text-slate-600">Técnico:</span>
                              <select
                                value={apt.technicianAssigned || 'Sin asignar'}
                                onChange={(e) => updateAppointmentStatus(apt.id, apt.status, e.target.value)}
                                className="p-1.5 text-xs rounded-lg border border-slate-300 bg-white font-medium"
                              >
                                <option>Sin asignar</option>
                                <option>Mark Jenkins (Sr. Lead)</option>
                                <option>David Ross</option>
                                <option>Christopher Vance</option>
                                <option>Michael Sterling</option>
                              </select>
                            </div>

                            <div className="flex items-center gap-1.5 pt-1">
                              <button
                                onClick={() => updateAppointmentStatus(apt.id, 'confirmed')}
                                className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] cursor-pointer"
                              >
                                Confirmar
                              </button>
                              <button
                                onClick={() => updateAppointmentStatus(apt.id, 'completed')}
                                className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] cursor-pointer"
                              >
                                Completar
                              </button>
                              <button
                                onClick={() => updateAppointmentStatus(apt.id, 'cancelled')}
                                className="px-2.5 py-1 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-[11px] cursor-pointer"
                              >
                                Cancelar
                              </button>
                              <button
                                onClick={() => deleteAppointment(apt.id)}
                                className="p-1 text-red-500 hover:bg-red-50 rounded-lg cursor-pointer"
                                title="Eliminar cita"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                        </div>
                      ))}
                  </div>
                </div>

                {/* Explicit Save Button for Schedule */}
                <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">Guarda permanentemente las asignaciones de técnicos, estados y citas registradas.</span>
                  <button
                    onClick={() => {
                      saveAndNotify('Citas y Agendamientos');
                      showToast('¡Citas y agendamientos guardados exitosamente!');
                    }}
                    className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm flex items-center gap-2 cursor-pointer transition-all hover:scale-105"
                  >
                    <Save className="w-4 h-4" />
                    <span>Guardar Citas y Schedule</span>
                  </button>
                </div>

              </div>
            )}

            {/* ================= TAB 15: CONFIGURAR MODAL SCHEDULE ================= */}
            {activeTab === 'schedule-config' && (() => {
              const sm = config.scheduleModal || DEFAULT_SCHEDULE_MODAL_CONFIG;
              return (
                <div className="space-y-6 max-w-4xl">
                  <div>
                    <h4 className="text-lg font-black text-[#0f2942]">
                      Configuración del Modal de Schedule (Walkthrough)
                    </h4>
                    <p className="text-xs text-slate-500">
                      Personaliza todos los campos, textos, zonas, ciudades, lista de prioridades y opciones de metros cuadrados del modal que ven los clientes.
                    </p>
                  </div>

                  {/* Encabezado y Textos Generales */}
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                    <span className="text-xs font-bold text-slate-900 block border-b pb-2">
                      Encabezado del Modal & Textos Principales
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-bold text-slate-700 block mb-1">Badge Superior:</label>
                        <input
                          type="text"
                          value={sm.badge}
                          onChange={e => updateScheduleModal({ badge: e.target.value })}
                          className="w-full p-2 text-xs rounded-xl border border-slate-300"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-slate-700 block mb-1">Título del Modal:</label>
                        <input
                          type="text"
                          value={sm.title}
                          onChange={e => updateScheduleModal({ title: e.target.value })}
                          className="w-full p-2 text-xs rounded-xl border border-slate-300 font-bold"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">Subtítulo / Explicación:</label>
                      <textarea
                        rows={2}
                        value={sm.subtitle || ''}
                        onChange={e => updateScheduleModal({ subtitle: e.target.value })}
                        className="w-full p-2 text-xs rounded-xl border border-slate-300"
                      />
                    </div>
                  </div>

                  {/* Paso 1: Ubicación y Metros Cuadrados */}
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                    <span className="text-xs font-bold text-slate-900 block border-b pb-2">
                      Paso 1: Ubicación, Tipos de Propiedad y Metros Cuadrados (Puesto a mano por el cliente)
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-bold text-slate-700 block mb-1">Título Paso 1:</label>
                        <input
                          type="text"
                          value={sm.step1Title}
                          onChange={e => updateScheduleModal({ step1Title: e.target.value })}
                          className="w-full p-2 text-xs rounded-xl border border-slate-300 font-bold"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-slate-700 block mb-1">Subtítulo Paso 1:</label>
                        <input
                          type="text"
                          value={sm.step1Subtitle}
                          onChange={e => updateScheduleModal({ step1Subtitle: e.target.value })}
                          className="w-full p-2 text-xs rounded-xl border border-slate-300"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div>
                        <label className="text-[11px] font-bold text-slate-700 block mb-1">Label Dirección:</label>
                        <input
                          type="text"
                          value={sm.addressLabel}
                          onChange={e => updateScheduleModal({ addressLabel: e.target.value })}
                          className="w-full p-2 text-xs rounded-xl border border-slate-300"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-slate-700 block mb-1">Label Ciudad:</label>
                        <input
                          type="text"
                          value={sm.cityLabel}
                          onChange={e => updateScheduleModal({ cityLabel: e.target.value })}
                          className="w-full p-2 text-xs rounded-xl border border-slate-300"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-slate-700 block mb-1">Label Estado / Región:</label>
                        <input
                          type="text"
                          value={sm.stateLabel}
                          onChange={e => updateScheduleModal({ stateLabel: e.target.value })}
                          className="w-full p-2 text-xs rounded-xl border border-slate-300"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-slate-700 block mb-1">Label Código Postal:</label>
                        <input
                          type="text"
                          value={sm.zipLabel}
                          onChange={e => updateScheduleModal({ zipLabel: e.target.value })}
                          className="w-full p-2 text-xs rounded-xl border border-slate-300"
                        />
                      </div>
                    </div>

                    {/* Metros Cuadrados / Sqft */}
                    <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-200 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-emerald-950">
                          📐 Campo de Metros Cuadrados / Pies Cuadrados (Entrada Manual)
                        </span>
                        <span className="text-[10px] text-emerald-700 bg-emerald-100 font-semibold px-2 py-0.5 rounded-full">
                          El cliente puede escribir libremente a mano
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-[11px] font-bold text-slate-700 block mb-1">Label Metros / Sq Ft:</label>
                          <input
                            type="text"
                            value={sm.sqftLabel}
                            onChange={e => updateScheduleModal({ sqftLabel: e.target.value })}
                            className="w-full p-2 text-xs rounded-xl border border-slate-300 bg-white font-bold"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] font-bold text-slate-700 block mb-1">Placeholder del Campo:</label>
                          <input
                            type="text"
                            value={sm.sqftPlaceholder}
                            onChange={e => updateScheduleModal({ sqftPlaceholder: e.target.value })}
                            className="w-full p-2 text-xs rounded-xl border border-slate-300 bg-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-slate-700 block mb-1">
                          Botones Rápidos de Sugerencia / Presets (uno por línea):
                        </label>
                        <textarea
                          rows={4}
                          value={sm.sqftPresets.join('\n')}
                          onChange={e => updateScheduleModal({ sqftPresets: e.target.value.split('\n').map(s => s.trim()).filter(Boolean) })}
                          className="w-full p-2 text-xs rounded-xl border border-slate-300 bg-white font-mono"
                          placeholder="Under 3,000 sq ft (280 m²)&#10;3,000 - 5,000 sq ft (460 m²)..."
                        />
                      </div>
                    </div>

                    {/* Estados y Ciudades disponibles en el modal */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-bold text-slate-700 block mb-1">
                          Estados / Regiones Disponibles en el Selector (uno por línea):
                        </label>
                        <textarea
                          rows={4}
                          value={sm.availableStates.join('\n')}
                          onChange={e => updateScheduleModal({ availableStates: e.target.value.split('\n').map(s => s.trim()).filter(Boolean) })}
                          className="w-full p-2 text-xs rounded-xl border border-slate-300 font-mono"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-slate-700 block mb-1">
                          Tipos de Residencia / Propiedad (uno por línea):
                        </label>
                        <textarea
                          rows={4}
                          value={sm.homeTypes.join('\n')}
                          onChange={e => updateScheduleModal({ homeTypes: e.target.value.split('\n').map(s => s.trim()).filter(Boolean) })}
                          className="w-full p-2 text-xs rounded-xl border border-slate-300 font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">
                        Ciudades Disponibles para Autocompletar / Datalist (una por línea):
                      </label>
                      <textarea
                        rows={4}
                        value={sm.availableCities.join('\n')}
                        onChange={e => updateScheduleModal({ availableCities: e.target.value.split('\n').map(s => s.trim()).filter(Boolean) })}
                        className="w-full p-2 text-xs rounded-xl border border-slate-300 font-mono"
                        placeholder="Greenwich&#10;Stamford&#10;Westport..."
                      />
                    </div>
                  </div>

                  {/* Paso 2: Prioridades */}
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                    <span className="text-xs font-bold text-slate-900 block border-b pb-2">
                      Paso 2: Metas, Prioridades y Notas Específicas
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-bold text-slate-700 block mb-1">Título Paso 2:</label>
                        <input
                          type="text"
                          value={sm.step2Title}
                          onChange={e => updateScheduleModal({ step2Title: e.target.value })}
                          className="w-full p-2 text-xs rounded-xl border border-slate-300 font-bold"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-slate-700 block mb-1">Subtítulo Paso 2:</label>
                        <input
                          type="text"
                          value={sm.step2Subtitle}
                          onChange={e => updateScheduleModal({ step2Subtitle: e.target.value })}
                          className="w-full p-2 text-xs rounded-xl border border-slate-300"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">
                        Lista de Opciones / Prioridades (una por línea):
                      </label>
                      <textarea
                        rows={6}
                        value={sm.prioritiesList.join('\n')}
                        onChange={e => updateScheduleModal({ prioritiesList: e.target.value.split('\n').map(s => s.trim()).filter(Boolean) })}
                        className="w-full p-2 text-xs rounded-xl border border-slate-300 font-mono"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-bold text-slate-700 block mb-1">Label Campo de Notas:</label>
                        <input
                          type="text"
                          value={sm.notesLabel}
                          onChange={e => updateScheduleModal({ notesLabel: e.target.value })}
                          className="w-full p-2 text-xs rounded-xl border border-slate-300"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-slate-700 block mb-1">Placeholder Campo de Notas:</label>
                        <input
                          type="text"
                          value={sm.notesPlaceholder}
                          onChange={e => updateScheduleModal({ notesPlaceholder: e.target.value })}
                          className="w-full p-2 text-xs rounded-xl border border-slate-300"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Paso 3: Contacto, Horarios y Garantía */}
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                    <span className="text-xs font-bold text-slate-900 block border-b pb-2">
                      Paso 3: Datos de Contacto, Franjas Horarias & Garantía
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-bold text-slate-700 block mb-1">Título Paso 3:</label>
                        <input
                          type="text"
                          value={sm.step3Title}
                          onChange={e => updateScheduleModal({ step3Title: e.target.value })}
                          className="w-full p-2 text-xs rounded-xl border border-slate-300 font-bold"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-slate-700 block mb-1">Subtítulo Paso 3:</label>
                        <input
                          type="text"
                          value={sm.step3Subtitle}
                          onChange={e => updateScheduleModal({ step3Subtitle: e.target.value })}
                          className="w-full p-2 text-xs rounded-xl border border-slate-300"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="text-[11px] font-bold text-slate-700 block mb-1">Label Nombre Completo:</label>
                        <input
                          type="text"
                          value={sm.fullNameLabel}
                          onChange={e => updateScheduleModal({ fullNameLabel: e.target.value })}
                          className="w-full p-2 text-xs rounded-xl border border-slate-300"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-slate-700 block mb-1">Label Teléfono:</label>
                        <input
                          type="text"
                          value={sm.phoneLabel}
                          onChange={e => updateScheduleModal({ phoneLabel: e.target.value })}
                          className="w-full p-2 text-xs rounded-xl border border-slate-300"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-slate-700 block mb-1">Label Email:</label>
                        <input
                          type="text"
                          value={sm.emailLabel}
                          onChange={e => updateScheduleModal({ emailLabel: e.target.value })}
                          className="w-full p-2 text-xs rounded-xl border border-slate-300"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-bold text-slate-700 block mb-1">Label Fecha Preferida:</label>
                        <input
                          type="text"
                          value={sm.preferredDateLabel}
                          onChange={e => updateScheduleModal({ preferredDateLabel: e.target.value })}
                          className="w-full p-2 text-xs rounded-xl border border-slate-300"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-slate-700 block mb-1">Label Franja Horaria:</label>
                        <input
                          type="text"
                          value={sm.preferredTimeLabel}
                          onChange={e => updateScheduleModal({ preferredTimeLabel: e.target.value })}
                          className="w-full p-2 text-xs rounded-xl border border-slate-300"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">
                        Franjas Horarias Disponibles (una por línea):
                      </label>
                      <textarea
                        rows={3}
                        value={sm.timeSlots.join('\n')}
                        onChange={e => updateScheduleModal({ timeSlots: e.target.value.split('\n').map(s => s.trim()).filter(Boolean) })}
                        className="w-full p-2 text-xs rounded-xl border border-slate-300 font-mono"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">Texto de Garantía y Cero Obligación:</label>
                      <textarea
                        rows={3}
                        value={sm.guaranteeText}
                        onChange={e => updateScheduleModal({ guaranteeText: e.target.value })}
                        className="w-full p-2 text-xs rounded-xl border border-slate-300"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">Texto del Botón Final:</label>
                      <input
                        type="text"
                        value={sm.submitButtonText}
                        onChange={e => updateScheduleModal({ submitButtonText: e.target.value })}
                        className="w-full p-2 text-xs rounded-xl border border-slate-300 font-bold text-emerald-700"
                      />
                    </div>
                  </div>

                  {/* Pantalla de Confirmación */}
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                    <span className="text-xs font-bold text-slate-900 block border-b pb-2">
                      Pantalla de Confirmación Exitosa
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-bold text-slate-700 block mb-1">Título de Confirmación:</label>
                        <input
                          type="text"
                          value={sm.successTitle}
                          onChange={e => updateScheduleModal({ successTitle: e.target.value })}
                          className="w-full p-2 text-xs rounded-xl border border-slate-300 font-bold"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-slate-700 block mb-1">Badge de Confirmación:</label>
                        <input
                          type="text"
                          value={sm.successBadge}
                          onChange={e => updateScheduleModal({ successBadge: e.target.value })}
                          className="w-full p-2 text-xs rounded-xl border border-slate-300"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">Mensaje de Confirmación:</label>
                      <textarea
                        rows={2}
                        value={sm.successMessage}
                        onChange={e => updateScheduleModal({ successMessage: e.target.value })}
                        className="w-full p-2 text-xs rounded-xl border border-slate-300"
                      />
                    </div>
                  </div>

                  {/* Botón Guardar */}
                  <div className="pt-2 flex justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        saveAndNotify('Configuración Modal Schedule');
                        showToast('¡Configuración del Modal Schedule guardada exitosamente!');
                      }}
                      className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm flex items-center gap-2 cursor-pointer transition-all hover:scale-105"
                    >
                      <Save className="w-4 h-4" />
                      <span>Guardar Configuración Modal Schedule</span>
                    </button>
                  </div>
                </div>
              );
            })()}

            {/* ================= TAB 9: FOOTER Y CONTACTO ================= */}
            {activeTab === 'footer' && (
              <div className="space-y-6 max-w-3xl">
                <div>
                  <h4 className="text-lg font-black text-[#0f2942]">Configuración de Pie de Página (Footer)</h4>
                  <p className="text-xs text-slate-500">Edita la descripción legal, información del boletín estacional, teléfonos y licencias.</p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                  <span className="text-xs font-bold text-slate-900 block border-b pb-2">Boletín de Guía Estacional</span>
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">Badge del Boletín (ej: "Free Homeowner Resource"):</label>
                    <input
                      type="text"
                      value={config.footer.newsletterBadge || ''}
                      onChange={(e) => updateFooter({ newsletterBadge: e.target.value })}
                      placeholder="Free Homeowner Resource"
                      className="w-full p-2 text-xs rounded-xl border border-slate-300 font-bold text-emerald-700"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">Título del Banner del Boletín:</label>
                    <input
                      type="text"
                      value={config.footer.newsletterTitle}
                      onChange={(e) => updateFooter({ newsletterTitle: e.target.value })}
                      className="w-full p-2 text-xs rounded-xl border border-slate-300 font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">Subtítulo:</label>
                    <textarea
                      rows={2}
                      value={config.footer.newsletterSubtitle}
                      onChange={(e) => updateFooter({ newsletterSubtitle: e.target.value })}
                      className="w-full p-2 text-xs rounded-xl border border-slate-300"
                    />
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                  <span className="text-xs font-bold text-slate-900 block border-b pb-2">Datos de Contacto y Licencias</span>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">Teléfono Principal:</label>
                      <input
                        type="text"
                        value={config.footer.emergencyPhone || config.footer.phone || ''}
                        onChange={(e) => updateFooter({ emergencyPhone: e.target.value, phone: e.target.value })}
                        className="w-full p-2 text-xs rounded-xl border border-slate-300 font-bold"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">Línea de Despacho:</label>
                      <input
                        type="text"
                        value={config.footer.emergencyDispatchText}
                        onChange={(e) => updateFooter({ emergencyDispatchText: e.target.value })}
                        className="w-full p-2 text-xs rounded-xl border border-slate-300"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">Licencias Estatales:</label>
                    <input
                      type="text"
                      value={config.footer.licenseText}
                      onChange={(e) => updateFooter({ licenseText: e.target.value })}
                      className="w-full p-2 text-xs rounded-xl border border-slate-300 text-slate-600 font-mono text-[11px]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">Texto de Derechos Reservados (Copyright):</label>
                    <input
                      type="text"
                      value={config.footer.copyrightText}
                      onChange={(e) => updateFooter({ copyrightText: e.target.value })}
                      className="w-full p-2 text-xs rounded-xl border border-slate-300 text-slate-600 text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">Descripción corta (debajo del logo en footer):</label>
                    <textarea
                      rows={2}
                      value={config.footer.description || ''}
                      onChange={(e) => updateFooter({ description: e.target.value })}
                      className="w-full p-2 text-xs rounded-xl border border-slate-300"
                    />
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                  <span className="text-xs font-bold text-slate-900 block border-b pb-2">Colores del Pie de Página</span>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">Fondo:</label>
                      <input
                        type="color"
                        value={config.footer.bgColor || '#0f2942'}
                        onChange={(e) => updateFooter({ bgColor: e.target.value })}
                        className="w-full h-8 rounded border border-slate-300 cursor-pointer"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">Texto Principal:</label>
                      <input
                        type="color"
                        value={config.footer.textColor || '#ffffff'}
                        onChange={(e) => updateFooter({ textColor: e.target.value })}
                        className="w-full h-8 rounded border border-slate-300 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                  <div className="flex items-center justify-between border-b pb-2">
                    <span className="text-xs font-bold text-slate-900">Regiones de Servicio (Footer)</span>
                    <button
                      onClick={() => {
                        const name = prompt('Nombre de la región');
                        if (name) updateFooter({ serviceRegions: [...(config.footer.serviceRegions || []), { id: Date.now().toString(), name }] });
                      }}
                      className="text-xs font-bold text-emerald-600 cursor-pointer"
                    >+ Añadir Región</button>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {(config.footer.serviceRegions || []).map((region, idx) => (
                      <div key={region.id} className="flex items-center bg-slate-50 p-2 rounded-lg border border-slate-200">
                        <input
                          type="text"
                          value={region.name}
                          onChange={(e) => {
                            const arr = [...config.footer.serviceRegions!];
                            arr[idx].name = e.target.value;
                            updateFooter({ serviceRegions: arr });
                          }}
                          className="w-full text-xs bg-transparent outline-none"
                        />
                        <button onClick={() => {
                          const arr = [...config.footer.serviceRegions!];
                          arr.splice(idx, 1);
                          updateFooter({ serviceRegions: arr });
                        }} className="text-red-500 ml-2">
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                  <div className="flex items-center justify-between border-b pb-2">
                    <span className="text-xs font-bold text-slate-900">Enlaces Rápidos (Quick Links)</span>
                    <button
                      onClick={() => {
                        const label = prompt('Nombre del enlace');
                        if (label) updateFooter({ quickLinks: [...(config.footer.quickLinks || []), { id: Date.now().toString(), label, url: '#' }] });
                      }}
                      className="text-xs font-bold text-emerald-600 cursor-pointer"
                    >+ Añadir Enlace</button>
                  </div>
                  <div className="space-y-2">
                    {(config.footer.quickLinks || []).map((link, idx) => (
                      <div key={link.id} className="flex gap-2">
                        <input
                          type="text"
                          value={link.label}
                          onChange={(e) => {
                            const arr = [...config.footer.quickLinks!];
                            arr[idx].label = e.target.value;
                            updateFooter({ quickLinks: arr });
                          }}
                          className="flex-1 p-2 text-xs rounded-lg border border-slate-300"
                        />
                        <input
                          type="text"
                          value={link.url}
                          onChange={(e) => {
                            const arr = [...config.footer.quickLinks!];
                            arr[idx].url = e.target.value;
                            updateFooter({ quickLinks: arr });
                          }}
                          className="flex-1 p-2 text-xs rounded-lg border border-slate-300"
                        />
                        <button onClick={() => {
                          const arr = [...config.footer.quickLinks!];
                          arr.splice(idx, 1);
                          updateFooter({ quickLinks: arr });
                        }} className="p-2 text-red-500">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Explicit Save Button for Footer */}
                <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">Guarda permanentemente el pie de página, contacto, teléfonos y copyright.</span>
                  <button
                    onClick={() => {
                      saveAndNotify('Pie de Página y Contacto');
                      showToast('¡Pie de página guardado exitosamente!');
                    }}
                    className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm flex items-center gap-2 cursor-pointer transition-all hover:scale-105"
                  >
                    <Save className="w-4 h-4" />
                    <span>Guardar Pie de Página y Contacto</span>
                  </button>
                </div>

              </div>
            )}

            {/* ================= TAB: USUARIO ADMIN & IDIOMA ================= */}
            {activeTab === 'usuario' && (
              <div className="space-y-6 max-w-3xl">
                <div>
                  <h4 className="text-lg font-black text-[#0f2942]">
                    {t('Credenciales de Acceso & Preferencias del Administrador', 'Admin Access Credentials & Language Preferences')}
                  </h4>
                  <p className="text-xs text-slate-500">
                    {t('Cambia el nombre de usuario, la contraseña y el idioma de la interfaz del panel de control.', 'Change administrator username, password, and the dashboard interface language.')}
                  </p>
                </div>

                {/* Idioma de la interfaz */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-emerald-600" />
                    <span className="text-xs font-bold text-slate-900">
                      {t('Idioma del Panel de Control', 'Admin Dashboard Language')}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    {t('Selecciona el idioma con el que deseas trabajar en el panel CMS.', 'Select the language you want to use inside the CMS admin panel.')}
                  </p>
                  <div className="flex items-center gap-3 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        toggleLang('es');
                        showToast('Idioma cambiado a Español');
                      }}
                      className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer transition-all ${
                        adminLang === 'es'
                          ? 'bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-500/30'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      <span className="text-base">🇪🇸</span>
                      <span>Español (ES)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        toggleLang('en');
                        showToast('Language switched to English');
                      }}
                      className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer transition-all ${
                        adminLang === 'en'
                          ? 'bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-500/30'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      <span className="text-base">🇺🇸</span>
                      <span>English (EN)</span>
                    </button>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                  <span className="text-xs font-bold text-slate-900 block">
                    {t('Usuario y Contraseña de Acceso', 'Admin Username & Password')}
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                      <label className="text-xs font-bold text-slate-800 block">
                        {t('Nombre de usuario', 'Username')}
                      </label>
                      <input
                        type="text"
                        value={config.adminUsername}
                        onChange={(e) => updateAdminCredentials({ adminUsername: e.target.value })}
                        className="w-full p-2 text-xs rounded-lg border border-slate-300 bg-white"
                        placeholder="admin"
                      />
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                      <label className="text-xs font-bold text-slate-800 block">
                        {t('Contraseña', 'Password')}
                      </label>
                      <input
                        type="text"
                        value={config.adminPassword}
                        onChange={(e) => updateAdminCredentials({ adminPassword: e.target.value })}
                        className="w-full p-2 text-xs rounded-lg border border-slate-300 bg-white"
                        placeholder="admin"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-slate-900">
                      {t('Mostrar botón Admin en el sitio', 'Show Admin button on live site')}
                    </div>
                    <p className="text-[11px] text-slate-500">
                      {t('Controla si el acceso al panel admin es visible para los visitantes.', 'Controls whether the admin login trigger is visible in the header for visitors.')}
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={config.header.showAdminButton}
                    onChange={(e) => updateHeader({ showAdminButton: e.target.checked })}
                    className="w-5 h-5 accent-emerald-600 cursor-pointer"
                  />
                </div>

                <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">Guarda los datos del usuario administrador.</span>
                  <button
                    onClick={() => {
                      saveAndNotify('Credenciales de Usuario');
                      showToast('¡Credenciales guardadas exitosamente!');
                    }}
                    className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm flex items-center gap-2 cursor-pointer transition-all hover:scale-105"
                  >
                    <Save className="w-4 h-4" />
                    <span>Guardar Credenciales</span>
                  </button>
                </div>
              </div>
            )}

            {/* ================= TAB: WHATSAPP ================= */}
            {activeTab === 'whatsapp' && (
              <div className="space-y-6 max-w-3xl">
                <div>
                  <h4 className="text-lg font-black text-[#0f2942]">Botón Flotante de WhatsApp</h4>
                  <p className="text-xs text-slate-500">Configura el botón flotante de WhatsApp que aparece en la esquina inferior derecha de tu sitio web.</p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">Activar Botón de WhatsApp</span>
                      <p className="text-[11px] text-slate-500">Muestra u oculta el botón flotante verde en la esquina inferior derecha.</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={config.header.whatsappEnabled}
                      onChange={(e) => updateHeader({ whatsappEnabled: e.target.checked })}
                      className="w-5 h-5 accent-emerald-600 cursor-pointer"
                    />
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                  <span className="text-xs font-bold text-slate-900 block">Número y Mensaje</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                      <label className="text-xs font-bold text-slate-800 block">Número de WhatsApp</label>
                      <input
                        type="text"
                        value={config.header.whatsappPhone}
                        onChange={(e) => updateHeader({ whatsappPhone: e.target.value })}
                        className="w-full p-2 text-xs rounded-lg border border-slate-300 bg-white"
                        placeholder="+1 (888) 555-2273"
                      />
                      <p className="text-[10px] text-slate-400">Incluye código de país. Ej: +1 para USA, +598 para Uruguay.</p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                      <label className="text-xs font-bold text-slate-800 block">Teléfono de emergencia</label>
                      <input
                        type="text"
                        value={config.header.topBar.emergencyPhone}
                        onChange={(e) => updateHeader({
                          topBar: { ...config.header.topBar, emergencyPhone: e.target.value },
                          whatsappPhone: e.target.value
                        })}
                        className="w-full p-2 text-xs rounded-lg border border-slate-300 bg-white"
                        placeholder="(888) 555-CARE"
                      />
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                    <label className="text-xs font-bold text-slate-800 block">Mensaje personalizado inicial</label>
                    <textarea
                      rows={3}
                      value={config.header.whatsappMessage}
                      onChange={(e) => updateHeader({ whatsappMessage: e.target.value })}
                      className="w-full p-2 text-xs rounded-lg border border-slate-300 bg-white"
                      placeholder="Hola, me gustaría conocer más sobre sus servicios."
                    />
                    <p className="text-[10px] text-slate-400">Este mensaje se pre-carga automáticamente cuando el visitante hace clic en el botón.</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">Guarda la configuración del botón de WhatsApp.</span>
                  <button
                    onClick={() => {
                      saveAndNotify('Configuración de WhatsApp');
                      showToast('¡Configuración de WhatsApp guardada!');
                    }}
                    className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm flex items-center gap-2 cursor-pointer transition-all hover:scale-105"
                  >
                    <Save className="w-4 h-4" />
                    <span>Guardar WhatsApp</span>
                  </button>
                </div>
              </div>
            )}

            {/* ================= TAB 10: BACKUP Y RESTAURACION ================= */}
            {activeTab === 'backup' && (
              <div className="space-y-6 max-w-2xl">
                <div>
                  <h4 className="text-lg font-black text-[#0f2942]">Copia de Seguridad y Restauración</h4>
                  <p className="text-xs text-slate-500">Exporta toda la configuración del CMS a un archivo JSON o restáurala en cualquier momento.</p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
                      <Download className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="font-bold text-slate-900 text-sm">Exportar Configuración Completa</h5>
                      <p className="text-xs text-slate-500">Descarga un archivo JSON con todos los estilos, sliders, citas, checklists y fotos.</p>
                    </div>
                  </div>
                  <button
                    onClick={exportConfigAsJson}
                    className="w-full py-2.5 rounded-xl bg-[#0f2942] hover:bg-[#16385d] text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Descargar Backup JSON</span>
                  </button>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold">
                      <Upload className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="font-bold text-slate-900 text-sm">Importar Archivo JSON</h5>
                      <p className="text-xs text-slate-500">Carga un archivo de copia de seguridad previamente exportado.</p>
                    </div>
                  </div>
                  <label className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer">
                    <Upload className="w-4 h-4" />
                    <span>Seleccionar Archivo JSON</span>
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                <div className="bg-red-50 p-6 rounded-2xl border border-red-200 space-y-3">
                  <div className="flex items-center gap-2 text-red-800 font-bold text-xs">
                    <AlertCircle className="w-4 h-4" />
                    <span>Zona de Peligro: Restablecer a Valores de Fábrica</span>
                  </div>
                  <p className="text-xs text-red-700 leading-relaxed">
                    Esto eliminará todas las personalizaciones y volverá al contenido inicial por defecto del sistema.
                  </p>
                  <button
                    onClick={() => {
                      if (confirm('¿Estás seguro de que deseas restablecer todos los datos del CMS a sus valores originales de fábrica?')) {
                        resetToDefaults();
                        showToast('Configuración restablecida');
                      }
                    }}
                    className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs cursor-pointer"
                  >
                    Restablecer Todo a Valores por Defecto
                  </button>
                </div>

              </div>
            )}

            {/* ================= TAB 3: PÁGINAS CMS ================= */}
            {activeTab === 'pages' && (
              <div className="space-y-6 max-w-5xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="text-lg font-black text-[#0f2942]">Páginas Dinámicas</h4>
                    <p className="text-xs text-slate-500">Crea páginas nuevas en el sitio con URLs únicas y agrégales secciones.</p>
                  </div>
                  <button
                    onClick={() => {
                      const title = prompt('Título de la nueva página (e.g. Sobre Nosotros)');
                      if (title) {
                        const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                        addPage({
                          title,
                          slug,
                          enabled: true,
                          sections: []
                        });
                        showToast('Página creada exitosamente');
                      }
                    }}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Añadir Página</span>
                  </button>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
                  <div className="divide-y divide-slate-200">
                    {config.pages?.length === 0 && (
                      <div className="p-8 text-center text-slate-500 text-sm">
                        No hay páginas personalizadas todavía. Crea una para empezar.
                      </div>
                    )}
                    {config.pages?.map((page) => (
                      <div key={page.id} className="p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="space-y-1">
                          <h5 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                            {page.title}
                            <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${page.enabled ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'}`}>
                              {page.enabled ? 'Pública' : 'Borrador'}
                            </span>
                          </h5>
                          <div className="text-xs text-slate-500">
                            <strong>URL:</strong> /{page.slug}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <label className="flex items-center gap-1 text-xs font-semibold text-slate-600 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={page.enabled}
                              onChange={(e) => updatePage(page.id, { enabled: e.target.checked })}
                              className="w-4 h-4 accent-emerald-600"
                            />
                            <span>Activa</span>
                          </label>
                          <button
                            onClick={() => {
                              const newTitle = prompt('Editar título', page.title);
                              if (newTitle) updatePage(page.id, { title: newTitle });
                            }}
                            className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer ml-2"
                            title="Editar Título"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`¿Eliminar la página ${page.title}?`)) {
                                deletePage(page.id);
                                showToast('Página eliminada');
                              }
                            }}
                            className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg cursor-pointer"
                            title="Eliminar Página"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 flex justify-end">
                  <button
                    onClick={() => {
                      saveAndNotify('Páginas');
                    }}
                    className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 cursor-pointer transition-all hover:scale-105"
                  >
                    <Save className="w-4 h-4" />
                    <span>Guardar Páginas</span>
                  </button>
                </div>
              </div>
            )}

            {/* ================= TAB 8: PREGUNTAS FRECUENTES (FAQ) ================= */}
            {activeTab === 'faqs' && (
              <div className="space-y-6 max-w-5xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="text-lg font-black text-[#0f2942]">Preguntas Frecuentes (FAQ)</h4>
                    <p className="text-xs text-slate-500">Administra las preguntas frecuentes, respuestas y categorías.</p>
                  </div>
                  <button
                    onClick={() => {
                      setNewFaqDraft({ question: '', answer: '', category: 'general', hidden: false });
                      setNewFaqModal(true);
                    }}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Añadir FAQ</span>
                  </button>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
                  <div className="divide-y divide-slate-200">
                    {config.faqs?.map((faq, idx) => (
                      <div key={idx} className="p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="space-y-1 max-w-2xl">
                          <h5 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                            {faq.question}
                            <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-blue-100 text-blue-800">
                              {faq.category}
                            </span>
                            {faq.hidden && (
                              <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-slate-200 text-slate-700">
                                Oculto
                              </span>
                            )}
                          </h5>
                          <p className="text-xs text-slate-600 line-clamp-2">{faq.answer}</p>
                        </div>

                        <div className="flex items-center gap-2">
                          <label className="flex items-center gap-1 text-xs font-semibold text-slate-600 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={!faq.hidden}
                              onChange={(e) => {
                                const newFaqs = [...config.faqs];
                                newFaqs[idx] = { ...faq, hidden: !e.target.checked };
                                updateFaqs(newFaqs);
                              }}
                              className="w-4 h-4 accent-emerald-600"
                            />
                            <span>Visible</span>
                          </label>
                          <button
                            onClick={() => {
                              const newFaqs = [...config.faqs];
                              newFaqs.splice(idx, 1);
                              updateFaqs(newFaqs);
                            }}
                            className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg cursor-pointer ml-2"
                            title="Eliminar FAQ"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 flex justify-end">
                  <button
                    onClick={() => {
                      saveAndNotify('FAQs');
                    }}
                    className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 cursor-pointer transition-all hover:scale-105"
                  >
                    <Save className="w-4 h-4" />
                    <span>Guardar FAQs</span>
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>

      </div >

      {/* MODAL: NUEVA FAQ */}
      {
        newFaqModal && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 border border-slate-200 shadow-2xl">
              <div className="flex items-center justify-between border-b pb-2">
                <h5 className="font-bold text-[#0f2942] text-sm">Añadir Nueva Pregunta Frecuente</h5>
                <button onClick={() => setNewFaqModal(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Pregunta:</label>
                <input
                  type="text"
                  value={newFaqDraft.question}
                  onChange={(e) => setNewFaqDraft({ ...newFaqDraft, question: e.target.value })}
                  placeholder="Ej. ¿Qué incluye el mantenimiento?"
                  className="w-full p-2 text-xs rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Respuesta:</label>
                <textarea
                  rows={3}
                  value={newFaqDraft.answer}
                  onChange={(e) => setNewFaqDraft({ ...newFaqDraft, answer: e.target.value })}
                  placeholder="Detalla la respuesta a la pregunta..."
                  className="w-full p-2 text-xs rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Categoría:</label>
                <select
                  value={newFaqDraft.category}
                  onChange={(e) => setNewFaqDraft({ ...newFaqDraft, category: e.target.value })}
                  className="w-full p-2 text-xs rounded-xl border border-slate-300 bg-white"
                >
                  <option value="general">General & Coverage</option>
                  <option value="technicians">Technicians & Vetting</option>
                  <option value="pricing">Pricing & Contracts</option>
                  <option value="services">Handyman & Projects</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setNewFaqModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-bold cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => {
                    updateFaqs([...config.faqs, newFaqDraft]);
                    setNewFaqModal(false);
                    showToast('FAQ añadida exitosamente');
                  }}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold cursor-pointer"
                >
                  Guardar FAQ
                </button>
              </div>
            </div>
          </div>
        )
      }

      {/* MODAL: NUEVO PUNTO DE CHECKLIST */}
      {
        newChecklistModal && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 border border-slate-200 shadow-2xl">
              <div className="flex items-center justify-between border-b pb-2">
                <h5 className="font-bold text-[#0f2942] text-sm">Nuevo Punto de Mantenimiento Preventivo</h5>
                <button onClick={() => setNewChecklistModal(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Título de la Tarea:</label>
                <input
                  type="text"
                  value={newChecklistDraft.title}
                  onChange={(e) => setNewChecklistDraft({ ...newChecklistDraft, title: e.target.value })}
                  placeholder="e.g. Purga de Sedimentos en Calentador de Agua"
                  className="w-full p-2 text-xs rounded-xl border border-slate-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Categoría:</label>
                  <select
                    value={newChecklistDraft.category}
                    onChange={(e) => setNewChecklistDraft({ ...newChecklistDraft, category: e.target.value as any })}
                    className="w-full p-2 text-xs rounded-xl border border-slate-300 bg-white"
                  >
                    <option value="hvac">HVAC & Climatización</option>
                    <option value="plumbing">Plomería y Agua</option>
                    <option value="exterior">Techo y Exterior</option>
                    <option value="interior">Interiores y Seguridad</option>
                    <option value="appliances">Electrodomésticos</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Temporada:</label>
                  <select
                    value={newChecklistDraft.season}
                    onChange={(e) => setNewChecklistDraft({ ...newChecklistDraft, season: e.target.value as any })}
                    className="w-full p-2 text-xs rounded-xl border border-slate-300 bg-white"
                  >
                    <option value="spring">Primavera</option>
                    <option value="summer">Verano</option>
                    <option value="fall">Otoño</option>
                    <option value="winter">Invierno</option>
                    <option value="all">Todas las Visitas</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Descripción del Procedimiento:</label>
                <textarea
                  rows={2}
                  value={newChecklistDraft.description}
                  onChange={(e) => setNewChecklistDraft({ ...newChecklistDraft, description: e.target.value })}
                  placeholder="Describe el paso técnico que realiza el especialista..."
                  className="w-full p-2 text-xs rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Daño o Costo Prevenido:</label>
                <input
                  type="text"
                  value={newChecklistDraft.preventedDamage}
                  onChange={(e) => setNewChecklistDraft({ ...newChecklistDraft, preventedDamage: e.target.value })}
                  placeholder="e.g. Evita rotura del tanque de $2,800 e inundación repentina"
                  className="w-full p-2 text-xs rounded-xl border border-slate-300"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setNewChecklistModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-bold cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSaveChecklistDraft}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold cursor-pointer"
                >
                  Guardar Punto
                </button>
              </div>
            </div>
          </div>
        )
      }

      {/* MODAL: NUEVO PROYECTO DE GALERIA */}
      {
        newGalleryModal && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 border border-slate-200 shadow-2xl">
              <div className="flex items-center justify-between border-b pb-2">
                <h5 className="font-bold text-[#0f2942] text-sm">Nuevo Proyecto para la Galería</h5>
                <button onClick={() => setNewGalleryModal(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Título del Proyecto:</label>
                <input
                  type="text"
                  value={newGalleryDraft.title}
                  onChange={(e) => setNewGalleryDraft({ ...newGalleryDraft, title: e.target.value })}
                  placeholder="e.g. Sustitución de Calentador y Filtro Sedimentos"
                  className="w-full p-2 text-xs rounded-xl border border-slate-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Categoría:</label>
                  <select
                    value={newGalleryDraft.category}
                    onChange={(e) => setNewGalleryDraft({ ...newGalleryDraft, category: e.target.value as any })}
                    className="w-full p-2 text-xs rounded-xl border border-slate-300 bg-white"
                  >
                    <option>HVAC & Electrical</option>
                    <option>Plumbing & Tanks</option>
                    <option>Carpentry & Handyman</option>
                    <option>Exterior & Roof</option>
                    <option>Before & After</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Tipo:</label>
                  <select
                    value={newGalleryDraft.type}
                    onChange={(e) => setNewGalleryDraft({ ...newGalleryDraft, type: e.target.value as any })}
                    className="w-full p-2 text-xs rounded-xl border border-slate-300 bg-white"
                  >
                    <option value="single">Foto Individual</option>
                    <option value="before_after">Antes y Después (Comparador)</option>
                    <option value="video">Video Demostrativo</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">URL de Imagen Principal (o After):</label>
                <input
                  type="text"
                  value={newGalleryDraft.imageUrl}
                  onChange={(e) => setNewGalleryDraft({ ...newGalleryDraft, imageUrl: e.target.value, afterImageUrl: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full p-2 text-xs rounded-xl border border-slate-300"
                />
                <div className="mt-2">
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">Subir desde tu PC</label>
                  <input
                    type="file"
                    accept="image/*,video/*"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        await handleGalleryMediaUpload(file, newGalleryDraft.type === 'video' ? 'video' : 'image', 'new');
                        e.target.value = '';
                      }
                    }}
                    className="w-full text-xs rounded-xl border border-slate-300 bg-slate-50 p-2"
                  />
                </div>
              </div>

              {newGalleryDraft.type === 'before_after' && (
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">URL de Imagen "Antes" (Before):</label>
                  <input
                    type="text"
                    value={newGalleryDraft.beforeImageUrl}
                    onChange={(e) => setNewGalleryDraft({ ...newGalleryDraft, beforeImageUrl: e.target.value })}
                    placeholder="https://images.unsplash.com/... (Estado inicial deteriorado)"
                    className="w-full p-2 text-xs rounded-xl border border-slate-300"
                  />
                  <div className="mt-2">
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">Subir imagen Before desde tu PC</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          await handleGalleryMediaUpload(file, 'before', 'new');
                          e.target.value = '';
                        }
                      }}
                      className="w-full text-xs rounded-xl border border-slate-300 bg-slate-50 p-2"
                    />
                  </div>
                </div>
              )}

              {newGalleryDraft.type === 'video' && (
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">URL de Video o archivo local</label>
                  <input
                    type="text"
                    value={newGalleryDraft.videoUrl || ''}
                    onChange={(e) => setNewGalleryDraft({ ...newGalleryDraft, videoUrl: e.target.value })}
                    placeholder="https://.../video.mp4"
                    className="w-full p-2 text-xs rounded-xl border border-slate-300"
                  />
                  <div className="mt-2">
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">Subir video desde tu PC</label>
                    <input
                      type="file"
                      accept="video/*"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          await handleGalleryMediaUpload(file, 'video', 'new');
                          e.target.value = '';
                        }
                      }}
                      className="w-full text-xs rounded-xl border border-slate-300 bg-slate-50 p-2"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Descripción del Trabajo Realizado:</label>
                <textarea
                  rows={2}
                  value={newGalleryDraft.description}
                  onChange={(e) => setNewGalleryDraft({ ...newGalleryDraft, description: e.target.value })}
                  className="w-full p-2 text-xs rounded-xl border border-slate-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Ubicación / Ciudad:</label>
                  <input
                    type="text"
                    value={newGalleryDraft.location}
                    onChange={(e) => setNewGalleryDraft({ ...newGalleryDraft, location: e.target.value })}
                    placeholder="Bethesda, MD"
                    className="w-full p-2 text-xs rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Fecha / Temporada:</label>
                  <input
                    type="text"
                    value={newGalleryDraft.completionDate}
                    onChange={(e) => setNewGalleryDraft({ ...newGalleryDraft, completionDate: e.target.value })}
                    placeholder="Primavera 2026"
                    className="w-full p-2 text-xs rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setNewGalleryModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-bold cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSaveGalleryDraft}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold cursor-pointer"
                >
                  Guardar en Galería
                </button>
              </div>
            </div>
          </div>
        )
      }

      {/* MODAL: NUEVO CLIENTE */}
      {
        newClientModal && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
            <div className="bg-white rounded-2xl max-w-2xl w-full p-6 space-y-4 border border-slate-200 shadow-2xl">
              <div className="flex items-center justify-between border-b pb-2">
                <h5 className="font-bold text-[#0f2942] text-sm flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-emerald-600" />
                  <span>{editingClientId ? 'Editar Cliente' : 'Añadir Cliente'}</span>
                </h5>
                <button onClick={() => setNewClientModal(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Nombre Completo:</label>
                  <input
                    type="text"
                    value={newClientDraft.fullName || ''}
                    onChange={(e) => setNewClientDraft({ ...newClientDraft, fullName: e.target.value })}
                    placeholder="Nombre y Apellido"
                    className="w-full p-2 text-xs rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Teléfono:</label>
                  <input
                    type="text"
                    value={newClientDraft.phone || ''}
                    onChange={(e) => setNewClientDraft({ ...newClientDraft, phone: e.target.value })}
                    placeholder="(301) 555-0199"
                    className="w-full p-2 text-xs rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Email:</label>
                  <input
                    type="email"
                    value={newClientDraft.email || ''}
                    onChange={(e) => setNewClientDraft({ ...newClientDraft, email: e.target.value })}
                    placeholder="cliente@email.com"
                    className="w-full p-2 text-xs rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Tipo de Servicio:</label>
                  <input
                    type="text"
                    value={newClientDraft.serviceType || ''}
                    onChange={(e) => setNewClientDraft({ ...newClientDraft, serviceType: e.target.value })}
                    placeholder="Premier Care"
                    className="w-full p-2 text-xs rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-2">
                  <label className="text-xs font-bold text-slate-700 block mb-1">Dirección:</label>
                  <input
                    type="text"
                    value={newClientDraft.address || ''}
                    onChange={(e) => setNewClientDraft({ ...newClientDraft, address: e.target.value })}
                    placeholder="10408 Highland Dr"
                    className="w-full p-2 text-xs rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Zip:</label>
                  <input
                    type="text"
                    value={newClientDraft.zip || ''}
                    onChange={(e) => setNewClientDraft({ ...newClientDraft, zip: e.target.value })}
                    placeholder="20854"
                    className="w-full p-2 text-xs rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Ciudad:</label>
                  <input
                    type="text"
                    value={newClientDraft.city || ''}
                    onChange={(e) => setNewClientDraft({ ...newClientDraft, city: e.target.value })}
                    placeholder="Bethesda"
                    className="w-full p-2 text-xs rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Estado:</label>
                  <input
                    type="text"
                    value={newClientDraft.state || ''}
                    onChange={(e) => setNewClientDraft({ ...newClientDraft, state: e.target.value })}
                    placeholder="MD"
                    className="w-full p-2 text-xs rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Tamaño:</label>
                  <input
                    type="text"
                    value={newClientDraft.sqft || ''}
                    onChange={(e) => setNewClientDraft({ ...newClientDraft, sqft: e.target.value })}
                    placeholder="4,500 sq ft"
                    className="w-full p-2 text-xs rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Tipo de vivienda:</label>
                  <input
                    type="text"
                    value={newClientDraft.homeType || ''}
                    onChange={(e) => setNewClientDraft({ ...newClientDraft, homeType: e.target.value })}
                    placeholder="Single Family Home"
                    className="w-full p-2 text-xs rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Prioridades / Servicios:</label>
                <input
                  type="text"
                  value={Array.isArray(newClientDraft.priorities) ? newClientDraft.priorities.join(', ') : ''}
                  onChange={(e) => setNewClientDraft({ ...newClientDraft, priorities: e.target.value.split(',').map(item => item.trim()).filter(Boolean) })}
                  placeholder="Preventative Maintenance, Handyman, Hidden leak inspection"
                  className="w-full p-2 text-xs rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Notas del cliente:</label>
                <textarea
                  rows={2}
                  value={newClientDraft.notes || ''}
                  onChange={(e) => setNewClientDraft({ ...newClientDraft, notes: e.target.value })}
                  placeholder="Notas adicionales, preferencias, o comentarios importantes"
                  className="w-full p-2 text-xs rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Estado:</label>
                <select
                  value={newClientDraft.status || 'active'}
                  onChange={(e) => setNewClientDraft({ ...newClientDraft, status: e.target.value as 'active' | 'inactive' })}
                  className="w-full p-2 text-xs rounded-xl border border-slate-300 bg-white"
                >
                  <option value="active">Activo</option>
                  <option value="inactive">Inactivo</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setNewClientModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-bold cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSaveClientDraft}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold cursor-pointer"
                >
                  {editingClientId ? 'Guardar Cambios' : 'Crear Cliente'}
                </button>
              </div>
            </div>
          </div>
        )
      }

      {/* MODAL: NUEVA CITA MANUAL DE WALKTHROUGH */}
      {
        newAptModal && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 border border-slate-200 shadow-2xl">
              <div className="flex items-center justify-between border-b pb-2">
                <h5 className="font-bold text-[#0f2942] text-sm">Crear Cita de Walkthrough Manual</h5>
                <button onClick={() => setNewAptModal(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Nombre Completo:</label>
                  <input
                    type="text"
                    value={newAptDraft.fullName}
                    onChange={(e) => setNewAptDraft({ ...newAptDraft, fullName: e.target.value })}
                    placeholder="Nombre y Apellido"
                    className="w-full p-2 text-xs rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Teléfono:</label>
                  <input
                    type="text"
                    value={newAptDraft.phone}
                    onChange={(e) => setNewAptDraft({ ...newAptDraft, phone: e.target.value })}
                    placeholder="(301) 555-0199"
                    className="w-full p-2 text-xs rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-2">
                  <label className="text-xs font-bold text-slate-700 block mb-1">Dirección:</label>
                  <input
                    type="text"
                    value={newAptDraft.address}
                    onChange={(e) => setNewAptDraft({ ...newAptDraft, address: e.target.value })}
                    placeholder="10408 Highland Dr"
                    className="w-full p-2 text-xs rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Zip:</label>
                  <input
                    type="text"
                    value={newAptDraft.zip}
                    onChange={(e) => setNewAptDraft({ ...newAptDraft, zip: e.target.value })}
                    placeholder="20854"
                    className="w-full p-2 text-xs rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Fecha Programada:</label>
                  <input
                    type="date"
                    value={newAptDraft.preferredDate}
                    onChange={(e) => setNewAptDraft({ ...newAptDraft, preferredDate: e.target.value })}
                    className="w-full p-2 text-xs rounded-xl border border-slate-300 bg-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Técnico Asignado:</label>
                  <select
                    value={newAptDraft.technicianAssigned}
                    onChange={(e) => setNewAptDraft({ ...newAptDraft, technicianAssigned: e.target.value })}
                    className="w-full p-2 text-xs rounded-xl border border-slate-300 bg-white"
                  >
                    <option>Mark Jenkins (Sr. Lead)</option>
                    <option>David Ross</option>
                    <option>Christopher Vance</option>
                    <option>Michael Sterling</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Notas del Inmueble / Requerimientos:</label>
                <textarea
                  rows={2}
                  value={newAptDraft.notes}
                  onChange={(e) => setNewAptDraft({ ...newAptDraft, notes: e.target.value })}
                  placeholder="e.g. Inspección de calentadores de agua y filtros..."
                  className="w-full p-2 text-xs rounded-xl border border-slate-300"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setNewAptModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-bold cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSaveAptDraft}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold cursor-pointer"
                >
                  Crear Cita
                </button>
              </div>
            </div>
          </div>
        )
      }

      {/* MODAL: NUEVA SECCIÓN PERSONALIZADA */}
      {
        newSectionModal && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 border border-slate-200 shadow-2xl">
              <div className="flex items-center justify-between border-b pb-2">
                <h5 className="font-bold text-[#0f2942] text-sm flex items-center gap-2">
                  <Layout className="w-4 h-4 text-emerald-600" />
                  <span>Crear Nueva Sección de la Página</span>
                </h5>
                <button onClick={() => setNewSectionModal(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Título de la Sección *:</label>
                <input
                  type="text"
                  value={newSectionDraft.title}
                  onChange={(e) => setNewSectionDraft({ ...newSectionDraft, title: e.target.value })}
                  placeholder="e.g. Servicios de Conserjería de Lujo"
                  className="w-full p-2 text-xs rounded-xl border border-slate-300 font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Insignia / Badge Superior:</label>
                  <input
                    type="text"
                    value={newSectionDraft.badge}
                    onChange={(e) => setNewSectionDraft({ ...newSectionDraft, badge: e.target.value })}
                    placeholder="e.g. Exclusivo"
                    className="w-full p-2 text-xs rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Estado Inicial:</label>
                  <select
                    value={newSectionDraft.enabled ? 'true' : 'false'}
                    onChange={(e) => setNewSectionDraft({ ...newSectionDraft, enabled: e.target.value === 'true' })}
                    className="w-full p-2 text-xs rounded-xl border border-slate-300 bg-white font-medium"
                  >
                    <option value="true">Activa (Visible)</option>
                    <option value="false">Oculta (Borrador)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Subtítulo Descriptivo:</label>
                <input
                  type="text"
                  value={newSectionDraft.subtitle}
                  onChange={(e) => setNewSectionDraft({ ...newSectionDraft, subtitle: e.target.value })}
                  placeholder="e.g. Atención personalizada 24 horas para propietarios exigentes"
                  className="w-full p-2 text-xs rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Texto o Contenido del Módulo:</label>
                <textarea
                  rows={3}
                  value={newSectionDraft.content}
                  onChange={(e) => setNewSectionDraft({ ...newSectionDraft, content: e.target.value })}
                  placeholder="Describe los beneficios, detalles y características de esta sección..."
                  className="w-full p-2 text-xs rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">URL de Imagen Ilustrativa (Opcional):</label>
                <input
                  type="text"
                  value={newSectionDraft.imageUrl}
                  onChange={(e) => setNewSectionDraft({ ...newSectionDraft, imageUrl: e.target.value })}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full p-2 text-xs rounded-xl border border-slate-300 font-mono text-[11px]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t">
                <button
                  onClick={() => setNewSectionModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-bold cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleAddCustomSectionSubmit}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold cursor-pointer flex items-center gap-1.5 shadow-sm"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Crear y Guardar Sección</span>
                </button>
              </div>
            </div>
          </div>
        )
      }

      {/* MODAL: EDITAR PROYECTO DE GALERIA */}
      {
        editGalleryModal && editGalleryDraft && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 border border-slate-200 shadow-2xl">
              <div className="flex items-center justify-between border-b pb-2">
                <h5 className="font-bold text-[#0f2942] text-sm flex items-center gap-2">
                  <Edit className="w-4 h-4 text-emerald-600" />
                  <span>Editar Proyecto de Galería</span>
                </h5>
                <button onClick={() => setEditGalleryModal(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Título del Proyecto:</label>
                <input
                  type="text"
                  value={editGalleryDraft.title}
                  onChange={(e) => setEditGalleryDraft({ ...editGalleryDraft, title: e.target.value })}
                  className="w-full p-2 text-xs rounded-xl border border-slate-300 font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Categoría:</label>
                  <select
                    value={editGalleryDraft.category}
                    onChange={(e) => setEditGalleryDraft({ ...editGalleryDraft, category: e.target.value as any })}
                    className="w-full p-2 text-xs rounded-xl border border-slate-300 bg-white"
                  >
                    <option>HVAC & Electrical</option>
                    <option>Plumbing & Tanks</option>
                    <option>Carpentry & Handyman</option>
                    <option>Exterior & Roof</option>
                    <option>Before & After</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Tipo:</label>
                  <select
                    value={editGalleryDraft.type}
                    onChange={(e) => setEditGalleryDraft({ ...editGalleryDraft, type: e.target.value as any })}
                    className="w-full p-2 text-xs rounded-xl border border-slate-300 bg-white"
                  >
                    <option value="single">Foto Individual</option>
                    <option value="before_after">Antes y Después (Comparador)</option>
                    <option value="video">Video Demostrativo</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">URL de Imagen Principal (o After):</label>
                <input
                  type="text"
                  value={editGalleryDraft.imageUrl}
                  onChange={(e) => setEditGalleryDraft({ ...editGalleryDraft, imageUrl: e.target.value, afterImageUrl: e.target.value })}
                  className="w-full p-2 text-xs rounded-xl border border-slate-300 font-mono text-[11px]"
                />
                <div className="mt-2">
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">Subir desde tu PC</label>
                  <input
                    type="file"
                    accept="image/*,video/*"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        await handleGalleryMediaUpload(file, editGalleryDraft.type === 'video' ? 'video' : 'image', 'edit');
                        e.target.value = '';
                      }
                    }}
                    className="w-full text-xs rounded-xl border border-slate-300 bg-slate-50 p-2"
                  />
                </div>
              </div>

              {editGalleryDraft.type === 'before_after' && (
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">URL de Imagen "Antes" (Before):</label>
                  <input
                    type="text"
                    value={editGalleryDraft.beforeImageUrl || ''}
                    onChange={(e) => setEditGalleryDraft({ ...editGalleryDraft, beforeImageUrl: e.target.value })}
                    className="w-full p-2 text-xs rounded-xl border border-slate-300 font-mono text-[11px]"
                  />
                  <div className="mt-2">
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">Subir imagen Before desde tu PC</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          await handleGalleryMediaUpload(file, 'before', 'edit');
                          e.target.value = '';
                        }
                      }}
                      className="w-full text-xs rounded-xl border border-slate-300 bg-slate-50 p-2"
                    />
                  </div>
                </div>
              )}

              {editGalleryDraft.type === 'video' && (
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">URL de Video o archivo local</label>
                  <input
                    type="text"
                    value={editGalleryDraft.videoUrl || ''}
                    onChange={(e) => setEditGalleryDraft({ ...editGalleryDraft, videoUrl: e.target.value })}
                    className="w-full p-2 text-xs rounded-xl border border-slate-300 font-mono text-[11px]"
                  />
                  <div className="mt-2">
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">Subir video desde tu PC</label>
                    <input
                      type="file"
                      accept="video/*"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          await handleGalleryMediaUpload(file, 'video', 'edit');
                          e.target.value = '';
                        }
                      }}
                      className="w-full text-xs rounded-xl border border-slate-300 bg-slate-50 p-2"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Descripción del Trabajo Realizado:</label>
                <textarea
                  rows={2}
                  value={editGalleryDraft.description}
                  onChange={(e) => setEditGalleryDraft({ ...editGalleryDraft, description: e.target.value })}
                  className="w-full p-2 text-xs rounded-xl border border-slate-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Ubicación / Ciudad:</label>
                  <input
                    type="text"
                    value={editGalleryDraft.location}
                    onChange={(e) => setEditGalleryDraft({ ...editGalleryDraft, location: e.target.value })}
                    className="w-full p-2 text-xs rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Fecha / Temporada:</label>
                  <input
                    type="text"
                    value={editGalleryDraft.completionDate}
                    onChange={(e) => setEditGalleryDraft({ ...editGalleryDraft, completionDate: e.target.value })}
                    className="w-full p-2 text-xs rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t">
                <button
                  onClick={() => setEditGalleryModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-bold cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSaveEditGallery}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold cursor-pointer flex items-center gap-1.5 shadow-sm"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Guardar Cambios del Proyecto</span>
                </button>
              </div>
            </div>
          </div>
        )
      }

    </div >
  );
};
