var mongoose = require("mongoose");

var Schema = mongoose.Schema;
const { DateTime } = require("luxon");

var AuthorSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  family_name: { type: String, required: true, maxLength: 100 },
  date_of_birth: { type: Date },
  date_of_death: { type: Date },
});

// Virtual for author's full name
AuthorSchema.virtual("name").get(function () {
  // To avoid errors in cases where an author does not have either a family name or first name
  // We want to make sure we handle the exception by returning an empty string for that case
  var fullname = "";
  if (this.first_name && this.family_name) {
    fullname = this.family_name + ", " + this.first_name;
  }
  // Bad code, unneeded
  // if (!this.first_name || !this.family_name) {
  //   fullname = '';
  // }
  return fullname;
});

AuthorSchema.virtual("lifespan_formatted").get(function () {
  let lifetime_string = "";
  if (this.date_of_birth) {
    lifetime_string =
      lifetime_string +
      DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED);
  } else {
    lifetime_string = "Unknown";
  }
  if (this.date_of_death) {
    lifetime_string =
      lifetime_string +
      " - " +
      DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED);
  } else {
    lifetime_string = lifetime_string + " - " + "Present";
  }
  return lifetime_string;
});

// Virtual for author's lifespan
AuthorSchema.virtual("lifespan").get(function () {
  var lifetime_string = "";
  if (this.date_of_birth) {
    lifetime_string = this.date_of_birth.getYear().toString();
  }
  //This should be in the if... not sure if there's a reason for it to be here
  lifetime_string += " - ";
  if (this.date_of_death) {
    lifetime_string += this.date_of_death.getYear();
  }
  return lifetime_string;
});

// Virtual for author's URL
AuthorSchema.virtual("url").get(function () {
  return "/catalog/author/" + this._id;
});

AuthorSchema.virtual("birth_formatted").get(function () {
  return DateTime.fromJSDate(this.date_of_birth).toISODate();
});

AuthorSchema.virtual("death_formatted").get(function () {
  return DateTime.fromJSDate(this.date_of_death).toISODate();
});

//Export model
module.exports = mongoose.model("Author", AuthorSchema);
