import {
  NavPageLayout,
  NavPageLayoutProps,
  Discovery,
  DiscoveryPageGetServerSideProps as getServerSideProps,
} from '@gen3/frontend';

import { Center, Text } from "@mantine/core";

import { registerDiscoveryCustomCellRenderers } from '@/lib/Discovery/CustomCellRenderers';
import { registerDiscoveryStudyPreviewRenderers } from '@/lib/Discovery/CustomRowRenderers';

registerDiscoveryCustomCellRenderers();
registerDiscoveryStudyPreviewRenderers();

const DiscoveryPageCustom = ({
                         headerProps,
                         footerProps,
                         discoveryConfig,
                       }: {
                          headerProps: any,
                         footerProps: any,
                         discoveryConfig:any,
}): JSX.Element => {

  if (discoveryConfig === undefined) {
    return (
        <Center maw={400} h={100} mx="auto">
          <div>Discovery config is not defined. Page disabled</div>
        </Center>
    );
  }

  return (
      <NavPageLayout {...{ headerProps, footerProps }}>
        <div className="flex flex-col w-full">
        <div className="flex bg-base-lightest rounded-4 justify-center align-middle px-2 pt-2">
          <Text size="xl">AI Search is a Beta Feature. Please note that this is still in testing and we appreciate your feedback. You must login to use it. </Text>
        </div>

        <Discovery discoveryConfig={discoveryConfig} />
        </div>
      </NavPageLayout>
  );
};

export default DiscoveryPageCustom;

export { getServerSideProps };
