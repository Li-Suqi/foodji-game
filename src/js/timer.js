class GameTimer {
  constructor({ duration, onTick, onComplete }) {
    this.duration = duration;
    this.onTick = onTick;
    this.onComplete = onComplete;
    this.remaining = duration;
    this._intervalId = null;
  }

  start() {
    this.remaining = this.duration;
    this._intervalId = setInterval(() => this._tick(), 1000);
    this.onTick(this.remaining);
  }

  _tick() {
    this.remaining = Math.max(0, this.remaining - 1);
    this.onTick(this.remaining);
    if (this.remaining <= 0) {
      this.stop();
      this.onComplete();
    }
  }

  stop() {
    if (this._intervalId !== null) {
      clearInterval(this._intervalId);
      this._intervalId = null;
    }
  }

  getRemaining() {
    return this.remaining;
  }
}
