import type { FC } from "react";

import { Page } from "@/components/Page.tsx";
import { IndexHeader } from "./IndexHeader";
// import { useInitDataContext } from "@/context/InitDataContext";

export const IndexPage: FC = () => {
  // const { user } = useInitDataContext();
  // const name = user?.first_name ?? user?.username ?? "Friend";

  return (
    <Page back={false}>
      <IndexHeader />
    </Page>
  );
};
