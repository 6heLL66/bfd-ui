export const getTokensPrice = async (token_addresses: string[]) => {
  try {
    const response = await fetch('https://api.berachain.com/', {
      headers: {
        accept: '*/*',
        'accept-language': 'en-US,en;q=0.9,ru;q=0.8',
        'content-type': 'application/json',
        priority: 'u=1, i',
        'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
      },
      referrer: 'https://hub.berachain.com/',
      referrerPolicy: 'strict-origin-when-cross-origin',
      body: `{\"operationName\":\"GetTokenCurrentPrices\",\"variables\":{\"chains\":[\"BERACHAIN\"],\"addressIn\": ${JSON.stringify(token_addresses)}},\"query\":\"query GetTokenCurrentPrices($chains: [GqlChain!]!, $addressIn: [String!]!) {\\n  tokenGetCurrentPrices(chains: $chains, addressIn: $addressIn) {\\n    address\\n    chain\\n    price\\n    updatedAt\\n    updatedBy\\n    __typename\\n  }\\n}\"}`,
      method: 'POST',
      mode: 'cors',
      credentials: 'omit',
    }).then(res => res.json());

    return response.data.tokenGetCurrentPrices as any[];
  } catch (error) {
    console.error(error);
  }
};
