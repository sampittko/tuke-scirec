// import './index.scss';
//
// import {Fade, IconButton, Tooltip, Typography} from '@material-ui/core';
//
// import DeleteIcon from '@material-ui/icons/Delete';
// import ExpansionPanel from './ExpansionPanel';
// import NewDefaultDashboardSelectMenu from './NewDefaultDashboardSelectMenu';
// import React from 'react';
// import RemoveDashboardConfirmDialog from './RemoveDashboardConfirmDialog';
// import SaveIcon from '@material-ui/icons/Save';
// import Switch from '../../common/Switch';
// import ThemePicker from '../../themePicker';
// import TitleInput from '../../common/TitleInput';
// import {connect} from 'react-redux';
// import {dashboardConfig} from '../../../config/app';
// import dashboardPropTypes from '../../../propTypes/dashboardPropTypes';
// import {getDashboardSettingsDocumentTitle} from '../../../utils/dashboardUtils';
// import propTypes from 'prop-types';
// import themePickerPropTypes from '../../../propTypes/themePickerPropTypes';
// import {timeouts} from '../../../config/mui';
// import {updateDashboard} from '../../../store/actions/dashboardActions';
// import {resetThemePicker, toggleDashboardSettingsMode} from "../../../store/actions/themePickerActions";
// import Notification from "../../common/Notification";
// import {getProjectSettingsDocumentTitle} from "../../../utils/projectUtils";
//
// class Settings extends React.Component {
//   _isMounted = false;
//
//   constructor(props) {
//     super(props);
//     this.state = {
//       title: '',
//       confirmDialogOpen: false,
//       expandedPanel: 0,
//       changesApplied: false,
//     }
//   }
//
//   componentDidMount() {
//     this._isMounted = true;
//     if (this.props.activeProject) {
//       document.title = getProjectSettingsDocumentTitle(this.props.activeDashboard, this.props.activeProject);
//       this.setState({
//         title: this.props.activeProject.data().title,
//       });
//     }
//   }
//
//   // TODO settingsChanged()
//   settingsChanged = () => {
//     return false;
//   };
//
//   // TODO handleSubmit()
//   handleSubmit = async (event) => {
//     event.preventDefault();
//     // await this.props.updateProject(this.state.newDefaultDashboardId, {
//     //   title: this.state.title,
//     // });
//     // if (this._isMounted) {
//     //   this.setState({
//     //     changesApplied: true,
//     //   })
//     // }
//   };
//
//   handlePanelChange = (event, panel) => {
//     this.setState({
//       expandedPanel: this.state.expandedPanel === panel ? 0 : panel
//     });
//   };
//
//   getPanelActions = () => {
//     switch (this.state.expandedPanel) {
//       case 3:
//         return (
//           <Tooltip
//             title="Vymazať nástenku"
//             placement="right"
//             disableFocusListener
//             className="tooltip"
//           >
//             <div>
//               <IconButton
//                 onClick={this.handleDeleteClick}
//                 color="secondary"
//                 size="small"
//               >
//                 <DeleteIcon fontSize="small"/>
//               </IconButton>
//             </div>
//           </Tooltip>
//         );
//       default:
//         return (
//           <div>
//             {this.settingsChanged() && (
//               <Fade in timeout={timeouts.FADE_IN}>
//                 <Typography className="changes-not-saved">
//                   Zmeny ešte neboli uložené
//                 </Typography>
//               </Fade>
//             )}
//             <Tooltip
//               title="Uložiť zmeny"
//               placement="right"
//               disableFocusListener
//               className="tooltip"
//             >
//               <div>
//                 <IconButton
//                   disabled={this.state.title.length < dashboardConfig.MIN_LENGTH || !this.settingsChanged()}
//                   type="submit"
//                   color="secondary"
//                   size="small"
//                 >
//                   <SaveIcon fontSize="small"/>
//                 </IconButton>
//               </div>
//             </Tooltip>
//           </div>
//         );
//     }
//   };
//
//   render() {
//     return (
//       <Fade in timeout={timeouts.FADE_IN}>
//         <div>
//           {this.props.activeProject && (
//             <div className="project-settings">
//               <Typography
//                 variant="h5"
//                 className="page-title"
//               >
//                 Nastavenia projektu <span
//                 className="text-bolder">{this.state.title}</span>
//               </Typography>
//               <form onSubmit={this.handleSubmit}>
//                 <ExpansionPanel
//                   expanded={this.state.expandedPanel === 1}
//                   onChange={(event) => this.handlePanelChange(event, 1)}
//                   settingType="Všeobecné"
//                   panelContent={
//                     <div>
//
//                     </div>
//                   }
//                   panelActions={this.getPanelActions()}
//                 />
//                 <ExpansionPanel
//                   expanded={this.state.expandedPanel === 3}
//                   onChange={(event) => this.handlePanelChange(event, 3)}
//                   settingType="Vymazanie projektu"
//                   panelContent={(
//                     <Typography>
//                       Vymazanie projektu je nenávratná akcia.
//                     </Typography>
//                   )}
//                   panelActions={this.getPanelActions()}
//                 />
//               </form>
//               <RemoveDashboardConfirmDialog
//                 open={this.state.confirmDialogOpen}
//                 newDefaultDashboardId={this.state.newDefaultDashboardId}
//                 onClick={this.handleDialogClose}
//                 onChange={this.handleSelectChange}
//               />
//               {this.state.changesApplied && <Notification message="Zmeny v nastaveniach boli uložené"/>}
//             </div>
//           )}
//         </div>
//       </Fade>
//     )
//   }
//
//   componentDidUpdate(prevProps, prevState) {
//     if (prevProps.activeProject !== this.props.activeProject) {
//       this.setState((prevState, props) => ({
//         title: props.activeDashboard.data().title,
//       }));
//     }
//     if (prevState.changesApplied) {
//       this.setState({
//         changesApplied: false,
//       });
//     }
//   }
//
//   componentWillUnmount() {
//     this._isMounted = false;
//   }
// }
//
// Settings.propTypes = {
//   activeProject: propTypes.object,
// };
//
// const mapDispatchToProps = dispatch => {
//   return {
//   }
// };
//
// const mapStateToProps = state => {
//   return {
//     activeDashboard: state.project.data.active,
//   }
// };
//
// export default connect(mapStateToProps, mapDispatchToProps)(Settings);