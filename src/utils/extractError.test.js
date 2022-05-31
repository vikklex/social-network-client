import extractError from './extractError';

describe('Extract error', () => {
  it('Extract err', () => {
    const input = {
      err: 'error',
    };

    const output = 'error';

    expect(extractError(input.err)).toEqual(output);
  });
});
