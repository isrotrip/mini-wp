//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
////                                          ////
////    D I S P L A Y     V A R I A B L E S   ////
////                                          ////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////

const defaultPicture = './components/assets/picture/defaultProfile.png'

////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////
////                                    ////
////      N   A   V   B   A   R   S     ////
////                                    ////
////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////


//home navbar left
const homeBarLeft = [
  {
  id: 'backToHome',
  name: '',
  logo: './components/assets/picture/logo.png',
  alt: 'Home Picture',
  position: 'dashboard'
},{
  id: 'goToReadPage',
  name: 'Reader',
  logo: './components/assets/picture/readerLogo.png',
  alt: 'Reader Picture',
  position: 'dashboard'
}];
//home navbar right
const homeBarRight = [{
    id: 'createAPost',
    name: 'Write',
    logo: './components/assets/picture/writePost.png',
    alt: 'Write Picture',
    click: 'showCreatePost',
    position: 'createBar'
  },{
    id: 'changeProfile',
    name: '',
    logo: './components/assets/picture/defaultProfile.png',
    alt: 'Profile Picture',
    position: 'dashboard'
  },{
    id: 'viewChats',
    name: '',
    logo: './components/assets/picture/chatLogo.png',
    alt: 'Chat Picture',
    position: 'dashboard'
  }]
//home side bar


//create nav bar
const createNavBarLeft = [{
  id: 'backToHome',
  name: '',
  logo: './picture/cancel.png',
  alt: 'Cancel'
},{
  id: 'changeProfile',
  name: 'User Name',
  logo: './picture/defaultProfile.png',
  alt: 'Profile'
}]

////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////
////                                    ////
////    S   I   D   E   B   A   R   S   ////
////                                    ////
////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////

const sideBars = [
  {
    id: 'backToHome',
    name: 'Dashboard',
    logo: './components/assets/picture/viewSite.png',
    alt: 'View Site'
  },{
    id: 'checkStats',
    name: 'Stats',
    logo: './components/assets/picture/stats.png',
    alt: 'Stats'
  },{
    id: 'checkAcitivity',
    name: 'Activity',
    logo: './components/assets/picture/activity.png',
    alt: 'Acitivity'
  },{
    id: 'checkPlan',
    name: 'Plan',
    logo: './components/assets/picture/plan.png',
    alt: 'Plan'
  },{
    name: 'manage',
    class: 'btn disabled dead-link-left-bar',
  },{
    id: 'goToReadPage',
    name: 'Site Pages',
    logo: './components/assets/picture/sitePages.png',
    alt: 'Site Pages'
  },{
    id: 'createAPost',
    name: 'Blog Posts',
    logo: './components/assets/picture/blogPosts.png',
    alt: 'Blog Posts'
  },{
    id: 'viewMedia',
    name: 'Media',
    logo: './components/assets/picture/media.png',
    alt: 'Media'
  },{
    id: 'viewComments',
    name: 'Comments',
    logo: './components/assets/picture/comments.png',
    alt: 'Comments'
  },{
    id: 'viewFeedBack',
    name: 'Feedback',
    logo: './components/assets/picture/feedback.png',
    alt: 'Feedback'
  },{
    id: 'setPlugin',
    name: 'Plugins',
    logo: './components/assets/picture/plugin.png',
    alt: 'Plugins'
  },{
    id: 'importFile',
    name: 'Import',
    logo: './components/assets/picture/import.png',
    alt: 'Import'
  },{
    name: 'Edit',
    class: 'btn disabled dead-link-left-bar'
  },{
    id: 'customize',
    name: 'Customize',
    logo: './components/assets/picture/customize.png',
    alt: 'Customize'
  },{
    id: 'settings',
    name: 'Settings',
    logo: './components/assets/picture/setting.png',
    alt: 'Settings'
  }
]