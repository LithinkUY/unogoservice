import { useEffect, RefObject } from 'react';

// Comprehensive dictionary for Admin CMS translation (ES -> EN)
export const ADMIN_TRANSLATIONS: Record<string, string> = {
  // Top Header & Global Actions
  "Panel Administrador CMS": "CMS Admin Dashboard",
  "MODO EN VIVO": "LIVE MODE",
  "Exportar": "Export JSON",
  "Descargar Backup JSON": "Download JSON Backup",
  "Ver Web": "View Live Site",
  "Cerrar": "Close",
  "Cambios guardados en vivo": "Live changes saved successfully",
  "Idioma cambiado a Español": "Language switched to Spanish",
  "Language switched to English": "Language switched to English",
  "Módulos del CMS": "CMS Modules",
  "Estado:": "Status:",
  "Auto-guardado activo": "Auto-save active",
  "Cada cambio modifica la web inmediatamente y se almacena en el navegador.": "Every change immediately updates the live website and persists in the browser.",

  // Common UI Elements & Actions
  "Guardar": "Save",
  "Guardar Cambios": "Save Changes",
  "Guardar Todo": "Save All",
  "Cancelar": "Cancel",
  "Eliminar": "Delete",
  "Editar": "Edit",
  "Añadir": "Add",
  "Crear": "Create",
  "Nuevo": "New",
  "Nueva": "New",
  "Acciones": "Actions",
  "Título": "Title",
  "Título:": "Title:",
  "Subtítulo": "Subtitle",
  "Subtítulo:": "Subtitle:",
  "Descripción": "Description",
  "Descripción:": "Description:",
  "Badge": "Badge",
  "Badge Superior": "Top Badge",
  "Badge Superior:": "Top Badge:",
  "Nombre": "Name",
  "Nombre:": "Name:",
  "Teléfono": "Phone",
  "Teléfono:": "Phone:",
  "Email": "Email",
  "Email:": "Email:",
  "Dirección": "Address",
  "Dirección:": "Address:",
  "Ciudad": "City",
  "Ciudad:": "City:",
  "Estado": "State / Region",
  "Estado:": "State / Region:",
  "Código Postal": "Zip Code",
  "Código Postal:": "Zip Code:",
  "Visible": "Visible",
  "Oculto": "Hidden",
  "Activo": "Active",
  "Inactivo": "Inactive",
  "Pendiente": "Pending",
  "Confirmado": "Confirmed",
  "Completado": "Completed",
  "Cancelado": "Cancelled",
  "Buscar": "Search",
  "Buscar...": "Search...",
  "Filtrar": "Filter",
  "Filtrar por estado:": "Filter by status:",
  "Todas": "All",
  "Todos": "All",
  "Detalles": "Details",
  "Opciones": "Options",
  "Configuración": "Configuration",
  "General": "General",
  "Avanzado": "Advanced",
  "Vista Previa": "Preview",
  "Subir": "Upload",
  "Descargar": "Download",
  "Restablecer": "Reset",
  "Restablecer Todo": "Reset All",
  "Sí": "Yes",
  "No": "No",

  // Sidebar Tabs
  "1. Estilos y Colores": "1. Styles & Colors",
  "2. Logo e Identidad": "2. Logo & Branding",
  "3. Páginas CMS": "3. CMS Pages",
  "4. Secciones de Inicio": "4. Homepage Sections",
  "5. Header y Menús": "5. Header & Menus",
  "6. Slider Principal": "6. Hero Slider",
  "7. Textos Globales": "7. Global Content",
  "8. Preguntas FAQ": "8. FAQ Items",
  "9. Tarjetas de Precios": "9. Pricing Plans",
  "10. Calculadora Estimadora": "10. Cost Estimator",
  "11. Zonas & Dispatch Regional": "11. Service Areas & Dispatch",
  "12. Galería": "12. Project Gallery",
  "13. Clientes": "13. Client CRM",
  "14. Citas Schedule": "14. Schedule Bookings",
  "15. Config Modal Schedule": "15. Configure Schedule Modal",
  "16. Footer y Contacto": "16. Footer & Contact",
  "17. Usuario Admin": "17. Admin User & Password",
  "18. WhatsApp": "18. WhatsApp Widget",
  "19. Backup": "19. Backup & Restore",

  // Tab 1: Styles & Colors
  "Diseño Global y Paleta de Colores": "Global Design & Color Palette",
  "Personaliza la identidad visual, tipografía y estilo de botones de toda la plataforma.": "Customize the visual identity, typography, and button styles across the entire website.",
  "Color Primario de Marca (Acentos, Botones y Checkmarks)": "Primary Brand Color (Accents, Buttons & Checkmarks)",
  "Hexadecimal Personalizado:": "Custom Hex Color:",
  "Tipografía Principal del Sitio": "Primary Website Typography",
  "Colores del Menú Principal": "Main Navigation Menu Colors",
  "Color del texto del menú": "Navigation text color",
  "Color del fondo del menú": "Navigation background color",
  "Radio de Bordes / Esquinas Redondeadas": "Border Radius / Rounded Corners",
  "Estilo de Botones": "Button Style",
  "Sombra de Tarjetas": "Card Shadow Depth",
  "Guardar Estilos Globales": "Save Global Styles",
  "Tema cambiado a": "Theme changed to",
  "Fuente cambiada a": "Font changed to",

  // Tab 2: Logo & Identity
  "Logo e Identidad de Marca": "Logo & Brand Identity",
  "Configura el logo principal, favicon, eslogan y dimensiones del branding.": "Configure the main logo, favicon, tagline, and branding dimensions.",
  "Tipo de Logo": "Logo Display Type",
  "Solo Texto": "Text Only",
  "Imagen y Texto": "Image & Text",
  "Solo Imagen": "Image Only",
  "Subir Nuevo Logo": "Upload New Logo",
  "URL del Logo": "Logo Image URL",
  "Texto del Logo": "Brand Name / Logo Text",
  "Eslogan / Tagline": "Tagline / Slogan",
  "Alto del Logo (px)": "Logo Height (px)",
  "Favicon del Sitio": "Website Favicon URL",
  "Vista Previa en Vivo del Header": "Live Header Preview",
  "Guardar Identidad y Logo": "Save Brand Identity & Logo",

  // Tab 3: Pages
  "Gestión de Páginas Personalizadas": "Custom CMS Pages Management",
  "Crea, edita y administra páginas estáticas o de aterrizaje personalizadas.": "Create, edit, and manage custom landing pages and static content pages.",
  "Crear Nueva Página": "Create New Page",
  "Título de la Página": "Page Title",
  "Ruta / Slug (ej: /nosotros)": "URL Slug (e.g. /about-us)",
  "Meta Descripción (SEO)": "Meta Description (SEO)",
  "Publicada / Activa": "Published / Active",
  "Bloques de Contenido": "Content Blocks",
  "Añadir Bloque": "Add Block",
  "Guardar Páginas": "Save Pages",
  "Nueva Página": "New Page",
  "Sin páginas personalizadas creadas": "No custom pages created yet",

  // Tab 4: Sections
  "Orden y Visibilidad de Secciones del Home": "Homepage Sections Order & Visibility",
  "Arrastra o usa las flechas para reordenar las secciones de la página principal. Activa o desactiva cada bloque con el interruptor.": "Use arrows to reorder homepage sections. Enable or disable individual blocks using the toggle switches.",
  "Visible en la web": "Visible on site",
  "Oculta en la web": "Hidden on site",
  "Subir sección": "Move section up",
  "Bajar sección": "Move section down",
  "Restablecer Orden por Defecto": "Reset to Default Order",
  "Añadir Sección Personalizada": "Add Custom Section",
  "Guardar Orden y Secciones": "Save Sections Order & Visibility",

  // Tab 5: Header & Menus
  "Configuración de Cabecera y Menús": "Header & Navigation Settings",
  "Edita la barra superior de emergencia, enlaces de navegación y botones de llamado a la acción.": "Edit the emergency top bar, navigation links, and call-to-action buttons.",
  "Barra Superior de Emergencia / TopBar": "Emergency Top Bar Settings",
  "Texto Teléfono": "Hotline Phone Text",
  "Horario / Descripción": "Hours / Dispatch Description",
  "Enlaces de Navegación del Menú Principal": "Main Navigation Menu Links",
  "Añadir Enlace al Menú": "Add Menu Link",
  "Texto del Enlace": "Link Label",
  "ID de Sección o URL": "Section ID or URL",
  "Botón Principal de Cabecera (CTA)": "Header Primary CTA Button",
  "Texto del Botón": "Button Text",
  "Acción del Botón": "Button Action",
  "Header Transparente en Hero": "Transparent Header over Hero",
  "Guardar Header y Menú": "Save Header & Navigation",

  // Tab 6: Slider
  "Gestión del Slider / Carrusel Principal": "Hero Slider / Carousel Management",
  "Modo Slider (Activar Carrusel)": "Slider Mode (Enable Carousel)",
  "Reproducción Automática (Autoplay)": "Autoplay Carousel",
  "Intervalo de Cambio (segundos)": "Slide Interval (seconds)",
  "Mostrar Flechas de Navegación": "Show Navigation Arrows",
  "Mostrar Puntos Indicadores": "Show Slide Dots",
  "Diapositivas del Carrusel": "Carousel Slides",
  "Añadir Nueva Diapositiva": "Add New Slide",
  "Tipo de Fondo": "Media Type",
  "Imagen": "Image",
  "Video": "Video",
  "URL de la Imagen / Video (YouTube, Vimeo o MP4 directo)": "Image / Video URL (YouTube, Vimeo or direct MP4)",
  "Texto Superior / Eyebrow": "Eyebrow Text",
  "Título Principal": "Slide Headline",
  "Texto Destacado (Gradiente)": "Headline Highlight (Gradient)",
  "Descripción": "Slide Description",
  "Botón Principal": "Primary Button Text",
  "Botón Secundario": "Secondary Button Text",
  "Oscuridad del Fondo (%)": "Dark Overlay Opacity (%)",
  "Alineación del Texto": "Text Alignment",
  "Izquierda": "Left",
  "Centro": "Center",
  "Derecha": "Right",
  "Guardar Slider": "Save Hero Slider",

  // Tab 7: Content
  "Contenido de las Secciones Principales": "Main Page Sections Copy & Content",
  "Edita directamente los títulos, subtítulos y mensajes de cada bloque de la landing page.": "Directly customize titles, subtitles, value propositions, and messages across all homepage sections.",
  "Sección Hero (Cabecera)": "Hero Section (Header Copy)",
  "Texto Título 1:": "Headline Part 1:",
  "Texto Destacado:": "Highlighted Text:",
  "Descripción:": "Description:",
  "Placeholder Buscador Zip:": "Zip Search Placeholder:",
  "Texto Botón Buscar:": "Search Button Text:",
  "Texto Botón Primario:": "Primary Button Text:",
  "Texto Botón Secundario:": "Secondary Button Text:",
  "Micro-Pilares del Hero:": "Hero Micro-Pillars Strip:",
  "Sección: La Diferencia & Ventajas": "Section: The Premier Difference & Advantages",
  "Sección: Los 3 Pilares del Cuidado": "Section: The 3 Core Pillars of Care",
  "Pilar 1": "Pillar 1",
  "Pilar 2": "Pillar 2",
  "Pilar 3": "Pillar 3",
  "Sección: Cómo Funciona (4 Pasos)": "Section: How It Works (4 Steps)",
  "Paso 1": "Step 1",
  "Paso 2": "Step 2",
  "Paso 3": "Step 3",
  "Paso 4": "Step 4",
  "Guardar Textos Globales": "Save Global Content Copy",

  // Tab 8: FAQs
  "Preguntas Frecuentes (FAQ)": "Frequently Asked Questions (FAQ)",
  "Administra las dudas frecuentes de los propietarios sobre el servicio, técnicos y garantías.": "Manage common questions from homeowners regarding plans, W-2 technicians, and coverage.",
  "Añadir Pregunta": "Add New FAQ Question",
  "Categoría": "Category",
  "Pregunta": "Question",
  "Respuesta": "Answer",
  "Ocultar en la web": "Hide on website",
  "Guardar Preguntas FAQ": "Save FAQ Items",

  // Tab 9: Pricing
  "Tarjetas de Planes y Membresías": "Pricing Plans & Membership Tiers",
  "Configura los planes de mantenimiento estacional recurrente y sus beneficios incluidos.": "Configure recurring seasonal maintenance plans, pricing, included handyman hours, and benefits.",
  "Añadir Nuevo Plan": "Add New Pricing Plan",
  "Nombre del Plan": "Plan Name",
  "Subtítulo / Tagline": "Subtitle / Tagline",
  "Precio Mensual Base ($)": "Base Monthly Price ($)",
  "Frecuencia de Facturación": "Billing Frequency Label",
  "Visitas Incluidas al Año": "Included Scheduled Visits per Year",
  "Horas de Handyman Incluidas": "Handyman Hours Included",
  "Recomendado Para": "Recommended For (Property Type)",
  "Badge Destacado (ej: Most Popular)": "Featured Badge (e.g. Most Popular)",
  "Características y Beneficios (uno por línea)": "Features & Benefits Checklist (one per line)",
  "Guardar Planes de Precios": "Save Pricing Plans",

  // Tab 10: Calculator
  "Configuración de la Calculadora de Estimación (Home Size Estimator)": "Cost Estimator Calculator Settings (Home Size Estimator)",
  "Ajusta los rangos de pies cuadrados, multiplicadores y mensajes de ahorro estimado.": "Adjust square footage ranges, multipliers, formulas, and estimated savings copy.",
  "Subtítulo Descriptivo": "Descriptive Subtitle",
  "Rango de Metros Cuadrados / Pies Cuadrados": "Square Footage / Metros Cuadrados Range",
  "Mínimo (sq ft)": "Minimum (sq ft)",
  "Máximo (sq ft)": "Maximum (sq ft)",
  "Paso del Slider (sq ft)": "Slider Step Size (sq ft)",
  "Valor por Defecto (sq ft)": "Default Value (sq ft)",
  "Multiplicador de Costo por Tamaño": "Size Pricing Multiplier",
  "Ahorro Anual Estimado (Fórmula)": "Estimated Annual Savings Formula",
  "Botón de Acción (CTA)": "Call to Action Button (CTA)",
  "Texto del Botón CTA": "CTA Button Text",
  "Acción del Botón CTA": "CTA Button Action",
  "Guardar Calculadora": "Save Calculator Settings",

  // Tab 11: Service Areas & Dispatch
  "Áreas de Servicio, Hubs de Despacho & Filtro de Códigos Postales": "Service Areas, Regional Dispatch Hubs & Zip Code Filter",
  "Configura las zonas de cobertura (Fairfield County, CT / Westchester County, NY), teléfonos directos, oficinas locales, municipios y los códigos postales exactos aceptados por el verificador.": "Configure service regions (Fairfield County, CT / Westchester County, NY), direct dispatch hotlines, local offices, key cities, and zip code filters.",
  "Textos Generales de la Sección de Cobertura": "General Service Areas Section Copy",
  "Texto Botón Verificar Zip:": "Verify Zip Button Text:",
  "Título Selector de Regiones:": "Region Selector Title:",
  "Badge Hub Activo:": "Active Regional Hub Badge:",
  "Etiqueta Municipios / Ciudades:": "Key Municipalities / Cities Label:",
  "Etiqueta Condados / Distritos:": "Counties & Districts Label:",
  "Texto Badge Flota Técnica:": "Fleet Badge Text:",
  "Prefijo Botón Agendar Walkthrough:": "Schedule Button Prefix:",
  "Hubs Regionales de Despacho": "Regional Dispatch Hubs",
  "Solo los códigos postales que coincidan con los prefijos o zips configurados aquí serán aprobados en el verificador web.": "Only zip codes that match prefixes or full codes configured here will be verified positively.",
  "Restablecer Fairfield & Westchester": "Reset to Fairfield & Westchester",
  "Añadir Región / Hub": "Add New Region / Hub",
  "Nombre Región / Estado / Condado": "Region / County / State Name",
  "Nombre del Hub de Despacho": "Regional Dispatch Hub Name",
  "Teléfono Directo del Hub": "Direct Dispatch Phone Number",
  "Dirección de Oficina / Despacho Local": "Local Dispatch Office Address",
  "Ciudades y Municipios Servidos (separados por coma)": "Key Municipalities Served (comma-separated)",
  "Condados y Distritos (separados por coma)": "Counties & Districts (comma-separated)",
  "Códigos Postales / Prefijos Habilitados (separados por coma)": "Accepted Zip Codes / Prefixes (comma-separated)",
  "Guardar Áreas de Servicio y Zonas": "Save Service Areas & Dispatch Hubs",

  // Tab 12: Gallery
  "Galería de Trabajos y Antes / Después": "Project Gallery & Before / After Showcase",
  "Muestra proyectos reales de plomería, HVAC, carpintería y mantenimiento estacional.": "Showcase real projects, boiler replacements, HVAC coil cleaning, and before & after results.",
  "Añadir a la Galería": "Add to Gallery",
  "Título del Proyecto": "Project Title",
  "Tipo de Elemento": "Item Type",
  "Imagen Simple": "Single Image",
  "Antes y Después": "Before / After Comparison",
  "URL de la Imagen": "Main Image URL",
  "URL Imagen Antes": "Before Image URL",
  "URL Imagen Después": "After Image URL",
  "URL del Video": "Video URL",
  "Descripción del Proyecto": "Project Description",
  "Ubicación": "Location (City, State)",
  "Fecha de Finalización": "Completion Date",
  "Guardar Galería": "Save Project Gallery",

  // Tab 13: Clients
  "Directorio y Gestión de Clientes (CRM)": "Client CRM Directory & Management",
  "Buscar clientes por nombre, email, teléfono o ciudad...": "Search clients by name, email, phone, or city...",
  "Añadir Cliente Manualmente": "Add Client Manually",
  "Total Clientes Registrados": "Total Registered Clients",
  "Clientes Activos": "Active Clients",
  "Clientes Pendientes": "Pending Clients",
  "Clientes Inactivos": "Inactive Clients",
  "Nombre Completo": "Full Name",
  "Plan de Membresía": "Membership Tier",
  "Editar Cliente": "Edit Client",
  "Eliminar Cliente": "Delete Client",
  "Historial de Tareas / Inspecciones": "Service History & Completed Audits",
  "Añadir Registro": "Add Record",
  "Guardar Clientes": "Save Clients CRM",

  // Tab 14: Schedule
  "Gestión de Schedule e Inspecciones Walkthrough": "Walkthrough Bookings & Dispatch Schedule",
  "Gestiona solicitudes de citas de inspección inicial gratuita de clientes, asigna técnicos y exporta a CSV.": "Manage free initial walkthrough requests, assign technicians, track statuses, and export to CSV.",
  "Exportar CSV": "Export CSV",
  "Crear Cita Manual": "Create Manual Booking",
  "Total Solicitudes": "Total Requests",
  "Pendientes": "Pending",
  "Confirmadas": "Confirmed",
  "Completadas": "Completed",
  "Canceladas": "Cancelled",
  "Buscar por cliente, dirección o ciudad...": "Search by client name, address, or city...",
  "Cliente / Contacto": "Client / Contact",
  "Dirección / Ubicación": "Address / Location",
  "Tamaño (m² / sqft)": "Home Size (m² / sq ft)",
  "Tipo Hogar": "Property Type",
  "Fecha & Horario": "Date & Time Window",
  "Prioridades": "Client Priorities",
  "Técnico Asignado": "Assigned Technician",
  "Sin asignar": "Unassigned",
  "Guardar Citas y Schedule": "Save Schedule Bookings",

  // Tab 15: Schedule Config
  "Configuración del Modal de Schedule (Walkthrough)": "Walkthrough Schedule Modal Configuration",
  "Personaliza todos los campos, textos, zonas, ciudades, lista de prioridades y opciones de metros cuadrados del modal que ven los clientes.": "Customize all labels, fields, zones, cities, priorities checklist, and manual square meter inputs shown to clients.",
  "Encabezado del Modal & Textos Principales": "Modal Header & Main Headline Copy",
  "Título del Modal:": "Modal Title:",
  "Subtítulo / Explicación:": "Subtitle / Walkthrough Explanation:",
  "Paso 1: Ubicación, Tipos de Propiedad y Metros Cuadrados (Puesto a mano por el cliente)": "Step 1: Location, Property Types & Home Size (Manual Entry Allowed)",
  "Título Paso 1:": "Step 1 Title:",
  "Subtítulo Paso 1:": "Step 1 Subtitle:",
  "Label Dirección:": "Address Field Label:",
  "Label Ciudad:": "City Field Label:",
  "Label Estado / Región:": "State / Region Field Label:",
  "Label Código Postal:": "Zip Code Field Label:",
  "📐 Campo de Metros Cuadrados / Pies Cuadrados (Entrada Manual)": "📐 Square Footage / Metros Cuadrados Field (Manual Freeform Entry)",
  "El cliente puede escribir libremente a mano": "Client can freely type square meters or sq ft by hand",
  "Label Metros / Sq Ft:": "Sq Ft / Metros Cuadrados Label:",
  "Placeholder del Campo:": "Field Placeholder:",
  "Botones Rápidos de Sugerencia / Presets (uno por línea):": "Quick Preset Pills / Suggestions (one per line):",
  "Estados / Regiones Disponibles en el Selector (uno por línea):": "Available States / Regions in Dropdown (one per line):",
  "Tipos de Residencia / Propiedad (uno por línea):": "Residence / Property Types (one per line):",
  "Ciudades Disponibles para Autocompletar / Datalist (una por línea):": "Available Cities for Autocomplete / Datalist (one per line):",
  "Paso 2: Metas, Prioridades y Notas Específicas": "Step 2: Goals, Priorities & Custom Notes",
  "Título Paso 2:": "Step 2 Title:",
  "Subtítulo Paso 2:": "Step 2 Subtitle:",
  "Lista de Opciones / Prioridades (una por línea):": "Priorities Checklist Items (one per line):",
  "Label Campo de Notas:": "Notes Field Label:",
  "Placeholder Campo de Notas:": "Notes Field Placeholder:",
  "Paso 3: Datos de Contacto, Franjas Horarias & Garantía": "Step 3: Contact Info, Time Windows & Guarantee",
  "Título Paso 3:": "Step 3 Title:",
  "Subtítulo Paso 3:": "Step 3 Subtitle:",
  "Label Nombre Completo:": "Full Name Field Label:",
  "Label Teléfono:": "Phone Field Label:",
  "Label Email:": "Email Field Label:",
  "Label Fecha Preferida:": "Preferred Date Field Label:",
  "Label Franja Horaria:": "Time Window Field Label:",
  "Franjas Horarias Disponibles (una por línea):": "Available Time Slots (one per line):",
  "Texto de Garantía y Cero Obligación:": "Zero Obligation & Guarantee Disclaimer:",
  "Texto del Botón Final:": "Submit Button Label:",
  "Pantalla de Confirmación Exitosa": "Successful Booking Confirmation Screen",
  "Título de Confirmación:": "Confirmation Title:",
  "Badge de Confirmación:": "Confirmation Badge:",
  "Mensaje de Confirmación:": "Confirmation Message:",
  "Guardar Configuración Modal Schedule": "Save Schedule Modal Settings",

  // Tab 16: Footer
  "Configuración de Pie de Página (Footer)": "Footer & Bottom Section Settings",
  "Edita la descripción legal, información del boletín estacional, teléfonos y licencias.": "Customize legal disclaimers, seasonal newsletter, contact hotlines, license numbers, and quick links.",
  "Boletín de Guía Estacional": "Seasonal Maintenance Guide Newsletter",
  "Mostrar sección de newsletter": "Show newsletter subscribe block",
  "Título del Boletín": "Newsletter Title",
  "Subtítulo del Boletín": "Newsletter Subtitle",
  "Placeholder del Email": "Email Input Placeholder",
  "Texto del Botón Suscribirse": "Subscribe Button Text",
  "Mensaje de Éxito / Agradecimiento": "Success / Thank You Message",
  "Enlaces Rápidos del Footer": "Footer Quick Navigation Links",
  "Regiones de Cobertura en el Footer": "Regional Coverage Links in Footer",
  "Enlaces de Confianza y Legales": "Trust & Legal Disclaimer Links",
  "Números de Licencia y Certificaciones": "License & Contractor Certification Numbers",
  "Teléfono de Emergencia": "24/7 Emergency Phone Number",
  "Texto de Despacho de Emergencias": "Emergency Dispatch Description",
  "Texto de Calificación Google Reviews": "Google Reviews Rating Text",
  "Texto de Copyright y Derechos": "Copyright & Legal Notice",
  "Guardar Footer y Contacto": "Save Footer & Contact Settings",

  // Tab 17: Admin User
  "Credenciales de Acceso & Preferencias del Administrador": "Admin Access Credentials & Language Preferences",
  "Cambia el nombre de usuario, la contraseña y el idioma de la interfaz del panel de control.": "Change administrator username, password, and the dashboard interface language.",
  "Idioma del Panel de Control": "Admin Dashboard Interface Language",
  "Selecciona el idioma con el que deseas trabajar en el panel CMS.": "Select your preferred language to manage the website inside the CMS admin panel.",
  "Usuario y Contraseña de Acceso": "Admin Login Username & Password",
  "Nombre de usuario": "Username",
  "Contraseña": "Password",
  "Mostrar botón Admin en el sitio": "Show Admin Login Button on Live Site",
  "Controla si el acceso al panel admin es visible para los visitantes.": "Controls whether the admin trigger is visible in the header for website visitors.",
  "Guardar Credenciales": "Save Admin Credentials",

  // Tab 18: WhatsApp
  "Configuración del Botón Flotante de WhatsApp": "WhatsApp Floating Chat Widget",
  "Permite a los propietarios iniciar una conversación directa con tu equipo de atención.": "Allow homeowners to start an instant WhatsApp chat with your intake dispatch team.",
  "Activar botón flotante de WhatsApp": "Enable Floating WhatsApp Button",
  "Número de Teléfono (con código de país, ej: +12035550199)": "Phone Number (with country code, e.g. +12035550199)",
  "Mensaje Predefinido": "Pre-filled Default Message",
  "Texto del Tooltip / Globo": "Floating Tooltip / Callout Message",
  "Posición en Pantalla": "Screen Position",
  "Inferior Derecha": "Bottom Right",
  "Inferior Izquierda": "Bottom Left",
  "Guardar WhatsApp": "Save WhatsApp Widget",

  // Tab 19: Backup
  "Copia de Seguridad y Restauración del CMS (Backup & Restore)": "CMS Backup, Export & Factory Reset",
  "Exporta o importa toda la base de datos de contenidos, temas y citas en formato JSON.": "Export or import the full site configuration, styling, pages, and client appointments in JSON format.",
  "Exportar Configuración Completa (Descargar JSON)": "Export Full Configuration (Download JSON)",
  "Importar Configuración desde Archivo JSON": "Import Configuration from JSON File",
  "Seleccionar Archivo JSON": "Select JSON File",
  "Pegar JSON Directamente": "Paste JSON String Directly",
  "Restaurar Copia de Seguridad": "Restore Backup",
  "Restablecer a Valores Iniciales de Fábrica": "Factory Reset to Initial Defaults",
  "Esta acción borrará todas las personalizaciones y volverá al estado predeterminado.": "Warning: This action will erase all local modifications and restore the original site presets.",
  "Restablecer Todo": "Reset Everything to Factory Defaults"
};

