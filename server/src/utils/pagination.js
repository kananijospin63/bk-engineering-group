/**
 * Parse and validate pagination query parameters
 */
function parsePagination(query, defaults = {}) {
  const limit = Math.min(parseInt(query.limit) || defaults.limit || 20, 100);
  const page = Math.max(parseInt(query.page) || 1, 1);
  const offset = (page - 1) * limit;

  return { limit, page, offset };
}

/**
 * Build a paginated response envelope
 */
function paginatedResponse(data, total, { limit, page, offset }) {
  return {
    data,
    pagination: {
      total,
      page,
      limit,
      offset,
      totalPages: Math.ceil(total / limit),
      hasNext: offset + limit < total,
      hasPrev: page > 1,
    },
  };
}

module.exports = { parsePagination, paginatedResponse };
