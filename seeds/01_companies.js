const { v4: uuidv4 } = require("uuid");

const companyData = [
  {
    id: uuidv4(),
    companyName: "Coles",
    companyURL: "https://www.coles.com.au/",
    companyAddress: "",
    recruiterName: "Tom Smith",
    recruiterEmail: "t.smith@coles.com.au",
    recruiterNumber: "0412-345-678",
  },
  {
    id: uuidv4(),
    companyName: "Woolworths Supermarkets",
    companyURL: "https://www.woolworths.com.au/",
    companyAddress: "",
    recruiterName: "Ryan king",
    recruiterEmail: "k.ryan@woolworths.com.au",
    recruiterNumber: "04223-456-789",
  },
  {
    id: uuidv4(),
    companyName: "Aldi",
    companyURL: "https://www.aldi.com.au/",
    companyAddress: "2 Butler Bvd, Adelaide Airport SA 5950",
    recruiterName: "Chirs Water",
    recruiterEmail: "chris@aldi.com.au",
    recruiterNumber: "04223-456-000",
  },
  {
    id: uuidv4(),
    companyName: "Apple AU",
    companyURL: "https://www.apple.com/au/",
    companyAddress: "Sydney South NSW 1235",
    recruiterName: "James Hardon",
    recruiterEmail: "James.H@apple.com.au",
    recruiterNumber: "0432-098-765",
  },
  {
    id: uuidv4(),
    companyName: "Nike",
    companyURL: "https://www.nike.com/au/",
    companyAddress: "Adelaide, South Australia",
    recruiterName: "Artur Gohar",
    recruiterEmail: "artur.gohar@nike.com.au",
    recruiterNumber: "04001-936-111",
  },
];

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("company").del();
  await knex("company").insert(companyData);
};

exports.companyData = companyData;
