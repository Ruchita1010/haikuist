type IconProps = {
  id: string;
} & React.SVGAttributes<SVGElement>;

export default function Icon({ id, ...props }: IconProps) {
  return (
    <svg aria-hidden="true" {...props}>
      <use href={`/assets/sprite.svg#${id}`} />
    </svg>
  );
}
