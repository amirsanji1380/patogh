export const tabs = [
  {
    id: 0,
    text: 'pivot',
    icon: 'fields',
    content: 'User tab content'
  },
  {
    id: 1,
    text: 'grid',
    icon: 'datafield',
    content: 'Comment tab content'
  },
  
];

const locations = [

];


export const populationData = [{
    arg: 1950,
    val: 2525778669
  }, {
    arg: 1960,
    val: 3026002942
  }, {
    arg: 1970,
    val: 3691172616
  }, {
    arg: 1980,
    val: 4449048798
  }, {
    arg: 1990,
    val: 5320816667
  }, {
    arg: 2000,
    val: 6127700428
  }, {
    arg: 2010,
    val: 6916183482
  }];
  export const dataSource = [{
    country: 'China',
    y014: 320866959,
    y1564: 853191410,
    y65: 87774113
  }, {
    country: 'India',
    y014: 340419115,
    y1564: 626520945,
    y65: 47063757
  }, {
    country: 'United States',
    y014: 58554755,
    y1564: 182172625,
    y65: 34835293
  }, {
    country: 'Indonesia',
    y014: 68715705,
    y1564: 146014815,
    y65: 10053690
  }, {
    country: 'Brazil',
    y014: 50278034,
    y1564: 113391494,
    y65: 9190842
  }, {
    country: 'Russia',
    y014: 26465156,
    y1564: 101123777,
    y65: 18412243
  }];
  export const grossProductData = [{
    state: 'Illinois',
    year1998: 423.721,
    year2001: 476.851,
    year2004: 528.904
  }, {
    state: 'Indiana',
    year1998: 178.719,
    year2001: 195.769,
    year2004: 227.271
  }, {
    state: 'Michigan',
    year1998: 308.845,
    year2001: 335.793,
    year2004: 372.576
  }, {
    state: 'Ohio',
    year1998: 348.555,
    year2001: 374.771,
    year2004: 418.258
  }, {
    state: 'Wisconsin',
    year1998: 160.274,
    year2001: 182.373,
    year2004: 211.727
  }];
  export const dataSource2 = [{
    country: 'USA',
    medals: 110
  }, {
    country: 'China',
    medals: 100
  }, {
    country: 'Russia',
    medals: 72
  }, {
    country: 'Britain',
    medals: 47
  }, {
    country: 'Australia',
    medals: 46
  }, {
    country: 'Germany',
    medals: 41
  }, {
    country: 'France',
    medals: 40
  }, {
    country: 'South Korea',
    medals: 31
  }];
  const federalHolidays = [
  
  ];
  export default {
    getFederalHolidays() {
      return federalHolidays;
    },
    getlocations() {
      
      return locations;
    },
  };
  