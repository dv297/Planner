/**
 * @author Simeon Griggs
 * Copied from https://www.sanity.io/guides/tailwindcss-typography-prose-portable-text
 */

import { PortableText } from '@portabletext/react';
import React, { useMemo } from 'react';

/**
 * Use Tailwind CSS's `prose` classes with Portable Text markup (blocks)
 * Without inheriting styles for custom components (types)
 */
const ProseableText = ({ value = [] }) => {
  // Group together standard `_type === "block"`  blocks
  // eg <p>, <li>, etc – and separate out everyone else
  const valueGroups = useMemo(
    () =>
      value.reduce(
        (acc, item) => {
          const lastIdx = acc.length - 1;

          if (
            // We don't have items in this group yet
            acc[lastIdx].length === 0 ||
            // The last group has the same `type`
            acc[lastIdx][0]._type === item._type
          ) {
            acc[lastIdx].push(item);
          } else {
            // Time to create a new group, because the `type` is different compared to last group
            acc.push([item]);
          }

          return acc;
        },
        [[]]
      ),
    [value]
  );

  if (!valueGroups?.length) return null;

  return (
    <div>
      {valueGroups.map((group) =>
        group[0]._type === 'block' ? (
          <div key={group[0]._key} className="prose py-4">
            <PortableText value={group} />
          </div>
        ) : (
          <PortableText key={group[0]._key} value={group} />
        )
      )}
    </div>
  );
};

export default ProseableText;
