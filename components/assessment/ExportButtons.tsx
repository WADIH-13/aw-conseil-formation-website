import React from 'react';

type ExportButtonsProps = {
  onDownload: () => void;
};

const ExportButtons: React.FC<ExportButtonsProps> = ({ onDownload }) => {
  return (
    <div className="flex justify-end mt-4">
      <button
        onClick={onDownload}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
      >
        Télécharger mon rapport (PDF)
      </button>
    </div>
  );
};

export default ExportButtons;