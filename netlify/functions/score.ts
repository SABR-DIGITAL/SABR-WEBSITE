import { scoreWebsite } from '../../api/scanner';

export const handler = async (event: any) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const { url } = body;
    if (!url || typeof url !== 'string') {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Valid URL is required' }),
      };
    }

    const report = await scoreWebsite(url);
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(report),
    };
  } catch (error: any) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error?.message || 'Serverless scanning failed' }),
    };
  }
};
