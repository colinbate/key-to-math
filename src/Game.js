import { html, Component } from 'https://unpkg.com/htm/preact/standalone.mjs';
import { Inventory } from './Inventory.js';
import { Equation } from './Equation.js';
import { NumberPad } from './NumberPad.js';

export class Game extends Component {
  constructor() {
    super();
    this.setState({
      answer: ''
    });
  }
  keyPress(key) {
    const { answer } = this.state;
    this.setState({
      answer: key < 0
        ? (answer.length ? answer.substr(0, answer.length - 1) : '')
        : (answer.length === 3 ? answer : answer + key.toString())
    });
  }
  render(_, { answer }) {
    return html`
      <div class="game">
        <${Inventory} keys=${[{color: 'blue'}]} />
        <${Equation} a=${4} op="+" b=${2} answer=${answer} />
        <${NumberPad} onPress=${this.keyPress.bind(this)} />
      </div>
    `;
  }
}
