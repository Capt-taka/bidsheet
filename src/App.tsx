import React, { useState } from 'react';
import { 
  Printer, 
  Settings, 
  Plus, 
  Trash2, 
  Upload, 
  Image as ImageIcon,
  Type,
  Save,
  RefreshCw
} from 'lucide-react';
import { cn } from './lib/utils';

interface BidItem {
  id: string;
  description: string;
  quantity: number;
  unit: string;
  rate: number;
}

interface AppSettings {
  logoUrl: string;
  watermarkUrl: string;
  footerText: string;
  companyName: string;
  companyAddress: string;
  companyContact: string;
  companyWebsite: string;
}

const DEFAULT_SETTINGS: AppSettings = {
  logoUrl: '/default-logo.png',
  watermarkUrl: '/default-watermark.png',
  footerText: 'Payment for in soil/not in soil begins at the top of ground/top of water or top of pile or shaft, whichever is higher, to the tip of the pile or shaft.',
  companyName: 'SOUTHEAST CAISSONS',
  companyAddress: 'PO Box 574, Kernersville, NC 27285',
  companyContact: 'Office: (336) 510-5350',
  companyWebsite: 'www.southeastcaissons.com'
};

export default function App() {
  const [items, setItems] = useState<BidItem[]>([
    { id: '1', description: '', quantity: 0, unit: 'LF', rate: 0 },
    { id: '2', description: '', quantity: 0, unit: 'LF', rate: 0 },
    { id: '3', description: '', quantity: 0, unit: 'LF', rate: 0 },
    { id: '4', description: '', quantity: 0, unit: 'LF', rate: 0 },
    { id: '5', description: '', quantity: 0, unit: 'LF', rate: 0 },
    { id: '6', description: 'Mobilization', quantity: 1, unit: 'EA', rate: 0 },
  ]);
  
  const [project, setProject] = useState('');
  const [bidDate, setBidDate] = useState(new Date().toISOString().split('T')[0]);
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);
  const [showSettings, setShowSettings] = useState(false);

  const handleAddItem = () => {
    setItems([...items, { id: Math.random().toString(36).substr(2, 9), description: '', quantity: 0, unit: 'LF', rate: 0 }]);
  };

  const handleRemoveItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleUpdateItem = (id: string, field: keyof BidItem, value: string | number) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const total = items.reduce((acc, item) => acc + (item.quantity * item.rate), 0);

  const handlePrint = () => {
    window.print();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'logo' | 'watermark') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSettings(prev => ({
          ...prev,
          [type === 'logo' ? 'logoUrl' : 'watermarkUrl']: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 print:p-0 print:bg-white" style={{ fontFamily: 'Calibri, Arial, sans-serif' }}>
      {/* Controls - Hidden on Print */}
      <div className="max-w-4xl mx-auto mb-8 flex flex-wrap gap-4 items-center justify-between print:hidden">
        <h1 className="text-2xl font-bold text-gray-800">Bid Generator</h1>
        <div className="flex gap-2">
          <button 
            onClick={() => setShowSettings(!showSettings)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
          >
            <Settings size={18} />
            Settings
          </button>
          <button 
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            <Printer size={18} />
            Print Bid
          </button>
        </div>
      </div>

      {/* Settings Panel - Hidden on Print */}
      {showSettings && (
        <div className="max-w-4xl mx-auto mb-8 p-6 bg-white rounded-xl shadow-lg border border-gray-200 print:hidden animate-in fade-in slide-in-from-top-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Settings className="text-blue-600" />
              Document Settings
            </h2>
            <button onClick={() => setShowSettings(false)} className="text-gray-400 hover:text-gray-600">
              ✕
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                <input 
                  type="text" 
                  value={settings.companyName}
                  onChange={(e) => setSettings({...settings, companyName: e.target.value})}
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input 
                  type="text" 
                  value={settings.companyAddress}
                  onChange={(e) => setSettings({...settings, companyAddress: e.target.value})}
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Info</label>
                <input 
                  type="text" 
                  value={settings.companyContact}
                  onChange={(e) => setSettings({...settings, companyContact: e.target.value})}
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                <input 
                  type="text" 
                  value={settings.companyWebsite}
                  onChange={(e) => setSettings({...settings, companyWebsite: e.target.value})}
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Logo Image</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Image URL"
                    value={settings.logoUrl}
                    onChange={(e) => setSettings({...settings, logoUrl: e.target.value})}
                    className="flex-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <label className="cursor-pointer p-2 bg-gray-100 rounded-md hover:bg-gray-200">
                    <Upload size={20} />
                    <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, 'logo')} />
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Watermark Image</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Image URL"
                    value={settings.watermarkUrl}
                    onChange={(e) => setSettings({...settings, watermarkUrl: e.target.value})}
                    className="flex-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <label className="cursor-pointer p-2 bg-gray-100 rounded-md hover:bg-gray-200">
                    <Upload size={20} />
                    <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, 'watermark')} />
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Footer Statement</label>
                <textarea 
                  value={settings.footerText}
                  onChange={(e) => setSettings({...settings, footerText: e.target.value})}
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none h-24 resize-none"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Form Area */}
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8">
        {/* Editor Side - Hidden on Print */}
        <div className="flex-1 space-y-6 print:hidden">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Type size={18} className="text-blue-600" />
              Project Information
            </h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Project Name</label>
                <input 
                  type="text" 
                  value={project}
                  onChange={(e) => setProject(e.target.value)}
                  placeholder="Enter project name..."
                  className="w-full px-4 py-3 bg-gray-50 border-none rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-lg font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Bid Date</label>
                <input 
                  type="date" 
                  value={bidDate}
                  onChange={(e) => setBidDate(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border-none rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Line Items</h3>
              <button 
                onClick={handleAddItem}
                className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                <Plus size={16} />
                Add Item
              </button>
            </div>
            
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex flex-wrap md:flex-nowrap gap-2 p-3 bg-gray-50 rounded-lg group">
                  <input 
                    type="text" 
                    value={item.description}
                    onChange={(e) => handleUpdateItem(item.id, 'description', e.target.value)}
                    placeholder="Description"
                    className="flex-1 min-w-50 px-2 py-1 bg-transparent border-b border-gray-300 focus:border-blue-500 outline-none"
                  />
                  <div className="flex gap-2 items-center">
                    <input 
                      type="number" 
                      value={item.quantity || ''}
                      onChange={(e) => handleUpdateItem(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                      placeholder="Qty"
                      className="w-20 px-2 py-1 bg-transparent border-b border-gray-300 focus:border-blue-500 outline-none text-right"
                    />
                    <input 
                      type="text" 
                      value={item.unit}
                      onChange={(e) => handleUpdateItem(item.id, 'unit', e.target.value)}
                      placeholder="Unit"
                      className="w-16 px-2 py-1 bg-transparent border-b border-gray-300 focus:border-blue-500 outline-none text-center"
                    />
                    <div className="flex items-center text-gray-400">$</div>
                    <input 
                      type="number" 
                      value={item.rate || ''}
                      onChange={(e) => handleUpdateItem(item.id, 'rate', parseFloat(e.target.value) || 0)}
                      placeholder="Rate"
                      className="w-24 px-2 py-1 bg-transparent border-b border-gray-300 focus:border-blue-500 outline-none text-right"
                    />
                    <button 
                      onClick={() => handleRemoveItem(item.id)}
                      className="p-1 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Print-only document (no on-screen preview) */}
        <div className="hidden print:block w-full">
          <div 
            className="bg-white w-[210mm] m-auto p-[10mm]"
            style={{ fontFamily: 'Calibri, Arial, sans-serif' }}
          >
            <div className="relative z-10">
              {(() => {
                const filteredItems = items.filter(item => item.description.trim() !== '' || item.quantity > 0 || item.rate > 0);
                const rowsPerPage = 10;
                const pages = Array.from({ length: Math.max(1, Math.ceil(filteredItems.length / rowsPerPage)) }, (_, pageIndex) => {
                  const start = pageIndex * rowsPerPage;
                  const end = start + rowsPerPage;
                  return filteredItems.slice(start, end);
                });

                return pages.map((pageRows, pageIndex) => (
                  <div key={pageIndex} style={{ pageBreakAfter: pageIndex < pages.length - 1 ? 'always' : 'auto', height: 'calc(297mm - 20mm)', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
                    {/* Watermark - on every page */}
                    {settings.watermarkUrl && (
                      <img
                        src={settings.watermarkUrl}
                        alt="Watermark"
                        className="absolute pointer-events-none opacity-[0.08]"
                        style={{
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          maxWidth: '60%',
                          maxHeight: '60%',
                          objectFit: 'contain',
                          zIndex: 0,
                        }}
                      />
                    )}

                    <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', height: '100%' }}>
                    {/* Header - only on first page */}
                    {pageIndex === 0 && (
                      <>
                        <div className="text-center mb-8">
                          {settings.logoUrl && (
                            <img 
                              src={settings.logoUrl} 
                              alt="Logo" 
                              className="h-32 mx-auto mb-4 object-contain"
                              referrerPolicy="no-referrer"
                            />
                          )}
                          <h2 className="text-2xl font-bold tracking-widest text-gray-900 mb-1 uppercase">{settings.companyName}</h2>
                          <p className="text-sm text-gray-700">{settings.companyAddress}</p>
                          <p className="text-sm text-gray-700 mt-1">{settings.companyContact}</p>
                          <a href={`https://${settings.companyWebsite}`} className="text-sm text-blue-800 underline mt-1 block">{settings.companyWebsite}</a>
                        </div>

                        {/* Project Info */}
                        <div className="mb-8 space-y-2">
                          <div className="flex gap-2">
                            <span className="font-bold min-w-20">Project:</span>
                            <span className="border-b border-gray-400 flex-1 min-h-6">{project}</span>
                          </div>
                          <div className="flex gap-2">
                            <span className="font-bold min-w-20">Bid Date:</span>
                            <span className="border-b border-gray-400 flex-1 min-h-6">{bidDate}</span>
                          </div>
                        </div>
                      </>
                    )}

                    {/* Table Container */}
                    {pageIndex > 0 && <div style={{ height: '10mm' }} />}
                    <div style={{ flex: '1 1 auto', display: 'flex' }}>
                      <div className="w-full">
                      <table className="w-full border-collapse border border-black text-sm mb-4">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="border border-black px-2 py-1 text-left uppercase font-bold w-[45%]">Item</th>
                            <th className="border border-black px-2 py-1 text-center uppercase font-bold w-[15%]">Quantity</th>
                            <th className="border border-black px-2 py-1 text-center uppercase font-bold w-[8%]">Unit</th>
                            <th className="border border-black px-2 py-1 text-center uppercase font-bold w-[4%]"></th>
                            <th className="border border-black px-2 py-1 text-right uppercase font-bold w-[14%]">Rate</th>
                            <th className="border border-black px-2 py-1 text-right uppercase font-bold w-[14%]">Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {pageRows.map((item) => (
                            <tr key={item.id} className="h-8">
                              <td className="border border-black px-2 py-1">{item.description}</td>
                              <td className="border border-black px-2 py-1 text-center">{item.quantity || ''}</td>
                              <td className="border border-black px-2 py-1 text-center">{item.unit}</td>
                              <td className="border border-black px-2 py-1 text-center">@</td>
                              <td className="border border-black px-2 py-1 text-right">
                                {item.rate ? `$ ${item.rate.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : ''}
                              </td>
                              <td className="border border-black px-2 py-1 text-right">
                                {item.quantity * item.rate ? `$ ${(item.quantity * item.rate).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : ''}
                              </td>
                            </tr>
                          ))}

                          {[...Array(Math.max(0, rowsPerPage - pageRows.length))].map((_, i) => (
                            <tr key={`empty-${pageIndex}-${i}`} className="h-8 print:hidden">
                              <td className="border border-black px-2 py-1"></td>
                              <td className="border border-black px-2 py-1"></td>
                              <td className="border border-black px-2 py-1"></td>
                              <td className="border border-black px-2 py-1"></td>
                              <td className="border border-black px-2 py-1"></td>
                              <td className="border border-black px-2 py-1"></td>
                            </tr>
                          ))}

                          {pageIndex === pages.length - 1 && (
                            <tr className="h-10 font-bold">
                              <td colSpan={4} className="border-none"></td>
                              <td className="border border-black px-2 py-1 text-center bg-gray-50 uppercase">Total</td>
                              <td className="border border-black px-2 py-1 text-right bg-gray-50">
                                $ {total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                      </div>
                    </div>

                    {/* Footer - on every page */}
                    <div className="mt-auto">
                      <p className="text-[10pt] text-red-400 italic leading-tight text-center">{settings.footerText}</p>
                    </div>
                    </div>
                  </div>
                ));
              })()}
            </div>
          </div>
        </div>
      </div>

      {/* Global CSS for printing */}
      <style>{`
        @media print {
          body {
            background: white !important;
            margin: 0;
            padding: 0;
          }
          @page {
            margin: 0;
            size: A4;
          }
          .print-hidden {
            display: none !important;
          }
          div[style*="pageBreakAfter"] {
            page-break-after: always;
            break-after: page;
          }
        }
      `}</style>
    </div>
  );
}
