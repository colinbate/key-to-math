import { html } from 'https://unpkg.com/htm/preact/standalone.mjs';

export const Checkmark = () => html`
  <div class="w-3/5 mx-auto py-8">
    <svg id="checkmark-svg" class="run-animation" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><circle fill="none" stroke-miterlimit="10" stroke="green" stroke-width="16px" stroke-dasharray="700" stroke-dashoffset="700" class="cls-1 circle" cx="100" cy="100" r="92"/><polyline fill="none" stroke-miterlimit="10" stroke="green" stroke-width="16px" stroke-dasharray="150" stroke-dashoffset="150" class="cls-1 checkmark" points="48.9 103.4 78.9 133.4 148.4 63.9"/></svg>
  </div>
`;