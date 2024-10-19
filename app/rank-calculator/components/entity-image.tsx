import * as Avatar from '@radix-ui/react-avatar';
import { AvatarProps } from '@radix-ui/themes';
import Image, { ImageProps } from 'next/image';

interface EntityImageProps
  extends Pick<AvatarProps, 'size' | 'variant'>,
    Pick<ImageProps, 'alt' | 'src' | 'height' | 'width'> {}

export function EntityImage({
  alt,
  src,
  size = '2',
  variant = 'soft',
  height = 33,
  width = 33,
}: EntityImageProps) {
  return (
    <Avatar.Root
      className={`rt-AvatarRoot rt-reset rt-r-size-${size} rt-variant-${variant}`}
    >
      <Image
        alt={alt}
        className="rt-AvatarImage"
        src={src}
        height={height}
        width={width}
      />
    </Avatar.Root>
  );
}
