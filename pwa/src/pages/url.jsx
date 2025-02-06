function Url() {
  // return 'https://promotervit.herokuapp.com';
  return process.env.REACT_APP_GET_BACKEND_MAIN_URL;
}

export { Url };
