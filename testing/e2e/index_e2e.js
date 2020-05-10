
describe('Go to Google', () => {
	beforeAll(async () => {
		await page.goto('https://google.com');
	***REMOVED***);
	
	it('should be titled "Google"', async () => {
		await expect(page.title()).resolves.toMatch('Google');
	***REMOVED***);
***REMOVED***);
