const CERTIFIED_USERS = [
  { username: "admin", password: "promptops2026" },
  { username: "dev1", password: "dev1pass" }
];

function getSession() {
  return storageGet('promptops_session', null);
}

function login(username, password) {
  const user = CERTIFIED_USERS.find(u => u.username === username && u.password === password);
  if (user) {
    storageSet('promptops_session', { username: user.username, certified: true });
    return true;
  }
  return false;
}

function logout() {
  storageRemove('promptops_session');
}

function isLoggedIn() {
  return getSession() !== null;
}
