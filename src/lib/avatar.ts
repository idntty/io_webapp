interface BlobOptions {
  numPoints: number;
  centerX: number;
  centerY: number;
  radius: number;
  subkey: string;
}

function createBlob(options: BlobOptions): string {
  const { numPoints, centerX, centerY, radius, subkey } = options;

  const points: { x: number; y: number }[] = [];
  const slice = (Math.PI * 2) / numPoints;
  const startAngle = 0;

  for (let i = 0; i < subkey.length; i++) {
    const angle = startAngle + i * slice;
    const rnd = Number('0x' + subkey.substring(i, i + 1));
    const point = {
      x: centerX + Math.cos(angle) * (radius + rnd),
      y: centerY + Math.sin(angle) * (radius + rnd),
    };
    points.push(point);
  }

  const size = points.length;
  let path = `M${points[0].x} ${points[0].y} C`;

  for (let i = 0; i < size; i++) {
    const p0 = points[(i - 1 + size) % size];
    const p1 = points[i];
    const p2 = points[(i + 1) % size];
    const p3 = points[(i + 2) % size];

    const x1 = p1.x + (p2.x - p0.x) / 6;
    const y1 = p1.y + (p2.y - p0.y) / 6;

    const x2 = p2.x - (p3.x - p1.x) / 6;
    const y2 = p2.y - (p3.y - p1.y) / 6;

    path += ` ${x1} ${y1} ${x2} ${y2} ${p2.x} ${p2.y}`;
  }

  return path + 'z';
}

export function generateSVGAvatar(pubKey: string, raw = false): string {
  const particles: string[] = [];
  const gradients: string[] = ['#000000'];
  const defs: string[] = [];

  for (let a = 0; a < 64; a += 8) {
    const blob = createBlob({
      numPoints: 8,
      centerX: 256,
      centerY: 256 - a * 4,
      radius: 16,
      subkey: pubKey.substring(a, a + 8),
    });

    const color = '#' + pubKey.substring(a + 2, a + 8);
    const width = Number('0x' + pubKey.substring(a, a + 1));
    const opacity = Number('0x' + pubKey.substring(a + 1, a + 2)) / 8;

    gradients.push(color);
    defs.push(
      `<radialGradient id="a-${a}" cx="0" cy="0" r="0.75" fx="0.35" fy="0.5" spreadMethod="reflect"><stop offset="0%" stop-color="${gradients[gradients.length - 1]}"/><stop offset="100%" stop-color="${gradients[gradients.length]}"/></radialGradient>`,
    );
    particles.push(
      `<path d="${blob}" stroke="url(#a-${a})" stroke-width="${width}" stroke-opacity="${opacity}" fill="transparent"/>`,
    );
  }

  let ph = '';
  const off = 4 + Number('0x' + pubKey.substring(0, 1));
  let rotate = 0;
  for (let i = 0; i < off; i++) {
    ph += `<use xlink:href="#pattern-${pubKey}" mask="url(#mask)" class="segment" style="transform-origin:center center;transform: scaleY(1) rotate(${rotate}deg)"></use>\n`;
    rotate += 360 / off;
  }

  const svg = [
    '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" preserveAspectRatio="xMidYMid slice" viewBox="0 0 512 512">',
    '<defs>',
    '<radialGradient id="e" cx="0" cy="0" r="0.75" fx="0.35" fy="0.5" spreadMethod="reflect">',
    '<stop offset="0%" stop-color="red"/>',
    '<stop offset="100%" stop-color="blue"/>',
    '</radialGradient>',
    defs.join('\n'),
    '</defs>',
    `<symbol id="pattern-${pubKey}">`,
    particles.join(''),
    '</symbol>',
    `<g style="transform-origin:center center; transform: rotate(${pubKey}deg)">`,
    ph,
    '</g>',
    '</svg>',
  ].join('');

  return raw ? svg : 'data:image/svg+xml;base64,' + btoa(svg);
}
