import { BoostPeriod, TokensData, TreasuryHistory } from "./types";

const url = `${process.env.NEXT_PUBLIC_API_URL}`

class Requests {

    static async getTreasuryHistory(): Promise<TreasuryHistory[]> {
        const response = await fetch(`${url}/history`, {
            next: {
                revalidate: 1800
            }
        });

        return response.json();
    }

    static async getTokens(): Promise<TokensData> {     
        const response = (await fetch(`${url}/tokens`, {
            next: {
                revalidate: 1800
            }
        }).then(res => res.json()))[0];

        return {
            id: response.id,
            updated_at: response.updated_at,
            tokens: JSON.parse(response.tokens)
        };
    }

    static async getValidatorsApr(): Promise<BoostPeriod[]> {
        const response = await fetch(`${url}/apr`, { headers: { 'Content-Type': 'application/json' } });

        return response.json();
    }
}

export default Requests;