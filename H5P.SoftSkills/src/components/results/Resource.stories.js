// Set the basic translations
import React from 'react';
import { Container, Accordion, Box, Fab, AccordionSummary, AccordionDetails } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import { sampleData } from '../../utils/StoriesUtils';
import Resource from './Resource';

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
            {sampleData.questionsByCompetencyAndSubCompetencies[0].subCompetencies[0].contexts[0].questions[0].resources.map((resource, index) => <Resource key={index} resource={resource}/>)}
          </Box>
        </Box>
      </AccordionDetails>
    </Accordion>
  </Container>
);
