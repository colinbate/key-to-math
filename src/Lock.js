import { html } from 'https://unpkg.com/htm/preact/standalone.mjs';

const cMap = {
  missing: '#ccc',
  rainbow: 'url(#rainbow)'
};

export const Lock = ({color}) => html`
<div class="locked w-full mt-4 px-32">
  <svg viewBox="0 0 200 260" xmlns="http://www.w3.org/2000/svg" stroke-linecap="round">
    <g>
      <path class="shackle" d="M45 88.537V68.291c0-30.355 24.645-55 55-55 30.356 0 55 24.645 55 55v63.98c0 1.582-.067 3.148-.198 4.696" stroke="url(#silver-metal)" fill="none" stroke-width="25"/>
      <path fill="${cMap[color] || color}" d="M172 120c15.454 0 28 12.546 28 28v84c0 15.453-12.546 28-28 28H28c-15.453 0-28-12.547-28-28v-84c0-15.454 12.547-28 28-28h144zm-59.5 57.5c0-6.899-5.601-12.5-12.5-12.5-6.9 0-12.5 5.601-12.5 12.5v25c0 6.899 5.6 12.5 12.5 12.5 6.899 0 12.5-5.601 12.5-12.5v-25z" stroke-width="0"/>
    </g>
  </svg>
</div>
`;