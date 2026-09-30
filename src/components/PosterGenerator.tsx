import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import {
  Download,
  Palette,
  Sparkles,
  Calendar,
  Clock,
  MapPin,
  Building,
  QrCode as QrIcon,
  Check,
  RefreshCw,
  Share2,
} from 'lucide-react';
import { EventDetails, PosterTemplate } from '../types';

interface PosterGeneratorProps {
  eventDetails: EventDetails;
  showToast: (type: 'success' | 'info' | 'error', title: string, message?: string) => void;
}

const TEMPLATES: { id: PosterTemplate; name: string; desc: string; bgStyle: string }[] = [
  {
    id: 'Modern',
    name: 'Modern Gradient',
    desc: 'Deep indigo and electric violet with clean typography',
    bgStyle: 'from-indigo-900 via-indigo-800 to-purple-900 text-white',
  },
  {
    id: 'Minimal',
    name: 'Minimal Stark',
    desc: 'Monochrome, editorial grid, bold contrast rules',
    bgStyle: 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white border border-neutral-300 dark:border-neutral-700',
  },
  {
    id: 'Professional',
    name: 'Professional Navy',
    desc: 'Corporate elegance with sapphire and gold accents',
    bgStyle: 'from-slate-900 via-blue-950 to-slate-900 text-white',
  },
  {
    id: 'Colorful',
    name: 'Vibrant Sunset',
    desc: 'High-energy coral, amber and purple celebration',
    bgStyle: 'from-rose-600 via-amber-600 to-purple-700 text-white',
  },
  {
    id: 'Corporate',
    name: 'Corporate Slate',
    desc: 'Executive aesthetic with emerald and teal geometry',
    bgStyle: 'from-neutral-900 via-teal-950 to-neutral-900 text-white',
  },
  {
    id: 'College Event',
    name: 'College Fest',
    desc: 'Neon cyber-violet and electric cyan for campus events',
    bgStyle: 'from-fuchsia-950 via-purple-900 to-indigo-950 text-white',
  },
];

