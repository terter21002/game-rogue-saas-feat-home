/* eslint-disable @typescript-eslint/no-non-null-assertion -- null*/
/* eslint-disable @typescript-eslint/no-unnecessary-condition -- condition necessary */

import { cn } from '@ui/lib/utils';
import { Command as CommandPrimitive } from 'cmdk';
import { useCallback, useRef, useState, type KeyboardEvent } from 'react';
import { CommandGroup, CommandInput, CommandItem, CommandList } from './command';
import { Skeleton } from './skeleton';

export type Option = Record<'value' | 'label', string> & Record<string, string>;

interface AutoCompleteProps {
  options: Option[];
  value?: Option;
  onValueChange?: (value: Option) => void;
  isLoading?: boolean;
  disabled?: boolean;
  placeholder?: string;
}

export function AutoComplete({
  options,
  placeholder,
  value,
  onValueChange,
  disabled,
  isLoading = false,
}: AutoCompleteProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<Option>(value!);
  const [inputValue, setInputValue] = useState<string>(value?.label || '');

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (!input) {
        return;
      }

      // Keep the options displayed when the user is typing
      if (!isOpen) {
        setIsOpen(true);
      }

      // This is not a default behaviour of the <input /> field
      if (event.key === 'Enter' && input.value !== '') {
        const optionToSelect = options.find((option) => option.label === input.value);
        if (optionToSelect) {
          setSelected(optionToSelect);
          onValueChange?.(optionToSelect);
        }
      }

      if (event.key === 'Escape') {
        input.blur();
      }
    },
    [isOpen, options, onValueChange]
  );

  const handleBlur = useCallback(() => {
    setIsOpen(false);
    setInputValue(selected !== undefined ? selected.label : '');
  }, [selected]);

  const handleSelectOption = useCallback(
    (selectedOption: Option) => {
      setInputValue(selectedOption.label);

      setSelected(selectedOption);
      onValueChange?.(selectedOption);

      // This is a hack to prevent the input from being focused after the user selects an option
      // We can call this hack: "The next tick"
      setTimeout(() => {
        inputRef.current?.blur();
      }, 0);
    },
    [onValueChange]
  );

  return (
    <CommandPrimitive onKeyDown={handleKeyDown}>
      <div>
        <CommandInput
          className="text-base"
          disabled={disabled}
          onBlur={handleBlur}
          onFocus={() => {
            setIsOpen(true);
          }}
          onValueChange={
            isLoading
              ? undefined
              : (input) => {
                  setInputValue(input);
                }
          }
          placeholder={placeholder}
          ref={inputRef}
          value={inputValue}
        />
      </div>
      <div className="relative mt-1">
        {isOpen ? (
          <div className="animate-in fade-in-0 zoom-in-95 absolute top-0 z-10 w-full rounded-xl bg-muted outline-none">
            <CommandList className="rounded-lg ring-1 ring-primary">
              {isLoading ? (
                <CommandPrimitive.Loading>
                  <div className="p-1">
                    <Skeleton className="h-8 w-full" />
                  </div>
                </CommandPrimitive.Loading>
              ) : null}
              {options.length > 0 && !isLoading ? (
                <CommandGroup>
                  {options.map((option) => {
                    return (
                      <CommandItem
                        className={cn('flex w-full items-center gap-2')}
                        key={option.value}
                        onMouseDown={(event) => {
                          event.preventDefault();
                          event.stopPropagation();
                        }}
                        onSelect={() => {
                          handleSelectOption(option);
                        }}
                        value={option.label}
                      >
                        {option.label}
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              ) : null}
              {!isLoading ? (
                <CommandPrimitive.Empty
                  className="select-none cursor-pointer rounded-sm px-2 py-3 text-center text-sm"
                  onClick={() => {
                    handleSelectOption({ label: inputValue, value: inputValue });
                  }}
                  onMouseDown={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                  }}
                >
                  create new tag: {inputValue}
                </CommandPrimitive.Empty>
              ) : null}
            </CommandList>
          </div>
        ) : null}
      </div>
    </CommandPrimitive>
  );
}
