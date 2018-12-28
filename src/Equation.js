import { html } from 'https://unpkg.com/htm/preact/standalone.mjs';

export const Equation = ({a, b, op, answer}) => html`
  <div class="text-t2 font-mono flex flex-col w-1/2 mx-auto text-right">
    <div class="px-3">${a}</div>
    <div class="px-3 border-black border-b-3">
      <span class="op">${op}</span><span class="b">${b}</span>
    </div>
    <div class="px-3 hidden">=</div>
    <div class="px-3">${answer}</div>
  </div>
`;
