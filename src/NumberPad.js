import { html } from 'https://unpkg.com/htm/preact/standalone.mjs';

export const Button = ({label, onPush}) => html`
  <button type="button" class="mx-2 p-4 rounded-lg bg-white shadow-btn font-sans text-3xl min-h-button min-w-button focus:outline-none" onClick=${onPush}>${label}</button>
`;

export const NumberPad = ({onPress}) => html`
  <div class="pin-b fixed w-full flex">
  <div class="flex flex-col justify-around pb-4 mx-auto">
    <div class="inline-block">
      <${Button} label="1" onPush=${() => onPress(1)} />
      <${Button} label="2" onPush=${() => onPress(2)} />
      <${Button} label="3" onPush=${() => onPress(3)} />
      <${Button} label="⌫" onPush=${() => onPress(-1)} />
    </div>
    <div class="mt-4 inline-block">
      <${Button} label="4" onPush=${() => onPress(4)} />
      <${Button} label="5" onPush=${() => onPress(5)} />
      <${Button} label="6" onPush=${() => onPress(6)} />
    </div>
    <div class="mt-4 inline-block">
      <${Button} label="7" onPush=${() => onPress(7)} />
      <${Button} label="8" onPush=${() => onPress(8)} />
      <${Button} label="9" onPush=${() => onPress(9)} />
      <${Button} label="0" onPush=${() => onPress(0)} />
    </div>
  </div>
  </div>
`;

