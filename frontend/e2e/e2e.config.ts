const testBaseUrl = process.env.TEST_URL || 'http://localhost:4200';
export const testUrl = `${testBaseUrl}/`;
export const loginUrl = `${testBaseUrl}/login`;
export const testQuiz = `${testBaseUrl}/game/1679875889425`;
export const testResultRegex = new RegExp(`^${testBaseUrl}/result/\\d+$`);
