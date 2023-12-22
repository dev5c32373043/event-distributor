import { logger, to, isStringifiedFunction, UnknownDestinationError } from '#utils';
import { DEFAULT_ROUTING_STRATEGY } from '#constants';

import * as strategies from './strategies/index.js';
import transporters from './transporters/index.js';
import destinationsMap from './destinations-map.js';

export async function distributeEvent(event, destinations) {
  const delivered = [];

  for (const dest of destinations) {
    const [transport, method] = dest.transport.split('.');
    const transporter = transporters[transport];
    if (transporter == null) {
      logger.error(`Unknown ${transport} transport supplied in ${dest.name}!`);
      continue;
    }

    const executor = transporter[method];
    if (typeof executor !== 'function') {
      logger.error(`Unknown ${method} method supplied in ${dest.name}!`);
      continue;
    }

    const [execErr] = await to(executor(event.payload, dest));
    if (execErr) {
      logger.error(reqErr);
      continue;
    }

    delivered.push(dest.name);
  }

  return delivered;
}

export async function defineDestinations(possibleDestinations, strategy, strategyName) {
  const result = [];

  const matchedDests = await strategy(possibleDestinations, { strategyName });
  if (matchedDests.length === 0) return result;

  const destConfs = matchedDests.reduce((acc, destName) => {
    const destConf = destinationsMap[destName];
    if (destConf) {
      acc.push({ name: destName, ...destConf });
    } else {
      logger.error(new UnknownDestinationError(destName));
    }

    return acc;
  }, []);

  return destConfs;
}

export async function processEvent(event) {
  const result = { delivered: [] };
  // Ensuring we received a valid strategy
  const strategyName = (event.strategy ?? DEFAULT_ROUTING_STRATEGY).trim().toLowerCase();
  const strategy = isStringifiedFunction(strategyName) ? strategies.custom : strategies[strategyName];
  if (typeof strategy !== 'function') {
    result.issues = [{ issue: 'Unknown strategy supplied!' }];
    return result;
  }
  // Defining destinations to route the current event
  const destinations = await defineDestinations(event.possibleDestinations, strategy, strategyName);
  if (destinations.length > 0) {
    // Include the delivered destinations in the result
    result.delivered = await distributeEvent(event, destinations);
  }

  return result;
}
