const API_ENDPOINT =
  'https://api.nytimes.com/svc/search/v2/articlesearch.json?fl=docs,headline,multimedia,abstract,web_url,_id,meta&fq=headline:("Healthy")&sort=newest&api-key=MfA1DQVbZKyyZgaBGMGwM77YyBxupFUC&page=';

const realApi = async (pageNo) => {
  console.log('Fetching pageNo: ' + pageNo);
  try {
    const response = await fetch(API_ENDPOINT + pageNo);
    if (!response.ok) {
      throw response;
    }
    const results = await response.json();
    
    return {
      articles: results.response.docs,
      totalResults: 30
    };
  } catch (e) {
    throw e;
  }
};

const fakeData = {
  docs: [
    {
      abstract:
        'Thursday: A conversation with Barbara Ferrer about how Los Angeles County is grappling with the Delta variant.',
      web_url: 'https://www.nytimes.com/2021/07/22/us/la-county-mask-mandate.html',
      multimedia: [
        {
          rank: 0,
          subtype: 'thumbnail',
          caption: null,
          credit: null,
          type: 'image',
          url: 'images/2021/07/22/lens/22california-today-promo/merlin_191027580_38548e50-446b-494b-9038-cfbd840e09d1-thumbStandard.jpg',
          height: 75,
          width: 75,
          subType: 'thumbnail',
          crop_name: 'thumbStandard'
        }
      ],
      headline: {
        main: 'L.A. County’s Public Health Chief Discusses the Mask Mandate',
        kicker: 'California Today',
        content_kicker: null,
        print_headline: null,
        name: null,
        seo: null,
        sub: null
      },
      _id: 'nyt://article/78f1063c-bfb4-599d-9558-25d34a3f44bc'
    }
  ],
  meta: {
    hits: 6,
    offset: 10
  }
};

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const fakeApi = async (pageNo) => {
  console.log('Fetching pageNo: ' + pageNo);
  await wait(1000);
  const newDocs = [...fakeData.docs, ...fakeData.docs, ...fakeData.docs];
  return {
    articles: newDocs,
    totalResults: fakeData.meta.hits
  };
};

export { realApi, fakeApi };
