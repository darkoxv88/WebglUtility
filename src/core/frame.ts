function noop() { }

class Callback {

  private fn: (...any: any[]) => any;

  constructor(fn: (...any: any[]) => any) {
    this.register(fn);
  }

  public register(fn: (...any: any[]) => any) {
    if (typeof(fn) !== 'function') {
      fn = noop;
    }

    this.fn = fn;
  }

  public performCall(...any: any[]) {
    try
    {
      return this.fn?.apply(null, arguments);
    }
    catch (err)
    {
      console.error(err);
    }
  }

}

let isKilled: boolean = true;
let isStopped: boolean = false;
let isPaused: boolean = false;
let startingTime: number = 0;
let lastTime: number = 0;
let totalElapsedTime: number = 0;
let elapsedSinceLastLoop: number = 0;

const onStartCb: Callback = new Callback(noop);
const onUpdateCb: Callback = new Callback(noop);

function render(currentTime: number) {
  if (isKilled) {
    return;
  }

  if (isStopped) {
    requestAnimationFrame(render);

    return;
  }

  totalElapsedTime = currentTime - startingTime;
  elapsedSinceLastLoop = currentTime - lastTime;
  lastTime = currentTime;

  onUpdateCb.performCall(currentTime, (isPaused ? 0 : elapsedSinceLastLoop), totalElapsedTime);

  requestAnimationFrame(render);
}

export function onStart(cb: () => void): void {
  onStartCb.register(cb);
}

export function onUpdate(cb: (currentTime: number, deltaTime: number, totalElapsedTime: number) => void) {
  onUpdateCb.register(cb);
}

export function startFrames(): void {
  requestAnimationFrame((currentTime: number) => {
    if (isKilled == false) {
      return;
    }

    isKilled = false;
    isStopped = false;
    isPaused = false;
    startingTime = currentTime;
    lastTime = currentTime;
    totalElapsedTime = 0;
    elapsedSinceLastLoop = 0;

    onStartCb.performCall(0, 0);

    requestAnimationFrame(render);
  })
}

export function pauseFrames(): void {
  isPaused = true;
}

export function unpauseFrames(): void {
  isPaused = false;
}

export function stopFrames(): void {
  isStopped = true;
}

export function resumeFrames(): void {
  isStopped = false;
}

export function killFrames(): void {
  isKilled = true;
}
