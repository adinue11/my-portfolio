const CODE_SET_1 = [
  { t: 'const Hero = () => {', c: '#c792ea' },
  { t: '  const [hovered, setHovered]', c: '#82aaff' },
  { t: '    = useState(false);', c: '#82aaff' },
  { t: '', c: '' },
  { t: '  return (', c: '#c792ea' },
  { t: "    <section className='hero'>", c: '#f07178' },
  { t: '      <h1>Adinu</h1>', c: '#f07178' },
  { t: '    </section>', c: '#f07178' },
  { t: '  );', c: '#c792ea' },
  { t: '};', c: '#c792ea' }
];

const CODE_SET_2 = [
  { t: '.workspace {', c: '#f07178' },
  { t: '  display: grid;', c: '#82aaff' },
  { t: '  grid-template: 1fr / 1fr 1fr;', c: '#f78c6c' },
  { t: '  gap: 24px;', c: '#82aaff' },
  { t: '  background: #f1e7d8;', c: '#f78c6c' },
  { t: '}', c: '#f07178' },
  { t: '', c: '' },
  { t: '@media (max-width: 768px) {', c: '#c792ea' },
  { t: '  .workspace {', c: '#f07178' },
  { t: '    grid-template: 1fr / 1fr;', c: '#f78c6c' },
  { t: '  }', c: '#f07178' },
  { t: '}', c: '#c792ea' }
];

export function createTypewriter(monitor, codeLines, onType = null) {
  const { canvas, ctx, texture } = monitor;
  const lineHeight = 22;
  const padding = 18;
  const maxLines = Math.floor((canvas.height - padding * 2) / lineHeight);
  let displayed = [];
  let curLine = 0;
  let curChar = 0;
  let cursorOn = true;
  let stopped = false;

  function draw() {
    ctx.fillStyle = '#1e1b2e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#ff5f56';
    ctx.beginPath();
    ctx.arc(16, 14, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ffbd2e';
    ctx.beginPath();
    ctx.arc(34, 14, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#27c93f';
    ctx.beginPath();
    ctx.arc(52, 14, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.font = '15px JetBrains Mono, monospace';
    ctx.textBaseline = 'top';

    const startIdx = Math.max(0, displayed.length - maxLines);
    for (let i = startIdx; i < displayed.length; i += 1) {
      const row = i - startIdx;
      const line = displayed[i];
      ctx.fillStyle = '#4b4868';
      ctx.fillText(String(i + 1).padStart(2, '0'), padding, padding + 28 + row * lineHeight);
      ctx.fillStyle = line.color || '#cbd5e1';
      ctx.fillText(line.text, padding + 34, padding + 28 + row * lineHeight);
    }

    ctx.save();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1;
    for (let y = 0; y < canvas.height; y += 6) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
    ctx.restore();

    if (cursorOn && displayed.length > 0) {
      const row = displayed.length - 1 - startIdx;
      const lastText = displayed[displayed.length - 1].text;
      const tw = ctx.measureText(lastText).width;
      ctx.fillStyle = '#ffb877';
      ctx.fillRect(padding + 34 + tw + 2, padding + 28 + row * lineHeight, 8, 16);
    }

    texture.needsUpdate = true;
  }

  let typingInterval;
  let cursorInterval;
  let pauseTimeout;

  function typeStep() {
    if (stopped) return;

    if (curLine >= codeLines.length) {
      curLine = 0;
      curChar = 0;
      displayed = [];
    }

    const lineObj = codeLines[curLine];
    if (curChar === 0) displayed.push({ text: '', color: lineObj.c });

    if (curChar <= lineObj.t.length) {
      displayed[displayed.length - 1] = { text: lineObj.t.slice(0, curChar), color: lineObj.c };
      curChar += 1;
      onType?.();
      draw();
    } else {
      curChar = 0;
      curLine += 1;
      if (lineObj.t === '' || curLine % 5 === 0) {
        clearInterval(typingInterval);
        pauseTimeout = setTimeout(() => {
          typingInterval = setInterval(typeStep, 32);
        }, 420);
      }
    }
  }

  function start() {
    stopped = false;
    if (typingInterval) clearInterval(typingInterval);
    if (cursorInterval) clearInterval(cursorInterval);
    if (pauseTimeout) clearTimeout(pauseTimeout);
    typingInterval = setInterval(typeStep, 32);
    cursorInterval = setInterval(() => {
      cursorOn = !cursorOn;
      draw();
    }, 500);
  }

  function stop() {
    stopped = true;
    clearInterval(typingInterval);
    clearInterval(cursorInterval);
    clearTimeout(pauseTimeout);
  }

  draw();
  return { start, stop };
}

export { CODE_SET_1, CODE_SET_2 };