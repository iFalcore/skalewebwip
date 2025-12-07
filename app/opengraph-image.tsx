import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const alt = 'SKALE Network - Designed for the Internet of Agents';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  const imagePath = join(process.cwd(), 'public', 'opengraph-image.png');
  const imageData = await readFile(imagePath);
  const imageBase64 = imageData.toString('base64');
  const imageSrc = `data:image/png;base64,${imageBase64}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* @ts-expect-error Satori accepts base64 strings for <img src> at runtime */}
        <img src={imageSrc} width={1200} height={630} />
      </div>
    ),
    {
      ...size,
    }
  );
}

