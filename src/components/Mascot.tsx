type CoreMascot =
  | 'code'
  | 'math'
  | 'cloud'
  | 'secure'
  | 'consult'
  | 'partner'
  | 'build'
  | 'debug'
  | 'deploy'
  | 'think'
  | 'nigeria'
  | 'teach';

type SystemsMascot = 'ledger' | 'integrate' | 'architect';

type MascotProps = {
  variant: CoreMascot | SystemsMascot;
  label?: string;
  className?: string;
  motion?: 'float' | 'inspect' | 'celebrate' | 'none';
};

const corePositions: Record<CoreMascot, [number, number]> = {
  code: [0, 0],
  math: [1, 0],
  cloud: [2, 0],
  secure: [3, 0],
  consult: [0, 1],
  partner: [1, 1],
  build: [2, 1],
  debug: [3, 1],
  deploy: [0, 2],
  think: [1, 2],
  nigeria: [2, 2],
  teach: [3, 2],
};

const systemsPositions: Record<SystemsMascot, number> = {
  ledger: 0,
  integrate: 1,
  architect: 2,
};

export default function Mascot({
  variant,
  label,
  className = '',
  motion = 'float',
}: MascotProps) {
  const isSystemsMascot = variant in systemsPositions;
  const position = isSystemsMascot
    ? `${systemsPositions[variant as SystemsMascot] * 50}% 50%`
    : `${(corePositions[variant as CoreMascot][0] / 3) * 100}% ${corePositions[variant as CoreMascot][1] === 1 ? 54 : corePositions[variant as CoreMascot][1] * 50}%`;

  return (
    <div
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={`mascot mascot--${motion} ${className}`}
      style={{
        aspectRatio: isSystemsMascot ? '2 / 3' : '9 / 8',
        backgroundImage: `url(${isSystemsMascot ? '/senseiuc-mascots-systems.webp' : '/senseiuc-mascots.webp'})`,
        backgroundPosition: position,
        backgroundSize: isSystemsMascot ? '300% 100%' : '400% 300%',
      }}
    />
  );
}
