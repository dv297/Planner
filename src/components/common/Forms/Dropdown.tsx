import { Fragment } from 'react';
import { Transition } from '@headlessui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/outline';
import clsx from 'clsx';
import { useSelect } from 'downshift';

export interface SelectionValue {
  value: any;
}

export interface DropdownOption {
  label: string;
  value: any;
}

interface DropdownProps {
  label: string;
  onChange?: (value: SelectionValue) => void;
  options: DropdownOption[];
  initialValue?: any;
  id: string;
  onOpen?: () => void;
}

const Dropdown = (props: DropdownProps) => {
  const { onChange, label, options, initialValue, id, onOpen } = props;
  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
    selectedItem,
  } = useSelect({
    initialSelectedItem: options.find(
      (option) => option.value === initialValue
    ),
    items: options,
    itemToString(item) {
      return item ? item.label : '';
    },
    onSelectedItemChange(stateChange) {
      onChange?.({ value: stateChange?.selectedItem?.value ?? undefined });
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
          className={clsx(
            'w-full h-10 border border-gray-300 dark:border-gray-700 text-lg px-4 py-1 rounded-lg flex flex-row justify-start items-center'
          )}
          type="button"
          {...getToggleButtonProps({}, { suppressRefError: true })}
        >
          <span className="grow flex-1 flex justify-start">
            {selectedItem ? selectedItem.label : 'Select...'}
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
            {options.map((item, index) => (
              <li
                className={clsx(
                  highlightedIndex === index && 'bg-accent-blue-500 text-white',
                  selectedItem?.value === item.value && 'font-bold',
                  'bg-white dark:bg-gray-700 py-2 px-6 shadow-sm flex flex-col text-base'
                )}
                key={`${item.value}-${index}`}
                {...getItemProps({ item, index })}
              >
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
        </Transition>
      </div>
    </div>
  );
};

export default Dropdown;
