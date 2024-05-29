import type { SelectProps, SelectedItems } from '@nextui-org/select';
import { Select, SelectItem } from '@nextui-org/select';
import type { TCountryCode } from '@repo/types/country';
import { CCountries } from '@repo/types/country';
import { useMemo } from 'react';

export default function CountrySelectComponent({
  onChange,
  val,
  ...props
}: Partial<
  Omit<SelectProps<(typeof CCountries)[0]>, 'onChange'> & {
    onChange: (val: TCountryCode | undefined) => void;
    val: TCountryCode | undefined;
  }
>): JSX.Element {
  const countries = useMemo(() => {
    return CCountries.sort((a, b) =>
      (a.suggested && !b.suggested) || a.phone === '1' ? -1 : 1
    ).map((item) => ({
      ...item,
      srcSet: `https://flagcdn.com/w40/${item.value.toLowerCase()}.png 2x`,
      src: `https://flagcdn.com/w20/${item.value.toLowerCase()}.png`,
    }));
  }, []);

  const selectedKeys = useMemo(() => {
    return new Set(val ? [val] : []);
  }, [val]);

  return (
    <Select
      {...props}
      aria-label="country-autocomplete"
      items={countries}
      onSelectionChange={(selected: Iterable<unknown> | ArrayLike<unknown>) => {
        if (selected === 'all') {
          onChange?.(countries[0].value as TCountryCode);
        } else {
          onChange?.(Array.from(selected)[0] as TCountryCode);
        }
      }}
      renderValue={(items: SelectedItems<(typeof countries)[0]>) => {
        return items.map((item) => {
          return (
            <div className="flex items-center gap-1" key={item.key}>
              {item.data ? (
                <>
                  <img
                    alt={item.data.value}
                    // loading="lazy"
                    src={item.data.src}
                    srcSet={item.data.srcSet}
                    width="20"
                  />
                  <div className="flex-1">{item.data.label}</div>
                </>
              ) : (
                String(item.key)
              )}
            </div>
          );
        });
      }}
      selectedKeys={selectedKeys}
    >
      {(item: (typeof countries)[0]) => (
        <SelectItem aria-label="country-autocomplete" key={item.value} textValue={item.value}>
          <div className="flex items-center gap-1">
            <img
              alt={item.value}
              src={item.src}
              srcSet={item.srcSet}
              // loading="lazy"
              width="20"
            />
            <div className="flex-1">{item.label}</div>
            {/* <div className="opacity-80">
              {item.phone}
            </div> */}
          </div>
        </SelectItem>
      )}
    </Select>
  );
}
