const localDev = "http://localhost:8000/api/";
const modalDev =
  "https://amanmibra--rn-demo-api-modal-serve-dev.modal.run/api/";
const modalProd = "https://amanmibra--rn-demo-api-modal-serve.modal.run/api/";

const apiURLPrefix =
  process.env.NODE_ENV == "development"
    ? process.env.MODAL_DEV
      ? modalDev
      : localDev
    : modalProd;

export default apiURLPrefix;