/**
 * Translates a single text string from Spanish to English if lang is 'en'.
 */
export function getAdminText(text: string, lang: 'es' | 'en', customEn?: string): string {
  if (lang !== 'en') return text;
  if (customEn) return customEn;
  if (!text) return text;

  const trimmed = text.trim();
  if (ADMIN_TRANSLATIONS[trimmed]) {
    return text.replace(trimmed, ADMIN_TRANSLATIONS[trimmed]);
  }

  // Common dynamic prefixes
  if (trimmed.startsWith('Sección:')) {
    const sub = trimmed.slice(8).trim();
    return `Section: ${ADMIN_TRANSLATIONS[sub] || sub}`;
  }
  if (trimmed.startsWith('Paso ')) {
    return trimmed.replace('Paso ', 'Step ').replace(' de ', ' of ');
  }
  if (trimmed.startsWith('Guardar ')) {
    const target = trimmed.slice(8).trim();
    const mapped = ADMIN_TRANSLATIONS[target] || target;
    return `Save ${mapped}`;
  }
  if (trimmed.startsWith('Añadir ')) {
    const target = trimmed.slice(7).trim();
    const mapped = ADMIN_TRANSLATIONS[target] || target;
    return `Add ${mapped}`;
  }
  if (trimmed.startsWith('Eliminar ')) {
    const target = trimmed.slice(9).trim();
    const mapped = ADMIN_TRANSLATIONS[target] || target;
    return `Delete ${mapped}`;
  }
  if (trimmed.startsWith('Editar ')) {
    const target = trimmed.slice(7).trim();
    const mapped = ADMIN_TRANSLATIONS[target] || target;
    return `Edit ${mapped}`;
  }
  if (trimmed.startsWith('Total ')) {
    const target = trimmed.slice(6).trim();
    const mapped = ADMIN_TRANSLATIONS[target] || target;
    return `Total ${mapped}`;
  }

  return text;
}

