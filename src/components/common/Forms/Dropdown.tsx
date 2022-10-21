import { Fragment, ReactNode } from 'react';
import { Transition } from '@headlessui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/outline';
import clsx from 'clsx';
import { useSelect } from 'downshift';

export type GenericSelectorOption<TValue extends Record<string, any>> = {
  [P in keyof TValue]: TValue[P];
} & { id: string | null | undefined };

export interface RenderItemDetails {
  classes: Record<string, any>;
  props: any;
}

interface DropdownProps<TValue extends GenericSelectorOption<TValue>> {
  label: string;
  onChange?: (value: TValue) => void;
  options: TValue[];
  initialOptionId?: string | undefined | null;
  id: string;
  onOpen?: () => void;
  renderItem?: (
    value: TValue,
    details: RenderItemDetails
  ) => ReactNode | undefined;
  displayKey: keyof TValue;
}

function Dropdown<TValue extends GenericSelectorOption<TValue>>(
  props: DropdownProps<GenericSelectorOption<TValue>>
) {
  const {
    onChange,
    label,
    options,
    initialOptionId,
    id,
    onOpen,
    renderItem,
    displayKey,
  } = props;
  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
    selectedItem,
  } = useSelect({
    initialSelectedItem: initialOptionId
      ? options.find((option) => option.id === initialOptionId)
      : undefined,
    items: options,
    onSelectedItemChange(stateChange) {
      if (stateChange.selectedItem) {
        onChange?.(stateChange.selectedItem);
      }
    },
    onIsOpenChange(stateChange) {
      if (stateChange.isOpen) {
        onOpen?.();
      }
    },
  });

  return (
    <div>
      <div className="w-full flex flex-col gap-1">
        <label className="w-fit text-sm" {...getLabelProps()}>
          {label}
        </label>
        <button
          id={id}
          aria-label="toggle menu"
          role="button"
          className={clsx(
            'w-full h-10 border border-gray-300 dark:border-gray-700 text-lg px-4 py-1 rounded-lg flex flex-row justify-start items-center'
          )}
          type="button"
          {...getToggleButtonProps({}, { suppressRefError: true })}
        >
          <span className="grow flex-1 flex justify-start">
            {selectedItem ? selectedItem[displayKey] : 'Select...'}
          </span>
          <span className="flex-shrink">
            {isOpen ? (
              <ChevronUpIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            ) : (
              <ChevronDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            )}
          </span>
        </button>
      </div>
      <div className="relative">
        <Transition
          show={isOpen}
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <ul
            data-testid={`${id}-dropdown-options`}
            {...getMenuProps({}, { suppressRefError: true })}
            className={clsx(
              'absolute z-10 mt-2 max-h-60 w-full overflow-auto rounded-md py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm',
              'dark:border dark:border-solid dark:border-gray-700 dark:bg-gray-700 dark:shadow-none'
            )}
          >
            {options.length === 0 && (
              <li className="bg-white dark:bg-gray-700 py-2 px-6 shadow-sm flex flex-col text-base italics">
                No selections available
              </li>
            )}
            {renderItem
              ? options.map((item, index) => {
                  return renderItem(item, {
                    classes: {
                      'bg-accent-blue-500 text-white':
                        highlightedIndex === index,
                      'font-bold': selectedItem?.id === item.id,
                    },
                    props: getItemProps({ item, index }),
                  });
                })
              : options.map((item, index) => (
                  <li
                    className={clsx(
                      {
                        'font-bold': selectedItem?.id === item.id,
                        'bg-accent-blue-500 text-white':
                          highlightedIndex === index,
                      },
                      'bg-white dark:bg-gray-700 py-2 px-6 shadow-sm flex flex-col text-base'
                    )}
                    key={`${item.id}-${index}`}
                    {...getItemProps({ item, index })}
                  >
                    <span>{item[displayKey]}</span>
                  </li>
                ))}
          </ul>
        </Transition>
      </div>
    </div>
  );
}

export default Dropdown;
