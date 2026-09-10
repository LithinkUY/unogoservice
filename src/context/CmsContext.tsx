import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  SiteCMSConfig,
  ThemeConfig,
  HeaderConfig,
  SliderConfig,
  ContentConfig,
  ChecklistItem,
  PricingPlan,
  ServiceArea,
  Testimonial,
  FaqItem,
  GalleryItem,
  Appointment,
  ClientRecord,
  FooterConfig,
  PageSection,
  CmsPage
} from '../types';
import { DEFAULT_CMS_CONFIG, DEFAULT_PAGE_SECTIONS } from '../data/defaultCmsData';

const LOCAL_STORAGE_KEY = 'premier_homecare_cms_v2';

interface CmsContextType {
  config: SiteCMSConfig;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  updateTheme: (theme: Partial<ThemeConfig>) => void;
  updateHeader: (header: Partial<HeaderConfig>) => void;
  updateSlider: (slider: Partial<SliderConfig>) => void;
  updateContent: (content: Partial<ContentConfig>) => void;
  updateSections: (sections: PageSection[]) => void;
  updateSingleSection: (sectionId: string, updated: Partial<PageSection>) => void;
  toggleSection: (sectionId: string) => void;
  reorderSections: (newSectionsOrFrom: PageSection[] | number, toIndex?: number) => void;
  addCustomSection: (section: Omit<PageSection, 'id'>) => void;
  deleteSection: (sectionId: string) => void;
  updateChecklist: (checklist: ChecklistItem[]) => void;
  updatePricingPlans: (plans: PricingPlan[]) => void;
  updateServiceAreas: (areas: ServiceArea[]) => void;
  updateTestimonials: (testimonials: Testimonial[]) => void;
  updateFaqs: (faqs: FaqItem[]) => void;
  updateGallery: (gallery: GalleryItem[]) => void;
  updateAppointments: (appointments: Appointment[]) => void;
  addAppointment: (appointment: Omit<Appointment, 'id' | 'createdAt'>) => void;
  updateAppointmentStatus: (id: string, status: Appointment['status'], technician?: string) => void;
  deleteAppointment: (id: string) => void;
  updateClients: (clients: ClientRecord[]) => void;
  addClient: (client: Omit<ClientRecord, 'id' | 'createdAt'>) => void;
  updateClient: (id: string, updates: Partial<ClientRecord>) => void;
  deleteClient: (id: string) => void;
  updateAdminCredentials: (credentials: { adminUsername?: string; adminPassword?: string }) => void;
  updateFooter: (footer: Partial<FooterConfig>) => void;
  saveFullConfig: (newConfig: SiteCMSConfig) => void;
  saveAndNotify: (sectionLabel?: string) => void;
  saveNotification: string | null;
  resetToDefaults: () => void;
  addPage: (page: Omit<CmsPage, 'id' | 'createdAt'>) => void;
  updatePage: (id: string, updates: Partial<CmsPage>) => void;
  deletePage: (id: string) => void;
  exportConfigAsJson: () => void;
  importConfigFromJson: (jsonStr: string) => boolean;
}

const CmsContext = createContext<CmsContextType | undefined>(undefined);

