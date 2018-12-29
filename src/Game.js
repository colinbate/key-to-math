import { html, Component } from 'https://unpkg.com/htm/preact/standalone.mjs';
import { Inventory } from './Inventory.js';
import { Equation } from './Equation.js';
import { NumberPad } from './NumberPad.js';
import { Gauge } from './Gauge.js';
import { Checkmark } from './Checkmark.js';

export class Game extends Component {
  constructor() {
    super();
    this.setState({
      answer: '',
      keys: [{color: 'green'}],
      round: 1,
      progress: 0,
      currentQuestion: { a: 4, b: 3, op: '+', ans: 7 }
    });
    this.keyPress = this.keyPress.bind(this);
  }
  keyPress(key) {
    const { answer, progress } = this.state;
    this.setState({
      progress: (progress + 1) % 5,
      answer: key < 0
        ? (answer.length ? answer.substr(0, answer.length - 1) : '')
        : (answer.length === 3 ? answer
          : (key === 0 && !answer.length ? '' : answer + key.toString()))
    });
  }
  render(_, { answer, keys, currentQuestion, progress }) {
    return html`
      <div class="game relative h-full">
        <${Inventory} keys=${keys} />
        <${Gauge} progress=${progress} />
        <div class="z-0 mt-1 relative">
          ${answer === '2'
            ? html`<${Checkmark} />`
            : html`<${Equation} a=${currentQuestion.a} op=${currentQuestion.op} b=${currentQuestion.b} answer=${answer} />`}
        </div>
        <${NumberPad} onPress=${this.keyPress} />
      </div>
    `;
  }
}
