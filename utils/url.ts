const localDev = "http://localhost:8000/api/";
const modalDev = "https://amanmibra--rawnet-api-api-dev.modal.run/api/";
const modalProd = "https://amanmibra--rawnet-api-api.modal.run/api/";

const apiURLPrefix =
  process.env.API_MODE == "prod"
    ? modalProd
    : process.env.MODAL_DEV
    ? modalDev
    : localDev;

export default apiURLPrefix;
