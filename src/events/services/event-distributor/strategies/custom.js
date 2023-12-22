import { ofetch } from 'ofetch';
import { logger, isStringifiedFunction } from '#utils';
import { CUSTOM_EXECUTOR_URL, CUSTOM_EXECUTOR_TOKEN } from '#conf';

export async function custom(possibleDestinations, { strategyName }) {
  if (!CUSTOM_EXECUTOR_URL || !CUSTOM_EXECUTOR_TOKEN) {
    throw new Error('Credentials for custom function executor are absent');
  }

  if (!isStringifiedFunction(strategyName)) {
    throw new Error('Strategy name is not a function!', { cause: strategyName });
  }

  const body = { data: possibleDestinations, code: strategyName };
  const opts = { method: 'POST', body, headers: { 'x-api-key': CUSTOM_EXECUTOR_TOKEN } };
  const resp = await ofetch(CUSTOM_EXECUTOR_URL, opts);
  if (resp.statusCode !== 200) {
    logger.error(`[${strategyName}]: ${resp.error}`);
    return [];
  }

  return resp.result;
}
