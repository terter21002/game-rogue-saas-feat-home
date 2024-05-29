import { Navigation } from './navigation';
import { Toggle } from './toggle';
import { Wrapper } from './wrapper';

export function Sidebar(): JSX.Element {
  return (
    <Wrapper>
      <Toggle />
      <Navigation />
    </Wrapper>
  );
}
