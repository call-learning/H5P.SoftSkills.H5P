import React from 'react';
import QuestionnaireSideNavigation from './QuestionnaireSideNavigation';
import H5P from '../../utils/H5P.mock';
import { socialImage } from '../../../assets/social.svg';
import { Grid } from '@material-ui/core';

export default { title: 'Questionnaire' };

window.H5P = H5P;

const subCompetencyProgressData = [100,50,0];


export const basicSideNavigation = () => <QuestionnaireSideNavigation competencyIndex={3}
                                                                      subCompetencyIndex={2}
                                                                      competencyTitle={'compétences sociales'}
                                                                      competencyImagePath={socialImage}
                                                                      maxPages={5}
                                                                      currentPage={1}/>;


export const sideNavigationWithScrollContent = () => {
  let sideContent = [];
  const NUM_SIDE_ITEM = 50;
  let count = 0;
  while(count < NUM_SIDE_ITEM) {
    sideContent.push((<p>In hac habitasse platea dictumst. In hac habitasse platea dictumst. Nullam eu urna id massa
      dictum volutpat eget id lorem. Integer nec consectetur elit, at convallis turpis. Fusce dapibus, enim ac
      condimentum pellentesque, purus turpis hendrerit ante, id fermentum metus urna ut elit.
      Vivamus pulvinar erat vitae metus tristique, a hendrerit dolor cursus.
      Donec odio erat, pulvinar non dui eu, eleifend bibendum odio. Praesent non neque at metus malesuada blandit.
      Fusce sapien lectus, dignissim ac posuere eu, auctor a enim. Aliquam sed turpis nibh.</p>));
    count++;
  }
  return (
  <Grid container>
    <Grid item xs={3}>
      <QuestionnaireSideNavigation competencyIndex={1}
                                   competencyTitle={'compétences sociales'}
                                   competencyImagePath={socialImage}
                                   answeredQuestionCount={4}
                                   totalQuestion={28}
                                   subCompetencyProgressData={subCompetencyProgressData}
      />
    </Grid>
    <Grid item xs={9}>
      { sideContent }
    </Grid>
  </Grid>
)};
