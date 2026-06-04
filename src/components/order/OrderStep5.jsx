import FileUploader from '../shared/FileUploader';

const FILE_TYPES = ['Sketches','Site Plan','Survey','Existing Drawings','Inspiration Images','Permit Checklist','Review Comments','Soil Report','Truss Drawings','Photos'];

export default function OrderStep5({ data, updateData }) {
  return (
    <div>
      <div className="font-mono text-yellow text-[9px] tracking-widest uppercase mb-1">Step 5 of 6</div>
      <h2 className="font-condensed font-black text-navy text-2xl uppercase tracking-tight mb-1">Upload Project Files</h2>
      <p className="font-inter text-steel text-sm mb-6">Attach any available files. All file types are accepted. Files help us understand the project and prepare drawings faster.</p>

      <div className="mb-5">
        <div className="font-mono text-[9px] text-steel tracking-widest uppercase mb-3">Accepted file types</div>
        <div className="flex flex-wrap gap-2">
          {FILE_TYPES.map(ft => (
            <span key={ft} className="font-mono text-[8px] bg-silver/60 text-steel px-2 py-1 tracking-wide border border-silver">{ft}</span>
          ))}
        </div>
      </div>

      <FileUploader
        fileUrls={data.uploadedFileUrls || []}
        fileNames={data.uploadedFileNames || []}
        onChange={({ urls, names }) => updateData({ uploadedFileUrls: urls, uploadedFileNames: names })}
      />

      <div className="mt-6 p-4 bg-silver/30 border border-silver">
        <div className="font-mono text-[9px] text-steel tracking-widest uppercase mb-1">No files yet?</div>
        <p className="font-inter text-steel text-sm leading-relaxed">You can skip this step and submit the form. We will follow up to request any files needed to begin the drawings.</p>
      </div>
    </div>
  );
}