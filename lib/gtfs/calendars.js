const Calendar = require('../../models/calendar');
const Trip = require('../../models/trip');

/*
 * Returns an array of calendars that match the query parameters.
 */
exports.getCalendars = async (query = {}) => {
  if (query.route_id !== undefined) {
    const tripQuery = {route_id: query.route_id};

    if (query.agency_key !== undefined) {
      tripQuery.agency_key = query.agency_key;
    }
    const serviceIds = await Trip.find(tripQuery).distinct('service_id');
    query.service_id = {$in: serviceIds};
    delete query.route_id;
  }
  return Calendar.find(query, '-_id').lean();
};
