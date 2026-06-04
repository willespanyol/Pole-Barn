import { useState } from 'react';
import { appClient } from '@/api/appClient';
import { Upload, X, Paperclip, CheckCircle2, AlertCircle } from 'lucide-react';

export default function FileUploader({ fileUrls = [], fileNames = [], onChange, label = 'Upload Files' }) {
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState([]);

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setUploading(true);
    setErrors([]);

    const newUrls = [...fileUrls];
    const newNames = [...fileNames];
    const newErrors = [];

    for (const file of files) {
      try {
        const { file_url } = await appClient.integrations.Core.UploadFile({ file });
        newUrls.push(file_url);
        newNames.push(file.name);
      } catch {
        newErrors.push(file.name);
      }
    }

    if (newErrors.length) setErrors(newErrors);
    onChange({ urls: newUrls, names: newNames });
    setUploading(false);
    e.target.value = '';
  };

  const remove = (index) => {
    const newUrls = fileUrls.filter((_, i) => i !== index);
    const newNames = fileNames.filter((_, i) => i !== index);
    onChange({ urls: newUrls, names: newNames });
  };

  return (
    <div>
      {label && <div className="font-mono text-[9px] text-steel tracking-widest uppercase block mb-1.5">{label}</div>}
      <label className={`flex flex-col items-center justify-center border-2 border-dashed border-silver p-6 cursor-pointer hover:border-navy/40 transition-colors ${uploading ? 'opacity-60 pointer-events-none' : ''}`}>
        <Upload size={20} className="text-steel mb-2" />
        <div className="font-condensed font-bold text-navy text-sm uppercase tracking-tight mb-1">
          {uploading ? 'Uploading...' : 'Click to Upload Files'}
        </div>
        <div className="font-inter text-steel text-xs">Site plans, surveys, photos, PDFs — any format</div>
        <input type="file" multiple onChange={handleFileChange} className="hidden" />
      </label>

      {errors.length > 0 && (
        <div className="mt-2 flex items-center gap-2 text-xs text-red-600">
          <AlertCircle size={12} /> Failed to upload: {errors.join(', ')}
        </div>
      )}

      {fileNames.length > 0 && (
        <div className="mt-2 space-y-1.5">
          {fileNames.map((name, i) => (
            <div key={i} className="flex items-center justify-between border border-silver px-3 py-2 bg-silver/10">
              <div className="flex items-center gap-2">
                {fileUrls[i] ? <CheckCircle2 size={12} className="text-green-600 flex-shrink-0" /> : <Paperclip size={12} className="text-steel flex-shrink-0" />}
                <span className="font-inter text-sm text-navy truncate max-w-xs">{name}</span>
              </div>
              <button type="button" onClick={() => remove(i)} className="text-steel hover:text-navy ml-2 flex-shrink-0">
                <X size={13} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}