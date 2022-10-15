import fetchForecast from './forecast-fetcher.js';
import {expect, assert} from 'chai';

describe('Test request', function() {
  it('Data has an expected shape', async () => {
    const result = await fetchForecast();

    expect(result.status).to.be.eq(200);
    assert.fail("Implement me!");
  });
})


