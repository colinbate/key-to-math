import { html, Component } from 'https://unpkg.com/htm/preact/standalone.mjs';
import { Key } from './Key.js';
import { MAX_KEYS } from './consts.js';
export class Inventory extends Component {
  render({ keys }) {
    const allKeys = (keys || []).concat(Array(MAX_KEYS - keys.length).fill({color: 'missing'}));
    return html`
      <div class="bg-grey-light opacity-75 shadow h-16 p-2">
        <ul class="list-reset flex h-full">
          ${allKeys.map(key => html`
            <${Key} ...${key}>
          `)}
        </ul>
      </div>
    `;
  }
}
