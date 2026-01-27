import React from 'react';

type StatusCardProps = {
  statusTitle: string;
  shortMessage: string;
  adviceTitle: string;
  adviceBullets: string[];
};

const StatusCard: React.FC<StatusCardProps> = ({
  statusTitle,
  shortMessage,
  adviceTitle,
  adviceBullets,
}) => {
  return (
    <div className="bg-white shadow-md rounded-2xl p-6">
      <h3 className="text-lg font-bold text-red-600">{statusTitle}</h3>
      <p className="text-gray-700 mt-2">{shortMessage}</p>
      <h4 className="text-md font-semibold mt-4">{adviceTitle}</h4>
      <ul className="list-disc list-inside text-gray-600 mt-2">
        {adviceBullets.map((bullet, index) => (
          <li key={index}>{bullet}</li>
        ))}
      </ul>
    </div>
  );
};

export default StatusCard;