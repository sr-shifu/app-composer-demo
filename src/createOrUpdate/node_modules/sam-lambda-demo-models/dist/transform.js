const transformToModel = (dbItem) => ({
  id: dbItem.Id,
  title: dbItem.Title,
  isCompleted: dbItem.CompletedAt != null,
});

module.exports = transformToModel;
