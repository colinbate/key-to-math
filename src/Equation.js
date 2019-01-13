import { html } from 'https://unpkg.com/htm/preact/standalone.mjs';

export const Equation = ({a, b, op, answer, incorrect}) => html`
  <div class=${'text-t2 font-mono flex flex-col w-3/5 mx-auto text-right ' + (incorrect ? 'shake' : '')}>
    <div class="px-3">${a}</div>
    <div class="px-3 border-black border-b-3">
      <span class="op">${op}</span><span class="b">${b}</span>
    </div>
    <div class="px-3 hidden">=</div>
    <div class="px-3">${answer || '​'}</div>
  </div>
`;
