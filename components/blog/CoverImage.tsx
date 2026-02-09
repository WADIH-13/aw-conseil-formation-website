import Image from 'next/image'

type CoverImageProps = {
  src: string
  alt: string
  ratio?: '16:9' | '21:9'
  priority?: boolean
}

export default function CoverImage({ src, alt, ratio = '21:9', priority = false }: CoverImageProps) {
  const ratioClassName = ratio === '16:9' ? 'aspect-video' : 'aspect-[21/9]'

  return (
    <figure className="w-full overflow-hidden rounded-2xl border border-black/5 bg-black/[0.02]">
      <div className={`relative w-full ${ratioClassName}`}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, 1152px"
          className="object-cover"
        />
      </div>
    </figure>
  )
}
