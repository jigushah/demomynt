export default {
  api: {
    baseUrl: 'https://api.mynt-dev.com',
    authKey: 'access-token',
    version: 'v1',
    login: { path: 'users/login', auth: false },
    sendNotificationToken: { path: 'users/token', auth: true },
    fetchBundles: { path: 'bundles', verb: 'get', auth: true },
    fetchVehicles: { path: 'vehicles/fetchCurrentUser', auth: true },
    fetchVehicleModels: { path: 'vehicles/models', auth: true },
    fetchVehicleMakes: { path: 'vehicles/makes', auth: true },
    fetchServices: { path: 'services', verb: 'get', auth: true },
    fetchBookings: { path: 'bookings', auth: true },
    fetchDateAndTimes: { path: 'bookings/initial/dateTimes', auth: true },
    validateZipcode: { path: 'zipcodes/validate/{data}', auth: true },
    userSignup: { path: 'users', auth: false },
    userValidateEmail: { path: 'users/validateEmail', auth: false },
    sendCode: { path: 'users/requestPassReset', auth: false },
    confirmCode: { path: 'users/validatePassReset', auth: false },
    passReset: { path: 'users/passReset', auth: true },

    // Booking Schedule
    fetchDates: { path: 'times/gatherDates', verb: 'post', auth: true },
    fetchTimes: { path: 'times/gatherTimes', verb: 'post', auth: true },

    // Update user profile
    updateProfile: { path: 'users', verb: 'put', auth: true },

    // Vehicles routes
    addVehicle: { path: 'vehicles', verb: 'post', auth: true },
    deleteVehicle: { path: 'vehicles', verb: 'delete', auth: true },

    // Booking routes
    newBooking: { path: 'bookings', verb: 'post', auth: true },
    editBooking: { path: 'bookings', verb: 'put', auth: true },
    cancelBooking: { path: 'bookings', verb: 'delete', auth: true },

    // Payment routes
    fetchPayments: { path: 'payments', verb: 'get', auth: true },
    addPayment: { path: 'payments', verb: 'post', auth: true },
    deletePayment: { path: 'payments', verb: 'delete', auth: true },

    // Location routes
    fetchLocations: { path: 'places', verb: 'get', auth: true },
    addLocation: { path: 'places', verb: 'post', auth: true },
    updateLocation: { path: 'places', verb: 'put', auth: true },
    deleteLocation: { path: 'places', verb: 'delete', auth: true },

    gatherDates: { path: 'times/gatherDates', verb: 'post', auth: true },
    gatherTimes: { path: 'times/gatherTimes', verb: 'post', auth: true },

    // Promo code routes
    fetchPromos: { path: 'promos', verb: 'get', auth: true },
    addPromo: { path: 'promos', verb: 'post', auth: true },

    fakeRoute: { path: 'times?access-token=1', verb: 'get' },

    booking_list_fetch: '/v1/bookings/list/json?access-token=',
    booking_initial_date_and_times_fetch: '/v1/bookings/initial/dateTimes?access-token=',
    dashboard_upcoming_booking_fetch: '/v1/bookings/dashboard?access-token=',
    new_booking_fetch_time_slots: '/v1/times?access-token='
  }
};
