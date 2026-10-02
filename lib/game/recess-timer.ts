// Recess sprint 10-minute countdown timer
export class RecessTimer {
  private remainingSecs: number = 600;
  tick(): number {
    if (this.remainingSecs > 0) this.remainingSecs--;
    return this.remainingSecs;
  }
  isBellRinging(): boolean {
    return this.remainingSecs === 0;
  }
}
