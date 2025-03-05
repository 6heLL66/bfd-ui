import Requests from "@/shared/api/requests";
import { TreasuryPage } from "./treasure";

const Page = async () => {
  const data = await Requests.getTreasuryHistory();
  const tokens = await Requests.getTokens();

  
  return <TreasuryPage history={data} tokens={tokens} />
}

export default Page;