import { html } from 'https://unpkg.com/htm/preact/standalone.mjs';

export const Gauge = ({progress}) => html`
  <div class="absolute h-full pin-r pin-t w-16 px-4 pt-20 pb-xxl">
    <div class="w-8 border border-grey-dark h-full overflow-hidden rounded-full mask">
      <div class=${'bg-white h-full ease-transform transy-' + progress}></div>
    </div>
  </div>
`;