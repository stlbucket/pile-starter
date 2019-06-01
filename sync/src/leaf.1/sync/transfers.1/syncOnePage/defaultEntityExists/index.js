function defaultEntityExists (existing, entity) {
  const found = (existing[entity.global_id] || []).find(ua => moment(ua).format() === moment(entity.updated_at, 'MM/DD/YYYY hh:mma').format())
  return found !== undefined && found !== null
}

module.exports = defaultEntityExists