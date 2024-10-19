import * as Avatar from '@radix-ui/react-avatar';
import { AvatarProps } from '@radix-ui/themes';
import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

interface EntityImageProps
  extends Pick<AvatarProps, 'size' | 'variant' | 'fallback'>,
    Pick<ImageProps, 'alt' | 'src' | 'height' | 'width'> {}

export function EntityImage({
  alt,
  src,
  size = '2',
  variant = 'soft',
  height = 33,
  width = 33,
  fallback,
}: EntityImageProps) {
  const [showFallback, setShowFallback] = useState(false);

  return (
    <Avatar.Root
      className={`rt-AvatarRoot rt-reset rt-r-size-${size} rt-variant-${variant}`}
    >
      {showFallback ? (
        <Avatar.Fallback className="rt-AvatarFallback">
          {fallback}
        </Avatar.Fallback>
      ) : (
        <Image
          alt={alt}
          className="rt-AvatarImage"
          src={src}
          height={height}
          width={width}
          onError={() => {
            setShowFallback(true);
          }}
        />
      )}
    </Avatar.Root>
  );
}