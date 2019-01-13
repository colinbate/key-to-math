import { html, Component } from 'https://unpkg.com/htm/preact/standalone.mjs';
import { Inventory } from './Inventory.js';
import { Equation } from './Equation.js';
import { NumberPad } from './NumberPad.js';
import { Gauge } from './Gauge.js';
import { Checkmark } from './Checkmark.js';
import { getNextQuestion } from './questions.js';
import { STATUS_CORRECT, STATUS_INCORRECT, STATUS_NONE, MAX_KEYS } from './consts.js'
import { keyColors } from './colors.js'

export class Game extends Component {
  constructor() {
    super();
    this.setState({
      answer: '',
      keys: [],
      round: 0,
      progress: 0,
      status: STATUS_NONE,
      currentQuestion: getNextQuestion()
    });
    this.keyPress = this.keyPress.bind(this);
    this.confirm = this.confirm.bind(this);
    this.proceed = this.proceed.bind(this);
  }
  keyPress(key) {
    const { answer } = this.state;
    this.setState({
      answer: key < 0
        ? (answer.length ? answer.substr(0, answer.length - 1) : '')
        : (answer.length === 3 ? answer
          : (key === 0 && !answer.length ? '' : answer + key.toString()))
    });
  }
  confirm() {
    console.log('CONFIRM');
    const { answer, currentQuestion, progress } = this.state;
    if (!answer) {
      return;
    }
    const answerInt = parseInt(answer);
    this.setState({
      status: answerInt === currentQuestion.ans ? STATUS_CORRECT : STATUS_INCORRECT,
      progress: answerInt === currentQuestion.ans ? progress + 1 : 0
    });
    setTimeout(this.proceed, answerInt === currentQuestion.ans ? 2200 : 800);
  }
  proceed() {
    const { status, progress, keys, round } = this.state;
    if (status === STATUS_CORRECT) {
      if (progress === 4) {
        if (keys.length + 1 === MAX_KEYS) {
          // WIN!?
          this.setState({
            round: round + 1
          });
        }
        this.setState({
          progress: 0,
          keys: [...keys, { color: keyColors[round][keys.length] }]
        });
      }
      this.setState({
        currentQuestion: getNextQuestion(),
        answer: '',
        status: STATUS_NONE
      });
    } else {
      this.setState({
        status: STATUS_NONE
      });
    }
  }
  render(_, { answer, keys, currentQuestion, progress, status }) {
    return html`
      <div class="game relative h-full">
        <${Inventory} keys=${keys} />
        <${Gauge} progress=${progress} />
        <div class="z-0 mt-1 relative" onClick=${this.confirm}>
          ${status === STATUS_CORRECT
            ? html`<${Checkmark} />`
            : html`<${Equation} a=${currentQuestion.a} op=${currentQuestion.op} b=${currentQuestion.b} answer=${answer} incorrect=${status === STATUS_INCORRECT} />`}
        </div>
        <${NumberPad} onPress=${this.keyPress} />
        <svg style="width:0;height:0;position:absolute;" aria-hidden="true" focusable="false">
          <linearGradient id="rainbow" x2="1">
            <stop offset="0" stop-color="red"/>
            <stop offset="0.333" stop-color="#ff0"/>
            <stop offset="0.5" stop-color="#0f0"/>
            <stop offset="0.666" stop-color="cyan"/>
            <stop offset="0.833" stop-color="blue"/>
            <stop offset="1" stop-color="#f0f"/>
          </linearGradient>
        </svg>
      </div>
    `;
  }
}
