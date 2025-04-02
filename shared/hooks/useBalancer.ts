import { BalancerApi, ChainId } from "@berachain-foundation/berancer-sdk";

export const useBalancer = () => {
    const balancerApi = new BalancerApi(process.env.NEXT_PUBLIC_BALANCER_API_URL as string, ChainId.BERACHAIN);

    return balancerApi;
}