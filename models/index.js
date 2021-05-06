const Reader = require("./Reader");
const LibraryCard = require("./LibraryCard");

// Where we put relationship from cars to users

Reader.hasOne(LibraryCard, {
  foreignKey: "reader_id",
  // TODO: Add a comment describing the functionality of this property
  // delete the card when the id is deleted
  onDelete: "CASCADE",
});

LibraryCard.belongsTo(Reader, {
  foreignKey: "reader_id",
});

// TODO: Add a comment describing the functionality of this statement
module.exports = { Reader, LibraryCard };
