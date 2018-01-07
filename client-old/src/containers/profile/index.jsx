import React, { Component } from 'react';
import { connect } from 'react-redux';

// import Projects from '../../components/projects';
// import ExperienceList from '../../components/experienceList';
// import SkillList from '../../components/skillList';

class ProfilePage extends Component {

  // filterLearner (githubHandle) {
  //   return this.props.guild.learners.filter(learner => {
  //     let currentLearner = learner.github_handle === githubHandle;
  //     return currentLearner;
  //   });
  // }

  render() {
    // const githubHandle = this.props.match.url.replace(/\/learners\//, '');
    // const selectedLearner = this.filterLearner(githubHandle);

    return (
      <div>
        Some info about the user here. Probably also a way to change the info.
      </div>
      // <div className="container">
    //   <Profile github_handle={selectedLearner[0].github_handle} linkedin_profile={selectedLearner[0].linkedin_profile} twitter={selectedLearner[0].twitter} info={selectedLearner[0]} />
    //   <div className="row">
    //     <div className="col-lg-6">
    //       <ExperienceList experiences={selectedLearner[0].experience} />
    //     </div>
    //     <div className="col-lg-6">
    //       <SkillList skills={selectedLearner[0].skills} />
    //     </div>
    //   </div>
    //   <h2 className="text-center">Projects</h2>
    //   <Projects projects={selectedLearner[0].projects} />
    // </div>
  );
  }
}

function mapStateToProps({ charts }) {
  return { charts };
}

export default connect(mapStateToProps)(ProfilePage);