import { ToInrPipe } from './to-inr.pipe';

describe('ToInrPipe', () => {
  it('formats numbers to INR', () => {
    const pipe = new ToInrPipe();
    const out = pipe.transform(2599);

    expect(out.replace(/\s/g, '')).toMatch(/₹?2,599\.00|INR2,599\.00/);
  });

  it('handles null/undefined/NaN gracefully', () => {
    const pipe = new ToInrPipe();
    expect(pipe.transform(null)).toContain('₹');
    expect(pipe.transform(undefined)).toContain('₹');
    expect(pipe.transform(NaN)).toContain('₹');
  });
});