const ORIGINAL_TEXT_KEY = '__admin_orig_text__';
const ORIGINAL_PLACEHOLDER_KEY = '__admin_orig_ph__';
const ORIGINAL_TITLE_KEY = '__admin_orig_title__';

/**
 * Deeply translates all text nodes, placeholders, and titles in a DOM tree.
 */
export function translateDomSubtree(root: HTMLElement, lang: 'es' | 'en') {
  if (!root) return;

  const walker = document.createTreeWalker(
    root,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode(node) {
        // Skip script, style, and code blocks if any
        const parent = node.parentElement;
        if (!parent) return NodeFilter.FILTER_REJECT;
        const tag = parent.tagName.toLowerCase();
        if (tag === 'script' || tag === 'style' || tag === 'pre') return NodeFilter.FILTER_REJECT;
        // Don't translate user data inside inputs/textareas
        if (tag === 'textarea' || tag === 'input') return NodeFilter.FILTER_REJECT;
        const text = node.textContent?.trim();
        if (!text || text.length === 0) return NodeFilter.FILTER_SKIP;
        return NodeFilter.FILTER_ACCEPT;
      }
    }
  );

  let currentNode = walker.nextNode();
  while (currentNode) {
    const textNode = currentNode as Text;
    const currentVal = textNode.nodeValue || '';
    const trimmed = currentVal.trim();

    if (!(textNode as any)[ORIGINAL_TEXT_KEY]) {
      (textNode as any)[ORIGINAL_TEXT_KEY] = currentVal;
    }

    const original = (textNode as any)[ORIGINAL_TEXT_KEY];
    if (lang === 'en') {
      const translated = getAdminText(original.trim(), 'en');
      if (translated && translated !== original.trim()) {
        textNode.nodeValue = original.replace(original.trim(), translated);
      }
    } else {
      textNode.nodeValue = original;
    }

    currentNode = walker.nextNode();
  }

  // Also translate placeholder attributes
  const inputsWithPlaceholder = root.querySelectorAll('input[placeholder], textarea[placeholder]');
  inputsWithPlaceholder.forEach((el) => {
    const elem = el as HTMLInputElement | HTMLTextAreaElement;
    if (!(elem as any)[ORIGINAL_PLACEHOLDER_KEY]) {
      (elem as any)[ORIGINAL_PLACEHOLDER_KEY] = elem.placeholder;
    }
    const origPh = (elem as any)[ORIGINAL_PLACEHOLDER_KEY];
    if (lang === 'en') {
      elem.placeholder = getAdminText(origPh, 'en');
    } else {
      elem.placeholder = origPh;
    }
  });

  // Also translate title attributes
  const elementsWithTitle = root.querySelectorAll('[title]');
  elementsWithTitle.forEach((el) => {
    const elem = el as HTMLElement;
    if (!(elem as any)[ORIGINAL_TITLE_KEY]) {
      (elem as any)[ORIGINAL_TITLE_KEY] = elem.title;
    }
    const origTitle = (elem as any)[ORIGINAL_TITLE_KEY];
    if (lang === 'en') {
      elem.title = getAdminText(origTitle, 'en');
    } else {
      elem.title = origTitle;
    }
  });
}

/**
 * Hook to automatically and live-translate all UI elements inside containerRef when lang changes or tab switches.
 */
export function useAdminAutoTranslation(
  containerRef: RefObject<HTMLElement | null>,
  lang: 'es' | 'en',
  activeTab?: string
) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Run immediate translation
    translateDomSubtree(container, lang);

    // Watch for tab changes or dynamic DOM updates
    let timeoutId: any = null;
    const observer = new MutationObserver(() => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (containerRef.current) {
          translateDomSubtree(containerRef.current, lang);
        }
      }, 50);
    });

    observer.observe(container, {
      childList: true,
      subtree: true,
      characterData: true
    });

    return () => {
      observer.disconnect();
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [containerRef, lang, activeTab]);
}
