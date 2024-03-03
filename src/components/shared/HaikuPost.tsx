import { HaikuPostType } from '../../types';
import Icon from './Icon';

export default function HaikuPost({
  content,
  created_at,
  profiles,
}: HaikuPostType) {
  const { username } = profiles;
  const lines = content.split('\n');
  return (
    <div className="border-b-2 py-3">
      <div className="flex items-center">
        <div className="flex flex-1 items-center gap-4">
          <div className="w-11 h-11 rounded-full overflow-hidden bg-red-400">
            <img src="/assets/default-pfp.svg" className="w-full" />
          </div>
          <p>{username}</p>
        </div>
        <p>{created_at.toString()}</p>
      </div>
      <div className="text-lg pt-4 pb-6">
        {lines.map((line) => (
          <p>{line}</p>
        ))}
      </div>
      <div className="flex justify-between">
        <div className="flex gap-5">
          <Icon
            id="icon-like"
            className="w-6 h-6 fill-none stroke-current cursor-pointer"
          />
          <Icon
            id="icon-comment"
            className="w-6 h-6 fill-none stroke-current cursor-pointer"
          />
        </div>
        <Icon
          id="icon-save"
          className="w-6 h-6 fill-none stroke-current cursor-pointer"
        />
      </div>
    </div>
  );
}
