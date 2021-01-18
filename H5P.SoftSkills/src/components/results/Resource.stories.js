// Set the basic translations
import { sampleData } from '../../utils/StoriesUtils';
import React from 'react';
import Resource from './Resource';
import Container from '@material-ui/core/Container';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Fab from '@material-ui/core/Fab';
import { ExpandMore } from '@material-ui/icons';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import AccordionDetails from '@material-ui/core/AccordionDetails';

export default { title: 'Results' };

export const resourceList = () => (<Container disableGutters={true}>
    <Accordion>
      <AccordionSummary
        expandIcon={<Fab color="primary"><ExpandMore/></Fab>}
      >
      </AccordionSummary>
      <AccordionDetails>
        <Box>
          <Box py={1}>
            {sampleData.resources.map((resource) => <Resource key={resource.id} resource={resource}/>)}
          </Box>
        </Box>
      </AccordionDetails>
    </Accordion>
  </Container>
);
