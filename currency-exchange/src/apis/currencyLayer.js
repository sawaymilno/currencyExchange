import axios from 'axios';

export default axios.create({
  baseURL: 'http://apilayer.net/api/live',
  params: {
    access_key: 'ddf2fd5808da3643289dbe4a5e14f48f',
    currencies: 'ARS,AUD,BRL,CAD,CNY,EUR,GBP,JPY,KES,MXN',
    format: 1
  }
});