interface LogoProps {
  className?: string;
}

export default function Logo(props: Partial<LogoProps>) {
  const { className } = props;
  return (
    <img
      className={`h-10 ${className}`}
      src="/img/pokeball.png"
      alt="pokemon_logo"
    />
  );
}
