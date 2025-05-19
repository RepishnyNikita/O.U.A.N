const debtContainer = document.querySelector("[data-js-debt-container]");

export default function showModalDebt() {
  debtContainer.showModal();
  debtContainer.classList.add("is-open");
  debtContainer.addEventListener("close", () =>
    debtContainer.classList.remove("is-open")
  );
  document
    .querySelector("[data-js-debt-container-close]")
    .addEventListener("click", () => {
      debtContainer.close();
      debtContainer.classList.remove("is-open");
    });

}
