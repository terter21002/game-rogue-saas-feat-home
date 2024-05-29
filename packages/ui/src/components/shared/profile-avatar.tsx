import { Avatar, type AvatarProps } from '@nextui-org/avatar';
import { getGradient, getInitialNickname } from '@repo/utils/avatar';

export default function ProfileAvatarComponent(props: AvatarProps): JSX.Element {
  const { name } = props;
  return (
    <Avatar
      classNames={{
        base: getGradient(name),
        name: 'text-white',
      }}
      {...props}
      name={getInitialNickname(name)}
    />
  );
}
