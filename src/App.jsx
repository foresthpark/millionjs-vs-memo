import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Container,
  Heading,
  Link,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  UnorderedList,
  ListItem,
  Code,
} from "@chakra-ui/react";
import { startTransition, useState } from "react";
import GithubCorner from "react-github-corner";
import TimesTable from "./times-table";
import TimesTableMemo from "./times-table-memo";

function App() {
  const [nodes, setNodes] = useState(100);
  const handleChange = (newNodes) => {
    if (newNodes === nodes) return;
    debounce(() => {
      startTransition(() => {
        setNodes(newNodes);
      });
    });
  };
  return (
    <>
      <Container p={6}>
        <Stack direction="column" spacing={3}>
          <Heading>Million vs. React Demo</Heading>
          <Text>
            The following is a random times table generator benchmark (
            <Link
              href="https://github.com/aidenybai/million-demo"
              isExternal
              color="purple"
            >
              source <ExternalLinkIcon mx="2px" />
            </Link>
            ). It follows a comparison between React and Million, along with its
            fiber equivalents.
          </Text>
          <Accordion>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left" fontWeight="bold">
                    Instructions
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                In order to invoke a re-render, click the "Increment" button
                below. The "Lag" radar indicates blocking time, but does not
                account for the time it takes to update the UI. Notice the time
                it takes to update the UI after you click to get an idea for
                update time.
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left" fontWeight="bold">
                    Notes
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <Text>
                  <UnorderedList>
                    <ListItem>
                      All implementations are within React. The only difference
                      with Million implementation is a{" "}
                      <Link
                        href="https://github.com/aidenybai/million-demo/blob/53ee4f6c7d86e3f240a637dcf107782045c0c19d/src/times-table.jsx#L49"
                        isExternal
                        color="purple"
                      >
                        <Code>{"block()"}</Code> wrapper
                      </Link>{" "}
                      and the{" "}
                      <Link
                        href="https://github.com/aidenybai/million-demo/blob/53ee4f6c7d86e3f240a637dcf107782045c0c19d/src/times-table.jsx#L104"
                        isExternal
                        color="purple"
                      >
                        <Code>{"<For />"}</Code> component
                      </Link>
                      .
                    </ListItem>
                    <ListItem>
                      Every row contains 100 static, hidden{" "}
                      <Code>{"<td />"}</Code> nodes and 50{" "}
                      <Code>{"<div />"}</Code> to stimulate diffing in order to
                      measure performance.{" "}
                      <u>
                        This is not representative of real React apps, it's just
                        to show where Million.js performs better than React,
                        which is in high static but pinpoint dynamic content.
                      </u>
                    </ListItem>
                    <ListItem>
                      Should not be used as a benchmark for real-world
                      applications (this is a very intensive case that isn't
                      necessarily representative)
                    </ListItem>
                  </UnorderedList>
                </Text>
                <Text>
                  You can adjust the number of rows by using the the number
                  input. Make sure to adjust if you can't see any performance
                  difference or your screen freezes.
                </Text>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Stack>

        <NumberInput
          mt={3}
          w="100%"
          min={0}
          mr="2rem"
          defaultValue={nodes}
          onChange={handleChange}
        >
          <NumberInputField placeholder="Enter number of rows" />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Tabs isLazy={true} variant="soft-rounded" colorScheme="purple" mt={3}>
          <TabList>
            <Tab w="full">React Raw - No memo</Tab>
            <Tab w="full">React Memo</Tab>
            <Tab w="full">⚡ Million</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <TimesTable nodes={nodes} mode="react" />
            </TabPanel>
            <TabPanel>
              <TimesTableMemo nodes={nodes} />
            </TabPanel>
            <TabPanel>
              <TimesTable nodes={nodes} mode="million" />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
      <GithubCorner
        direction="left"
        href="https://github.com/aidenybai/million"
      />
    </>
  );
}

let timer;
function debounce(fn, timeout = 500) {
  clearTimeout(timer);
  timer = setTimeout(() => {
    fn();
  }, timeout);
}

export default App;
