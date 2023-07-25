import store from '../../store';
import * as ACTIONS from './action';

const obj = {
    getAllAboutUs:()=>store.dispatch(ACTIONS.getAllAboutUs()),
    getAboutUsById:(id)=>store.dispatch(ACTIONS.getAboutUsById(id)),
    addAboutUs:(data)=>store.dispatch(ACTIONS.addAboutUs(data)),
    deleteAboutUsById:(id)=>store.dispatch(ACTIONS.deleteAboutUsById(id)),
    updateAboutUs:(data)=>store.dispatch(ACTIONS.updateAboutUs(data)),

    getAllPlateform:()=>store.dispatch(ACTIONS.getAllPlateform()),
    getPlateformById:(id)=>store.dispatch(ACTIONS.getPlateformById(id)),
    addPlateform:(data)=>store.dispatch(ACTIONS.addPlateform(data)),
    deletePlateformById:(id)=>store.dispatch(ACTIONS.deletePlateformById(id)),
    updatePlateform:(data)=>store.dispatch(ACTIONS.updatePlateform(data)),

    getAllPrivacyPolicy:()=>store.dispatch(ACTIONS.getAllPrivacyPolicy()),
    getPrivacyPolicyById:(id)=>store.dispatch(ACTIONS.getPrivacyPolicyById(id)),
    addPrivacyPolicy:(data)=>store.dispatch(ACTIONS.addPrivacyPolicy(data)),
    deletePrivacyPolicyById:(id)=>store.dispatch(ACTIONS.deletePrivacyPolicyById(id)),
    updatePrivacyPolicy:(data)=>store.dispatch(ACTIONS.updatePrivacyPolicy(data)),

    getAllNotification:()=>store.dispatch(ACTIONS.getAllNotification()),
    getNotificationById:(id)=>store.dispatch(ACTIONS.getNotificationById(id)),
    addNotification:(data)=>store.dispatch(ACTIONS.addNotification(data)),
    deleteNotificationById:(id)=>store.dispatch(ACTIONS.deleteNotificationById(id)),
    updateNotification:(data)=>store.dispatch(ACTIONS.updateNotification(data)),

    getAllTerm:()=>store.dispatch(ACTIONS.getAllTerm()),
    getTermById:(id)=>store.dispatch(ACTIONS.getTermById(id)),
    addTerm:(data)=>store.dispatch(ACTIONS.addTerm(data)),
    deleteTermById:(id)=>store.dispatch(ACTIONS.deleteTermById(id)),
    updateTerm:(data)=>store.dispatch(ACTIONS.updateTerm(data)),

    getAllBanner:()=>store.dispatch(ACTIONS.getAllBanner()),
    getBannerById:(id)=>store.dispatch(ACTIONS.getBannerById(id)),
    addBanner:(data)=>store.dispatch(ACTIONS.addBanner(data)),
    updateBanner:(id,data)=>store.dispatch(ACTIONS.updateBanner(id,data)),
    deleteBannerById:(id)=>store.dispatch(ACTIONS.deleteBannerById(id)),

    getAllContact:()=>store.dispatch(ACTIONS.getAllContact()),

    getAllUsers:()=>store.dispatch(ACTIONS.getAllUsers()),
    blockUnblockUser:(id)=>store.dispatch(ACTIONS.blockUnblockUser(id)),
    getUserById:(id)=>store.dispatch(ACTIONS.getUserById(id)),
    getPostsByUserId:(id)=>store.dispatch(ACTIONS.getPostsByUserId(id)),
    updateProfile:(id,data)=>store.dispatch(ACTIONS.updateProfile(id,data)),
    
    changePassword:(data)=>store.dispatch(ACTIONS.changePassword(data)),
    resetPassword:(data)=>store.dispatch(ACTIONS.resetPassword(data)),
   
    getDashboardData:()=>store.dispatch(ACTIONS.getDashboardData()),
    getReportLookupData:()=>store.dispatch(ACTIONS.getReportLookupData()),
    getMasterLookupData:()=>store.dispatch(ACTIONS.getMasterLookupData()),
    ReportAction:(data)=>store.dispatch(ACTIONS.ReportAction(data)),
    
    getAllCurrency:()=>store.dispatch(ACTIONS.getAllCurrency()),
    getCurrencyById:(id)=>store.dispatch(ACTIONS.getCurrencyById(id)),
    addCurrency:(data)=>store.dispatch(ACTIONS.addCurrency(data)),
    deleteCurrencyById:(id)=>store.dispatch(ACTIONS.deleteCurrencyById(id)),
    updateCurrency:(data)=>store.dispatch(ACTIONS.updateCurrency(data)),
    
    
}
export default obj;