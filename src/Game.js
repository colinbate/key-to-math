import { html, Component } from 'https://unpkg.com/htm/preact/standalone.mjs';
import { Inventory } from './Inventory.js';
import { Equation } from './Equation.js';
import { NumberPad } from './NumberPad.js';
import { Gauge } from './Gauge.js';
import { Key } from './Key.js'
import { Lock } from './Lock.js';
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
      msg: '',
      win: false,
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
    const { status, progress, keys, round, newKey, msg } = this.state;
    if (newKey && !newKey.hide) {
      this.setState({
        newKey: {...newKey, hide: true},
        keys: [...keys, newKey]
      });
      setTimeout(this.proceed, 600);
      return;
    }
    if (msg) {
      this.setState({
        msg: ''
      });
      return;
    }
    if (keys.length === MAX_KEYS) {
      // Finish round
      if (round < 2) {
        this.setState({
          round: round + 1,
          keys: [],
          msg: 'Welcome to Round ' + (round + 2)
        });
        setTimeout(this.proceed, 2000);
      } else {
        const rainbowKey = {color: 'rainbow'};
        this.setState({
          win: true,
          keys: [rainbowKey, rainbowKey, rainbowKey, rainbowKey],
          msg: 'Congratulations, completing Round 3 releases the rainbow keys. You have completed "Unlock Math".'
        })
      }
      return;
    }
    if (status === STATUS_CORRECT) {
      if (progress === 4) {
        const latestKey = { color: keyColors[round][keys.length] };
        this.setState({
          progress: 0,
          newKey: latestKey
        });
        setTimeout(this.proceed, 1000);
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
  render(_, { answer, keys, currentQuestion, progress, status, newKey, msg, win }) {
    return html`
      <div class="game relative h-full">
        <${Inventory} keys=${keys} />
        ${!win && html`<${Gauge} progress=${progress} />`}
        ${msg
          ? html`
          <div class="z-0 mt-16 px-16 relative text-center">
            <h1>${msg}</h1>
          </div>`
          : html`
          <div class="z-0 mt-1 relative no-tapflash" onClick=${this.confirm}>
            <div class=${'absolute px-16 py-4 w-full ' + (newKey && !newKey.hide ? 'tada tada-show' : 'tada-hide') }><${Key} ...${newKey} /></div>
            ${status === STATUS_CORRECT
              ? html`<${Checkmark} />`
              : html`<${Equation} a=${currentQuestion.a} op=${currentQuestion.op} b=${currentQuestion.b} answer=${answer} incorrect=${status === STATUS_INCORRECT} />`}
          </div>`}
        
        ${!win
          ? html`<${NumberPad} onPress=${this.keyPress} />`
          : html`<${Lock} color="rainbow" />`}
        <svg style="width:0;height:0;position:absolute;" aria-hidden="true" focusable="false">
          <linearGradient id="rainbow" x2="1">
            <stop offset="0" stop-color="red"/>
            <stop offset="0.333" stop-color="#ff0"/>
            <stop offset="0.5" stop-color="#0f0"/>
            <stop offset="0.666" stop-color="cyan"/>
            <stop offset="0.833" stop-color="blue"/>
            <stop offset="1" stop-color="#f0f"/>
          </linearGradient>
          <linearGradient id="silver-metal" x1="0%" y1="50%" x2="100%" y2="50%" >    
            <stop offset="0%" stop-color="#d0d0d0"/>
            <stop offset="100%" stop-color="#e0e0e0"/>
          </linearGradient>
        </svg>
      </div>
    `;
  }
}
