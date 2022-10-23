import { Fragment, useState } from 'react';
import { Combobox } from '@headlessui/react';
import { CircularProgress } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { useRouter } from 'next/router';

import useDebouncedSetState from '@src/hooks/useDebouncedSetState';
import IssueService from '@src/services/IssueService';
import QueryKeys from '@src/services/QueryKeys';
import { parseIssueTagFromIssue } from '@src/utils/parseIssueTagFromIssue';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const debouncedQueryString = useDebouncedSetState(query, 500);

  const router = useRouter();
  const { data: searchData, isFetching } = useQuery(
    [QueryKeys.SEARCH, { query: debouncedQueryString }],
    () => IssueService.searchIssues(debouncedQueryString),
    {
      enabled: !!debouncedQueryString,
      refetchOnWindowFocus: false,
      keepPreviousData: false,
    }
  );

  return (
    <div className="flex flex-1 justify-between px-4 sm:px-6 lg:mx-auto lg:max-w-6xl lg:px-8 relative">
      <Combobox
        value={null}
        onChange={(issue) => {
          if (issue) {
            const issueTag = parseIssueTagFromIssue(issue);

            router.push(`/app/issue/${issueTag}`);
          }
        }}
      >
        <div className="flex flex-1">
          <label htmlFor="search-field" className="sr-only">
            Search
          </label>
          <div className="relative w-full text-gray-400 focus-within:text-gray-600 dark:focus-within:text-gray-300">
            <div
              className="pointer-events-none absolute inset-y-0 left-0 flex items-center"
              aria-hidden="true"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </div>
            <Combobox.Input
              onChange={(event) => setQuery(event.target.value)}
              className={clsx(
                'block h-full w-full py-2 pl-8 pr-3 border-b border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-0 sm:text-sm',
                'bg-theme-background text-gray-700 dark:text-gray-300 placeholder-gray-700 dark:placeholder-gray-400'
              )}
              placeholder="Search"
              name="search-field"
            />
            {isFetching && (
              <div className="absolute z-10 mt-1 h-24 w-full overflow-auto rounded-md bg-white py-1shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm flex justify-center items-center">
                <CircularProgress />
              </div>
            )}
            {query && searchData && searchData.length === 0 && (
              <div>No results found</div>
            )}
            {query && searchData && searchData.length > 0 && (
              <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {searchData.map((issue) => (
                  /* Use the `active` state to conditionally style the active option. */
                  /* Use the `selected` state to conditionally style the selected option. */
                  <Combobox.Option key={issue.id} value={issue} as={Fragment}>
                    {({ active }) => (
                      <li
                        className={clsx(
                          'relative cursor-default select-none py-2 pl-3 pr-9',
                          active
                            ? 'bg-accent-blue-500 text-white'
                            : 'text-gray-900'
                        )}
                      >
                        {parseIssueTagFromIssue(issue)} - {issue.title}
                      </li>
                    )}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            )}
          </div>
        </div>
      </Combobox>
    </div>
  );
};

export default SearchBar;