export const PosterGenerator: React.FC<PosterGeneratorProps> = ({
  eventDetails,
  showToast,
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState<PosterTemplate>('Modern');
  const [headline, setHeadline] = useState(eventDetails.eventName || 'Annual Tech Fest 2026');
  const [tagline, setTagline] = useState(
    eventDetails.shortDescription || 'Code. Build. Innovate. Experience the future of technology.'
  );
  const [ctaText, setCtaText] = useState('Register Today & Save Your Seat');
  const [qrDataUrl, setQrDataUrl] = useState<string>('');

  const posterRef = useRef<HTMLDivElement>(null);

  // Generate QR code when registrationUrl is present
  useEffect(() => {
    if (eventDetails.registrationUrl) {
      QRCode.toDataURL(eventDetails.registrationUrl, {
        width: 160,
        margin: 1,
        color: {
          dark: '#000000',
          light: '#FFFFFF',
        },
      })
        .then((url) => setQrDataUrl(url))
        .catch((err) => console.error('QR generation error:', err));
    } else {
      setQrDataUrl('');
    }
  }, [eventDetails.registrationUrl]);

  // Download Poster as SVG / Image
  const handleDownloadPoster = () => {
    if (!posterRef.current) return;
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>${headline} - Event Poster</title>
            <script src="https://cdn.tailwindcss.com"></script>
            <style>
              @page { size: auto; margin: 10mm; }
              body { margin: 0; display: flex; align-items: center; justify-content: center; min-height: 100vh; background: #f3f4f6; }
            </style>
          </head>
          <body>
            <div style="width: 580px; transform: scale(1);">
              ${posterRef.current.innerHTML}
            </div>
            <script>
              setTimeout(() => { window.print(); }, 500);
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
      showToast('success', 'Poster exported! 🎨', 'Opening print & high-res save dialog.');
    } else {
      showToast('info', 'Download initiated', 'Poster ready for display');
    }
  };

  return (
    <div className="max-w-6xl mx-auto pb-16 space-y-8">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-neutral-200 dark:border-neutral-800">
        <div>
          <h1 className="text-2xl font-extrabold text-neutral-900 dark:text-white tracking-tight flex items-center gap-2">
            <span>🎨 Create Event Poster</span>
          </h1>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            Turn your event details into an exportable, high-res promotional poster with automated QR codes.
          </p>
        </div>

        <button
          onClick={handleDownloadPoster}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-sm transition-all hover:scale-[1.01]"
        >
          <Download className="w-4 h-4" />
          <span>Download / Print Poster</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT: Poster Configuration Controls (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Template Picker */}
          <div className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white block">
              Choose Style Template
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              {TEMPLATES.map((tmpl) => {
                const isSelected = selectedTemplate === tmpl.id;
                return (
                  <button
                    key={tmpl.id}
                    onClick={() => setSelectedTemplate(tmpl.id)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/70 dark:bg-indigo-950/50 ring-2 ring-indigo-500/20'
                        : 'border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800/40 hover:border-neutral-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-neutral-900 dark:text-white">
                        {tmpl.name}
                      </span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-indigo-600" />}
                    </div>
                    <span className="text-[10px] text-neutral-500 dark:text-neutral-400 block line-clamp-1">
                      {tmpl.desc}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Edit Poster Copy */}
          <div className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs space-y-4">
            <label className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white block">
              Edit Poster Text
            </label>

            <div>
              <span className="text-[11px] font-semibold text-neutral-500 block mb-1">
                Main Headline
              </span>
              <input
                type="text"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <span className="text-[11px] font-semibold text-neutral-500 block mb-1">
                Description / Highlights
              </span>
              <textarea
                rows={3}
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none leading-relaxed"
              />
            </div>

            <div>
              <span className="text-[11px] font-semibold text-neutral-500 block mb-1">
                Call-to-Action Text
              </span>
              <input
                type="text"
                value={ctaText}
                onChange={(e) => setCtaText(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* RIGHT: Live Poster Canvas (7 cols) */}
        <div className="lg:col-span-7 flex justify-center">
          <div
            ref={posterRef}
            className={`w-full max-w-[460px] aspect-[4/5.5] rounded-3xl p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden transition-all duration-300 ${
              selectedTemplate === 'Modern'
                ? 'bg-gradient-to-br from-indigo-950 via-indigo-900 to-purple-950 text-white'
                : selectedTemplate === 'Minimal'
                ? 'bg-white text-neutral-900 border-2 border-neutral-900'
                : selectedTemplate === 'Professional'
                ? 'bg-gradient-to-br from-slate-950 via-blue-950 to-neutral-950 text-white'
                : selectedTemplate === 'Colorful'
                ? 'bg-gradient-to-br from-rose-600 via-amber-600 to-purple-800 text-white'
                : selectedTemplate === 'Corporate'
                ? 'bg-gradient-to-br from-neutral-950 via-teal-950 to-neutral-950 text-white'
                : 'bg-gradient-to-br from-fuchsia-950 via-purple-900 to-indigo-950 text-white'
            }`}
          >
            {/* Top Bar on Poster */}
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-current/20">
                <span className="text-[11px] uppercase tracking-widest font-extrabold opacity-80">
                  {eventDetails.organizer || 'Official Event'} Presents
                </span>
                <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-current/10 font-bold">
                  2026 EDITION
                </span>
              </div>

              {/* Main Headline */}
              <div className="mt-8 space-y-3">
                <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
                  {headline}
                </h2>
                <p className="text-xs sm:text-sm opacity-90 leading-relaxed font-normal">
                  {tagline}
                </p>
              </div>
            </div>

            {/* Middle: Details Matrix */}
            <div className="my-6 p-4 rounded-2xl bg-current/5 border border-current/15 backdrop-blur-md space-y-2.5 text-xs">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 opacity-75 shrink-0" />
                <span className="font-semibold">{eventDetails.date || 'Date TBA'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 opacity-75 shrink-0" />
                <span className="font-semibold">{eventDetails.time || 'Time TBA'}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 opacity-75 shrink-0" />
                <span className="font-semibold">{eventDetails.venue || 'Venue TBA'}</span>
              </div>
            </div>

            {/* Bottom: CTA & Automated QR Code */}
            <div className="pt-4 border-t border-current/20 flex items-end justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs sm:text-sm font-black tracking-tight block">
                  {ctaText}
                </span>
                {eventDetails.contactInfo && (
                  <span className="text-[10px] opacity-75 block font-mono">
                    {eventDetails.contactInfo}
                  </span>
                )}
                {eventDetails.registrationUrl && (
                  <span className="text-[10px] opacity-80 block truncate max-w-[220px]">
                    {eventDetails.registrationUrl}
                  </span>
                )}
              </div>

              {/* QR Code Section (Requirement 15: show if URL provided, hide if none) */}
              {qrDataUrl ? (
                <div className="flex flex-col items-center bg-white p-2 rounded-xl text-neutral-900 shadow-md shrink-0">
                  <img src={qrDataUrl} alt="Scan to Register QR Code" className="w-16 h-16" />
                  <span className="text-[8px] font-bold tracking-tight uppercase mt-0.5">
                    Scan to Register
                  </span>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
