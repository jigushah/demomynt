import {
  createRouter,
} from '@expo/ex-navigation';

import InitialScreen from '../screens/InitialScreen';
import DashboardScreen from '../screens/DashboardScreen';
import HistoryScreen from '../screens/HistoryScreen';
import ChatScreen from '../screens/ChatScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUp from '../screens/SignUp';

/**
 * Forgot Password Steps ( In Order )
 */
import SendCode from '../screens/SendCode';
import ConfirmCode from '../screens/ConfirmCode';
import ResetPassword from '../screens/ResetPassword';

// New Booking screens
import BookingForm from '../screens/booking/BookingForm';
import Location from '../screens/Location';
import Schedule from '../screens/Schedule';
import AllVehicles from '../screens/Vehicles';
import Vehicles from '../screens/profile/vehicles/VehicleList';
import Payment from '../screens/Payment';
import Summary from '../screens/Summary';
import Success from '../screens/Success';
import RequestMynt from '../screens/RequestMynt';
import PaymentAdd from '../screens/PaymentAdd'; // this is super confusing at the moment
import Receipt from '../screens/Receipt';

import Bundles from '../screens/Bundles';
import Services from '../screens/Services';
import Promo from '../screens/Promo';
import PromoFeedback from '../screens/PromoFeedback';
import BundleServices from '../screens/BundleServices'
/**
 * Profile
 */
import VehicleList from '../screens/profile/vehicles/VehicleList';
import VehicleAdd from '../screens/profile/vehicles/VehicleAdd';

import LocationAdd from '../screens/profile/locations/Add';
import PaymentEdit from '../screens/profile/payments/Edit';
import PAdd from '../screens/profile/payments/Add';
import ProfileEdit from '../screens/profile/Edit';
import PromoList from '../screens/profile/promos/List.js';
import PromoAdd from '../screens/profile/promos/Add.js';

// Modal
import ModalScreen from '../screens/ModalScreen';
import LocationModal from '../screens/LocationModal';
import PaymentModal from '../screens/PaymentModal';
import VehicleModal from '../screens/profile/vehicles/VehicleList';

// Test
import TestScreen from '../screens/TestScreen';

// Navigators
import RootNavigation from './RootNavigation';
import BookingNavigation from './BookingNavigation';

export default createRouter(() => ({
  initial: () => InitialScreen,
    AllVehicles: () => AllVehicles,
  login: () => LoginScreen,
  signup: () => SignUp,
  sendCode: () => SendCode,
  confirmCode: () => ConfirmCode,
  resetPassword: () => ResetPassword,
  dashboard: () => DashboardScreen,
  modal: () => ModalScreen,
  receipt: () => Receipt,
  locationModal: () => LocationModal,
  paymentModal: () => PaymentModal,
  vehicleModal: () => VehicleModal,
  promoList: () => PromoList,
  promoAdd: () => PromoAdd,
  promoFeedback: () => PromoFeedback,
  requestMynt: () => RequestMynt,
  history: () => HistoryScreen,
  chat: () => ChatScreen,

  /**
   * Profile
   */
  profile: () => ProfileScreen,
  locationAdd: () => LocationAdd,
  profileEdit: () => ProfileEdit,

  bookingForm: () => BookingForm,
  location: () => Location,
  schedule: () => Schedule,
  vehicles: () => Vehicles,

  VehicleList: () => VehicleList,
  VehicleAdd: () => VehicleAdd,

    BundleServices: () => BundleServices,
  // paymentAdd: () => PaymentAdd, // Super confusing
  paymentEdit: () => PaymentEdit,
  addPayment: () => PAdd,
  payment: () => Payment,
  summary: () => Summary,
  success: () => Success,
  bundles: () => Bundles,
  services: () => Services,
  test: () => TestScreen,
  rootNavigation: () => RootNavigation,
  bookingNavigation: () => BookingNavigation
}), { ignoreSerializableWarnings: true });
