import Icon from './Icon';

export default function Loader() {
  return (
    <span className="flex justify-center">
      <Icon
        id="icon-load"
        className="w-6 h-6 fill-none stroke-current animate-spin"
      />
    </span>
  );
}
