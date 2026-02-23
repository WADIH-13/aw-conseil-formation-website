import Image from 'next/image';

interface InstructorCardProps {
  name: string;
  title: string;
  bio: string;
  photo?: string;
  specialty?: string;
  email?: string;
}

export function InstructorCard({
  name,
  title,
  bio,
  photo,
  specialty,
  email,
}: InstructorCardProps) {
  return (
    <div className="group">
      <div className="relative mb-8 overflow-hidden rounded-lg bg-gray-100 aspect-square">
        {photo ? (
          <Image
            src={photo}
            alt={name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-gradient-to-br from-gray-200 to-gray-300">
            <span className="text-gray-400 text-5xl font-light">{name.charAt(0)}</span>
          </div>
        )}
      </div>

      <div className="space-y-2 mb-6">
        <h3 className="text-2xl font-semibold text-gray-900">{name}</h3>
        <p className="text-aw-red font-medium">{title}</p>
        {specialty && (
          <p className="text-sm text-gray-600">Spécialité : {specialty}</p>
        )}
      </div>

      <p className="text-gray-700 leading-relaxed text-base mb-6">{bio}</p>

      {email && (
        <a
          href={`mailto:${email}`}
          className="inline-block text-sm font-medium text-aw-red hover:text-red-700 transition-colors border-b border-aw-red hover:border-red-700"
        >
          Prendre contact
        </a>
      )}
    </div>
  );
}
