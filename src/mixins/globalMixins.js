import axios from 'axios';

let globalMixins = {
  methods: {
    deepCopy: function (payload) {
      try {
        return JSON.parse(JSON.stringify(payload));
      } catch (e) {
        console.log('error in payload', payload);
      }
    },
    routeTo: function (path, payload, query = null) {
      this.$router.replace({
        name: path,
        params: payload,
        query: query
      }).catch(error => {
        console.log('error in routing to path : ', path, error);
      });
    },
    getQueryParams: function (params) {
      // build query params from a object
      if (! params) {
        return '';
      }
      let parameters = Object.keys(params);
      let queryParam = '?';
      parameters.forEach((parameter, index) => {
        if (index !== 0) {
          queryParam += '&';
        }
        queryParam += `${ parameter }=${ this.encodeURI(params[parameter]) }`;
      });
      return queryParam;
    },
    axiosPromise: function ({
                              url = null,
                              method = null,
                              data = null,
                              headers = null,
                              queryParams = null,
                              responseType = 'json'
    }) {
      /**
       * Global function for making server request
       * @param: {
       *   url:               url to hit,
       *   method:            request type, 'GET', 'POST', 'PUT', 'PATCH', 'Delete', etc
       *   data:              data to send with request
       *   queryParams:       query params for url,
       *   responseType:      what format the response needs to be converted
       * }
       **/

      let queryString = this.getQueryParams(queryParams);
      if (queryString.length > 0) {
        url += queryString;
      }
      headers = {
        ...{
          'Content-Type': 'application/json; charset=utf-8;',
        },
        ...headers,
      };
      return new Promise((resolve, reject) => {
        axios({
          url: url,
          baseURL: 'https://findfalcone.herokuapp.com',
          method: method,
          data: data,
          headers: headers,
          responseType: responseType,
        }).then(response => {
          resolve(response.data);
        }).catch(error => {
          reject(error);
        });
      });
    },
  }
};

export default globalMixins;
