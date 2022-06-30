import React, {FC} from 'react';
import {Box, Card, Tab, Tabs} from "@mui/material";

const TabbedCategories:FC = () => {
  const [value, setValue] = React.useState(0);

  interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }

  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box>
            {children}
          </Box>
        )}
      </div>
    );
  }

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Card>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="All" {...a11yProps(0)} />
          <Tab label="To pizza" {...a11yProps(1)} />
          <Tab label="To steak" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <Box p={2}>
        <TabPanel value={value} index={0}>
          All
        </TabPanel>
        <TabPanel value={value} index={1}>
          To pizza
        </TabPanel>
        <TabPanel value={value} index={2}>
          To steak
        </TabPanel>
      </Box>
    </Card>
  );
};

export default TabbedCategories;
