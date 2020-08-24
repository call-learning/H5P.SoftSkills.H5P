// Set the basic translations
import { sampleData } from '../../utils/StoriesUtils';
import React from 'react';
import Resource from './Resource';
import Container from '@material-ui/core/Container';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Fab from '@material-ui/core/Fab';
import { ExpandMore } from '@material-ui/icons';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

export default { title: 'Results' };

export const resourceList = () => (<Container disableGutters={true}>
    <ExpansionPanel>
      <ExpansionPanelSummary
        expandIcon={<Fab color="primary"><ExpandMore/></Fab>}
      >
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Box>
          <Box py={1}>
            {sampleData.resources.map((resource) => <Resource key={resource.id} resource={resource}/>)}
          </Box>
        </Box>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  </Container>
);
