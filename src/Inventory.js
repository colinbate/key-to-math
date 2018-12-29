import { html } from 'https://unpkg.com/htm/preact/standalone.mjs';
import { Key } from './Key.js';
import { MAX_KEYS } from './consts.js';

export const Inventory = ({keys}) => {
  const allKeys = (keys || []).concat(Array(MAX_KEYS - keys.length).fill({color: 'missing'}));
  return html`
    <div class="bg-grey-light shadow h-16 p-2 z-10">
      <ul class="list-reset flex justify-around h-full">
        ${allKeys.map(k => html`
          <${Key} ...${k} />
        `)}
      </ul>
    </div>
  `;
}
