import { useMemo, useState } from 'react';

interface MenuItem {
  name: string;
  key: string;
  isLink?: boolean;
  to?: string;
  newTab?: boolean;
  handleClick?: () => void;
}

interface NavItemProps {
  name: string;
  items?: MenuItem[];
  isDropdown?: boolean;
  handleClick?: () => void;
  active?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ name, items, isDropdown, handleClick, active }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const itemStyle = useMemo(() => {
    const style = {
      background: 'transparent',
      color: 'white',
      zIndex: 8500,
    };
    if (active === true) {
      style.background = 'url(/static/images/navitem_bg/16.png) !important';
    }
    return style;
  }, [active]);

  const handleOpen = () => {
    setIsMenuOpen(true);
  };

  const handleClose = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="hover:bg-foreground relative px-2">
      <div className="max-w-[calc(100vw - 4rem)]">
        <button
          id={`${name}-button`}
          aria-controls={`${name}-menu`}
          aria-haspopup="true"
          aria-expanded={isMenuOpen ? 'true' : 'false'}
          onClick={handleClick}
          onMouseEnter={handleOpen}
          onMouseLeave={handleClose}
          className={`${itemStyle.background} w-full`}
        >
          <span className="text-md font-bold uppercase text-white">{name}</span>
        </button>
      </div>
      {isDropdown && isMenuOpen && (
        <div
          id={`${name}-menu`}
          className="absolute left-1/2 top-full mt-1 flex -translate-x-1/2 flex-col items-center whitespace-nowrap rounded-md bg-amber-950 p-2 text-center text-white shadow-lg transition-all duration-300"
          onMouseEnter={handleOpen}
          onMouseLeave={handleClose}
        >
          {items &&
            items.map((item) => (
              <div key={item.key}>
                {item.isLink ? (
                  <a
                    href={item.to || '#'}
                    className="block px-2 py-1 transition-all duration-300 hover:bg-amber-800 hover:text-white"
                    target={item.newTab === true ? '_blank' : '_self'}
                  >
                    {item.name}
                  </a>
                ) : (
                  <div
                    className="block px-2 py-1 transition-all duration-300 hover:bg-amber-800 hover:text-white"
                    onClick={item.handleClick}
                  >
                    {item.name}
                  </div>
                )}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default NavItem;
