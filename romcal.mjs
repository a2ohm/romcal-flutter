// as esm
import { Romcal } from 'romcal';
import { France_Fr } from '@romcal/calendar.france';
import { writeFileSync } from 'fs';

const romcal = new Romcal({
  localizedCalendar: France_Fr, // The localized calendar to use with romcal
  scope: 'gregorian', // Default: 'gregorian' (Jan 1 to Dec 31). Optionally: 'liturgical' (the first Sunday of Advent to the last Saturday of Ordinary Time)
  epiphanyOnSunday: true, // Epiphany always a Sunday (between January 2 - 8), or on January 6
  corpusChristiOnSunday: true, // Corpus Christi always a Sunday, or the Thursday after Trinity Sunday
  ascensionOnSunday: false, // Ascension always a Sunday, or the 40th day of Easter (a Thursday)
  elevatedMemorialIds: ['john_paul_ii_pope', 'our_lady_of_fatima'], // List of optional memorials to be elevated to mandatory memorials
});


const currentYear = new Date().getFullYear();
// Init an empty json variable
var romcalElevenYears = {};
// Get a romcal calendar for the previous year to the next 10 years, using a Promise:

for (let year = currentYear - 1; year <= currentYear + 10; year++) {
  romcal.generateCalendar(year).then((romcalYear) => {
    writeFileSync(`./assets/romcal_${year}.json`, JSON.stringify(romcalYear));
    // Merge all year in on json object, romcalElevenYears
    romcalElevenYears = Object.assign(romcalElevenYears, romcalYear);
    // Write romcalElevenYears to romcalElevenYears.json
    writeFileSync(`./assets/romcalElevenYears.json`, JSON.stringify(romcalElevenYears));
  });
}
