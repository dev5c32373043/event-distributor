import { HOST } from '#conf';

const destinationsMap = Object.freeze({
  destination1: { transport: 'http.get', url: `${HOST}/api/destination1` },
  destination2: { transport: 'http.post', url: `${HOST}/api/destination2` },
  destination3: { transport: 'http.put', url: `${HOST}/api/destination3` },
  destination4: { transport: 'http.patch', url: `${HOST}/api/destination4` },
  destination5: { transport: 'http.delete', url: `${HOST}/api/destination5` },
  destination6: { transport: 'console.info' },
  destination7: { transport: 'console.log' },
  destination8: { transport: 'console.warn' },
  destination9: { transport: 'console.error' }
});

export default destinationsMap;
