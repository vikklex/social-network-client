import { DATE_FORMAT } from './Constants';

describe('Constants', () => {
  it('Date format', () => {
    expect(DATE_FORMAT).toBe('YYYY-MM-DD HH:mm:ss');
  });
});