export const CmsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<SiteCMSConfig>(() => {
    try {
      // Clear legacy storage key if needed to prevent old brand pollution
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);

        const normalizedNavItems = (parsed.header?.navItems || DEFAULT_CMS_CONFIG.header.navItems).filter((item: any) => {
          const label = String(item?.label || '').toLowerCase();
          const sectionId = String(item?.sectionId || '').toLowerCase();
          return !(label.includes('50-point') || label.includes('50 point') || sectionId === 'checklist');
        });

        const normalizedSections = (parsed.sections && parsed.sections.length > 0 ? parsed.sections : DEFAULT_PAGE_SECTIONS)
          .filter((section: PageSection) => section.id !== 'checklist');

        let finalSections = normalizedSections;
        if (!finalSections.some((s: PageSection) => s.id === 'calculator')) {
          const pricingIdx = finalSections.findIndex((s: PageSection) => s.id === 'pricing');
          const calcSection: PageSection = {
            id: 'calculator',
            name: 'Calculadora de Estimación (Home Size Estimator)',
            enabled: true
          };
          if (pricingIdx !== -1) {
            finalSections = [
              ...finalSections.slice(0, pricingIdx + 1),
              calcSection,
              ...finalSections.slice(pricingIdx + 1)
            ];
          } else {
            finalSections = [...finalSections, calcSection];
          }
        }

        let serviceAreasToUse = parsed.serviceAreas;
        if (!serviceAreasToUse || serviceAreasToUse.length === 0 || serviceAreasToUse.some((a: any) => a.state === 'Maryland' || a.state === 'Virginia')) {
          serviceAreasToUse = DEFAULT_CMS_CONFIG.serviceAreas;
        }

        const normalizedHeader = {
          ...DEFAULT_CMS_CONFIG.header,
          ...(parsed.header || {}),
          navItems: normalizedNavItems,
          branding: {
            ...DEFAULT_CMS_CONFIG.header.branding,
            ...(parsed.header?.branding || {})
          },
          topBar: {
            ...DEFAULT_CMS_CONFIG.header.topBar,
            ...(parsed.header?.topBar || {}),
            portalBtnText: ''
          },
          ctaButtons: {
            ...DEFAULT_CMS_CONFIG.header.ctaButtons,
            ...(parsed.header?.ctaButtons || {}),
            secondaryText: ''
          }
        };

        return {
          ...DEFAULT_CMS_CONFIG,
          ...parsed,
          theme: { ...DEFAULT_CMS_CONFIG.theme, ...parsed.theme },
          header: normalizedHeader,
          slider: { ...DEFAULT_CMS_CONFIG.slider, ...parsed.slider },
          content: {
            ...DEFAULT_CMS_CONFIG.content,
            ...(parsed.content || {}),
            calculator: {
              ...DEFAULT_CMS_CONFIG.content.calculator,
              ...(parsed.content?.calculator || {})
            }
          },
          sections: finalSections,
          serviceAreas: serviceAreasToUse,
          gallery: parsed.gallery && parsed.gallery.length > 0 ? parsed.gallery : DEFAULT_CMS_CONFIG.gallery,
          footer: { ...DEFAULT_CMS_CONFIG.footer, ...parsed.footer }
        };
      }
    } catch (e) {
      console.warn('Failed to load saved CMS config from localStorage:', e);
    }
    return DEFAULT_CMS_CONFIG;
  });

  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [saveNotification, setSaveNotification] = useState<string | null>(null);

  // Auto-save to localStorage whenever config changes
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(config));
    } catch (e) {
      console.error('Failed to save CMS config to localStorage:', e);
    }
  }, [config]);

  // Apply dynamic theme changes (Font, Primary CSS Color variable, etc.)
  useEffect(() => {
    const root = document.documentElement;
    if (config.theme?.primaryColor) {
      root.style.setProperty('--color-primary', config.theme.primaryColor);
    }
    if (config.theme?.secondaryColorHex) {
      root.style.setProperty('--color-secondary', config.theme.secondaryColorHex);
    }
    if (config.theme?.fontFamily) {
      document.body.style.fontFamily = `'${config.theme.fontFamily}', system-ui, sans-serif`;
    }
  }, [config.theme]);

  const updateTheme = (newTheme: Partial<ThemeConfig>) => {
    setConfig(prev => ({
      ...prev,
      theme: { ...prev.theme, ...newTheme }
    }));
  };

  const updateHeader = (newHeader: Partial<HeaderConfig>) => {
    setConfig(prev => ({
      ...prev,
      header: { ...prev.header, ...newHeader }
    }));
  };

  const updateSlider = (newSlider: Partial<SliderConfig>) => {
    setConfig(prev => ({
      ...prev,
      slider: { ...prev.slider, ...newSlider }
    }));
  };

  const updateContent = (newContent: Partial<ContentConfig>) => {
    setConfig(prev => ({
      ...prev,
      content: { ...prev.content, ...newContent }
    }));
  };

  const updateSections = (sections: PageSection[]) => {
    setConfig(prev => ({ ...prev, sections }));
  };

  const updateSingleSection = (sectionId: string, updated: Partial<PageSection>) => {
    setConfig(prev => ({
      ...prev,
      sections: prev.sections.map(sec =>
        sec.id === sectionId ? { ...sec, ...updated } : sec
      )
    }));
  };

  const toggleSection = (sectionId: string) => {
    setConfig(prev => ({
      ...prev,
      sections: prev.sections.map(sec =>
        sec.id === sectionId ? { ...sec, enabled: !sec.enabled } : sec
      )
    }));
  };

  const reorderSections = (newSectionsOrFrom: PageSection[] | number, toIndex?: number) => {
    if (typeof newSectionsOrFrom === 'number' && typeof toIndex === 'number') {
      const fromIndex = newSectionsOrFrom;
      const current = [...config.sections];
      const [moved] = current.splice(fromIndex, 1);
      current.splice(toIndex, 0, moved);
      setConfig(prev => ({ ...prev, sections: current }));
    } else if (Array.isArray(newSectionsOrFrom)) {
      setConfig(prev => ({ ...prev, sections: newSectionsOrFrom }));
    }
  };

  const addCustomSection = (section: Omit<PageSection, 'id'>) => {
    const newSec: PageSection = {
      ...section,
      id: `custom-${Date.now()}`
    };
    setConfig(prev => ({
      ...prev,
      sections: [...prev.sections, newSec]
    }));
  };

  const deleteSection = (sectionId: string) => {
    setConfig(prev => ({
      ...prev,
      sections: prev.sections.filter(sec => sec.id !== sectionId)
    }));
  };

  const saveAndNotify = (sectionLabel?: string) => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(config));
      const message = sectionLabel ? `¡${sectionLabel} guardado con éxito!` : '¡Cambios guardados con éxito!';
      setSaveNotification(message);
      setTimeout(() => setSaveNotification(null), 3500);
    } catch (e) {
      console.error('Error saving:', e);
      setSaveNotification('Error al guardar en el almacenamiento local.');
      setTimeout(() => setSaveNotification(null), 3500);
    }
  };

  const updateChecklist = (checklist: ChecklistItem[]) => {
    setConfig(prev => ({ ...prev, checklist }));
  };

  const updatePricingPlans = (pricingPlans: PricingPlan[]) => {
    setConfig(prev => ({ ...prev, pricingPlans }));
  };

  const updateServiceAreas = (serviceAreas: ServiceArea[]) => {
    setConfig(prev => ({ ...prev, serviceAreas }));
  };

  const updateTestimonials = (testimonials: Testimonial[]) => {
    setConfig(prev => ({ ...prev, testimonials }));
  };

  const updateFaqs = (faqs: FaqItem[]) => {
    setConfig(prev => ({ ...prev, faqs }));
  };

  const updateGallery = (gallery: GalleryItem[]) => {
    setConfig(prev => ({ ...prev, gallery }));
  };

  const updateAppointments = (appointments: Appointment[]) => {
    setConfig(prev => ({ ...prev, appointments }));
  };

  const addAppointment = (appointment: Omit<Appointment, 'id' | 'createdAt'>) => {
    const newApt: Appointment = {
      ...appointment,
      id: `apt-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setConfig(prev => ({
      ...prev,
      appointments: [newApt, ...prev.appointments]
    }));
  };

  const updateAppointmentStatus = (id: string, status: Appointment['status'], technician?: string) => {
    setConfig(prev => ({
      ...prev,
      appointments: prev.appointments.map(a =>
        a.id === id ? { ...a, status, ...(technician !== undefined ? { technicianAssigned: technician } : {}) } : a
      )
    }));
  };

  const deleteAppointment = (id: string) => {
    setConfig(prev => ({
      ...prev,
      appointments: prev.appointments.filter(a => a.id !== id)
    }));
  };

  const updateClients = (clients: ClientRecord[]) => {
    setConfig(prev => ({ ...prev, clients }));
  };

  const addClient = (client: Omit<ClientRecord, 'id' | 'createdAt'>) => {
    const newClient: ClientRecord = {
      ...client,
      id: `client-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setConfig(prev => ({
      ...prev,
      clients: [newClient, ...prev.clients]
    }));
  };

  const updateClient = (id: string, updates: Partial<ClientRecord>) => {
    setConfig(prev => ({
      ...prev,
      clients: prev.clients.map(client =>
        client.id === id ? { ...client, ...updates } : client
      )
    }));
  };

  const deleteClient = (id: string) => {
    setConfig(prev => ({
      ...prev,
      clients: prev.clients.filter(client => client.id !== id)
    }));
  };

  const updateAdminCredentials = (credentials: { adminUsername?: string; adminPassword?: string }) => {
    setConfig(prev => ({
      ...prev,
      adminUsername: credentials.adminUsername ?? prev.adminUsername,
      adminPassword: credentials.adminPassword ?? prev.adminPassword
    }));
  };

  const addPage = (page: Omit<CmsPage, 'id' | 'createdAt'>) => {
    const newPage: CmsPage = {
      ...page,
      id: `page-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    setConfig(prev => ({
      ...prev,
      pages: [...(prev.pages || []), newPage]
    }));
  };

  const updatePage = (id: string, updates: Partial<CmsPage>) => {
    setConfig(prev => ({
      ...prev,
      pages: (prev.pages || []).map(p => p.id === id ? { ...p, ...updates } : p)
    }));
  };

  const deletePage = (id: string) => {
    setConfig(prev => ({
      ...prev,
      pages: (prev.pages || []).filter(p => p.id !== id)
    }));
  };

  const updateFooter = (newFooter: Partial<FooterConfig>) => {
    setConfig(prev => ({
      ...prev,
      footer: { ...prev.footer, ...newFooter }
    }));
  };

  const saveFullConfig = (newConfig: SiteCMSConfig) => {
    setConfig(newConfig);
  };

  const resetToDefaults = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setConfig(DEFAULT_CMS_CONFIG);
  };

  const exportConfigAsJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(config, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `premier_homecare_cms_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const importConfigFromJson = (jsonStr: string): boolean => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed && typeof parsed === 'object' && parsed.theme && parsed.header) {
        setConfig(parsed);
        return true;
      }
      return false;
    } catch (e) {
      console.error('Invalid JSON import:', e);
      return false;
    }
  };

  return (
    <CmsContext.Provider
      value={{
        config,
        isAdminOpen,
        setIsAdminOpen,
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
        updateServiceAreas,
        updateTestimonials,
        updateFaqs,
        updateGallery,
        updateAppointments,
        addAppointment,
        updateAppointmentStatus,
        deleteAppointment,
        updateClients,
        addClient,
        updateClient,
        deleteClient,
        updateAdminCredentials,
        updateFooter,
        saveFullConfig,
        saveAndNotify,
        saveNotification,
        resetToDefaults,
        addPage,
        updatePage,
        deletePage,
        exportConfigAsJson,
        importConfigFromJson
      }}
    >
      {children}
    </CmsContext.Provider>
  );
};

export const useCms = (): CmsContextType => {
  const context = useContext(CmsContext);
  if (!context) {
    throw new Error('useCms must be used within a CmsProvider');
  }
  return context;
};
