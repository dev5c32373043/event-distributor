export class UnknownDestinationError extends Error {
  constructor(destination) {
    super(`Unknown destination detected: ${destination}`);

    this.name = this.constructor.name;
    this.destination = destination;
  }
}
