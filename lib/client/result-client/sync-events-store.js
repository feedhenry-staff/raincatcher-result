var data = {};

/**
 * Sets sync status for a result object.
 * @param {object} event - object passed in by sync event handler, should contain data used for logItem object.
 */
function addEvent(event) {
  var logItem = {
    entityId: event.uid,
    code: event.code,
    action: event.message.action,
    message: event.message.msg || event.message,
    type: event.message.type,
    ts: Date.now()
  };
  data[event.uid] = logItem;
}

/**
 * Returns the current sync status for result matching passed in ID.
 * @param {string} id - result id we want to get sync status for.
 */
function getSyncStatus(id) {
  return data[id];
}

/**
 * Iterates through array of passed in objects and updates syncStatus of each object.
 * @param {array} arrayOfResults
 */
function mapResultsToEvents(arrayOfResults) {
  arrayOfResults.forEach(function(result) {
    result.syncStatus = getSyncStatus(result.id);
  });
}


module.exports = {
  addEvent: addEvent,
  getSyncStatus: getSyncStatus,
  mapResultsToEvents: mapResultsToEvents
};


