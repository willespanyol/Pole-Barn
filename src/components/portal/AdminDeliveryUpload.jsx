import { useState } from 'react';
import { appClient } from '@/api/appClient';
import { Upload, X, FileText, CheckCircle2, Loader2 } from 'lucide-react';

export default function AdminDeliveryUpload({ order, onUpdate }) {
  const [uploading, setUploading] = useState(false);
  const [saved, setSaved] = useState(false);

  const existingNames = order.deliveredFileNames || [];
  const existingUrls = order.deliveredFileUrls || [];

  const handleFiles = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setUploading(true);

    const newNames = [...existingNames];
    const newUrls = [...existingUrls];

    for (const file of files) {
      const { file_url } = await appClient.integrations.Core.UploadFile({ file });
      newNames.push(file.name);
      newUrls.push(file_url);
    }

    const updated = await appClient.entities.ProjectOrder.update(order.id, {
      deliveredFileNames: newNames,
      deliveredFileUrls: newUrls,
    });
    onUpdate(updated);
    setUploading(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
    e.target.value = '';
  };

  const removeFile = async (index) => {
    const newNames = existingNames.filter((_, i) => i !== index);
    const newUrls = existingUrls.filter((_, i) => i !== index);
    const updated = await appClient.entities.ProjectOrder.update(order.id, {
      deliveredFileNames: newNames,
      deliveredFileUrls: newUrls,
    });
    onUpdate(updated);
  };

  return (
    <div className="border border-green-200 bg-green-50/50 p-4 space-y-3">
      <div className="font-mono text-[9px] text-green-700 tracking-widest uppercase flex items-center justify-between">
        <span>Deliver Files to Client</span>
        {saved && <span className="flex items-center gap-1 text-green-600"><CheckCircle2 size={10} /> Uploaded</span>}
      </div>

      {/* Existing files */}
      {existingNames.length > 0 && (
        <div className="space-y-1.5">
          {existingNames.map((name, i) => (
            <div key={i} className="flex items-center justify-between border border-green-200 bg-white px-3 py-2">
              <div className="flex items-center gap-2 min-w-0">
                <FileText size={12} className="text-green-600 flex-shrink-0" />
                <span className="font-inter text-xs text-navy truncate">{name}</span>
              </div>
              <button
                onClick={() => removeFile(i)}
                className="text-steel hover:text-red-500 ml-2 transition-colors flex-shrink-0 min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                <X size={13} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Upload zone */}
      <label className={`flex items-center justify-center gap-3 border-2 border-dashed border-green-300 bg-white py-4 px-5 cursor-pointer hover:border-green-500 transition-colors ${uploading ? 'opacity-60 pointer-events-none' : ''}`}>
        {uploading ? (
          <><Loader2 size={15} className="text-green-600 animate-spin" /><span className="font-condensed font-bold text-green-700 text-sm uppercase tracking-wide">Uploading...</span></>
        ) : (
          <><Upload size={15} className="text-green-600" /><span className="font-condensed font-bold text-green-700 text-sm uppercase tracking-wide">Upload Drawings / Documents</span></>
        )}
        <input type="file" multiple onChange={handleFiles} className="hidden" accept=".pdf,.dwg,.dxf,.png,.jpg,.jpeg,.zip" />
      </label>

      <p className="font-inter text-[10px] text-green-700/70 leading-relaxed">
        Uploaded files are immediately visible to the client in their portal under "Files Ready".
      </p>
    </div>
  );
}