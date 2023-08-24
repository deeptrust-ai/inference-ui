const apiURLPrefix =
  process.env.NODE_ENV == "development"
    ? "http://localhost:8000/api/"
    : "https://amanmibra--rn-demo-api-modal-serve.modal.run/api/";

export default apiURLPrefix;
