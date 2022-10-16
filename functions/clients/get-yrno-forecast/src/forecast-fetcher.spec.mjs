import fetchForecast from './forecast-fetcher.mjs';
import {expect, assert} from 'chai';

describe('Test request', function() {
  it('Data has an expected shape', async () => {
    const result = await fetchForecast();

    expect(result).to.be.an("object");
    expect(result).to.have.nested.property("properties.timeseries");
  });
})


