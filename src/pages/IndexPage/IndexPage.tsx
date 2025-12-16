// import { Section, Cell, Image, List, Tabbar } from "@telegram-apps/telegram-ui";
import type { FC } from "react";

// import { Link } from "@/components/Link/Link.tsx";
import { Page } from "@/components/Page.tsx";

// import { FiHome, FiClock, FiBarChart2, FiUser } from "react-icons/fi";

// import tonSvg from "./ton.svg";

export const IndexPage: FC = () => {
  return (
    <Page back={false}>
      <div style={{ padding: "16px", textAlign: "center" }}>
        <h2>Добро пожаловать 👋</h2>
        <p>Выберите вкладку снизу, чтобы перейти на нужную страницу.</p>
      </div>

      {/* <List>
        <Section
          header="Features"
          footer="You can use these pages to learn more about features, provided by Telegram Mini Apps and other useful projects"
        >
          <Link to="/ton-connect">
            <Cell
              before={<Image src={tonSvg} style={{ backgroundColor: '#007AFF' }}/>}
              subtitle="Connect your TON wallet"
            >
              TON Connect
            </Cell>
          </Link>
        </Section>
        <Section
          header="Application Launch Data"
          footer="These pages help developer to learn more about current launch information"
        >
          <Link to="/init-data">
            <Cell subtitle="User data, chat information, technical data">Init Data</Cell>
          </Link>
          <Link to="/launch-params">
            <Cell subtitle="Platform identifier, Mini Apps version, etc.">Launch Parameters</Cell>
          </Link>
          <Link to="/theme-params">
            <Cell subtitle="Telegram application palette information">Theme Parameters</Cell>
          </Link>
        </Section>
      </List> */}
    </Page>
  );
};
