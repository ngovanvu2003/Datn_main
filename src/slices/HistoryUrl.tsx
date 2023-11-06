export const saveHistory = () => {
  const currentURL = window.location.href;
  const history =
    JSON.parse(localStorage.getItem("pageHistory") as string) || [];
  history.push(currentURL);
  localStorage.setItem("pageHistory", JSON.stringify(history));
};

export const goBackInHistory = () => {
  const history =
    JSON.parse(localStorage.getItem("pageHistory") as string) || [];
  if (history.length > 0) {
    const previousURL = history.pop();
    localStorage.setItem("pageHistory", JSON.stringify(history));
    window.location.href = previousURL;
  }
};
